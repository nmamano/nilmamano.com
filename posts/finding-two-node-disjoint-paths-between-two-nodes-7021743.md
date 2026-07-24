---
date: '2025-05-17'
timestamp: '2025-05-17T16:31:44.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7329544019540094976'
status: published
xUrl: 'https://x.com/Nil053/status/1923778473577021743'
tweetId: '1923778473577021743'
segments: 1
images:
  - >-
    /posts/finding-two-node-disjoint-paths-between-two-nodes-7021743/1923778473577021743-GrKgPRGWoAAjhK4.jpg
tags:
  - research
  - job-search
---
Finding two node-disjoint paths between two nodes in a graph is not trivial (you can't simply find one path, remove the nodes, and find a second path, as ChatGPT with web search claims).

The way to do it is to construct a derived directed graph as in the picture, where each node is replaced by an "input" node and an "output" node.

To "use" a node 'v' in the original graph, you need to traverse the edge v_in -> v_out in the directed graph. This reduces finding node-disjoint paths to finding edge-disjoint paths.

In turn, finding edge-disjoint paths can be done with 2 iterations of Ford-Fulkerson. We can think of the directed graph as a flow network, where each edge has a capacity of 1. We then need to be able to send two units of flow from s_out to t_in (where s and t are the two nodes for which we want to find two node-disjoint paths in the original graph). The paths of the flow form two edge-disjoint paths in the directed graph, which can be mapped to two node-disjoint paths in the original graph. If we can't send two units of flow, there are no two node-disjoint paths in the original graph.
