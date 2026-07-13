---
date: '2025-01-07'
timestamp: '2025-01-07T05:26:34.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7282265410568167425'
status: published
xUrl: 'https://x.com/Nil053/status/1876500655701201053'
tweetId: '1876500655701201053'
segments: 3
images:
  - >-
    /posts/i-came-up-with-this-cute-problem-1201053/1876500655701201053-GgqrTYHaIAAsXrp.png
tags:
  - research
---
I came up with this cute problem about a jumping frog, but so far, none of my competitive coding friends nor I know how to beat the O(n^2) runtime of the naive solution.

The input is a string where each character is 'L' or 'R'. We put a frog at a random index (picked uniformly). Then, the frog starts jumping. First, it jumps one cell, left or right, based on the letter at the current index. At the next iteration, it jumps 2 cells, then 3, and so on, always based on the current letter. Eventually, the frog falls off the string on either end.

The goal is to find whether it is more likely that it will fall off the left side or the right side.
