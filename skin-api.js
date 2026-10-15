/* Skin client for the Ai Tokens Flux / new-api Platform.
 * Talks to Platform over HTTP only. Does not embed Platform code.
 * Browser: window.SkinAPI. Node tests: require('./skin-api').createSkinClient.
 */
;(function (root) {
  'use strict'

  const BASE_KEY = 'aitokensflux.apiBase'
  const TOKEN_KEY = 'aitokensflux.accessToken'
  const EXPIRES_KEY = 'aitokensflux.accessExpiresAt'
  const USER_KEY = 'aitokensflux.user'
  const DEFAULT_BASE = 'http://localhost:3000'

  function createSkinClient(options) {
    const settings = options || {}
    const storage = settings.storage || root.localStorage
    const fetchImpl = settings.fetch || root.fetch.bind(root)
    let cachedStatus = null
    let cachedGroup = ''
    let lastTokenMaxId = 0

    function cfg() {
      return (typeof root !== 'undefined' && root.SKIN_CONFIG) || {}
    }

    function allowOverride() {
      // config.js 明确关闭，或页面运行在 http(s) 源下时默认不允许 ?api= 改写；
      // Node 测试等没有 location 的环境默认允许。
      if (cfg().allowApiOverride === false) return false
      if (cfg().allowApiOverride === true) return true
      return !(root.location && /^https?:/.test(String(root.location.origin || '')))
    }

    function getBase() {
      const fixed = String(cfg().apiBase || '').trim()
      if (fixed) return fixed.replace(/\/+$/, '')
      if (allowOverride()) {
        const value = String(storage.getItem(BASE_KEY) || '').trim()
        if (value) return value.replace(/\/+$/, '')
      }
      const origin = root.location && /^https?:/.test(String(root.location.origin || ''))
        ? String(root.location.origin)
        : ''
      return (origin || DEFAULT_BASE).replace(/\/+$/, '')
    }

    function setBase(url) {
      const next = String(url || '').trim().replace(/\/+$/, '')
      if (next) storage.setItem(BASE_KEY, next)
      else storage.removeItem(BASE_KEY)
      cachedStatus = null
      cachedGroup = ''
    }

    function publicBase() {
      return String(cfg().publicApiBase || '').trim().replace(/\/+$/, '') || getBase()
    }

    function getToken() {
      return String(storage.getItem(TOKEN_KEY) || '')
    }

    function getUser() {
      try {
        return JSON.parse(storage.getItem(USER_KEY) || 'null')
      } catch {
        return null
      }
    }

    // 登录成功：保存 dashboard access_token、过期时间与用户信息
    function saveAuth(bundle) {
      const token = bundle && bundle.access_token
      if (!token) return
      storage.setItem(TOKEN_KEY, String(token))
      const expiresAt = Number(bundle.access_expires_at || 0)
      if (expiresAt > 0) storage.setItem(EXPIRES_KEY, String(expiresAt))
      else storage.removeItem(EXPIRES_KEY)
      if (bundle.user) storage.setItem(USER_KEY, JSON.stringify(bundle.user))
    }

    function clearAuth() {
      storage.removeItem(TOKEN_KEY)
      storage.removeItem(EXPIRES_KEY)
      storage.removeItem(USER_KEY)
      cachedGroup = ''
    }

    // 兼容旧接口：uid 仍可用于显示（来自 user.id），但鉴权不再用它
    function getUid() {
      const user = getUser()
      return user && user.id !== undefined ? String(user.id) : ''
    }

    function setUid(id) {
      if (id === undefined || id === null || id === '') return
      const user = getUser() || {}
      user.id = id
      storage.setItem(USER_KEY, JSON.stringify(user))
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
      const token = getToken()
      if (request.auth !== false && token) headers['Authorization'] = 'Bearer ' + token
      let url = join(getBase(), path)
      if (request.turnstile) {
        const sep = url.includes('?') ? '&' : '?'
        url += sep + 'turnstile=' + encodeURIComponent(request.turnstile)
      }
      let body
      if (request.body !== undefined) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(request.body)
      }
      if (request.headers) Object.assign(headers, request.headers)
      let response
      try {
        response = await fetchImpl(url, {
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
        if (response.status === 401 && request.auth !== false && request.retry !== false) {
          // access_token 过期：先尝试用 refresh cookie 换新 token，再重试一次
          const refreshed = await refreshAuth().catch(() => false)
          if (refreshed) return api(path, Object.assign({}, request, { retry: false }))
          clearAuth()
          if (typeof root.dispatchEvent === 'function' && typeof root.Event === 'function') {
            try {
              root.dispatchEvent(new root.Event('skin:unauthorized'))
            } catch { /* event dispatch is best-effort */ }
          }
        }
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

    let encryptionKeyCache = null
    async function encryptPassword(password) {
      // GET /api/user/login/encryption-key → 服务端要求时用 RSA-OAEP/SHA-256 加密密码
      let info = encryptionKeyCache
      if (info === null) {
        try {
          info = unwrap(await api('/api/user/login/encryption-key', { auth: false })) || {}
        } catch {
          info = {}
        }
        encryptionKeyCache = info
      }
      if (!info.enabled || !info.public_key || !info.kid) return null
      if (typeof crypto === 'undefined' || !crypto.subtle) return null
      const der = Uint8Array.from(
        atob(String(info.public_key).replace(/-----[^-]+-----|\s+/g, '')),
        (char) => char.charCodeAt(0),
      )
      const key = await crypto.subtle.importKey(
        'spki',
        der.buffer,
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        false,
        ['encrypt'],
      )
      const encrypted = await crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        key,
        new TextEncoder().encode(String(password)),
      )
      return {
        passwordEncrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
        encryptionKeyId: info.kid,
      }
    }

    function applyLoginResult(payload) {
      // 成功返回 {access_token, token_type, access_expires_at, session, user}；
      // 需要二次验证时 Platform 返回 challenge 对象（无 access_token）。
      const data = unwrap(payload) || {}
      if (!data.access_token) {
        const challenge = data
        challenge._loginChallenge = true
        return challenge
      }
      saveAuth(data)
      return data
    }

    async function login(credentials) {
      const body = {}
      if (credentials.passwordEncrypted && credentials.encryptionKeyId) {
        body.password_encrypted = credentials.passwordEncrypted
        body.encryption_key_id = credentials.encryptionKeyId
      } else {
        // 服务端开启密码加密时，改用 RSA-OAEP 密文提交
        const encrypted = await encryptPassword(credentials.password).catch(() => null)
        if (encrypted) {
          body.password_encrypted = encrypted.passwordEncrypted
          body.encryption_key_id = encrypted.encryptionKeyId
        } else {
          body.username = credentials.username
          body.password = credentials.password
        }
      }
      const payload = await api('/api/user/login', {
        method: 'POST',
        auth: false,
        turnstile: credentials.turnstile,
        body,
      })
      return applyLoginResult(payload)
    }

    async function register(credentials) {
      const body = { username: credentials.username, password: credentials.password }
      if (credentials.email) body.email = credentials.email
      if (credentials.emailCode) body.verification_code = credentials.emailCode
      const payload = await api('/api/user/register', {
        method: 'POST',
        auth: false,
        turnstile: credentials.turnstile,
        body,
      })
      return applyLoginResult(payload)
    }

    async function self() {
      const payload = await api('/api/user/self')
      const user = unwrap(payload) || {}
      if (user && user.id !== undefined) storage.setItem(USER_KEY, JSON.stringify(user))
      return user
    }

    // 用 HttpOnly refresh cookie 换新的 access_token
    async function refreshAuth() {
      if (!getToken()) return false
      try {
        const payload = await api('/api/user/auth/refresh', { method: 'POST', auth: false })
        const data = unwrap(payload) || {}
        if (!data.access_token) return false
        saveAuth(data)
        return true
      } catch {
        return false
      }
    }

    async function logout() {
      try {
        await api('/api/user/auth/logout', { method: 'POST' })
      } finally {
        clearAuth()
      }
    }

    function normalizeToken(token) {
      // 新版响应为 {token 字段平铺, auto_groups}
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
      // GET /api/token/?p=&page_size= → {items,total,page,page_size}
      const size = 100
      const all = []
      let total = Infinity
      for (let page = 1; page <= 50 && all.length < total; page++) {
        const payload = await api(`/api/token/?p=${page}&page_size=${size}`)
        const data = unwrap(payload) || {}
        const rows = Array.isArray(data.items) ? data.items : asList(data)
        if (typeof data.total === 'number') total = data.total
        all.push(...rows)
        if (rows.length < size) break
      }
      const normalized = all.map(normalizeToken)
      const maxId = normalized.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0)
      if (maxId > lastTokenMaxId) lastTokenMaxId = maxId
      return normalized
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

    function numericId(value) {
      if (typeof value === 'number' && Number.isInteger(value) && value > 0) return value
      if (typeof value === 'string' && /^\d+$/.test(value.trim())) {
        const parsed = Number(value.trim())
        if (parsed > 0) return parsed
      }
      return 0
    }

    function idFrom(value, depth) {
      const level = depth || 0
      if (level > 4 || value === undefined || value === null) return 0
      const direct = numericId(value)
      if (direct) return direct
      if (typeof value !== 'object' || Array.isArray(value)) return 0
      const keys = ['id', 'ID', 'Id', 'token_id', 'tokenId']
      for (let i = 0; i < keys.length; i++) {
        if (Object.prototype.hasOwnProperty.call(value, keys[i])) {
          const found = numericId(value[keys[i]])
          if (found) return found
        }
      }
      if (value.token) {
        const found = idFrom(value.token, level + 1)
        if (found) return found
      }
      if (value.data !== undefined && value.data !== value) {
        const found = idFrom(value.data, level + 1)
        if (found) return found
      }
      return 0
    }

    function tokenFields(source) {
      const out = {}
      if (!source || typeof source !== 'object' || Array.isArray(source)) return out
      const keys = [
        'name',
        'status',
        'key',
        'remain_quota',
        'used_quota',
        'unlimited_quota',
        'expired_time',
        'accessed_time',
        'created_time',
        'group',
        'model_limits_enabled',
      ]
      keys.forEach((key) => {
        if (source[key] !== undefined) out[key] = source[key]
      })
      if (typeof source.token === 'string' && source.token) out.token = source.token
      return out
    }

    function readCreatedToken(payload) {
      const data = unwrap(payload)
      const id = idFrom(data) || idFrom(payload)
      let fields = {}
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const nested = data.token && typeof data.token === 'object' ? data.token : data
        fields = tokenFields(nested)
      }
      if (id) fields.id = id
      return { id, fields }
    }

    function fullSecret(value) {
      const raw = String(value || '').trim()
      if (!raw || /[*•…]/.test(raw)) return ''
      const body = raw.replace(/^sk-/i, '')
      if (body.length < 16) return ''
      return asSecret(raw)
    }

    // Used only when POST /api/token/ has no id. new-api's AddToken body is
    // {success:true,message:""}, so the new row has to be taken from the list.
    // 并发同名令牌可能同时新建：取 created_time 新鲜、id 大于创建前基准的最小 id，
    // 避免冒认其他客户端刚创建的同名令牌。
    async function findTokenByListDiff(name, baselineId) {
      const list = await listTokens()
      const baseline = Number(baselineId) || 0
      const named = list.filter((item) => item.name === name && Number(item.id) > baseline)
      const pool = named.length ? named : list.filter((item) => item.name === name)
      if (!pool.length) return null
      const now = Math.floor(Date.now() / 1000)
      const timed = pool.filter((item) => Number(item.created_time || 0) > 0)
      const fresh = timed.filter((item) => Math.abs(now - Number(item.created_time)) <= 600)
      if (timed.length && !fresh.length) return null
      const candidates = fresh.length ? fresh : pool
      // 升序：小于并发新建的同名令牌
      return candidates.sort((a, b) => Number(a.id) - Number(b.id))[0]
    }

    async function createToken(input) {
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
      const payload = await api('/api/token/', { method: 'POST', body })
      const created = readCreatedToken(payload)
      let token = null
      if (created.id) {
        const fields = created.fields
        const merged = Object.assign(
          {
            name: body.name,
            remain_quota: body.remain_quota,
            unlimited_quota: body.unlimited_quota,
            expired_time: body.expired_time,
            group: body.group,
            model_limits_enabled: false,
            status: 1,
          },
          fields,
          {
            id: created.id,
            name: fields.name || body.name,
            group: fields.group || body.group,
          },
        )
        if (fields.model_limits_enabled === undefined) merged.model_limits_enabled = false
        token = normalizeToken(merged)
      } else {
        token = await findTokenByListDiff(body.name, lastTokenMaxId)
      }
      if (!token || !token.id) throw new Error('密钥已创建，但列表里没有找到它')
      let secret = ''
      const inline = fullSecret(created.fields.key || created.fields.token)
      try {
        secret = asSecret(await getTokenKey(token.id))
      } catch (error) {
        if (!inline) throw error
        secret = inline
      }
      if (!secret) secret = inline
      if (!secret) throw new Error('Platform 没有返回完整密钥')
      // 完整密钥只交给创建弹窗展示一次，不落盘
      return { token, secret, group }
    }

    async function updateToken(id, fields) {
      // 真实路由为 PUT /api/token/，id 在请求体内；可用 ?status_only 只改启停
      const statusOnly = fields && fields.status_only === true
      const body = Object.assign({ id: Number(id) }, fields)
      delete body.status_only
      const payload = await api('/api/token/' + (statusOnly ? '?status_only=true' : ''), {
        method: 'PUT',
        body,
      })
      const data = unwrap(payload)
      return data && data.id ? normalizeToken(data) : body
    }

    async function deleteToken(id) {
      await api('/api/token/' + id, { method: 'DELETE' })
    }

    async function getTokenKey(id) {
      let payload
      try {
        payload = await api('/api/token/' + id + '/key', { method: 'POST', body: {} })
      } catch (error) {
        if (error.status !== 404 && error.status !== 405) throw error
        payload = await api('/api/token/' + id + '/key')
      }
      const data = unwrap(payload)
      const key = typeof data === 'string' ? data : data && (data.key || data.token)
      if (!key) throw new Error('Platform 没有返回完整密钥')
      return key
    }

    async function fetchPricing() {
      // GET /api/pricing → {data, vendors, group_ratio, usable_group, supported_endpoint}
      const payload = await api('/api/pricing', { auth: false })
      return unwrap(payload) || {}
    }

    async function fetchPricingItems() {
      const data = await fetchPricing()
      const items = Array.isArray(data.data) ? data.data : asList(data)
      return items
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

    async function selfData(days) {
      const now = Math.floor(Date.now() / 1000)
      const start = now - (Number(days) || 7) * 86400
      const payload = await api(
        `/api/data/self?start_timestamp=${start}&end_timestamp=${now}&timezone=${encodeURIComponent('local')}`,
      )
      return unwrap(payload) || {}
    }

    async function listLogs(params) {
      const q = new URLSearchParams()
      const p = params || {}
      q.set('p', String(p.page || 1))
      q.set('page_size', String(p.size || 20))
      if (p.type !== undefined && p.type !== null && p.type !== '') q.set('type', String(p.type))
      if (p.model) q.set('model_name', String(p.model))
      if (p.token) q.set('token_name', String(p.token))
      if (p.start) q.set('start_timestamp', String(p.start))
      if (p.end) q.set('end_timestamp', String(p.end))
      if (p.group) q.set('group', String(p.group))
      const payload = await api('/api/log/self?' + q.toString())
      const data = unwrap(payload) || {}
      const items = Array.isArray(data.items) ? data.items : asList(data)
      return { items, total: Number(data.total || items.length), page: p.page || 1 }
    }

    async function logStats(params) {
      const q = new URLSearchParams()
      const p = params || {}
      if (p.type !== undefined && p.type !== null && p.type !== '') q.set('type', String(p.type))
      if (p.start) q.set('start_timestamp', String(p.start))
      if (p.end) q.set('end_timestamp', String(p.end))
      if (p.token) q.set('token_name', String(p.token))
      if (p.model) q.set('model_name', String(p.model))
      if (p.group) q.set('group', String(p.group))
      const payload = await api('/api/log/self/stat?' + q.toString())
      return unwrap(payload) || {}
    }

    async function topup(key) {
      const payload = await api('/api/user/topup', {
        method: 'POST',
        body: { key: String(key || '').trim() },
      })
      return unwrap(payload) || {}
    }

    async function sendVerification(email, purpose, turnstile) {
      const q = new URLSearchParams({
        email: String(email || '').trim(),
        purpose: String(purpose || 'register'),
      })
      await api('/api/verification?' + q.toString(), { auth: false, turnstile })
    }

    async function sendResetEmail(email, turnstile) {
      const q = new URLSearchParams({ email: String(email || '').trim() })
      await api('/api/reset_password?' + q.toString(), { auth: false, turnstile })
    }

    async function resetPassword(input) {
      const payload = await api('/api/user/reset', {
        method: 'POST',
        auth: false,
        body: {
          email: String(input.email || '').trim(),
          password: String(input.password || ''),
          verification_code: String(input.code || '').trim(),
        },
      })
      return unwrap(payload) || {}
    }

    // 三方登录第一步：POST /api/oauth/state 拿 flow_token（telegram 还会返回 authorization_url）
    async function oauthState(provider, intent) {
      const payload = await api('/api/oauth/state', {
        method: 'POST',
        auth: false,
        body: { provider: String(provider || ''), intent: intent || 'login' },
      })
      return unwrap(payload) || {}
    }

    async function rankings(period) {
      const payload = await api('/api/rankings?period=' + encodeURIComponent(period || 'week'), {
        auth: false,
      })
      return unwrap(payload) || {}
    }

    async function perfMetrics(params) {
      const q = new URLSearchParams()
      if (params && params.period) q.set('period', String(params.period))
      const path = params && params.summary
        ? '/api/perf-metrics/summary' + (q.size ? '?' + q : '')
        : '/api/perf-metrics' + (q.size ? '?' + q : '')
      const payload = await api(path, { auth: false })
      return unwrap(payload) || {}
    }

    async function topupHistory() {
      const payload = await api('/api/user/topup/self')
      return asList(unwrap(payload))
    }

    async function updateSetting(fields) {
      const payload = await api('/api/user/setting', { method: 'PUT', body: fields || {} })
      return unwrap(payload) || {}
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
      allowOverride,
      publicBase,
      selfData,
      listLogs,
      logStats,
      topup,
      topupHistory,
      sendVerification,
      sendResetEmail,
      resetPassword,
      refreshAuth,
      oauthState,
      rankings,
      perfMetrics,
      updateSetting,
      getToken,
      getUser,
      saveAuth,
      clearAuth,
    }
  }

  root.createSkinClient = createSkinClient
  if (root.localStorage && root.sessionStorage) root.SkinAPI = createSkinClient()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSkinClient }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this)
