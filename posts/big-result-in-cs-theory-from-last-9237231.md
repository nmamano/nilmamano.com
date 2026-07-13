---
date: '2025-03-28'
timestamp: '2025-03-28T07:19:36.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7311287722722082816'
status: published
xUrl: 'https://x.com/Nil053/status/1905520128869237231'
tweetId: '1905520128869237231'
segments: 2
images:
  - >-
    /posts/big-result-in-cs-theory-from-last-9237231/1905520128869237231-GnG7cl8WIAA_R8q.jpg
tags:
  - research
---
Big result in CS theory from last month: the gap between which problems can be solved in X amount of time and with X amount of space has been widened far beyond a conjecture widely believed for decades.

A central question in CS theory is, "Which problems can be solved in X amount of time?" This is formalized in terms of big O class complexities: e.g., if you have a problem and you find an algorithm that solves it in O(n^2) time in the worst case, where n is the size of the input, we can say that the problem is in TIME(n^2): the class of problems that can be solved in quadratic time.

For instance, P vs NP is one of the problems under this general umbrella: it's about whether a class of problems (including, e.g., TSP) can be solved in polynomial time (i.e., are in TIME(n^c) for some constant c).

We can also formulate the same question in terms of space: "Which problems can be solved in X amount of space?" In this variation, you have *infinite time*--you just can't store more than X amount of data at a time. For instance, TSP can be solved in O(n) space by trying all permutations, so we can say that TSP is in SPACE(n), the class of problems that can be solved in O(n) time.

The new result concerns the relationship between TIME(f(n)) and SPACE(f(n)) for any f(n).

A trivial result is that if you can solve a problem in O(f(n)) time, then you can also solve it in O(f(n)) space. That's because in O(f(n)) time, you can only write O(f(n)) amount of memory. In other words, TIME(f(n)) is a subset of SPACE(f(n)) for any f(n).

The question is, how big is the gap? If a problem can be solved in O(f(n)) time, how much space is actually needed?

The long-held conjecture was that the gap between TIME(f(n)) and SPACE(f(n)) is actually very small. It was believed that, if a problem required O(f(n)) time, it couldn't be solved using O(f(n)^(1-epsilon)) space for any epsilon > 0. E.g., the conjecture was that if a problem can be solved in O(n^2) time, then it cannot be solved using only O(n^1.999) space and infinite time.

This is a strong conjecture, and I don't remember why it was believed, but in any case, it was shattered last month.

It was shown that if you can solve a problem in O(f(n)) time (where f(n) is at least linear), then you can *always* solve it using just O(sqrt(f(n)) * log(f(n))) space. In other words, TIME(f(n)) is a subset of SPACE(f(n)*0.5001).

Edit: I wanted to add a clarification: when discussing this type of complexity theory results, it is important to be precise about the computational model. The result above is for multitape Turing machines. They say, "At the present time, we do not know how to extend Theorem 1.1 to arbitrary random-access models of computations." The RAM model of computation is closer to how computers actually work, so the result would be even more interesting if they could also prove it for the RAM model. I imagine they will be trying to do that next :)

Paper: https://lnkd.in/g4j_z9b2
