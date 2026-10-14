import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { createSkinClient } = require('../skin-api.js')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function memoryStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8')
      if (!text) return resolve({})
      try {
        resolve(JSON.parse(text))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function cookiesOf(req) {
  const out = {}
  String(req.headers.cookie || '')
    .split(';')
    .forEach((part) => {
      const [key, ...rest] = part.trim().split('=')
      if (key) out[key] = rest.join('=')
    })
  return out
}

function mask(key) {
  if (key.length <= 8) return key
  return key.slice(0, 4) + '**********' + key.slice(-4)
}

function createPlatform() {
  const users = []
  const tokens = []
  const sessions = new Map()
  const seen = {
    selfHeaders: [],
    creates: [],
    keyReads: {},
    chats: [],
  }
  let userSeq = 1
  let tokenSeq = 1
  let sessionSeq = 1

  function send(res, status, payload, extra = {}) {
    const body = JSON.stringify(payload)
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      ...extra,
    })
    res.end(body)
  }

  function userFrom(req, res) {
    const session = sessions.get(cookiesOf(req).session)
    const header = req.headers['new-api-user']
    if (!session || String(header) !== String(session.id)) {
      send(res, 401, { success: false, message: '未登录或 New-API-User 不匹配' })
      return null
    }
    return session
  }

  const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin || '*'
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, New-API-User, X-Turnstile-Token, Authorization, Accept',
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Vary', 'Origin')
    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }
    const url = new URL(req.url, 'http://127.0.0.1')
    try {
      if (req.method === 'GET' && url.pathname === '/api/status') {
        send(res, 200, {
          success: true,
          data: { system_name: 'aitokensflux', turnstile_check: false, quota_per_unit: 500000 },
        })
        return
      }
      if (req.method === 'POST' && url.pathname === '/api/user/register') {
        const body = await readBody(req)
        if (!body.username || !body.password) {
          send(res, 200, { success: false, message: '请输入用户名和密码' })
          return
        }
        if (users.some((user) => user.username === body.username)) {
          send(res, 200, { success: false, message: '用户名已存在' })
          return
        }
        users.push({
          id: userSeq++,
          username: body.username,
          password: body.password,
          display_name: body.username,
          email: body.email || '',
          group: 'limited',
          quota: 1000000,
        })
        send(res, 200, { success: true, message: '' })
        return
      }
      if (req.method === 'POST' && url.pathname === '/api/user/login') {
        const body = await readBody(req)
        const user = users.find(
          (item) => item.username === body.username && item.password === body.password,
        )
        if (!user) {
          send(res, 200, { success: false, message: '用户名或密码错误' })
          return
        }
        const sid = 's' + sessionSeq++
        sessions.set(sid, user)
        send(
          res,
          200,
          {
            success: true,
            data: {
              id: user.id,
              username: user.username,
              display_name: user.display_name,
              group: user.group,
            },
          },
          { 'Set-Cookie': `session=${sid}; Path=/; HttpOnly; SameSite=Lax` },
        )
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/user/logout') {
        const sid = cookiesOf(req).session
        sessions.delete(sid)
        send(res, 200, { success: true, message: '' }, { 'Set-Cookie': 'session=; Path=/; Max-Age=0' })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/user/self') {
        const user = userFrom(req, res)
        if (!user) return
        seen.selfHeaders.push({
          cookie: req.headers.cookie || '',
          user: req.headers['new-api-user'] || '',
        })
        send(res, 200, { success: true, data: { ...user, password: undefined } })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/user/self/groups') {
        if (!userFrom(req, res)) return
        send(res, 200, { success: true, data: { full: '全模型分组', limited: '受限分组' } })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/user/models') {
        if (!userFrom(req, res)) return
        send(res, 200, { success: true, data: ['gpt-test-a', 'gpt-test-b', 'embed-test'] })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/pricing/public') {
        send(res, 200, {
          success: true,
          data: [
            {
              model_name: 'gpt-test-a',
              model_ratio: 1,
              completion_ratio: 2,
              owner_by: 'openai',
              enable_groups: ['full', 'limited'],
              quota_type: 0,
            },
            {
              model_name: 'gpt-test-b',
              model_ratio: 0.5,
              completion_ratio: 3,
              owner_by: 'openai',
              enable_groups: ['full'],
              quota_type: 0,
            },
            {
              model_name: 'embed-test',
              model_ratio: 0.1,
              completion_ratio: 1,
              owner_by: 'openai',
              enable_groups: ['full'],
              quota_type: 0,
            },
          ],
        })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/token/') {
        const user = userFrom(req, res)
        if (!user) return
        send(res, 200, {
          success: true,
          data: {
            items: tokens
              .filter((token) => token.userId === user.id)
              .map((token) => ({ ...token, key: mask(token.key) })),
          },
        })
        return
      }
      if (req.method === 'POST' && url.pathname === '/api/token/') {
        const user = userFrom(req, res)
        if (!user) return
        const body = await readBody(req)
        seen.creates.push(body)
        const token = {
          id: tokenSeq++,
          userId: user.id,
          name: body.name,
          status: 1,
          key: 'secretfullkeyvalue' + String(tokenSeq).padStart(4, '0'),
          remain_quota: body.remain_quota || 0,
          used_quota: 0,
          unlimited_quota: body.unlimited_quota,
          expired_time: body.expired_time,
          accessed_time: 0,
          group: body.group,
          model_limits_enabled: body.model_limits_enabled,
        }
        tokens.push(token)
        send(res, 200, { success: true, message: '' })
        return
      }
      const keyRoute = url.pathname.match(/^\/api\/token\/(\d+)\/key$/)
      if (keyRoute && (req.method === 'GET' || req.method === 'POST')) {
        const user = userFrom(req, res)
        if (!user) return
        const token = tokens.find((item) => item.id === Number(keyRoute[1]) && item.userId === user.id)
        if (!token) {
          send(res, 404, { success: false, message: '密钥不存在' })
          return
        }
        seen.keyReads[token.id] = (seen.keyReads[token.id] || 0) + 1
        send(res, 200, { success: true, data: { key: token.key } })
        return
      }
      const tokenRoute = url.pathname.match(/^\/api\/token\/(\d+)$/)
      if (tokenRoute && req.method === 'PUT') {
        const user = userFrom(req, res)
        if (!user) return
        const body = await readBody(req)
        const token = tokens.find((item) => item.id === Number(tokenRoute[1]) && item.userId === user.id)
        if (!token) {
          send(res, 404, { success: false, message: '密钥不存在' })
          return
        }
        Object.assign(token, {
          name: body.name ?? token.name,
          status: body.status ?? token.status,
          expired_time: body.expired_time ?? token.expired_time,
          group: body.group ?? token.group,
          model_limits_enabled: body.model_limits_enabled,
        })
        send(res, 200, { success: true, data: { ...token, key: mask(token.key) } })
        return
      }
      if (tokenRoute && req.method === 'DELETE') {
        const user = userFrom(req, res)
        if (!user) return
        const index = tokens.findIndex(
          (item) => item.id === Number(tokenRoute[1]) && item.userId === user.id,
        )
        if (index < 0) {
          send(res, 404, { success: false, message: '密钥不存在' })
          return
        }
        tokens.splice(index, 1)
        send(res, 200, { success: true, message: '' })
        return
      }
      if (req.method === 'POST' && url.pathname === '/v1/chat/completions') {
        const body = await readBody(req)
        const authorization = req.headers.authorization || ''
        seen.chats.push({ authorization, body })
        const raw = authorization.replace(/^Bearer\s+/i, '').replace(/^sk-/, '')
        const token = tokens.find((item) => item.key === raw && item.status === 1)
        if (!token) {
          send(res, 401, { error: { message: '无效的令牌' } })
          return
        }
        const text = (body.stream ? 'stream:' : 'sync:') + body.model
        if (body.stream) {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache',
          })
          res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: text.slice(0, 7) } }] })}\n\n`)
          res.write(
            `data: ${JSON.stringify({ choices: [{ delta: { content: text.slice(7) } }] })}\n\n`,
          )
          res.write('data: [DONE]\n\n')
          res.end()
          return
        }
        send(res, 200, { choices: [{ message: { role: 'assistant', content: text } }] })
        return
      }
      send(res, 404, { success: false, message: '未知接口 ' + url.pathname })
    } catch (error) {
      send(res, 500, { success: false, message: error.message })
    }
  })

  return { server, seen, tokens }
}

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port))
  })
}

function staticServer() {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
  }
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1')
    const file = path.normalize(path.join(root, decodeURIComponent(url.pathname)))
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404)
      res.end('not found')
      return
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
}

async function clientTests(base) {
  let cookie = ''
  const storage = memoryStorage()
  const session = memoryStorage()
  const client = createSkinClient({
    storage,
    session,
    fetch: async (url, options = {}) => {
      const headers = new Headers(options.headers || {})
      if (cookie) headers.set('cookie', cookie)
      const response = await fetch(url, { ...options, headers })
      for (const item of response.headers.getSetCookie()) {
        const pair = item.split(';')[0]
        if (pair && !pair.endsWith('=')) cookie = pair
        if (pair.startsWith('session=') && pair.endsWith('=')) cookie = ''
      }
      return response
    },
  })
  client.setBase(base)

  const status = await client.status()
  assert(status.system_name === 'aitokensflux', 'TC0 status')

  let rejected = false
  try {
    await client.login({ username: 'nobody', password: 'wrong-pass' })
  } catch (error) {
    rejected = error.message.includes('用户名或密码错误')
  }
  assert(rejected, 'TC0 bad login should reject')
  assert(!client.getUid(), 'TC0 bad login must not store uid')

  const user = await client.register({ username: 'node-user', password: 'secret-pass' })
  assert(String(user.id) === client.getUid(), 'TC0 register then login stores uid')
  const self = await client.self()
  assert(self.username === 'node-user', 'TC0 self returns the user')
  await client.logout()
  assert(!client.getUid(), 'TC0 logout clears uid')
  let selfRejected = false
  try {
    await client.self()
  } catch (error) {
    selfRejected = /未登录|New-API-User/.test(error.message)
  }
  assert(selfRejected, 'TC0 self after logout is rejected')

  await client.login({ username: 'node-user', password: 'secret-pass' })
  const created = await client.createToken({ name: 'node-key', unlimitedQuota: true })
  assert(created.group === 'full', 'TC1 group is the full-model group, got ' + created.group)
  assert(created.secret.startsWith('sk-'), 'TC1 secret is shown as sk- key')
  assert(client.knownKeys()[String(created.token.id)].secret === created.secret, 'TC1 key is copyable from session')
  const listed = await client.listTokens()
  const row = listed.find((item) => item.id === created.token.id)
  assert(row && !row.key.includes(created.secret.replace(/^sk-/, '')), 'TC1 list does not repeat the full key')
  assert(row.model_limits_enabled === false, 'TC1 stored model_limits_enabled false')

  const catalog = await client.loadCatalog()
  assert(
    catalog.models.map((model) => model.id).join() === 'gpt-test-a,gpt-test-b,embed-test',
    'TC2 catalog ids',
  )
  assert(catalog.models[0].slug === 'gpt-test-a', 'TC2 slug is the platform model id')

  const streamed = await client.chat({
    model: 'gpt-test-b',
    messages: [{ role: 'user', content: 'hi' }],
    stream: true,
    apiKey: created.secret,
  })
  assert(streamed === 'stream:gpt-test-b', 'TC3 stream uses model id, got ' + streamed)
  const synced = await client.chat({
    model: 'gpt-test-a',
    messages: [{ role: 'user', content: 'hi' }],
    stream: false,
    apiKey: created.secret,
  })
  assert(synced === 'sync:gpt-test-a', 'TC3 non-stream switches model, got ' + synced)
  let chatFailed = false
  try {
    await client.chat({
      model: 'gpt-test-a',
      messages: [{ role: 'user', content: 'hi' }],
      stream: false,
      apiKey: 'sk-not-a-real-key',
    })
  } catch (error) {
    chatFailed = error.message.includes('无效的令牌')
  }
  assert(chatFailed, 'TC3 readable error on failure')
  console.log('client contract checks passed')
}

function startChrome(port, dataDir) {
  const chrome = spawn(
    '/usr/bin/google-chrome',
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${dataDir}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  )
  let log = ''
  chrome.stderr.on('data', (chunk) => {
    log += chunk
  })
  chrome.stdout.on('data', (chunk) => {
    log += chunk
  })
  return { chrome, log: () => log }
}

async function waitFor(fn, label) {
  const started = Date.now()
  let last = ''
  while (Date.now() - started < 10000) {
    try {
      if (await fn()) return
    } catch (error) {
      last = error.message
    }
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  throw new Error(label + (last ? ' (' + last + ')' : ''))
}

class Cdp {
  constructor(ws) {
    this.ws = ws
    this.id = 0
    this.pending = new Map()
    this.events = new Map()
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id)
        this.pending.delete(message.id)
        if (message.error) reject(new Error(message.error.message))
        else resolve(message.result)
      } else if (message.method) {
        ;(this.events.get(message.method) || []).forEach((listener) => listener(message.params))
      }
    })
  }
  send(method, params = {}) {
    const id = ++this.id
    const payload = JSON.stringify({ id, method, params })
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(payload)
    })
  }
  on(method, listener) {
    const list = this.events.get(method) || []
    list.push(listener)
    this.events.set(method, list)
  }
}

async function connectChrome(port) {
  await waitFor(async () => {
    const response = await fetch(`http://127.0.0.1:${port}/json/version`)
    return response.ok
  }, 'chrome debugger')
  const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json())
  const page = list.find((item) => item.type === 'page')
  assert(page, 'chrome page target')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve)
    ws.addEventListener('error', () => reject(new Error('chrome websocket failed')))
  })
  return new Cdp(ws)
}

