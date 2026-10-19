// aitokensflux Skin 部署配置 —— 在 skin-api.js 之前加载。
// 各环境只替换这一个文件，应用代码不变。
// 生产环境示例见 deploy/config.prod.js。
// API 地址只在这里配置，前端页面不提供任何查看或修改入口。
window.SKIN_CONFIG = {
  apiBase: '',               // '' = 与页面同源；本地开发用 `node scripts/dev-serve.mjs` 起同源代理，跨域部署才填 Platform 地址
  publicApiBase: '',         // 调用示例中展示的地址；空则与 apiBase 相同
  demoFallback: true,        // Platform 不可达时回退演示目录
  featuredModels: [],        // 首页/发现页精选模型 id；目录中没有的自动跳过
  features: {                // 未接入真实数据的模块默认隐藏
    rankings: true,
    files: false,
    guardrails: false,
    byok: false,
    routing: false,
    presets: false,
    tools: false,
    observability: false,
  },
}
