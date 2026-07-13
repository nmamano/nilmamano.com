---
date: '2025-07-03'
timestamp: '2025-07-03T07:23:31.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7346438425513771009'
segments: 1
images:
  - >-
    /posts/kahns-peel-off-algorithm-to-find-a-topological-li52/095-feed-photo.jpg
tags:
  - research
---
Kahn's peel-off algorithm to find a topological order.

Possibly one of my favorites, due to its simplicity.

If you just recall the visual of peeling nodes without incoming edges off the graph, the implementation follows naturally.

The data structures that we need are exactly what you'd expect:
1. Since we need to peel off nodes without incoming edges, we need a list to store such nodes.
2. Since we need to update the in-degree of nodes, we need a map from nodes to their in-degrees.

Bonus: Detecting cycles is also easy. There's one if we can't peel off all the nodes.