async function uiTests(pageUrl, seen) {
  const debugPort = 9334
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'skin-chrome-'))
  const launched = startChrome(debugPort, dataDir)
  try {
    const cdp = await connectChrome(debugPort)
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })
    const shot = async (name) => {
      const dir = process.env.SKIN_SHOTS
      if (!dir) return
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' })
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(path.join(dir, name), Buffer.from(data, 'base64'))
    }
    const loaded = new Promise((resolve) => cdp.on('Page.loadEventFired', resolve))
    await cdp.send('Page.navigate', { url: pageUrl })
    await loaded
    const evalJson = async (expression) => {
      const result = await cdp.send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      })
      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.text + ' ' + (result.exceptionDetails.exception?.description || ''))
      }
      return result.result.value
    }
    const waitPage = async (expression, label) => {
      await waitFor(async () => Boolean(await evalJson(expression)), label)
    }
    await waitPage(
      `document.querySelector('[data-action="api-settings"]')?.getAttribute('aria-pressed') === 'true'`,
      'TC0 platform status',
    )
    const accent = await evalJson(
      `getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()`,
    )
    assert(accent === '#0fb477', 'theme accent changed: ' + accent)

    await evalJson(`document.querySelector('[data-action="open-login"]').click()`)
    await waitPage(`document.querySelector('#auth-form')`, 'login dialog')
    await evalJson(`document.querySelector('[data-action="show-register"]').click()`)
    await waitPage(`document.querySelector('#auth-form')?.dataset.mode === 'register'`, 'register form')
    await evalJson(`{
      const form = document.querySelector('#auth-form')
      form.username.value = 'ui-user'
      form.password.value = 'ui-pass'
      form.requestSubmit()
    }`)
    await waitPage(
      `document.querySelector('.v6-account-label')?.textContent === 'ui-user' && localStorage.getItem('uid')`,
      'TC0 register leaves the user logged in',
    )
    const uid = await evalJson(`localStorage.getItem('uid')`)
    assert(uid, 'TC0 uid stored')

    await evalJson(`document.querySelector('[data-action="logout"]').click()`)
    await waitPage(`document.querySelector('[data-action="open-login"]') && !localStorage.getItem('uid')`, 'TC0 logout')

    await evalJson(`document.querySelector('[data-action="open-login"]').click()`)
    await waitPage(`document.querySelector('#auth-form')`, 'login again')
    await evalJson(`{
      const form = document.querySelector('#auth-form')
      form.username.value = 'ui-user'
      form.password.value = 'wrong-pass'
      form.requestSubmit()
    }`)
    await waitPage(
      `document.querySelector('#auth-error')?.textContent.includes('用户名或密码错误')`,
      'TC0 bad login message',
    )
    assert(
      !(await evalJson(`localStorage.getItem('uid')`)),
      'TC0 bad login must not set uid',
    )
    await evalJson(`{
      const form = document.querySelector('#auth-form')
      form.username.value = 'ui-user'
      form.password.value = 'ui-pass'
      form.requestSubmit()
    }`)
    await waitPage(`document.querySelector('.v6-account-label')?.textContent === 'ui-user'`, 'TC0 login self')
    await shot('skin_logged_in_catalog.png')

    await evalJson(`location.hash = '#/console/keys'`)
    await waitPage(`document.querySelector('[data-action="create-key"]')`, 'keys page')
    await evalJson(`document.querySelector('[data-action="create-key"]').click()`)
    await waitPage(`document.querySelector('#key-form')`, 'create key dialog')
    await evalJson(`{
      const form = document.querySelector('#key-form')
      form.name.value = 'UI Key'
      form.requestSubmit()
    }`)
    await waitPage(`document.querySelector('#created-key')?.value.startsWith('sk-')`, 'TC1 key shown once')
    await shot('skin_key_shown_once.png')
    const revealed = await evalJson(`({
      secret: document.querySelector('#created-key').value,
      copy: Boolean(document.querySelector('[data-action="copy"][data-copy]')),
      table: document.querySelector('#key-results')?.innerText || ''
    })`)
    assert(revealed.copy, 'TC1 copy control')
    assert(!revealed.table.includes(revealed.secret), 'TC1 table hides the full key')
    const created = seen.creates.filter((item) => item.name === 'UI Key').at(-1)
    assert(created, 'TC1 create request')
    assert(created.model_limits_enabled === false, 'TC1 model_limits_enabled false')
    assert(created.group === 'full', 'TC1 full-model group, got ' + created.group)

    await evalJson(`document.querySelector('[data-action="close-dialog"]').click()`)
    await evalJson(`location.hash = '#/models'`)
    await waitPage(
      `document.querySelector('#model-count')?.dataset.catalogSource === 'platform'`,
      'TC2 platform catalog',
    )
    await evalJson(`{
      const input = document.getElementById('model-search')
      input.value = 'gpt-test-b'
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }`)
    await waitPage(
      `document.querySelectorAll('[data-model-id]').length === 1 && document.querySelector('[data-model-id="gpt-test-b"]')`,
      'TC2 filter',
    )
    await evalJson(`document.querySelector('[data-model-id="gpt-test-b"] a[href*="chat?model="]').click()`)
    await waitPage(`document.querySelector('[data-chat-model="gpt-test-b"]')`, 'TC2 chat opens filtered model')
    await evalJson(`
      document.getElementById('chat-prompt').value = 'hello stream'
      document.getElementById('chat-form').requestSubmit()
    `)
    await waitPage(
      `document.body.innerText.includes('stream:gpt-test-b') && document.querySelector('[aria-label="发送消息"]')`,
      'TC3 stream response',
    )

    await evalJson(`document.querySelector('[data-action="choose-model"]').click()`)
    await waitPage(`document.querySelector('#chat-models-form')`, 'model switcher')
    await evalJson(`{
      document.querySelectorAll('[name="chat-model"]').forEach((input) => { input.checked = input.value === 'gpt-test-a' })
      document.getElementById('chat-models-form').requestSubmit()
    }`)
    await waitPage(`document.querySelector('[data-chat-model="gpt-test-a"]')`, 'TC3 switched model')
    await evalJson(`{
      const box = document.getElementById('chat-stream')
      box.checked = false
      box.dispatchEvent(new Event('change', { bubbles: true }))
      document.getElementById('chat-prompt').value = 'hello sync'
      document.getElementById('chat-form').requestSubmit()
    }`)
    await waitPage(
      `document.body.innerText.includes('sync:gpt-test-a') && document.querySelector('[aria-label="发送消息"]')`,
      'TC3 non-stream response',
    )
    const uiChats = seen.chats.filter((item) => item.authorization === 'Bearer ' + revealed.secret)
    assert(uiChats.length >= 2, 'TC3 both chats use the same key')
    assert(uiChats.some((item) => item.body.stream === true && item.body.model === 'gpt-test-b'), 'TC3 stream model id')
    assert(uiChats.some((item) => item.body.stream === false && item.body.model === 'gpt-test-a'), 'TC3 non-stream model id')

    await evalJson(`{
      const select = document.getElementById('chat-key')
      select.value = '__paste'
      select.dispatchEvent(new Event('change', { bubbles: true }))
    }`)
    await waitPage(`document.querySelector('#paste-key-form')`, 'paste key')
    await evalJson(`{
      const form = document.querySelector('#paste-key-form')
      form.secret.value = 'sk-not-a-real-key'
      form.requestSubmit()
    }`)
    await waitPage(`document.getElementById('chat-key')?.value === 'pasted'`, 'bad key selected')
    await evalJson(`
      document.getElementById('chat-prompt').value = 'fail please'
      document.getElementById('chat-form').requestSubmit()
    `)
    await waitPage(
      `document.querySelector('.v6-chat-error')?.textContent.includes('无效的令牌')`,
      'TC3 readable chat error',
    )
    await shot('skin_chat_stream_and_error.png')
    console.log('ui contract checks passed')
  } finally {
    launched.chrome.kill('SIGKILL')
    await new Promise((resolve) => setTimeout(resolve, 200))
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
}

const platform = createPlatform()
const files = staticServer()
const apiPort = await listen(platform.server)
const webPort = await listen(files)
const base = `http://127.0.0.1:${apiPort}`
try {
  await clientTests(base)
  await uiTests(`${`http://127.0.0.1:${webPort}/v6.html?api=${encodeURIComponent(base)}#/models`}`, platform.seen)
  const header = platform.seen.selfHeaders.at(-1)
  assert(header && header.cookie.includes('session=') && header.user, 'TC0 cookie and New-API-User observed')
  console.log('all skin contract checks passed')
} finally {
  platform.server.close()
  files.close()
}
