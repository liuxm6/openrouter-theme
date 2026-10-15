#!/bin/sh
# 发布：收集静态文件、为 js/css 引用注入版本号、放入对应环境 config.js
# 用法：scripts/release.sh <版本> [config.js 路径]
set -eu
cd "$(dirname "$0")/.."
VER="${1:?usage: release.sh <version> [config.js]}"
OUT="dist/$VER"
rm -rf "$OUT" && mkdir -p "$OUT"
cp index.html v6.html v6-app.js v6-app.css skin-api.js "$OUT/"
cp "${2:-deploy/config.prod.js}" "$OUT/config.js"
for f in "$OUT"/*.html; do
  sed -i '' "s|v6-app\.css|v6-app.css?v=$VER|g; s|skin-api\.js|skin-api.js?v=$VER|g; s|v6-app\.js|v6-app.js?v=$VER|g" "$f" 2>/dev/null \
  || sed -i "s|v6-app\.css|v6-app.css?v=$VER|g; s|skin-api\.js|skin-api.js?v=$VER|g; s|v6-app\.js|v6-app.js?v=$VER|g" "$f"
done
echo "release -> $OUT"
ls -la "$OUT"
