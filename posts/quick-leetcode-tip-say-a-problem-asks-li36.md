---
date: '2025-09-24'
timestamp: '2025-09-24T17:45:49.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7376673227030532096'
segments: 1
images:
  - /posts/quick-leetcode-tip-say-a-problem-asks-li36/051-feed-photo.jpg
  - /posts/quick-leetcode-tip-say-a-problem-asks-li36/052-photo.png
  - /posts/quick-leetcode-tip-say-a-problem-asks-li36/053-photo.png
tags:
  - job-search
---
Quick leetcode tip: Say a problem asks you to output an array, as they often do.

Naturally, you start thinking about how to fill it from front to back.

Take a second to think whether filling it in the opposite order makes the problem easier.

Take this problem: given an odd number n, return an nxn grid filled with the numbers 0 to n-1 in spiral order, starting from the middle (see image).

You could start from the middle, but it's easier to count down from the end. Start at the bottom-right corner, and rather than counting the number of steps you need to take before turning, simply continue until you reach the grid boundary or a cell that already has a number.
