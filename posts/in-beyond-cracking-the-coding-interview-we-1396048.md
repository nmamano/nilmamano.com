---
date: '2025-06-25'
timestamp: '2025-06-25T23:03:26.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7343775219926372353'
status: published
xUrl: 'https://x.com/Nil053/status/1938010173471396048'
tweetId: '1938010173471396048'
segments: 1
images:
  - >-
    /posts/in-beyond-cracking-the-coding-interview-we-1396048/1938010173471396048-GuUx-sNbgAAu8W3.png
tags:
  - job-search
---
In Beyond Cracking the Coding Interview, we give a simple method for analyzing recursive functions (especially backtracking): the BAD method.

The runtime of a recursive function is O(b^d * A), where:

- b is the maximum branching factor of the call tree. It must be ≥ 2.
- d is the depth of the call tree.
- A is the additional work (not counting recursion) at any particular node in the call tree.

We call it 'BAD' to reminds us of the 3 variables in the analysis, but also because it can be "bad" in that it gives us a valid upper bound, but it is not necessarily tight.

For instance, for merge sort, the BAD method gives us a runtime of O(n^2).

Here's the practical advice: for famous algorithms like merge sort and quicksort, memorize the runtime. For anything else, there's the BAD method.
