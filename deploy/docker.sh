#!/bin/sh
# 构建发布包并启动 Docker 部署。
# 用法：
#   sh deploy/docker.sh [版本号] [--no-up]
#   NEW_API_SRC=/path/to/new-api sh deploy/docker.sh   # 用本地 new-api 源码构建
set -eu
cd "$(dirname "$0")/.."
VER="${1:-$(node -e "process.stdout.write(require('./package.json').version)" 2>/dev/null || echo dev)}"

# 1. 生成发布包（dist/current 供 nginx 挂载）
# 清空目录内容而不删目录本身：目录被 bind mount 后 rm -rf 重建会让容器挂到已删除的 inode 上
OUT="dist/current"
mkdir -p "$OUT" && find "$OUT" -mindepth 1 -delete
cp index.html v6.html v6-app.js v6-app.css skin-api.js theme-init.js oauth-callback.html oauth-callback.js "$OUT/"
cp -R fonts "$OUT/"
cp deploy/config.prod.js "$OUT/config.js"
for f in "$OUT"/*.html; do
  sed -i '' "s|v6-app\.css|v6-app.css?v=$VER|g; s|skin-api\.js|skin-api.js?v=$VER|g; s|v6-app\.js|v6-app.js?v=$VER|g; s|theme-init\.js|theme-init.js?v=$VER|g; s|oauth-callback\.js|oauth-callback.js?v=$VER|g" "$f" 2>/dev/null \
    || sed -i "s|v6-app\.css|v6-app.css?v=$VER|g; s|skin-api\.js|skin-api.js?v=$VER|g; s|v6-app\.js|v6-app.js?v=$VER|g; s|theme-init\.js|theme-init.js?v=$VER|g; s|oauth-callback\.js|oauth-callback.js?v=$VER|g" "$f"
done
echo "dist -> $OUT"

# 2. compose up：提供 NEW_API_SRC 时才走本地构建
case "${2:-}" in --no-up) exit 0 ;; esac
if [ -n "${NEW_API_SRC:-}" ]; then
  docker compose -f deploy/docker-compose.yml up -d --build
else
  docker compose -f deploy/docker-compose.yml up -d
fi
echo
echo "Skin:     http://localhost:${SKIN_PORT:-8088}"
echo "Platform: http://localhost:${SKIN_PORT:-8088}/api/status"
echo "联调验证： node scripts/verify.mjs http://localhost:${SKIN_PORT:-8088}"
