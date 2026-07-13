---
date: '2024-11-28'
timestamp: '2024-11-28T09:28:56.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/1862066133521879472'
tweetId: '1862066133521879472'
segments: 2
images: []
tags:
  - research
  - interview-prep
---
In the classic house robber problem, you are given an array of numbers and you have to choose a subset with maximum sum subject to not picking adjacent numbers. The classic solution uses DP.

Consider now a version where, for each number, you can pick a fraction of it, ...

---

but the fraction you take from two consecutive numbers cannot exceed 100%. So, if you take 60% from a number, you can only take 40% from adjacent ones.

Is there an intuitive explanation for why there's always an optimal solution that only uses 100% or 0% for each number?
