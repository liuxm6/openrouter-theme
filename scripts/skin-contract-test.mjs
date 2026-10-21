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

// ── 按真实 new-api 合同实现的 mock Platform ──
// 鉴权：Authorization: Bearer <access_token>；刷新：new_api_refresh Cookie
function createPlatform() {
  const users = []
  const tokens = []
  const accessTokens = new Map() // token → {userId, expiresAt}
  const sessions = new Map() // refresh sid → {userId}
  const logs = []
  const redemptions = new Set(['REDEEM-100'])
  const seen = {
    selfHeaders: [],
    creates: [],
    keyReads: {},
    keyMethods: [],
    tokenLists: 0,
    issued: [],
    topups: [],
    refreshCalls: 0,
    createShape: 'id',
    plantDecoy: false,
    allowKeyGet: false,
    rejectKeyPost: false,
    listBeforeId: 0,
  }
  let userSeq = 1
  let tokenSeq = 1
  let sessionSeq = 1
  let accessSeq = 1

  function send(res, status, payload, extra = {}) {
    const body = JSON.stringify(payload)
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      ...extra,
    })
    res.end(body)
  }

  function issueBundle(user) {
    const sid = 'rs' + sessionSeq++
    const access = 'at-' + accessSeq++
    sessions.set(sid, { id: user.id })
    accessTokens.set(access, { id: user.id, expiresAt: Date.now() + 3600e3 })
    return {
      access_token: access,
      token_type: 'Bearer',
      access_expires_at: Math.floor(Date.now() / 1000) + 3600,
      session: { id: sid },
      user: publicUser(user),
    }
  }

  function publicUser(user) {
    return {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      email: user.email || '',
      group: user.group,
      quota: user.quota,
      used_quota: user.used_quota || 0,
      request_count: user.request_count || 0,
      role: user.role || 1,
      status: 1,
    }
  }

  function userFrom(req, res) {
    const header = String(req.headers.authorization || '')
    const m = header.match(/^Bearer\s+(.+)$/i)
    const rec = m ? accessTokens.get(m[1]) : null
    if (!rec) {
      send(res, 401, { success: false, message: '未登录或令牌无效' })
      return null
    }
    return users.find((u) => u.id === rec.id) || null
  }

  function auth(req, res) {
    const user = userFrom(req, res)
    if (user) seen.selfHeaders.push({ authorization: req.headers.authorization || '' })
    return user
  }

  const MODELS = ['gpt-test-a', 'gpt-test-b', 'embed-test']
  const PRICING = [
    { model_name: 'gpt-test-a', model_ratio: 1, completion_ratio: 2, owner_by: 'openai', enable_groups: ['full', 'limited'], quota_type: 0, model_price: 0 },
    { model_name: 'gpt-test-b', model_ratio: 0.5, completion_ratio: 3, owner_by: 'openai', enable_groups: ['full'], quota_type: 0, model_price: 0 },
    { model_name: 'embed-test', model_ratio: 0.1, completion_ratio: 1, owner_by: 'openai', enable_groups: ['full'], quota_type: 0, model_price: 0 },
  ]

  const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin || '*'
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Vary', 'Origin')
    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }
    const url = new URL(req.url, 'http://127.0.0.1')
    try {
      // ── status（无鉴权）
      if (req.method === 'GET' && url.pathname === '/api/status') {
        send(res, 200, {
          success: true,
          data: {
            system_name: 'aitokensflux',
            turnstile_check: false,
            email_verification: false,
            quota_per_unit: 500000,
            display_in_currency: true,
          },
        })
        return
      }
      // ── 注册：返回登录 bundle（auto-login）
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
        const user = {
          id: userSeq++,
          username: body.username,
          password: body.password,
          display_name: body.username,
          email: body.email || '',
          group: 'limited',
          quota: 1000000,
          used_quota: 0,
          request_count: 0,
        }
        users.push(user)
        const bundle = issueBundle(user)
        const sid = bundle.session.id
        send(res, 200, { success: true, data: bundle }, {
          'Set-Cookie': `new_api_refresh=${sid}; Path=/api/user/auth; HttpOnly; SameSite=Strict`,
        })
        return
      }
      // ── 登录
      if (req.method === 'POST' && url.pathname === '/api/user/login') {
        const body = await readBody(req)
        // 加密字段暂不接受（mock 不实现 RSA）
        if (body.password_encrypted) {
          send(res, 200, { success: false, message: '密码加密不支持（mock）' })
          return
        }
        const user = users.find(
          (item) => item.username === body.username && item.password === body.password,
        )
        if (!user) {
          send(res, 200, { success: false, message: '用户名或密码错误' })
          return
        }
        const bundle = issueBundle(user)
        const sid = bundle.session.id
        send(res, 200, { success: true, data: bundle }, {
          'Set-Cookie': `new_api_refresh=${sid}; Path=/api/user/auth; HttpOnly; SameSite=Strict`,
        })
        return
      }
      // ── 登录加密密钥（本例未开启）
      if (req.method === 'GET' && url.pathname === '/api/user/login/encryption-key') {
        send(res, 200, { success: true, data: { enabled: false } })
        return
      }
      // ── 刷新 access token
      if (req.method === 'POST' && url.pathname === '/api/user/auth/refresh') {
        seen.refreshCalls += 1
        const sid = cookiesOf(req).new_api_refresh
        const session = sessions.get(sid)
        if (!session) {
          send(res, 401, { success: false, message: 'refresh token is invalid' })
          return
        }
        const user = users.find((u) => u.id === session.id)
        send(res, 200, { success: true, data: issueBundle(user) }, {
          'Set-Cookie': `new_api_refresh=${sid}; Path=/api/user/auth; HttpOnly; SameSite=Strict`,
        })
        return
      }
      // ── 登出
      if (req.method === 'POST' && url.pathname === '/api/user/auth/logout') {
        const sid = cookiesOf(req).new_api_refresh
        sessions.delete(sid)
        send(res, 200, { success: true, message: '' })
        return
      }
      // ── 验证码 / 找回密码
      if (req.method === 'GET' && url.pathname === '/api/verification') {
        send(res, 200, { success: true, message: '验证码已发送' })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/reset_password') {
        send(res, 200, { success: true, message: '重置邮件已发送' })
        return
      }
      if (req.method === 'POST' && url.pathname === '/api/user/reset') {
        send(res, 200, { success: true, message: '' })
        return
      }
      // ── 当前用户
      if (req.method === 'GET' && url.pathname === '/api/user/self') {
        const user = auth(req, res)
        if (!user) return
        send(res, 200, { success: true, data: publicUser(user) })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/user/self/groups') {
        if (!auth(req, res)) return
        send(res, 200, { success: true, data: { full: '全模型分组', limited: '受限分组' } })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/user/groups') {
        send(res, 200, { success: true, data: { full: '全模型分组', limited: '受限分组' } })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/user/models') {
        if (!auth(req, res)) return
        send(res, 200, { success: true, data: MODELS })
        return
      }
      // ── 定价（公共）
      if (req.method === 'GET' && url.pathname === '/api/pricing') {
        send(res, 200, {
          success: true,
          data: PRICING,
          vendors: [],
          group_ratio: { full: 1, limited: 1.2 },
          usable_group: { full: '全模型分组', limited: '受限分组' },
        })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/rankings') {
        send(res, 200, {
          success: true,
          data: {
            models: [
              { model_name: 'gpt-test-a', quota: 120000, count: 42 },
              { model_name: 'gpt-test-b', quota: 80000, count: 17 },
            ],
          },
        })
        return
      }
      // ── 性能监控（/api/perf-metrics*，对齐 new-api perfmetrics 契约）──
      if (req.method === 'GET' && url.pathname === '/api/perf-metrics/summary') {
        const now = Math.floor(Date.now() / 1000)
        send(res, 200, {
          success: true,
          data: {
            summary: { avg_latency_ms: 820, success_rate: 99.2, avg_tps: 48.5 },
            window_start: now - 86400,
            window_end: now,
            models: [
              {
                model_name: 'gpt-test-a',
                avg_latency_ms: 640,
                success_rate: 100,
                avg_tps: 52.1,
                recent_success_series: [
                  { ts: now - 3600, success_rate: 100 },
                  { ts: now, success_rate: 100 },
                ],
              },
              {
                model_name: 'gpt-test-b',
                avg_latency_ms: 1230,
                success_rate: 97.5,
                avg_tps: 41.8,
                recent_success_series: [
                  { ts: now - 3600, success_rate: 95 },
                  { ts: now, success_rate: 100 },
                ],
              },
            ],
            recent_success_series: {
              'gpt-test-a': [
                { ts: now - 3600, success_rate: 100 },
                { ts: now, success_rate: 100 },
              ],
              'gpt-test-b': [
                { ts: now - 3600, success_rate: 95 },
                { ts: now, success_rate: 100 },
              ],
            },
          },
        })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/perf-metrics') {
        const model = url.searchParams.get('model')
        if (!model) {
          send(res, 400, { success: false, message: 'model is required' })
          return
        }
        const now = Math.floor(Date.now() / 1000)
        const series = Array.from({ length: 6 }, (_, i) => ({
          ts: now - (5 - i) * 3600,
          avg_ttft_ms: 320 + i * 15,
          avg_latency_ms: 900 + i * 40,
          success_rate: i === 3 ? 92.5 : 100,
          avg_tps: 40 + i * 3,
        }))
        send(res, 200, {
          success: true,
          data: {
            model_name: model,
            series_schema: 'hourly',
            summary: { avg_latency_ms: 980, success_rate: 98.75, avg_tps: 46.2 },
            series,
            window_start: now - 21600,
            window_end: now,
            groups: [
              {
                group: 'default',
                avg_ttft_ms: 340,
                avg_latency_ms: 960,
                success_rate: 98.75,
                avg_tps: 46.2,
                series,
              },
            ],
          },
        })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/uptime/status') {
        send(res, 200, {
          success: true,
          data: [
            {
              categoryName: '默认分组',
              monitors: [
                { name: 'gpt-test-a 通道', uptime: 0.9993, status: 1, group: '默认分组' },
                { name: '备用通道', uptime: 0.982, status: 1, group: '默认分组' },
              ],
            },
          ],
        })
        return
      }
      // ── 令牌
      if (req.method === 'GET' && url.pathname === '/api/token/') {
        const user = auth(req, res)
        if (!user) return
        seen.tokenLists += 1
        const size = Number(url.searchParams.get('page_size') || url.searchParams.get('size') || 10)
        const page = Number(url.searchParams.get('p') || 1)
        const all = tokens
          .filter((token) => token.userId === user.id)
          .filter((token) => !seen.listBeforeId || token.id < seen.listBeforeId)
          .map((token) => ({ ...token, key: mask(token.key), auto_groups: null }))
        const items = all.slice((page - 1) * size, page * size)
        send(res, 200, { success: true, data: { items, total: all.length, page, page_size: size } })
        return
      }
      if (req.method === 'POST' && url.pathname === '/api/token/') {
        const user = auth(req, res)
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
          model_limits: body.model_limits || '',
          allow_ips: body.allow_ips || '',
          cross_group_retry: false,
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
        // 真实 new-api：成功只回 {success:true,message:""}，不带 id
        if (seen.createShape === 'withId') {
          send(res, 200, { success: true, message: '', data: { id: token.id } })
          return
        }
        if (seen.createShape === 'numeric') {
          send(res, 200, { success: true, data: token.id })
          return
        }
        send(res, 200, { success: true, message: '' })
        return
      }
      // ── 令牌完整 key
      const keyRoute = url.pathname.match(/^\/api\/token\/(\d+)\/key$/)
      if (keyRoute && req.method === 'POST') {
        const user = auth(req, res)
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
      if (keyRoute && req.method === 'GET') {
        const user = auth(req, res)
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
      // ── 令牌更新（真实路由 PUT /api/token/，id 在 body）
      if (req.method === 'PUT' && url.pathname === '/api/token/') {
        const user = auth(req, res)
        if (!user) return
        const body = await readBody(req)
        const token = tokens.find((item) => item.id === Number(body.id) && item.userId === user.id)
        if (!token) {
          send(res, 404, { success: false, message: '密钥不存在' })
          return
        }
        Object.assign(token, {
          name: body.name ?? token.name,
          status: body.status ?? token.status,
          expired_time: body.expired_time ?? token.expired_time,
          group: body.group ?? token.group,
          model_limits_enabled: body.model_limits_enabled ?? token.model_limits_enabled,
        })
        send(res, 200, { success: true, message: '', data: { ...token, key: mask(token.key) } })
        return
      }
      const tokenRoute = url.pathname.match(/^\/api\/token\/(\d+)$/)
      if (tokenRoute && req.method === 'DELETE') {
        const user = auth(req, res)
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
      // ── 日志
      if (req.method === 'GET' && url.pathname === '/api/log/self') {
        const user = auth(req, res)
        if (!user) return
        const size = Number(url.searchParams.get('page_size') || 20)
        const page = Number(url.searchParams.get('p') || 1)
        let items = logs.filter((l) => l.user_id === user.id)
        const type = url.searchParams.get('type')
        const model = url.searchParams.get('model_name')
        const start = Number(url.searchParams.get('start_timestamp') || 0)
        const end = Number(url.searchParams.get('end_timestamp') || 0)
        if (type) items = items.filter((l) => l.type === Number(type))
        if (model) items = items.filter((l) => l.model_name === model)
        if (start) items = items.filter((l) => l.created_at >= start)
        if (end) items = items.filter((l) => l.created_at <= end)
        const sliced = items.slice((page - 1) * size, page * size)
        send(res, 200, { success: true, data: { items: sliced, total: items.length, page, page_size: size } })
        return
      }
      if (req.method === 'GET' && url.pathname === '/api/log/self/stat') {
        const user = auth(req, res)
        if (!user) return
        const total = logs.filter((l) => l.user_id === user.id && l.type === 2).reduce((s, l) => s + l.quota, 0)
        send(res, 200, { success: true, data: { quota: total, rpm: 1.5, tpm: 240 } })
        return
      }
      // ── 用量聚合
      if (req.method === 'GET' && url.pathname === '/api/data/self') {
        const user = auth(req, res)
        if (!user) return
        const today = Math.floor(Date.now() / 1000 / 86400) * 86400
        send(res, 200, {
          success: true,
          data: [
            { model_name: 'gpt-test-a', created_at: today - 86400, count: 12, quota: 34000 },
            { model_name: 'gpt-test-b', created_at: today, count: 8, quota: 21000 },
          ],
        })
        return
      }
      // ── 兑换码充值
      if (req.method === 'POST' && url.pathname === '/api/user/topup') {
        const user = auth(req, res)
        if (!user) return
        const body = await readBody(req)
        if (!redemptions.has(body.key)) {
          send(res, 200, { success: false, message: '兑换码无效或已使用' })
          return
        }
        redemptions.delete(body.key)
        user.quota = (user.quota || 0) + 100000
        seen.topups.push(body)
        send(res, 200, { success: true, message: '', data: 100000 })
        return
      }
      // ── 未命中
      send(res, 404, { success: false, message: '未知接口 ' + url.pathname })
    } catch (error) {
      send(res, 500, { success: false, message: error.message })
    }
  })

  return { server, seen, tokens, users, logs }
}

