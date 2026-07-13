---
date: '2025-03-29'
timestamp: '2025-03-29T11:43:58.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7311714735157088256'
segments: 1
images:
  - >-
    /posts/advice-for-implementing-two-pointer-algorithms-li72/122-feed-photo.jpg
tags:
  - interview-prep
---
Advice for implementing two-pointer algorithms.

Ask yourself:

"Of all the possible combinations of pointer directions, which one makes my life the easiest?"

For example, consider the problem of sorting a "valley-shaped" array (a decreasing prefix followed by an increasing suffix).

Intuitively, it makes sense to construct the sorted array from left to right, but the first element (the smallest one) could be anywhere in the input array. We *could* search for it with binary search, but we are making our life harder than it needs to be.

It's much easier to construct the sorted array from right to left, because the final element (the largest one) must be either the first or the last one. Two pointers moving inwards from the ends of the array allow us to build the sorted array easily, from largest to smallest.
