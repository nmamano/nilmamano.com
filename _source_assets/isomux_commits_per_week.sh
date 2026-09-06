#!/bin/sh
# Rasterizes the commit charts. Run from the repo root:
#   node _source_assets/isomux_commits_per_week.mjs && sh _source_assets/isomux_commits_per_week.sh
set -e
for v in week month; do
  cat > "/tmp/wrap-$v.html" <<HTML
<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}body{background:#fff}
img{display:block;width:1800px;height:512px}</style></head><body>
<img src="file://$(pwd)/_source_assets/out/commits-per-$v.svg"></body></html>
HTML
  google-chrome --headless --disable-gpu --hide-scrollbars \
    --window-size=1800,512 --force-device-scale-factor=2 \
    --virtual-time-budget=4000 \
    --screenshot="_source_assets/out/commits-per-$v.png" \
    "file:///tmp/wrap-$v.html" 2>/dev/null
  echo "wrote _source_assets/out/commits-per-$v.png"
done
