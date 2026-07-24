---
date: '2025-04-17'
timestamp: '2025-04-17T21:03:19.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7318741896762179585'
status: published
xUrl: 'https://x.com/Nil053/status/1912975182970716160'
tweetId: '1912975182970716160'
segments: 2
images:
  - >-
    /posts/we-usually-analyze-the-space-of-bfs-0716160/1912975182970716160-GoxAi9mWwAAaOwx.png
tags:
  - research
  - job-search
---
We usually analyze the space of BFS on a graph with n nodes as O(n). But if we are just looking for the distance to a given node, it can easily be optimized to O(max BFS tree level size).

BFS visits nodes in distance layers. Once you have completely visited a layer, you'll never encounter nodes from the previous layer again. Thus, you can remove those nodes from your visited set, even though we usually don't.

For example, if you do BFS in a nxn grid, you can optimize the space to O(n) instead of O(n^2), while keeping the runtime O(n^2).

This is analogous to the "rolling table" optimization for DP tabulation.

Follow-up question: is there a cleaner way to express O(max BFS tree level size)?

---

Image from https://users.cecs.anu.edu.au/~Alistair.Rendell/Teaching/apac_comp3600/module4/tutorial.xhtml
