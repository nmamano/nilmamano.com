#!/bin/sh
# Renders the cover for the "Academia 2.0" blog post.
# The chart is a real dark-mode capture of bigospeedrun.com
# (_source_assets/big_o_speedrun_cover_chart_capture.mjs).
# Run from the repo root: sh _source_assets/big_o_speedrun_cover.sh
set -e
mkdir -p public/blog/big-o-speedrun
google-chrome --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 \
  --virtual-time-budget=4000 \
  --screenshot=public/blog/big-o-speedrun/cover.png \
  "file://$(pwd)/_source_assets/big_o_speedrun_cover.html" 2>/dev/null
echo "wrote public/blog/big-o-speedrun/cover.png"
