---
date: '2026-01-03'
timestamp: '2026-01-03T22:25:45.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7413344758909136899'
status: published
xUrl: 'https://x.com/Nil053/status/2007579159623856471'
tweetId: '2007579159623856471'
segments: 2
images:
  - >-
    /posts/most-relevant-graph-algorithms-for-coding-interviews-3856471/2007579159623856471-G9xaknFasAAQgmL.png
tags:
  - job-search
---
Most relevant graph algorithms for coding interviews.

---

Actually, an issue with this table:

Lazy Dijkstra takes O(V + E log E) time and O(V + E) space, while normal Dijkstra takes O(E log V) time and O(V) space.

The table shows the time for one and the space for the other.

Lazy dijkstra is the go-to version for interviews due to the lack of decrease-priority operation in most standard library heap implementations.

The same issue applies to Prim's algorithm for MST. It also has a lazy version with the same analysis.

The other classic MST algorithm, Kruskal, also takes O(V + E) space.

Also, to clarify, the space analysis in the table does not include constructing the adjacency list, which takes O(V + E) space.
