---
date: '2025-05-19'
timestamp: '2025-05-19T19:24:34.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7330312581645062146'
status: published
xUrl: 'https://x.com/Nil053/status/1924546741002764431'
tweetId: '1924546741002764431'
segments: 1
images: []
tags:
  - research
---
Given a connected, undirected graph and two nodes, s and t, here's a linear-time algorithm to find every edge that, if removed, disconnects s and t:

1. Find all the bridges with Tarjan's algorithm.
2. Find a path from s to t.
3. Return all the edges in the path that are also bridges.

The curious part is that you can choose *any* path from s to t. You can use DFS, BFS, it doesn't matter:
- By definition, only bridges can disconnect two nodes.
- If a bridge's removal disconnects s and t, there is no alternative path around it, so all s-t paths must go through it.
