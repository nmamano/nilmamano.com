---
date: '2025-10-18'
timestamp: '2025-10-18T04:31:20.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7385171189171810304'
status: published
xUrl: 'https://x.com/Nil053/status/1979404909545165155'
tweetId: '1979404909545165155'
segments: 2
images:
  - >-
    /posts/how-to-build-a-city-with-1588-5165155/1979404909545165155-G3hB9MWWUAAwUqh.png
tags:
  - interview-prep
---
How to build a city with 1588 houses such that all houses are at the same walking distance from the city center (63 steps).

Yellow = house, gray = wall.

---

This grid is actually the worst-case input for the space complexity of BFS, assuming gray cells are 'walls'. All the yellow nodes end up in the BFS queue at the same time, since they are at the same distance.
