---
date: '2026-02-04'
timestamp: '2026-02-04T03:34:47.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7424656311126171648'
status: published
xUrl: 'https://x.com/Nil053/status/2018890952887394373'
tweetId: '2018890952887394373'
segments: 1
images: []
tags:
  - ai
---
Very common claude code experience:

It fixed a bug, but I suspected it was making a mess, so I asked it to justify its approach.

CC: "It's hacky. Here's why:

We added a prevGameIdRef, a pendingReconnectRef, two new effects, and isStale() guards on every handler — all to work around the fact that React doesn't know the game identity changed.

The clean solution: key={id} — one line."

This type of interaction is why I keep an eye on it. A few unchecked changes like that will rot your codebase.

In a recent post about Gas Town, Steve Yegge shared a stat: ~235k LoC touched in 16 days.

I wonder, how many of those lines are just claude code creating and cleaning up unnecessary messes?
