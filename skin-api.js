/* Skin client for the Ai Tokens Flux / new-api Platform.
 * Talks to Platform over HTTP only. Does not embed Platform code.
 * Browser: window.SkinAPI. Node tests: require('./skin-api').createSkinClient.
 */
;(function (root) {
  'use strict'

  const BASE_KEY = 'aitokensflux.apiBase'
  const UID_KEY = 'uid'
  const SECRET_KEY = 'aitokensflux.keySecrets'
  const DEFAULT_BASE = 'http://localhost:3000'

  function createSkinClient(options) {
    const settings = options || {}
    const storage = settings.storage || root.localStorage
    const session = settings.session || root.sessionStorage
    const fetchImpl = settings.fetch || root.fetch.bind(root)
    let cachedStatus = null
    let cachedGroup = ''

    function getBase() {
      const value = String(storage.getItem(BASE_KEY) || '').trim()
      return (value || DEFAULT_BASE).replace(/\/+$/, '')
    }

    function setBase(url) {
      const next = String(url || '').trim().replace(/\/+$/, '')
      if (next) storage.setItem(BASE_KEY, next)
      else storage.removeItem(BASE_KEY)
      cachedStatus = null
      cachedGroup = ''
    }

    function getUid() {
      return String(storage.getItem(UID_KEY) || '')
    }

    function setUid(id) {
      if (id === undefined || id === null || id === '') storage.removeItem(UID_KEY)
      else storage.setItem(UID_KEY, String(id))
    }

    function quotaPerUnit() {
      const value = Number(cachedStatus && cachedStatus.quota_per_unit)
      return value > 0 ? value : 500000
    }

    function join(base, path) {
      return base.replace(/\/+$/, '') + path
    }

    function asSecret(key) {
      const raw = String(key || '').trim()
      if (!raw) return ''
      return raw.startsWith('sk-') ? raw : 'sk-' + raw
    }

    function messageFrom(payload, fallback) {
      if (!payload) return fallback || '请求失败'
      if (typeof payload === 'string') return payload || fallback || '请求失败'
      const nested = payload.error && (payload.error.message || payload.error)
      if (typeof nested === 'string' && nested) return nested
      if (payload.message) return String(payload.message)
      return fallback || '请求失败'
    }

    function unwrap(payload) {
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return payload
      if (Object.prototype.hasOwnProperty.call(payload, 'success') && payload.data !== undefined)
        return payload.data
      return payload
    }

    function asList(data) {
      if (!data) return []
      if (Array.isArray(data)) return data
      if (Array.isArray(data.items)) return data.items
      if (Array.isArray(data.data)) return data.data
      if (Array.isArray(data.models)) return data.models
      return []
    }

    async function parseBody(response) {
      const text = await response.text()
      if (!text) return null
      try {
        return JSON.parse(text)
      } catch {
        return { message: text }
      }
    }

    async function api(path, options) {
      const request = options || {}
      const headers = { Accept: 'application/json' }
      const uid = getUid()
      if (request.auth !== false && uid) headers['New-API-User'] = uid
      if (request.turnstile) headers['X-Turnstile-Token'] = request.turnstile
      let body
      if (request.body !== undefined) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(request.body)
      }
      if (request.headers) Object.assign(headers, request.headers)
      let response
      try {
        response = await fetchImpl(join(getBase(), path), {
          method: request.method || 'GET',
          credentials: 'include',
          headers,
          body,
          signal: request.signal,
        })
      } catch (error) {
        if (error && error.name === 'AbortError') throw error
        const failed = new Error('无法连接 Platform（' + getBase() + '）。请确认地址与 CORS。')
        failed.cause = error
        throw failed
      }
      const payload = await parseBody(response)
      if (!response.ok || (payload && payload.success === false)) {
        const error = new Error(messageFrom(payload, response.statusText || '请求失败'))
        error.status = response.status
        error.payload = payload
        throw error
      }
      return payload
    }

    async function status() {
      const payload = await api('/api/status', { auth: false })
      cachedStatus = unwrap(payload) || {}
      return cachedStatus
    }

    async function login(credentials) {
      const payload = await api('/api/user/login', {
        method: 'POST',
        auth: false,
        turnstile: credentials.turnstile,
        body: { username: credentials.username, password: credentials.password },
      })
      const user = unwrap(payload) || {}
      const id = user.id
      if (id === undefined || id === null || id === '') throw new Error('登录成功但未返回用户 id')
      setUid(id)
      return user
    }

    async function register(credentials) {
      const body = { username: credentials.username, password: credentials.password }
      if (credentials.email) body.email = credentials.email
      await api('/api/user/register', {
        method: 'POST',
        auth: false,
        turnstile: credentials.turnstile,
        body,
      })
      return login(credentials)
    }

    async function self() {
      const payload = await api('/api/user/self')
      return unwrap(payload) || {}
    }

    async function logout() {
      try {
        await api('/api/user/logout')
      } finally {
        setUid('')
        cachedGroup = ''
      }
    }

    function normalizeToken(token) {
      return {
        id: token.id,
        name: token.name || '未命名密钥',
        status: Number(token.status || 1),
        key: token.key || '',
        remain_quota: Number(token.remain_quota || 0),
        used_quota: Number(token.used_quota || 0),
        unlimited_quota: Boolean(token.unlimited_quota),
        expired_time: token.expired_time === undefined ? -1 : Number(token.expired_time),
        accessed_time: Number(token.accessed_time || 0),
        created_time: Number(token.created_time || 0),
        group: token.group || '',
        model_limits_enabled: Boolean(token.model_limits_enabled),
      }
    }

    async function listTokens() {
      const payload = await api('/api/token/?p=1&size=100')
      return asList(unwrap(payload)).map(normalizeToken)
    }

    function groupNames(groups) {
      if (!groups) return []
      if (Array.isArray(groups)) return groups.map(String)
      if (typeof groups === 'object') return Object.keys(groups)
      return []
    }

    function groupLabel(groups, name) {
      if (groups && typeof groups === 'object' && !Array.isArray(groups))
        return String(groups[name] || '')
      return ''
    }

    function isFullName(name, label) {
      return /full|all-model|allmodel|max|满血|全模型|全量/i.test(name + ' ' + label)
    }

    async function resolveFullModelGroup() {
      const user = await self()
      let groups = {}
      try {
        groups = unwrap(await api('/api/user/self/groups')) || {}
      } catch {
        groups = {}
      }
      let pricingItems = []
      try {
        pricingItems = await fetchPricingItems()
      } catch {
        pricingItems = []
      }
      const usable = groupNames(groups)
      const counts = new Map()
      pricingItems.forEach((item) => {
        const enabled = item.enable_groups || item.enable_group || []
        ;(Array.isArray(enabled) ? enabled : [enabled]).forEach((name) => {
          if (!name) return
          counts.set(String(name), (counts.get(String(name)) || 0) + 1)
        })
      })
      const candidates = usable.length ? usable : [...counts.keys()]
      let best = ''
      let bestScore = -1
      candidates.forEach((name) => {
        const score = counts.get(name) || 0
        const betterScore = score > bestScore
        const tie = score === bestScore && score >= 0
        const named = isFullName(name, groupLabel(groups, name))
        const bestNamed = best && isFullName(best, groupLabel(groups, best))
        if (betterScore || (tie && named && !bestNamed)) {
          best = name
          bestScore = score
        }
      })
      if (!best) best = user.group || 'default'
      if (bestScore <= 0) {
        const named = candidates.find((name) => isFullName(name, groupLabel(groups, name)))
        best = named || user.group || candidates[0] || 'default'
      }
      cachedGroup = best
      return best
    }

    async function createToken(input) {
      const previous = new Set((await listTokens()).map((token) => String(token.id)))
      const group = input.group || (await resolveFullModelGroup())
      const unlimited = input.unlimitedQuota !== false
      const body = {
        name: input.name,
        remain_quota: unlimited ? 0 : Number(input.remainQuota || 0),
        expired_time: input.expiredTime === undefined ? -1 : Number(input.expiredTime),
        unlimited_quota: unlimited,
        model_limits_enabled: false,
        model_limits: '',
        allow_ips: '',
        group,
      }
      const created = unwrap(await api('/api/token/', { method: 'POST', body }))
      let token = null
      if (created && created.id) token = normalizeToken(created)
      if (!token) {
        const list = await listTokens()
        token = list
          .filter((item) => item.name === input.name && !previous.has(String(item.id)))
          .sort((a, b) => Number(b.id) - Number(a.id))[0]
      }
      if (!token) throw new Error('密钥已创建，但列表里没有找到它')
      let secret = ''
      if (created && (created.key || created.token)) secret = asSecret(created.key || created.token)
      if (!secret) secret = asSecret(await getTokenKey(token.id))
      rememberKey(token.id, token.name, secret)
      return { token, secret, group }
    }

    async function updateToken(id, fields) {
      const body = Object.assign({ id: Number(id) }, fields, { model_limits_enabled: false })
      const payload = await api('/api/token/' + id, { method: 'PUT', body })
      const data = unwrap(payload)
      return data && data.id ? normalizeToken(data) : body
    }

    async function deleteToken(id) {
      await api('/api/token/' + id, { method: 'DELETE' })
      forgetKey(id)
    }

    async function getTokenKey(id) {
      let payload
      try {
        payload = await api('/api/token/' + id + '/key')
      } catch (error) {
        if (error.status !== 404 && error.status !== 405) throw error
        payload = await api('/api/token/' + id + '/key', { method: 'POST', body: {} })
      }
      const data = unwrap(payload)
      const key = typeof data === 'string' ? data : data && (data.key || data.token)
      if (!key) throw new Error('Platform 没有返回完整密钥')
      return key
    }

    async function fetchPricingItems() {
      let payload
      try {
        payload = await api('/api/pricing/public', { auth: false })
      } catch (error) {
        if (error.status !== 404) throw error
        payload = await api('/api/pricing', { auth: false })
      }
      const data = unwrap(payload)
      if (Array.isArray(data)) return data
      return asList(data)
    }

    function modelNames(data) {
      return asList(data)
        .map((item) => {
          if (typeof item === 'string') return item
          return item.model_name || item.id || item.name || ''
        })
        .filter(Boolean)
    }

    function guessProvider(id, owner) {
      const text = String(owner || id || '').toLowerCase()
      if (text.includes('claude') || text.includes('anthropic')) return 'Anthropic'
      if (text.includes('gpt') || text.includes('openai') || /(^|\/)o[13]/.test(text)) return 'OpenAI'
      if (text.includes('gemini') || text.includes('google')) return 'Google'
      if (text.includes('deepseek')) return 'DeepSeek'
      if (text.includes('qwen')) return 'Qwen'
      if (text.includes('llama') || text.includes('meta')) return 'Meta'
      if (owner) return String(owner)
      const head = String(id).split('/')[0]
      return head && head !== id ? head : 'Platform'
    }

    function inferOutputs(id) {
      const text = String(id).toLowerCase()
      if (/embed/.test(text)) return ['embeddings']
      if (/whisper|transcri/.test(text)) return ['transcription']
      if (/dall-e|flux|image|sdxl/.test(text)) return ['image']
      if (/tts|speech/.test(text)) return ['speech']
      return ['text']
    }

    function inferInputs(id, outputs) {
      const text = String(id).toLowerCase()
      if (outputs[0] === 'transcription') return ['audio']
      if (/vision|gpt-4o|gemini|claude/.test(text)) return ['text', 'image']
      return ['text']
    }

    function toCatalogModel(id, pricing) {
      const info = pricing || {}
      const ratio = Number(info.model_ratio || 0)
      const completion = Number(info.completion_ratio || 1)
      const perCall = Number(info.quota_type) === 1
      const inputRate = perCall ? 0 : ratio * 2
      const outputRate = perCall ? 0 : inputRate * completion
      const outputs = inferOutputs(id)
      const provider = guessProvider(id, info.owner_by)
      const contextTokens = Number(info.context_length || info.max_tokens || 0)
      return {
        id,
        name: id,
        provider,
        slug: id,
        description: info.description || id + ' · 来自 Platform 目录',
        inputRate,
        outputRate,
        imagePrice: outputs[0] === 'image' && perCall ? Number(info.model_price || 0) : undefined,
        audioPrice:
          outputs[0] === 'transcription' && perCall ? Number(info.model_price || 0) : undefined,
        context: contextTokens ? Math.round(contextTokens / 1000) + 'K' : '—',
        contextTokens,
        inputs: inferInputs(id, outputs),
        outputs,
        date: '',
        usage: 0,
        hosts: [provider],
        variant: 'standard',
        open: false,
        zdr: false,
        tools: outputs[0] === 'text',
        category: /reason|o1|o3/.test(id) ? 'reasoning' : 'general',
        latency: '—',
        throughput: '—',
        uptime: '—',
        tags: outputs[0] === 'text' ? ['Streaming', 'JSON mode'] : ['Streaming'],
        live: true,
        group: (info.enable_groups || [])[0] || '',
      }
    }

    async function loadCatalog() {
      let names = []
      let modelError = null
      if (getUid()) {
        try {
          names = modelNames(unwrap(await api('/api/user/models')))
        } catch (error) {
          modelError = error
        }
      }
      let pricingItems = []
      let pricingError = null
      try {
        pricingItems = await fetchPricingItems()
      } catch (error) {
        pricingError = error
      }
      const byName = new Map()
      pricingItems.forEach((item) => {
        const name = item.model_name || item.model || item.id
        if (name) byName.set(String(name), item)
      })
      if (!names.length) names = [...byName.keys()]
      if (!names.length) throw modelError || pricingError || new Error('Platform 没有返回模型')
      let group = cachedGroup
      if (getUid()) {
        try {
          group = await resolveFullModelGroup()
        } catch {
          group = cachedGroup
        }
      }
      return {
        source: 'platform',
        group,
        models: names.map((name) => toCatalogModel(String(name), byName.get(String(name)))),
      }
    }

    async function readError(response) {
      const payload = await parseBody(response)
      return messageFrom(payload, response.statusText || '对话失败')
    }

    async function readSSE(response, onDelta) {
      if (!response.body || !response.body.getReader) {
        const text = await response.text()
        throw new Error(text || '浏览器无法读取流式响应')
      }
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let full = ''
      const consume = (line) => {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) return
        const data = trimmed.slice(5).trim()
        if (!data || data === '[DONE]') return
        let json
        try {
          json = JSON.parse(data)
        } catch {
          return
        }
        if (json.error) throw new Error(messageFrom(json, '流式响应失败'))
        const delta =
          json.choices?.[0]?.delta?.content ||
          json.choices?.[0]?.message?.content ||
          ''
        if (typeof delta === 'string' && delta) {
          full += delta
          if (onDelta) onDelta(full)
        }
      }
      while (true) {
        const step = await reader.read()
        if (step.done) break
        buffer += decoder.decode(step.value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        lines.forEach(consume)
      }
      if (buffer) consume(buffer)
      if (!full) throw new Error('流式响应没有返回内容')
      return full
    }

    async function chat(options) {
      const request = options || {}
      const apiKey = asSecret(request.apiKey)
      if (!apiKey) throw new Error('缺少 API Key。请先创建密钥，或在聊天里粘贴 sk- 密钥。')
      if (!request.model) throw new Error('缺少模型 ID')
      const payload = {
        model: request.model,
        messages: request.messages || [],
        stream: Boolean(request.stream),
      }
      if (typeof request.temperature === 'number') payload.temperature = request.temperature
      let response
      try {
        response = await fetchImpl(join(getBase(), '/v1/chat/completions'), {
          method: 'POST',
          credentials: 'omit',
          signal: request.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey,
          },
          body: JSON.stringify(payload),
        })
      } catch (error) {
        if (error && error.name === 'AbortError') throw error
        throw new Error('无法连接对话接口（' + getBase() + '/v1/chat/completions）')
      }
      if (!response.ok) throw new Error(await readError(response))
      if (!request.stream) {
        const body = await parseBody(response)
        if (body && body.error) throw new Error(messageFrom(body, '对话失败'))
        const text = body && body.choices && body.choices[0] && body.choices[0].message
          ? body.choices[0].message.content
          : ''
        if (typeof text !== 'string' || !text) throw new Error('模型返回了空内容')
        if (request.onDelta) request.onDelta(text)
        return text
      }
      return readSSE(response, request.onDelta)
    }

    function knownKeys() {
      try {
        const parsed = JSON.parse(session.getItem(SECRET_KEY) || '{}')
        return parsed && typeof parsed === 'object' ? parsed : {}
      } catch {
        return {}
      }
    }

    function rememberKey(id, name, secret) {
      const all = knownKeys()
      all[String(id)] = { id: String(id), name: name || 'API Key', secret: asSecret(secret) }
      session.setItem(SECRET_KEY, JSON.stringify(all))
    }

    function forgetKey(id) {
      const all = knownKeys()
      delete all[String(id)]
      session.setItem(SECRET_KEY, JSON.stringify(all))
    }

    return {
      getBase,
      setBase,
      getUid,
      setUid,
      quotaPerUnit,
      asSecret,
      status,
      login,
      register,
      self,
      logout,
      listTokens,
      createToken,
      updateToken,
      deleteToken,
      getTokenKey,
      resolveFullModelGroup,
      loadCatalog,
      chat,
      knownKeys,
      rememberKey,
      forgetKey,
    }
  }

  root.createSkinClient = createSkinClient
  if (root.localStorage && root.sessionStorage) root.SkinAPI = createSkinClient()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSkinClient }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this)
