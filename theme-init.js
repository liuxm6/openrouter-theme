// 首帧前应用已保存的主题，避免深色用户刷新时先闪一下浅色页。
// 必须是外链脚本：生产 CSP 为 script-src 'self'，内联脚本会被拦截。
;(function () {
  try {
    var saved = JSON.parse(localStorage.getItem('aitokensflux-ui-v1') || '{}')
    var theme = saved.settings && saved.settings.theme
    if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme
  } catch (e) {
    /* storage may be disabled */
  }
})()
