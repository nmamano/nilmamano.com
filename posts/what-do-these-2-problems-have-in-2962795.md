---
date: '2024-12-10'
timestamp: '2024-12-10T23:28:32.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/1866626081152962795'
tweetId: '1866626081152962795'
segments: 4
images: []
tags:
  - research
  - job-search
---
What do these 2 problems have in common?

1. Given a list of intervals, what's the size of the biggest subset of non-overlapping intervals?

2. Given a list of intervals, what's the size of the smallest set of numbers such that every interval contains one of the numbers?

---

A: they are the same problem.

1) for any set of non-overlapping intervals S, then you need size(S) numbers to 'cover' them. That means that the solution to the second problem is at least as big as the one to the first problem.

---

2) if a set C of numbers 'covering' all the intervals is as small as possible, for each number there must be an interval covered only by that number. That is, there is a set of non-overlapping intervals of size C.

---

That means that the solution to the first problem is at least as big as the one to the second problem.

Combine (1) and (2), and you get that they are the same problem.
