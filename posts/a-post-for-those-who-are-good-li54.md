---
date: '2025-06-30'
timestamp: '2025-06-30T01:02:15.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7345255315002544128'
segments: 1
images:
  - /posts/a-post-for-those-who-are-good-li54/098-feed-photo.gif
  - /posts/a-post-for-those-who-are-good-li54/099-feed-photo.gif
tags:
  - interview-prep
---
A post for those who are good at memoization but struggle with tabulation (talking about dynamic programming):

The key to tie together memoization and tabulation is that there is one cell in the tabulation table for each subproblem/recursive call in memoization.

One underrated step of tabulation is *sketching the layout of the tabulation table.*

That's something you do AFTER you've worked out the recurrence (we won't get into this part here) but BEFORE you do any coding.

This is especially helpful for 2D DP problems, where the tabulation table is a 2D grid.

Basically, you want to sketch your grid as a rectangle, and identify:

1. The range of each dimension (rows and columns)
2. Where the base cases are (subproblems that don't depend on other subproblems).
3. The dependencies: take a random cell in the grid, and draw the dependencies as arrows.
4. Where the goal is.

The attached images show table sketches for LCS (Leetcode: https://lnkd.in/gXPG5Mjm) and for Palindromic Substrings (Leetcode: https://lnkd.in/ghBN9NVj)

This sketch guides you in the implementation. It tells you:

1. The dimensions to initialize the table.
2. Which cells you need to fill in directly in a preprocessing step (the base cases).
3. The iteration order through the table (it must respect the dependencies).
4. What to return at the end (the goal).

Images from my blog post: https://lnkd.in/g633UUJt
