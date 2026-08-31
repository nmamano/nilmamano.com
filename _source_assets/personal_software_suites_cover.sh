#!/bin/sh
# Renders the cover for the "Personal Software Suites" blog post.
# Run from the repo root: sh _source_assets/personal_software_suites_cover.sh
set -e
mkdir -p public/blog/personal-software-suites
google-chrome --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 \
  --virtual-time-budget=4000 \
  --screenshot=public/blog/personal-software-suites/cover.png \
  "file://$(pwd)/_source_assets/personal_software_suites_cover.html" 2>/dev/null
echo "wrote public/blog/personal-software-suites/cover.png"
