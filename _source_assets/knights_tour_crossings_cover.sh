#!/bin/sh
# Renders the cover (OG image) for the knight's tour crossings post.
# The tour SVG comes from _source_assets/knights_tour_crossings_cover_tour.py (bottom-left 30 x 30 cells of the 96 x 96 fold tour).
# Run from the repo root: sh _source_assets/knights_tour_crossings_cover.sh
set -e
google-chrome --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 \
  --virtual-time-budget=4000 \
  --screenshot=public/blog/knights-tour-crossings/cover.png \
  "file://$(pwd)/_source_assets/knights_tour_crossings_cover.html" 2>/dev/null
echo "wrote public/blog/knights-tour-crossings/cover.png"
