#!/bin/sh
# Renders the cover for the "Isomux for Enterprise 2" blog post.
# Run from the repo root: sh _source_assets/isomux_enterprise_cover.sh
set -e
mkdir -p public/blog/isomux-crews
google-chrome --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 \
  --virtual-time-budget=4000 \
  --screenshot=public/blog/isomux-crews/cover.png \
  "file://$(pwd)/_source_assets/isomux_crews_cover.html" 2>/dev/null
echo "wrote public/blog/isomux-crews/cover.png"
