---
date: '2025-10-17'
timestamp: '2025-10-17T20:47:42.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7385051330970644480'
status: published
xUrl: 'https://x.com/Nil053/status/1979288230848794662'
tweetId: '1979288230848794662'
segments: 2
images:
  - >-
    /posts/someone-made-progress-on-this-open-problem-8794662/1979288230848794662-G3fXFrAXMAEh1c3.jpg
tags:
  - research
---
Someone made progress on this open problem I listed related to the classic graph problem "Counting Islands in a grid". My conjucture was wrong!

My incorrect conjecture: When you solve this problem with BFS, using the grid itself to track visited cells, the extra space is O(min(R, C)).

Context: When using the grid itself to track visited cells, the only extra space for BFS is the queue. All the cells in the queue are the same distance from the starting cell, ±1.

So, in big O terms, the extra space of BFS is the answer to this question:

> "What's the maximum number of cells in a binary grid (where 0s act as 'walls') that can be equidistant from the same cell?"

In my previous post, I said that I can't find an answer to this question, even if it comes up in the analysis of an extremely common version of BFS 🤯.

Correction: the extra space is *at least* O(n log n), where n = min(R, C). Someone sent me a grid arrangement with Θ(n log n) cells equidistant from the starting cell.

The construction follows a fractal (see image):

- Gray is the 0's in the grid (the 'walls')
- Every other cell is a 1 (blue, yellow, and white)
- Blue is the starting cell
- Yellow is a set of cells all at the same distance

The construction works for grids where the side is a power of 2 minus 1.

Let count(n) be the number of cells at distance d = (n-1)/2 when the grid side is n.

- Base case: count(7) = 12
- General case (n = 15, 31, 63, ...):

count(n) = 2 * count(n/2 - 0.5) + 2n - 18 = Θ(n log n)

The recurrence should look familiar to the one for merge sort: Two recursive terms that halve, and a linear non-recursive term. That's why we get Θ(n log n).

New theory: This fractal *IS* the asymptotic worst case--O(n log n) is the actual upper bound for the extra space of BFS. But this remains open, as far as I know.

---

A little win for me: my friend was using a spreadsheet to play around with the grid layout, and I convinced him to vibe code a little app instead.

Don't just reach for generic tools--you can manifest tools tailored to your use case. Any LLM can one-shot simple apps like this.
