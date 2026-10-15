# aitokensflux Skin

OpenRouter 风格的浅色绿色界面。它是独立的 Skin，只通过 HTTP 调用 Ai Tokens Flux / new-api Platform，不嵌入 Platform。

## 把 Skin 指向 Platform

1. 启动 Platform，默认地址是 `http://localhost:3000`。
2. 用任意静态服务器打开本目录，例如：

   ```bash
   python3 -m http.server 8080
   ```

3. 打开 `http://localhost:8080/v6.html?api=http://localhost:3000`。

   也可以在页头「连接 Platform」或「偏好」里保存 API Base URL。地址记在 `localStorage` 的 `aitokensflux.apiBase`。未设置时默认 `http://localhost:3000`。

4. 注册或登录后，用户 id 写入 `localStorage.uid`。之后所有 `/api` 请求都会：

   - 使用 `credentials: 'include'`，带上 Cookie 会话
   - 带上请求头 `New-API-User: <uid>`

聊天请求走 `POST {API Base}/v1/chat/completions`，使用 `Authorization: Bearer sk-...`，不依赖登录 Cookie。

## CORS

Skin 和 Platform 往往不在同一个源（例如 Skin 在 `:8080`，Platform 在 `:3000`）。Platform 需要：

- `Access-Control-Allow-Origin` 设为 Skin 的具体来源，不能是 `*`
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Headers` 包含 `Content-Type`、`New-API-User`、`X-Turnstile-Token`、`Authorization`
- 允许 `GET`、`POST`、`PUT`、`DELETE`、`OPTIONS`

同一站点的不同端口（都是 `http://localhost`）一般可以用 `SameSite=Lax` 的会话 Cookie。跨站点时 Cookie 需要 `SameSite=None; Secure`。

若开启了 Turnstile，登录和注册会发送可选请求头 `X-Turnstile-Token`。

## 使用的接口

- 会话：`GET /api/status`，`POST /api/user/register`，`POST /api/user/login`，`GET /api/user/self`，`GET /api/user/logout`
- 密钥：`GET/POST /api/token/`，`PUT/DELETE /api/token/:id`，`POST /api/token/:id/key`（仅当 POST 返回 404/405 时再 GET）
- 创建密钥时 `model_limits_enabled` 为 `false`，`group` 为覆盖模型最多的全模型分组。创建响应里若带有令牌 id（或其它字段）则直接采用；响应没有 id 时，才用列表对照找出新建项。一次性完整 `sk-` 密钥优先通过 `POST /api/token/:id/key` 读取。
- 目录：`GET /api/user/models` 与 `GET /api/pricing/public`。Platform 不可达时回退到内置演示目录
- 对话：`POST /v1/chat/completions`，支持 `stream: true` 和 `stream: false`

完整密钥只在创建成功时展示一次，并可以复制。列表里之后只显示掩码。当前标签页会记住这把密钥，供聊天切换模型时复用。
