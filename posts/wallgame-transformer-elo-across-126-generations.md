---
date: '2026-08-23'
timestamp: '2026-08-24T01:25:19.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7497463698966511616'
status: published
xUrl: 'https://x.com/Nil053/status/2091698332850851942'
tweetId: '2091698332850851942'
segments: 2
images:
  - >-
    /posts/wallgame-transformer-elo-across-126-generations/policy-elo-126-generations.png
tags:
  - ai
  - research
---
Training models is fun when it works, lol

This plot tracks Elo across 126 self-play generations of the wallgame.io transformer, evaluated on 10 game modes (different rule set/board size/starting configuration combinations).

The cool part is that a single model became superhuman at all of them. I started training it on the easiest modes and, over time, mixed in harder ones. E.g., the jump at generation 96 is the animal cycle variant entering the mix.

Expanding the scope slowly didn't cause regression on earlier modes. Some kept improving even as they saw fewer and fewer games.

---

I had not even invented the animal cycle variant when I started training! The transformer architecture is general enough to support new variants with new rulesets, within some limits.
