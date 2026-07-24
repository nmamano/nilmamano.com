---
date: '2024-11-07'
timestamp: '2024-11-07T03:22:37.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7260129491996323840'
segments: 1
images: []
tags:
  - job-search
  - research
---
Fully agree with this approach! FAANG interviewers focus too much on "did they solve the question or not?", which is why they use harder questions. But if you are willing to dig deeper, even simpler questions will show how someone thinks.

Regarding Fibonacci, I remember a whole algorithms' lecture about fib(n). The professor started showing the naive recursive solution, which takes exponential time. Then, they explained the concept of memoization, and improved the solution to linear time.

But it didn't stop there: he then used the fact that if you take this square matrix:
(1, 1)
(1, 0)
and raise it to the n-th power, the top-right element will be fib(n).
This allows you to use the divide-and-conquer exponentiation trick to compute fib(n) in O(log n) time (the 'trick' is that if k is even, x^k = x^(k/2) * x^(k/2), so, to compute x^k, you can recursively compute x^(k/2), and then multiply the result by itself. The repeated halving makes it O(log n) steps).

In the course of a single lecture, the professor obtained an exponential speed-up TWICE for the same problem (from O(n^1.618) to O(n) to O(log n)).

(Re: Chris Verges on simple interview questions revealing deep problem-solving)