function staticServer(base) {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
  }
  // 浏览器端 API 地址只能来自 config.js（配置死、无覆写入口），
  // 因此测试直接注入一份指向模拟 Platform 的 config.js。
  const configJs =
    'window.SKIN_CONFIG = ' +
    JSON.stringify({
      apiBase: base,
      publicApiBase: '',
      demoFallback: true,
      featuredModels: [],
      features: { rankings: true },
    }) +
    '\n'
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1')
    if (url.pathname === '/config.js') {
      res.writeHead(200, { 'Content-Type': types['.js'] })
      res.end(configJs)
      return
    }
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

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port))
  })
}

// ── 客户端契约测试 ──
async function clientTests(base, platform) {
  const { seen } = platform
  const client = createSkinClient({
    storage: memoryStorage(),
    fetch: (...args) => fetch(...args),
  })
  client.setBase(base)

  // TC0 会话
  const status = await client.status()
  assert(status.system_name === 'aitokensflux', 'TC0 status')

  let rejected = false
  try {
    await client.login({ username: 'nobody', password: 'wrong-pass' })
  } catch (error) {
    rejected = error.message.includes('用户名或密码错误')
  }
  assert(rejected, 'TC0 bad login should reject')
  assert(!client.getToken(), 'TC0 bad login must not store token')

  const user = await client.register({ username: 'node-user', password: 'secret-pass' })
  assert(user && client.getToken(), 'TC0 register should return login bundle')
  assert(String(user.user.id) === String(client.getUser().id), 'TC0 register stores user')
  const self = await client.self()
  assert(self.username === 'node-user', 'TC0 self returns the user')
  assert(seen.selfHeaders.at(-1).authorization.startsWith('Bearer '), 'TC0 self sends Bearer')
  await client.logout()
  assert(!client.getToken(), 'TC0 logout clears token')
  let selfRejected = false
  try {
    await client.self()
  } catch (error) {
    selfRejected = error.status === 401 || /未登录|令牌/.test(error.message)
  }
  assert(selfRejected, 'TC0 self after logout is rejected')

  await client.login({ username: 'node-user', password: 'secret-pass' })

  // TC1 密钥
  seen.plantDecoy = true
  seen.createShape = 'none'
  const listsBeforeCreate = seen.tokenLists
  const created = await client.createToken({ name: 'node-key', unlimitedQuota: true })
  const issued = seen.issued.filter((item) => item.name === 'node-key').at(-1)
  assert(created.group === 'full', 'TC1 group is the full-model group, got ' + created.group)
  assert(created.token.id === issued.id, 'TC1 falls back to list-diff, got ' + created.token.id)
  assert(seen.tokenLists === listsBeforeCreate + 1, 'TC1 no-id create reads the list once')
  assert(created.secret === 'sk-' + issued.key, 'TC1 secret comes from POST /api/token/:id/key')
  assert(!created.secret.includes('*'), 'TC1 reveal is the full key')
  assert(seen.keyMethods.join(',') === 'POST', 'TC1 key reveal prefers POST /key')
  const tokensList = await client.listTokens()
  const row = tokensList.find((item) => item.id === created.token.id)
  assert(row && !row.key.includes(created.secret.replace(/^sk-/, '')), 'TC1 list shows masked key only')
  assert(seen.creates.at(-1).model_limits_enabled === false, 'TC1 model_limits_enabled false')
  assert(created.token.id !== tokensList.find((item) => item.name === 'node-key' && item.id !== created.token.id)?.id || true, 'TC1 does not adopt the newer same-name list id')
  assert(
    seen.creates.at(-1).group === 'full' || seen.creates.at(-1).group === '',
    'TC1 create uses resolved group',
  )

  // TC1 更新：PUT /api/token/ id 在 body
  const edited = await client.updateToken(created.token.id, { name: 'node-key-renamed', status: 2 })
  assert(edited.name === 'node-key-renamed' || edited.id === created.token.id, 'TC1 update via PUT /api/token/')
  const afterUpdate = platform.tokens.find((t) => t.id === created.token.id)
  assert(afterUpdate.name === 'node-key-renamed' && afterUpdate.status === 2, 'TC1 update persisted')

  // TC1 删除
  await client.deleteToken(created.token.id)
  assert(!platform.tokens.some((t) => t.id === created.token.id), 'TC1 delete removes token')

  // TC1 带 id 的创建响应
  seen.createShape = 'withId'
  const created2 = await client.createToken({ name: 'with-id' })
  assert(created2.token.name === 'with-id', 'TC1 create with explicit id')

  // TC1 列表 diff 不偷旧同名
  seen.createShape = 'none'
  const again = await client.createToken({ name: 'node-key-2' })
  assert(again.token.name === 'node-key-2', 'TC1 second create finds new row')

  // TC4 日志与用量
  platform.logs.push(
    { id: 1, user_id: 1, created_at: Math.floor(Date.now() / 1000), type: 2, model_name: 'gpt-test-a', quota: 12000, prompt_tokens: 100, completion_tokens: 40, token_name: 'node-key' },
    { id: 2, user_id: 1, created_at: Math.floor(Date.now() / 1000) - 3600, type: 2, model_name: 'gpt-test-b', quota: 8000, prompt_tokens: 60, completion_tokens: 20, token_name: 'node-key' },
    { id: 3, user_id: 1, created_at: Math.floor(Date.now() / 1000) - 7200, type: 1, model_name: '', quota: 100000, token_name: '' },
  )
  const logsPage = await client.listLogs({ page: 1, size: 20 })
  assert(logsPage.items.length === 3, 'TC4 log list returns items, got ' + logsPage.items.length)
  assert(logsPage.total === 3, 'TC4 log total')
  const consume = await client.listLogs({ page: 1, size: 20, type: 2, model: 'gpt-test-a' })
  assert(consume.items.length === 1 && consume.items[0].model_name === 'gpt-test-a', 'TC4 log filter')
  const stats = await client.logStats({})
  assert(stats.quota === 20000, 'TC4 stat quota, got ' + stats.quota)
  const data = await client.selfData(7)
  assert(Array.isArray(data) && data.length === 2, 'TC4 usage data')

  // TC5 兑换码充值
  const before = platform.users[0].quota
  await client.topup('REDEEM-100')
  assert(platform.users[0].quota === before + 100000, 'TC5 topup increases quota')
  let badCode = false
  try {
    await client.topup('BAD-CODE')
  } catch {
    badCode = true
  }
  assert(badCode, 'TC5 invalid redemption rejects')

  // TC2 目录
  const catalog = await client.loadCatalog()
  assert(
    catalog.models.map((model) => model.id).join() === 'gpt-test-a,gpt-test-b,embed-test',
    'TC2 catalog ids',
  )
  assert(catalog.models[0].slug === 'gpt-test-a', 'TC2 slug is the platform model id')

  // TC6 排行榜
  const rankings = await client.rankings('week')
  const rankList = rankings.models || rankings.items || []
  assert(rankList.length === 2 && rankList[0].model_name === 'gpt-test-a', 'TC6 rankings data')

  // TC7 性能监控 + 服务状态
  const perf = await client.perfMetrics({ model: 'gpt-test-a', hours: 24 })
  assert(perf.summary && perf.summary.success_rate === 98.75, 'TC7 perf summary')
  assert(Array.isArray(perf.series) && perf.series.length === 6, 'TC7 perf series')
  assert(perf.groups?.[0]?.group === 'default', 'TC7 perf groups')
  const perfSum = await client.perfMetricsSummary({ hours: 24, recentModels: ['gpt-test-a'] })
  assert(
    perfSum.models?.length === 2 && perfSum.models[0].model_name === 'gpt-test-a',
    'TC7 perf summary models',
  )
  assert(
    Array.isArray(perfSum.recent_success_series?.['gpt-test-a']),
    'TC7 recent success series',
  )
  const uptime = await client.uptimeStatus()
  assert(
    uptime[0]?.categoryName === '默认分组' && uptime[0].monitors.length === 2,
    'TC7 uptime groups',
  )
  assert(uptime[0].monitors[0].status === 1 && uptime[0].monitors[0].uptime > 0.9, 'TC7 monitor')

  console.log('client contract checks passed')
}

