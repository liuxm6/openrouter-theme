// OAuth 回调页：provider 授权后跳转到 {origin}/oauth/<provider>?code&state
// 这里调 GET /api/oauth/<provider> 完成登录，保存 access_token 后回应用首页。
;(async () => {
  const card = document.getElementById('card')
  const title = document.getElementById('t')
  const msg = document.getElementById('m')
  // 错误文案可能来自 Platform 响应，只能按纯文本写入
  const fail = (text) => {
    card.classList.add('failed')
    title.textContent = '登录失败'
    msg.textContent = text
    msg.className = 'err'
  }
  try {
    if (!window.SkinAPI) throw new Error('页面资源加载失败，请刷新重试')
    const parts = location.pathname.split('/').filter(Boolean)
    const provider = parts[1] || parts[0] || ''
    const params = new URLSearchParams(location.search)
    const state = params.get('state') || ''
    const code = params.get('code') || ''
    if (!provider || !state || (!code && !params.get('access_token'))) {
      throw new Error('回调参数不完整（缺少 state 或 code）')
    }
    const base = SkinAPI.getBase() || location.origin
    const url = new URL(base + '/api/oauth/' + encodeURIComponent(provider))
    url.searchParams.set('state', state)
    if (code) url.searchParams.set('code', code)
    const res = await fetch(url, { credentials: 'include', headers: { Accept: 'application/json' } })
    const payload = await res.json().catch(() => null)
    const data = payload && (payload.data !== undefined ? payload.data : payload)
    if (!res.ok || (payload && payload.success === false) || !(data && data.access_token)) {
      throw new Error(
        (payload && (payload.message || (payload.error && payload.error.message))) || 'Platform 未返回登录凭据',
      )
    }
    SkinAPI.saveAuth(data)
    location.replace('/v6.html#/console')
  } catch (error) {
    fail(error.message || '回调处理失败')
  }
})()
