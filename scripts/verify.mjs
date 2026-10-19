// 联调冒烟：node scripts/verify.mjs [base]，默认 http://localhost:8088
// 依次验证 status → 注册 → 登录 → self → 创建密钥 → 读明文 → 目录 → 日志 → 兑换码 → 删除密钥 → 登出
const base = (process.argv[2] || 'http://localhost:8088').replace(/\/+$/, '')
let client
const { createSkinClient } = await import('../skin-api.js')
const storage = new Map()
client = createSkinClient({
  storage: { getItem: (k) => (storage.has(k) ? storage.get(k) : null), setItem: (k, v) => storage.set(k, String(v)), removeItem: (k) => storage.delete(k) },
})
client.setBase(base)

const ok = (name, cond, extra = '') => {
  console.log(`${cond ? '✓' : '✗'} ${name}${extra ? '　' + extra : ''}`)
  if (!cond) process.exitCode = 1
  return cond
}
const suffix = Math.floor(Math.random() * 1e6)
const user = { username: 'skin-verify-' + suffix, password: 'Verify!234' }

try {
  const status = await client.status()
  ok('GET /api/status', status && status.system_name !== undefined, status.system_name)
} catch (e) {
  console.log('✗ GET /api/status', e.message)
  process.exit(1)
}

let bundle = await client.register(user).catch((e) => {
  console.log('✗ register', e.message)
  return null
})
ok('register 返回登录 bundle', Boolean(bundle && bundle.access_token))

const self = await client.self().catch(() => null)
ok('GET /api/user/self', self && self.username === user.username, self?.username)

const created = await client
  .createToken({ name: 'verify-key', unlimitedQuota: true })
  .catch((e) => { console.log('✗ createToken', e.message); return null })
ok('POST /api/token/ + POST /:id/key', Boolean(created && created.secret.startsWith('sk-')), created?.token?.group)
const list = await client.listTokens()
ok('密钥列表仅掩码', list.every((t) => !String(t.key).includes(created?.secret.slice(3) || '≠')))

const catalog = await client.loadCatalog().catch(() => null)
ok('GET /api/user/models + /api/pricing', Boolean(catalog && catalog.models.length), `${catalog?.models?.length ?? 0} 个模型`)

const stat = await client.logStats({}).catch(() => null)
ok('GET /api/log/self/stat', stat !== null, stat ? `quota=${stat.quota}` : '')

const logs = await client.listLogs({ page: 1, size: 5 }).catch(() => null)
ok('GET /api/log/self', logs !== null && Array.isArray(logs.items), logs ? `${logs.total} 条` : '')

const data = await client.selfData(7).catch(() => null)
ok('GET /api/data/self', data !== null && Array.isArray(data))

const rankings = await client.rankings('week').catch(() => null)
ok('GET /api/rankings', rankings !== null, rankings?.models?.length + ' 条' || '空')

if (created) {
  await client.updateToken(created.token.id, { name: 'verify-key-off', status: 2, status_only: true })
  const after = await client.listTokens()
  ok('PUT /api/token/ status_only', after.find((t) => t.id === created.token.id)?.status === 2)
  await client.deleteToken(created.token.id)
  ok('DELETE /api/token/:id', !(await client.listTokens()).some((t) => t.id === created.token.id))
}

await client.logout()
ok('POST /api/user/auth/logout', !client.getToken())

console.log(process.exitCode ? '\n有失败项' : '\n全部通过')