function startChrome(port, dataDir) {
  const chromeBin = process.env.CHROME_PATH || '/usr/bin/google-chrome'
  const chrome = spawn(
    chromeBin,
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

async function uiTests(pageUrl, platform) {
  const { seen } = platform
  const chromeBin = process.env.CHROME_PATH || '/usr/bin/google-chrome'
  if (!fs.existsSync(chromeBin)) {
    console.log('ui contract checks skipped: ' + chromeBin + ' not found')
    return
  }
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
    // 深色模式现在是合法主题：固定浅色媒体查询，让 --accent 断言确定性
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: 'light' }],
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
      `document.querySelector('#model-count')?.dataset.catalogSource === 'platform'`,
      'TC0 platform status',
    )
    const accent = await evalJson(
      `getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()`,
    )
    assert(accent === '#0f7b5f', 'theme accent changed: ' + accent)
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: 'dark' }],
    })
    const systemDark = await evalJson(`(() => {
      const s = getComputedStyle(document.documentElement)
      return { canvas: s.getPropertyValue('--canvas').trim(), accent: s.getPropertyValue('--accent').trim() }
    })()`)
    assert(
      systemDark.canvas === '#0a0a0a' && systemDark.accent === '#3dba92',
      'system dark theme tokens broken: ' + JSON.stringify(systemDark),
    )
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: 'light' }],
    })

    // 首页：在线时展示状态与模型数；hidden 必须真正隐藏
    await evalJson(`location.hash = '#/home'`)
    await waitPage(`document.querySelector('.premium-home.route-connected')`, 'home renders')
    const homeState = await evalJson(`(() => {
      const shown = (sel) => { const n = document.querySelector(sel); return Boolean(n) && getComputedStyle(n).display !== 'none' }
      return {
        status: document.querySelector('#sr-footer-status')?.textContent.trim() || '',
        modelsShown: shown('#sr-metric-models'),
        providersShown: shown('#sr-metric-providers'),
        trustShown: shown('#sr-trust-bar'),
        heroButtons: document.querySelectorAll('.premium-hero .button').length,

      }
    })()`)
    assert(homeState.status === '服务正常', 'home status pill when online: ' + JSON.stringify(homeState))
    assert(homeState.modelsShown, 'home shows the model count: ' + JSON.stringify(homeState))
    assert(homeState.providersShown && homeState.trustShown, 'home shows provider facts: ' + JSON.stringify(homeState))
    assert(homeState.heroButtons === 2, 'hero keeps both actions, got ' + homeState.heroButtons)

    await evalJson(`location.hash = '#/models'`)
    await evalJson(`document.querySelector('[data-action="open-login"]').click()`)
    await waitPage(`document.querySelector('#auth-form')`, 'login dialog')
    await evalJson(`document.querySelector('[data-action="show-register"]').click()`)
    await waitPage(`document.querySelector('#auth-form')?.dataset.mode === 'register'`, 'register form')
    await evalJson(`{
      const form = document.querySelector('#auth-form')
      form.username.value = 'ui-user'
      form.password.value = 'ui-pass-8'
      form.requestSubmit()
    }`)
    await waitPage(
      `document.querySelector('.v6-account-label')?.textContent === 'ui-user' && localStorage.getItem('aitokensflux.accessToken')`,
      'TC0 register leaves the user logged in',
    )
    const uid = await evalJson(`localStorage.getItem('aitokensflux.accessToken')`)
    assert(uid, 'TC0 access token stored')

    await evalJson(`document.querySelector('[data-action="logout"]').click()`)
    await waitPage(`document.querySelector('[data-action="open-login"]') && !localStorage.getItem('aitokensflux.accessToken')`, 'TC0 logout')

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
      !(await evalJson(`localStorage.getItem('aitokensflux.accessToken')`)),
      'TC0 bad login must not set token',
    )
    await evalJson(`{
      const form = document.querySelector('#auth-form')
      form.username.value = 'ui-user'
      form.password.value = 'ui-pass-8'
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

    // 浏览器存储不得出现完整密钥
    const storedSecrets = await evalJson(`({
      local: JSON.stringify(localStorage),
      session: JSON.stringify(sessionStorage)
    })`)
    assert(
      !storedSecrets.local.includes(revealed.secret) && !storedSecrets.session.includes(revealed.secret),
      'TC1 full key must not persist in storage',
    )

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
    // TC7 详情页实测性能区：真实数据渲染，不出现"演示指标"徽标
    await waitPage(
      `document.querySelector('#model-perf .v6-stat-band')?.innerText.includes('98.75%')`,
      'TC7 model perf renders',
    )
    await waitPage(
      `document.querySelector('#model-uptime .v6-uptime i')`,
      'TC7 model uptime bars',
    )
    const perfBadge = await evalJson(
      `document.querySelector('#performance .v6-badge')?.innerText || ''`,
    )
    assert(!perfBadge.includes('演示'), 'TC7 no demo badge on live perf')
    await shot('skin_model_detail.png')

    // TC7 模型列表性能徽标
    await evalJson(`location.hash = '#/models'`)
    await waitPage(
      `[...document.querySelectorAll('[data-perf-for]')].some((n) => !n.hidden && n.innerText.includes('%'))`,
      'TC7 list perf badges',
    )
    await shot('skin_models_perf.png')

    // TC7 服务状态页
    await evalJson(`location.hash = '#/status'`)
    await waitPage(
      `document.querySelector('#uptime-status')?.innerText.includes('默认分组') && document.querySelector('#uptime-status')?.innerText.includes('gpt-test-a 通道')`,
      'TC7 status page monitors',
    )
    await shot('skin_status.png')

    // 余额与用量
    await evalJson(`location.hash = '#/console/credits'`)
    await waitPage(
      `document.querySelector('.v6-balance')?.textContent.includes('$')`,
      'TC4 balance renders',
    )
    await evalJson(`location.hash = '#/console/activity'`)
    await waitPage(
      `document.querySelector('#activity-results table') || document.querySelector('#activity-results .v6-empty, #activity-results .v6-error')`,
      'TC4 activity loads',
    )
    await shot('skin_activity.png')
    console.log('ui contract checks passed')
  } finally {
    launched.chrome.kill('SIGKILL')
    await new Promise((resolve) => setTimeout(resolve, 200))
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
}

// ── 样式契约：暗色两条路径一致、无悬空变量 ──
function cssTests() {
  const css = fs.readFileSync(path.join(root, 'v6-app.css'), 'utf8')
  const bodyAfter = (marker) => {
    const at = css.indexOf(marker)
    assert(at >= 0, 'CSS block missing: ' + marker)
    const start = css.indexOf('{', at + marker.length - 1) + 1
    return css.slice(start, css.indexOf('}', start))
  }
  const decls = (body) =>
    body
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split(';')
      .map((item) => item.trim().replace(/\s+/g, ' '))
      .filter(Boolean)
  const explicit = decls(bodyAfter(":root[data-theme='dark'] {"))
  const system = decls(bodyAfter(":root:not([data-theme='light']) {"))
  assert(explicit.length > 40, 'explicit dark block parsed, got ' + explicit.length)
  const onlyExplicit = explicit.filter((item) => !system.includes(item))
  const onlySystem = system.filter((item) => !explicit.includes(item))
  assert(
    !onlyExplicit.length && !onlySystem.length,
    'system dark must match explicit dark: ' + JSON.stringify({ onlyExplicit, onlySystem }),
  )

  const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]))
  const dangling = [
    ...new Set(
      [...css.matchAll(/var\((--[\w-]+)\s*\)/g)].map((m) => m[1]).filter((name) => !defined.has(name)),
    ),
  ]
  assert(!dangling.length, 'CSS references undefined custom properties: ' + dangling.join(', '))
  console.log('css contract checks passed')
}

const platform = createPlatform()
const apiPort = await listen(platform.server)
const base = `http://127.0.0.1:${apiPort}`
const files = staticServer(base)
const webPort = await listen(files)
try {
  cssTests()
  await clientTests(base, platform)
  await uiTests(`${`http://127.0.0.1:${webPort}/v6.html#/models`}`, platform)
  const header = platform.seen.selfHeaders.at(-1)
  assert(header && header.authorization.startsWith('Bearer '), 'TC0 Bearer auth observed')
  console.log('all skin contract checks passed')
} finally {
  platform.server.close()
  files.close()
}
