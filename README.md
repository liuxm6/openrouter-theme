# aitokensflux Skin

OpenRouter 风格的浅色绿色界面。它是独立的 Skin，只通过 HTTP 调用 Ai Tokens Flux / new-api Platform，不嵌入 Platform。

## 部署配置（config.js）

`config.js` 在 `skin-api.js` 之前加载，各环境只替换这一个文件，应用代码不变：

```js
window.SKIN_CONFIG = {
  apiBase: '',               // '' = 与页面同源；跨域部署时填 Platform 地址
  publicApiBase: '',         // 调用示例中展示的地址，空则与 apiBase 相同
  allowApiOverride: false,   // 是否允许 ?api= 参数与页面内修改 API 地址（仅开发环境开启）
  demoFallback: false,       // Platform 不可达时是否回退演示目录（生产关闭）
  featuredModels: [],        // 首页 / 发现页的精选模型 id，目录中没有的自动跳过
  features: {                // 未接入真实数据的模块默认隐藏
    rankings: false,
    files: false, guardrails: false, byok: false, routing: false,
    presets: false, tools: false, observability: false,
  },
}
```

生产环境配置示例见 `deploy/config.prod.js`；Nginx 同源部署示例见 `deploy/nginx.conf`。

## 认证与鉴权（对齐 new-api 最新合同）

- `POST /api/user/login` → `{data: {access_token, token_type, access_expires_at, session, user}}`；登录成功后，后续 `/api` 请求统一携带 `Authorization: Bearer <access_token>`。
- Refresh 使用 HttpOnly Cookie `new_api_refresh`（Path=`/api/user/auth`，SameSite=Strict）。任一接口返回 401 时，Skin 先调用 `POST /api/user/auth/refresh` 换新 token 并重试一次，仍失败则清除本地凭证并引导重新登录。
- 登出：`POST /api/user/auth/logout`，并清除本地保存的 access_token。
- 可能返回登录挑战（二次验证、passkey 等，无 `access_token`）：Skin 会提示改用 Platform 自带页面完成验证。
- 密码加密（可选开启）：`GET /api/user/login/encryption-key` 返回 `{enabled, kid, public_key}`，开启时登录发送 `password_encrypted`（RSA-OAEP/SHA-256）与 `encryption_key_id`。

## 人机验证与人机流程

- Turnstile 通过 **查询参数** `?turnstile=<token>` 传递（`POST /api/user/login`、`/register`、`GET /api/verification`、`GET /api/reset_password`）。
- `GET /api/status` 返回 `turnstile_check` 与 `turnstile_site_key` 时，Skin 会加载 Cloudflare Turnstile 组件（`challenges.cloudflare.com`，需在 CSP 的 `script-src`、`frame-src` 放行）。
- 邮箱验证码：`GET /api/verification?email=&purpose=`；找回密码：`GET /api/reset_password?email=` + `POST /api/user/reset`。

## 使用的接口

- 会话：`GET /api/status`，`POST /api/user/register`，`POST /api/user/login`，`POST /api/user/auth/refresh`，`POST /api/user/auth/logout`，`GET /api/user/self`
- 密钥：`GET /api/token/?p=&page_size=`，`POST /api/token/`（响应不含 id，通过列表差分定位新令牌），`PUT /api/token/`（id 在请求体，`?status_only=true` 只改启停），`DELETE /api/token/:id`，`POST /api/token/:id/key`（读取完整 sk- 密钥）
- 目录：`GET /api/user/models`（需登录）与 `GET /api/pricing`（返回 `data`、`group_ratio`、`usable_group`）
- 日志与用量：`GET /api/log/self`（分页、按类型/模型/时间筛选），`GET /api/log/self/stat`，`GET /api/data/self`
- 充值：`POST /api/user/topup`（兑换码，`{key}`）
- 排行与指标：`GET /api/rankings?period=`，`GET /api/perf-metrics`
- 其他：`GET /api/verification`，`GET /api/reset_password`，`POST /api/user/reset`，`PUT /api/user/setting`

完整密钥只在创建成功时展示一次，并可以复制；列表里之后只显示掩码。**密钥明文不落盘**：新建密钥的完整 sk- 仅保存在内存，弹窗关闭即丢弃。

## 本地开发

```bash
# 1. 启动 Platform（默认 http://localhost:3000）
# 2. 静态服务
python3 -m http.server 8080
# 3. 打开页面（config.js 中 allowApiOverride 开启时可用 ?api= 指定）
open "http://localhost:8080/v6.html?api=http://localhost:3000"
```

## CORS（跨域部署时）

Skin 和 Platform 不在同一个源时，Platform 需要：

- `Access-Control-Allow-Origin` 设为 Skin 的具体来源，不能是 `*`
- `Access-Control-Allow-Credentials: true`（refresh Cookie 需要）
- `Access-Control-Allow-Headers` 包含 `Content-Type`、`Authorization`
- 允许 `GET`、`POST`、`PUT`、`DELETE`、`OPTIONS`

会话 Cookie `new_api_refresh` 为 `SameSite=Strict; Secure; HttpOnly`；跨站部署时第三方 Cookie 可能被浏览器拦截，推荐同源反向代理（`deploy/nginx.conf`）。

## 发布与测试

- 发布：`scripts/release.sh <版本号> [config.js 路径]`，输出 `dist/<版本>/`（静态文件 + 版本号资源引用 + 对应环境 config.js）。
- 契约测试：`node scripts/skin-contract-test.mjs` 或 `npm test`（Node.js ≥ 22；内置按真实接口实现的模拟 Platform）。界面测试需要 Chrome，路径可用 `CHROME_PATH` 环境变量覆盖；未安装时自动跳过。
- `SKIN_SHOTS=<目录>` 可同时保存界面测试截图。
