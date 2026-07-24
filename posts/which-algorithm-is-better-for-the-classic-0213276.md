---
date: '2025-09-26'
timestamp: '2025-09-26T09:16:16.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7377269531842371584'
status: published
xUrl: 'https://x.com/Nil053/status/1971504081870213276'
tweetId: '1971504081870213276'
segments: 1
images: []
tags:
  - job-search
  - research
---
Which algorithm is better for the classic "Count Islands in a Grid" problem, DFS or BFS?

It's more contentious than you'd think.

In this problem, we have a grid where 0's represent water and 1's represent land, and we need to count the number of islands (connected components) present.

This problem is a LeetCode Easy--counting connected components is a basic graph problem.

Since we don't care about distances, any graph traversal will do: both DFS and BFS solve the problem in linear time and linear extra space.

Where it gets interesting is if we are allowed to modify the input grid to save extra space.

Instead of tracking visited cells in a separate data structure, we can use a special value, like 2, directly in the input grid.

Then, the extra space is based on:

- The recursion stack for DFS
- The queue for BFS

With this optimization, suddenly BFS is better than DFS.

Why?

On the one hand, DFS is recursive, and the call stack still counts as extra space. In the worst case, we could zig-zag through the entire grid with DFS, making O(rows * cols) nested calls.

On the other hand, BFS explores the nodes layer by layer, sorted by distance, so all the nodes in the queue at any given moment are at the same distance from the starting node, ±1.

I believe there can be at most O(min(rows, cols)) 1's at the same distance from the same starting 1 (though I don't have a proof of this; please tell me if you know how to prove it).

So, DFS uses O(rows * cols) extra space, while BFS uses O(min(rows, cols)).

But this is not the end of the story.

We can reduce the extra space from O(min(R, C)) to O(1), but we have to switch BACK to DFS!

With O(1) extra space, we can't afford recursion at all, so we have to use iterative DFS.

Iterative DFS typically uses an explicit stack; however, we can utilize the input grid itself to track the index of each cell in the DFS stack. Since the input already uses values 0 and 1, we can use negative numbers to track the stack: -1 for the first cell in the stack, -2 for the second, and so on.

The reason why we can't bring BFS down to O(1) extra space is that when BFS explores the grid, it jumps around all over the place. Without storing pending nodes in an explicit queue, we don't know where to go next. DFS is our friend because it always explores from the same "head" of the path, which we can easily track with just a couple of extra variables (head_row, head_col).

I found it interesting how, with more optimizations, we went from "both are the same" to "BFS is better" to "DFS is better".
