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
    keyMethods: [],
    tokenLists: 0,
    issued: [],
    createShape: 'id',
    plantDecoy: false,
    allowKeyGet: false,
    rejectKeyPost: false,
    listBeforeId: 0,
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
        seen.tokenLists += 1
        send(res, 200, {
          success: true,
          data: {
            items: tokens
              .filter((token) => token.userId === user.id)
              .filter((token) => !seen.listBeforeId || token.id < seen.listBeforeId)
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
        const id = tokenSeq++
        const token = {
          id,
          userId: user.id,
          name: body.name,
          status: 1,
          key: 'secretfullkeyvalue' + String(id).padStart(4, '0'),
          remain_quota: body.remain_quota || 0,
          used_quota: 0,
          unlimited_quota: body.unlimited_quota,
          expired_time: body.expired_time,
          accessed_time: 0,
          created_time: Math.floor(Date.now() / 1000),
          group: body.group,
          model_limits_enabled: body.model_limits_enabled,
        }
        tokens.push(token)
        seen.issued.push({ id: token.id, key: token.key, name: token.name })
        if (seen.plantDecoy) {
          tokens.push({
            ...token,
            id: token.id + 1000,
            key: 'decoyfullkeyvalue' + String(token.id).padStart(4, '0'),
            created_time: token.created_time,
          })
        }
        if (seen.createShape === 'empty') {
          send(res, 200, { success: true, message: '' })
          return
        }
        if (seen.createShape === 'numeric') {
          send(res, 200, { success: true, data: token.id })
          return
        }
        send(res, 200, {
          success: true,
          message: '',
          data: {
            id: token.id,
            name: token.name,
            status: token.status,
            group: token.group,
            remain_quota: token.remain_quota,
            unlimited_quota: token.unlimited_quota,
            expired_time: token.expired_time,
            model_limits_enabled: token.model_limits_enabled,
            key: mask(token.key),
          },
        })
        return
      }
      const keyRoute = url.pathname.match(/^\/api\/token\/(\d+)\/key$/)
      if (keyRoute && req.method === 'GET') {
        const user = userFrom(req, res)
        if (!user) return
        seen.keyMethods.push('GET')
        if (!seen.allowKeyGet) {
          send(res, 404, { success: false, message: 'not found' })
          return
        }
        const token = tokens.find((item) => item.id === Number(keyRoute[1]) && item.userId === user.id)
        if (!token) {
          send(res, 404, { success: false, message: '密钥不存在' })
          return
        }
        seen.keyReads[token.id] = (seen.keyReads[token.id] || 0) + 1
        send(res, 200, { success: true, data: { key: token.key } })
        return
      }
      if (keyRoute && req.method === 'POST') {
        const user = userFrom(req, res)
        if (!user) return
        seen.keyMethods.push('POST')
        if (seen.rejectKeyPost) {
          send(res, 405, { success: false, message: 'method not allowed' })
          return
        }
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

async function clientTests(base, seen, tokens) {
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
  seen.plantDecoy = true
  seen.createShape = 'id'
  const listsBeforeCreate = seen.tokenLists
  const created = await client.createToken({ name: 'node-key', unlimitedQuota: true })
  const issued = seen.issued.filter((item) => item.name === 'node-key').at(-1)
  assert(created.group === 'full', 'TC1 group is the full-model group, got ' + created.group)
  assert(created.token.id === issued.id, 'TC1 uses the id from POST /api/token/, got ' + created.token.id)
  assert(seen.tokenLists === listsBeforeCreate, 'TC1 create response id does not list-diff')
  assert(created.secret === 'sk-' + issued.key, 'TC1 secret comes from POST /api/token/:id/key')
  assert(!created.secret.includes('*'), 'TC1 reveal is the full key, not the masked create field')
  assert(seen.keyMethods.join(',') === 'POST', 'TC1 key reveal prefers POST /api/token/:id/key')
  assert(client.knownKeys()[String(created.token.id)].secret === created.secret, 'TC1 key is copyable from session')
  seen.plantDecoy = false
  const listed = await client.listTokens()
  const row = listed.find((item) => item.id === created.token.id)
  assert(row && !row.key.includes(created.secret.replace(/^sk-/, '')), 'TC1 list does not repeat the full key')
  assert(row.model_limits_enabled === false, 'TC1 stored model_limits_enabled false')
  const decoy = listed.find((item) => item.id === issued.id + 1000)
  assert(decoy && created.token.id !== decoy.id, 'TC1 does not adopt the newer same-name list id')

  seen.createShape = 'numeric'
  const numericLists = seen.tokenLists
  const numeric = await client.createToken({ name: 'node-key-numeric', unlimitedQuota: true })
  const numericIssued = seen.issued.filter((item) => item.name === 'node-key-numeric').at(-1)
  assert(numeric.token.id === numericIssued.id, 'TC1 numeric create data is the token id')
  assert(numeric.secret === 'sk-' + numericIssued.key, 'TC1 numeric create still reads POST /key')
  assert(seen.tokenLists === numericLists, 'TC1 numeric id does not list-diff')
  assert(numeric.group === 'full', 'TC1 numeric create keeps the full-model group')

  seen.createShape = 'empty'
  const again = await client.createToken({ name: 'node-key-again', unlimitedQuota: true })
  const emptyLists = seen.tokenLists
  const fallback = await client.createToken({ name: 'node-key-again', unlimitedQuota: true })
  const fallbackIssued = seen.issued.filter((item) => item.name === 'node-key-again').at(-1)
  assert(seen.tokenLists === emptyLists + 1, 'TC1 empty create body falls back to one list read')
  assert(fallback.token.id === fallbackIssued.id, 'TC1 list fallback picks the new token, not the older same name')
  assert(fallback.token.id !== again.token.id, 'TC1 list fallback is not the previous key')
  assert(fallback.secret === 'sk-' + fallbackIssued.key, 'TC1 list fallback still uses POST /key')
  assert(fallback.secret.startsWith('sk-') && !fallback.secret.includes('*'), 'TC1 fallback secret is a full sk- key')

  seen.createShape = 'id'
  seen.rejectKeyPost = true
  seen.allowKeyGet = true
  const legacy = await client.createToken({ name: 'node-key-get', unlimitedQuota: true })
  assert(legacy.secret.startsWith('sk-') && !legacy.secret.includes('*'), 'TC1 GET /key still reveals the secret')
  assert(seen.keyMethods.slice(-2).join(',') === 'POST,GET', 'TC1 GET /key is only the fallback after POST 405')
  seen.rejectKeyPost = false
  seen.allowKeyGet = false

  seen.createShape = 'id'
  const stale = await client.createToken({ name: 'node-key-stale', unlimitedQuota: true })
  const staleRow = tokens.find((item) => item.id === stale.token.id)
  staleRow.created_time = Math.floor(Date.now() / 1000) - 100000
  seen.listBeforeId = stale.token.id + 1
  seen.createShape = 'empty'
  let staleRejected = false
  try {
    await client.createToken({ name: 'node-key-stale', unlimitedQuota: true })
  } catch (error) {
    staleRejected = error.message.includes('没有找到')
  }
  assert(staleRejected, 'TC1 list fallback does not reveal an older key when the new row is missing')
  seen.listBeforeId = 0
  seen.createShape = 'id'

  const catalog = await client.loadCatalog()
  assert(
    catalog.models.map((model) => model.id).join() === 'gpt-test-a,gpt-test-b,embed-test',
    'TC2 catalog ids',
  )
  assert(catalog.models[0].slug === 'gpt-test-a', 'TC2 slug is the platform model id')

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
    const uiKeyAt = seen.keyMethods.length
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
    const issued = seen.issued.filter((item) => item.name === 'UI Key').at(-1)
    assert(created, 'TC1 create request')
    assert(created.model_limits_enabled === false, 'TC1 model_limits_enabled false')
    assert(created.group === 'full', 'TC1 full-model group, got ' + created.group)
    assert(revealed.secret === 'sk-' + issued.key, 'TC1 UI reveals the POST /key secret')
    assert(seen.keyMethods.slice(uiKeyAt).join(',') === 'POST', 'TC1 UI uses POST /key and not GET')

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
    await evalJson(`location.hash = '#/models/gpt-test-b'`)
    await waitPage(
      `document.querySelector('.v6-detail-head')?.innerText.includes('gpt-test-b')`,
      'TC2 model detail opens',
    )
    await shot('skin_model_detail.png')
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
  await clientTests(base, platform.seen, platform.tokens)
  await uiTests(`${`http://127.0.0.1:${webPort}/v6.html?api=${encodeURIComponent(base)}#/models`}`, platform.seen)
  const header = platform.seen.selfHeaders.at(-1)
  assert(header && header.cookie.includes('session=') && header.user, 'TC0 cookie and New-API-User observed')
  console.log('all skin contract checks passed')
} finally {
  platform.server.close()
  files.close()
}
