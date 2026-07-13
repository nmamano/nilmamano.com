---
date: '2025-08-16'
timestamp: '2025-08-16T22:02:26.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/1956838989870006686'
tweetId: '1956838989870006686'
segments: 4
images: []
tags:
  - research
---
One time, I published a greedy algorithm for Euclidean TSP that runs in O(n log n) time "for any fixed dimension".

The dependency on the dimension was so bad I didn't even try to calculate it. I wouldn't be surprised if it was d^1000.

---

https://arxiv.org/pdf/1902.06875

---

If you're curious how it's even possible to design an algorithm with insane terms:

It uses an (1+epsilon)-approximate nearest neighbor data structure that takes O(d * log n * (1 +6d/epsilon)^d) time (it could be faster to be fair, that's just the bound they proved in their paper), which is just O(log n) for any fixed dimension and epsilon! For my algorithm, I needed a very small epsilon... 0.0492 for d=2, and it gets exponentially smaller as d grows, but still constant for any d (we didn't bother calculating it, we just showed it's constant, but it depends on the kissing number of the dimension, which I believe is exponential).

So, for d=2, the constant factor on that O(log n) is already ~120,000, and it just gets so much worse from there.

---

Hence the term: https://en.m.wikipedia.org/wiki/Galactic_algorithm
