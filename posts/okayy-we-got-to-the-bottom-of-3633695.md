---
date: '2025-10-19'
timestamp: '2025-10-19T02:25:33.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7385433560662548480'
status: published
xUrl: 'https://x.com/Nil053/status/1979735643153633695'
tweetId: '1979735643153633695'
segments: 2
images:
  - >-
    /posts/okayy-we-got-to-the-bottom-of-3633695/1979735643153633695-G3lu6WqW8AAcXFT.jpg
  - >-
    /posts/okayy-we-got-to-the-bottom-of-3633695/1979735643153633695-G3lu6WrXQAAzj7Y.png
  - >-
    /posts/okayy-we-got-to-the-bottom-of-3633695/1979735643153633695-G3lu6WvWgAANjN6.png
tags:
  - research
---
I posted a couple of times about the space analysis of BFS for 'Counting Islands on a grid'. Finally, we got to the bottom of it (sorry for the repeated posting; I didn't realize each time that we'd keep making progress).

At first, I conjectured that the extra-space complexity for an nxn grid is O(n). Then, we found an input that requires O(n log n) space. Now, we pushed this up to O(n^2). This settles the question.

To recap, we are using the grid itself to track visited cells, so the extra-space complexity of BFS comes down to the size of the queue.

In turn, the size of the queue is proportional to the maximum number of nodes equidistant from a given cell, where you can move along the 4 main directions and 0's represent walls.

So, the question is: given an nxn binary grid, what's the maximum number of equidistant cells?

Timothy Johnson found a grid pattern with O(n^2) equidistant cells.

The construction works for grids where n is a power of 2 minus 1. The images show the pattern for n = 7, 15, 31, 63, and 127.

For example, the pattern for a 127x127 grid has 1588 cells (in yellow) at distance 63 from the starting cell (in blue).

- Gray cells are 0's (the 'walls')
- Every other cell is a 1 (blue, yellow, and white)

The final diagram illustrates the general case of the recursive construction.

We can see how, by placing an 'L' shaped wall, we can divide one corner of the grid into four smaller corners.

- Subcorners 1 and 2, start at distance n/2 from the starting cell, and have dimensions n/2 x n/2.
- Subcorners 3 and 4, start at distance n/2 - 3 from the starting cell, and have dimensions (n/2 - 3) x (n/2 - 3).

Let count(n) be the maximum number of cells at distance n-1 from the corner of a grid triangle with side length n.

Our recursive construction says:

count(n) = 2 * count(n/2) + 2 * count(n/2 - 3)

Asymptotically, this is going to be equivalent to:

count(n) = 4 * count(n/2)

We also need a base case, of course, but since we are only interested in the asymptotic analysis, it suffices to say that count(n) is constant for values of n below some constant.

Asymptotically, this recurrence simplifies to

count(n) = Θ(n^2).

This is because the recurrence tree has log_2(n) levels, and at each level the number of terms is multiplied by 4, so the total number of terms is roughly 4^log_2(n).

Now, doing a bit of logarithm arithmetic, we get:

4^log_2(n) = (2^2)^log_2(n) = 2^(2*log_2(n)) = 2^(log_2(n^2)) = n^2

I love how even the simplest DS&A problems often lead to fascinating little rabbit holes.

I really hope I get 'Count Islands on a grid' in an interview one day.
