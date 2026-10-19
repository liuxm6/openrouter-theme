#!/usr/bin/env node
// 本地开发服务：静态文件 + /api 同源代理。
// 页面与 API 同源（对齐生产部署形态），规避浏览器跨域限制；
// 代理目标用 API_TARGET 环境变量指定（默认 http://localhost:3000），端口用 PORT（默认 8088）。
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const TARGET = (process.env.API_TARGET || 'http://localhost:3000').replace(/\/+$/, '')
const PORT = Number(process.env.PORT || 8088)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`)
  const isApi =
    url.pathname === '/api' ||
    url.pathname.startsWith('/api/') ||
    url.pathname === '/v1' ||
    url.pathname.startsWith('/v1/')
  if (isApi) {
    // 同源代理：原样转发（含 Authorization / Cookie），透传响应
    const target = new URL(TARGET)
    const upstream = http.request(
      {
        hostname: target.hostname,
        port: target.port || (target.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: req.method,
        headers: { ...req.headers, host: target.host },
      },
      (reply) => {
        res.writeHead(reply.statusCode || 502, reply.headers)
        reply.pipe(res)
      },
    )
    upstream.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('proxy error: ' + TARGET + ' 不可达')
    })
    req.pipe(upstream)
    return
  }
  // 静态文件；/ 直接落到 v6.html，/oauth/<provider> 落到回调页（对齐 nginx 配置）
  const page = url.pathname === '/' ? '/v6.html' : url.pathname.startsWith('/oauth/') ? '/oauth-callback.html' : url.pathname
  const file = path.normalize(path.join(root, decodeURIComponent(page)))
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404)
    res.end('not found')
    return
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`dev-serve: http://127.0.0.1:${PORT}/v6.html`)
  console.log(`proxying /api and /v1 → ${TARGET}`)
})
