---
date: '2024-12-12'
timestamp: '2024-12-12T19:28:41.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/1867290494361120984'
tweetId: '1867290494361120984'
segments: 5
images: []
tags:
  - research
---
So I have this problem, and "it feels like" Greedy shouldn't work, but for the life of me, I can't find a counterexample.

Problem: you are given an nxn grid of positive integers. You have to pick n numbers from it, without any constraints.

---

The goal is to maximize a 'score' which is the product of two things:
1. The sum of the numbers you picked.
2. The number of rows that you picked numbers from.

E.g., if the grid is
[1, 1]
[3, 3]
You want to pick [3, 3], with a score of (3+3)*1 = 6.

---

If the grid is
[1, 2]
[6, 6]
You want to pick [2, 6], with a score of (2+6)*2 = 16.

Greedy algorithm: start with an empty list, and, at each step, pick the number that contributes the most to the current score.

---

Would love it if someone can show me a counterexample! (or a proof Greedy is optimal I guess.)

---

Sorry, example 1 was wrong:

If the grid is
[1, 1]
[3, 3]
You want to pick [1, 3], not [3, 3], with a score of (1+3)*2 = 8.
