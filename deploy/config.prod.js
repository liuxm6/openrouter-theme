// 生产环境 config.js：只替换这一个文件。
// API 地址只在本文件配置，前端页面不提供任何查看或修改入口。
window.SKIN_CONFIG = {
  apiBase: '',               // 同源部署；跨域则填 https://api.example.com
  publicApiBase: '',
  demoFallback: false,
  featuredModels: [],
  features: {
    rankings: false,
    files: false, guardrails: false, byok: false, routing: false,
    presets: false, tools: false, observability: false,
  },
}
