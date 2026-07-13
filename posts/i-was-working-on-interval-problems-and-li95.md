---
date: '2024-12-10'
timestamp: '2024-12-10T18:30:52.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7272316861185204224'
segments: 1
images: []
tags:
  - research
---
I was working on interval problems and noticed that the code for two of them was exactly the same. Meaning, they are the same problem even though they look quite different:

1. Given a list of intervals, what's the size of the biggest subset of non-overlapping intervals?

2. Given a list of intervals, what's the size of the smallest set of numbers such that every interval contains one of the numbers?

Example: [[2, 3], [1, 4], [2, 3], [3, 6], [8, 10]]

Assuming that the endpoints are included in the intervals, the answer to both problems for this input is 2:
- {[2, 3], [8, 10]} is (one of) the biggest subset(s) with 2 intervals, and
- {3, 9} is (one of) the smallest set(s) of numbers such that every interval contains at least one.

Rolf Svenning showed me why:
1) for any set of non-overlapping intervals S, then you need size(S) numbers to 'cover' them. That means that the solution to the second problem is at least as big as the one to the first problem.
2) if a set C of numbers 'covering' all the intervals is as small as possible, for each number there must be an interval covered only by that number. That is, there is a set of non-overlapping intervals of size C. That means that the solution to the first problem is at least as big as the one to the second problem.

Combine the two, and you get that they are the same problem.
