// 生产环境 config.js：只替换这一个文件。
window.SKIN_CONFIG = {
  apiBase: '',               // 同源部署；跨域则填 https://api.example.com
  publicApiBase: '',
  allowApiOverride: false,
  demoFallback: false,
  featuredModels: [],
  features: {
    rankings: false,
    files: false, guardrails: false, byok: false, routing: false,
    presets: false, tools: false, observability: false,
  },
}
