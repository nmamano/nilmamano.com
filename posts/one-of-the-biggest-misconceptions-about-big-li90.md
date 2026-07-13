---
date: '2025-01-09'
timestamp: '2025-01-09T07:01:12.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7283014936102846467'
segments: 1
images: []
tags:
  - research
---
One of the biggest misconceptions about big O analysis is that big O/Θ/Ω is the same thing as worst-case/average-case/best-case analysis.

These are orthogonal concepts.

Imagine a function with 3 nested loops that does:
- n iterations in the best case.
- n^2 iterations in the average case.
- n^3 iterations in the worst case.

All of the following are correct statements:

- the best case takes Θ(n) time
- the average case takes Θ(n^2) time
- the worst case takes Θ(n^3) time

- the best case takes O(n) time and O(n^2) time
- the average case takes O(n^2) time and O(n^3) time
- the worst case takes O(n^3) time and O(n^4) time

- the best case takes Ω(n) time and Ω(1) time
- the average case takes Ω(n^2) time and Ω(n) time
- the worst case takes Ω(n^3) time and Ω(n^2) time

The default, hidden assumption in coding interviews is that we are trying to find a tight upper bound (essentially big Θ, even though we use big O) on the worst-case analysis. That's why big O is often equated with worst-case analysis.

But sometimes, it makes sense to use different types of bounds (big O/Θ/Ω) on different case analyses (worst case/average case/best case). For instance, it is really useful to know that the worst case for any comparison-based sort algorithm is Omega(n log n) (see wiki link). It means we don't need to bash our heads trying to find a comparison-based sorting algorithm that is better than O(n log n) in the worst case.
