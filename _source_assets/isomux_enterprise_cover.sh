#!/bin/sh
# Renders the cover for the "Isomux for Enterprise" blog post.
# Run from the repo root: sh _source_assets/isomux_enterprise_cover.sh
set -e
mkdir -p public/blog/isomux-enterprise
google-chrome --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 \
  --virtual-time-budget=4000 \
  --screenshot=public/blog/isomux-enterprise/cover.png \
  "file://$(pwd)/_source_assets/isomux_enterprise_cover.html" 2>/dev/null
echo "wrote public/blog/isomux-enterprise/cover.png"
