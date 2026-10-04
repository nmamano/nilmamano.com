#!/bin/sh
# Renders the cover (OG image) for the knight's tour turns post.
# The tour SVG is the bottom-left 22 x 22 cells of a real 48 x 48 tour from the post (gen_TT16 in ~/nil/knight-formation-research).
# Run from the repo root: sh _source_assets/knights_tour_turns_cover.sh
set -e
google-chrome --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 \
  --virtual-time-budget=4000 \
  --screenshot=public/blog/knights-tour-turns/cover.png \
  "file://$(pwd)/_source_assets/knights_tour_turns_cover.html" 2>/dev/null
echo "wrote public/blog/knights-tour-turns/cover.png"
