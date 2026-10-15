// aitokensflux Skin 部署配置 —— 在 skin-api.js 之前加载。
// 各环境只替换这一个文件，应用代码不变。
// 生产环境示例见 deploy/config.prod.js。
window.SKIN_CONFIG = {
  apiBase: '',               // '' = 与页面同源；跨域部署时填 Platform 地址
  publicApiBase: '',         // 调用示例中展示的地址；空则与 apiBase 相同
  allowApiOverride: true,    // 开发用：允许 ?api= 参数与页面内修改 API 地址
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
