---
date: '2025-05-15'
timestamp: '2025-05-15T20:12:05.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7328874504741363712'
status: published
xUrl: 'https://x.com/Nil053/status/1923109147668775084'
tweetId: '1923109147668775084'
segments: 1
images: []
tags:
  - interview-prep
---
Arguably, the best algorithm to check if a graph is connected is not DFS or BFS (and no, it's not union-find either). It's an algorithm that doesn't have a name.

DFS is recursive, which means you have to worry about stack overflow.

BFS requires a queue, which is a bit more complex than plain arrays. E.g., it can be implemented with a linked list, but linked lists have way worse constant factors than arrays.

Union-Find is not technically a linear-time algorithm.

What's better?

Take a BFS and replace the queue with a stack (stacks can be easily implemented by pushing and popping from/to the end of a dynamic array).

What you get is neither BFS nor DFS (it's some kind of hybrid), but it still works for answering connectivity questions.

No recursion, still linear time, and better constant factors than BFS.
