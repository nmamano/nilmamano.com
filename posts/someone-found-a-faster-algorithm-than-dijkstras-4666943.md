---
date: '2025-06-21'
timestamp: '2025-06-21T07:31:07.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7342085155739615233'
status: published
xUrl: 'https://x.com/Nil053/status/1936325998544666943'
tweetId: '1936325998544666943'
segments: 2
images:
  - >-
    /posts/someone-found-a-faster-algorithm-than-dijkstras-4666943/1936325998544666943-Gt82LhMW8AAPwz2.jpg
tags:
  - research
---
Someone found a faster algorithm than Dijkstra's after 69 years. And that's absolutely wild.

Time to drop some graph theory lore.

Dijkstra invented his single-source shortest-path algorithm in 1956, and it is remarkable for how long it has stood as the best deterministic algorithm for this problem. Since then, the only improvements have come from tweaking the priority queue, culminating with Fibonacci heaps in the 1980's, yielding a runtime of O(E + V log V).

And then, out of nowhere, a new 2025 paper, "Breaking the Sorting Barrier for Directed Single-Source Shortest Paths" (by Ran Duan, Jiayi Mao, Xiao Mao, Xinkai Shu, and Longhui Yin) comes out with a new O(E * (log V)^0.67)-time algorithm. This beats Dijkstra for sparse graphs.

To see how crazy that is, compare it with the table below, which shows the slow, gradual improvements for another classic graph problem: the Minimum Spanning Tree (MST) problem.

Dijkstra's reign lasted so long that it was widely believed to be optimal. In fact, if I read between the lines, it seems that the legendary Robert E Tarjan (co-inventor of the Fibonacci heap mentioned above, and who is all over the MST table below) has recently been trying to prove that Dijkstra's algorithm is truly optimal. Two of his most recent papers, "Bidirectional Dijkstra's Algorithm is Instance-Optimal" (2024) and "Universal Optimality of Dijkstra via Beyond-Worst-Case Heaps" (2023), chip away at showing how Dijkstra is optimal in different aspects, almost--but not quite--precluding the new result!

1956-2025. What a run.

---

Credits:
- The paper: https://arxiv.org/pdf/2504.17033
- The screenshot is from https://basics.sjtu.edu.cn/~liguoqiang/teaching/EI6303/lectures/algo3.pdf
- Thanks to Dima Korolev for telling me about the new result!

Fun facts:
- Two of the authors have a background in competitive programming: https://codeforces.com/blog/entry/143462
- The best possible deterministic runtimes, for both single-source shortest-paths and for MST, remain a mystery.
