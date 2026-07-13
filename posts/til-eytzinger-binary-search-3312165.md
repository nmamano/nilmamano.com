---
date: '2025-08-02'
timestamp: '2025-08-02T19:17:45.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7357489679992049665'
status: published
xUrl: 'https://x.com/Nil053/status/1951724115213312165'
tweetId: '1951724115213312165'
segments: 2
images:
  - >-
    /posts/til-eytzinger-binary-search-3312165/1951724115213312165-GxXqttvaEAAVL1Q.png
tags:
  - interview-prep
  - research
---
TIL: Eytzinger Binary Search

If you look at the access pattern of binary search on an array, you'll see a lot of big jumps. If the array has a thousand elements, we'll first go to index 500, then we may go to index 250, then 375, and so on.

You know what big jumps are NOT good for? Cache memory.

The solution is to put all the elements frequently accessed by binary search, such as the 500th, 250th, and 750th elements, all at the beginning of the array.

This way, you only need a few cache lines for the first few iterations of every binary search.

Details: https://lnkd.in/gjA5tE9U

---

Can we eytzingerify any other algorithms?

The playbook:

1. Take an algorithm with jumpy but non-uniform memory access patterns.
2. Rearrange the memory to order elements from most accessed to least.
3. Work out how to do implement the original algorithm on the remapped memory.
