---
date: '2025-06-07'
timestamp: '2025-06-07T10:17:54.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7337060229316079616'
segments: 1
images:
  - >-
    /posts/interesting-question-from-rleetcode-given-this-table-li63/108-feed-photo.jpg
tags:
  - interview-prep
  - research
---
Interesting question from r/leetcode: Given this table, why not just learn heapsort?

Reasons to learn mergesort and quicksort:
1. To understand the divide-and-conquer technique.
2. They are well-known, so they sometimes come up in interviews.
3. If you understand quicksort, you can learn quickselect. You can't find the median of an array in linear time with heaps.
4. Your language's standard library may not provide a heap (like JS/TS), making heapsort much harder to implement from scratch.
5. Heapsort is slower in practice. I don't know any languages that use it for their built-in sort.
6. Quicksort's O(n^2) worst-case runtime, as shown in the table, is somewhat misleading. Assuming the pivot is chosen randomly, the probability of the runtime not being O(n log n) is negligible (it decreases exponentially as n grows). Quicksort can also be modified to achieve O(n log n) deterministic worst-case time using the median-of-medians technique.
