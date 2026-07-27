---
date: '2026-07-27'
timestamp: '2026-07-27T06:17:47.000Z'
source: original
status: published
xUrl: 'https://x.com/Nil053/status/2081625076957622450'
tweetId: '2081625076957622450'
segments: 1
images:
  - /posts/makes-a-lot-of-sense-and-very-7622450/rotation.png
tags:
  - ai
  - research
---
Makes a lot of sense, and very satisfying in terms of data structure design, with the logarithmic height!

Thinking out loud, maybe a property we want is that frequently accessed memories don't get merged as easily.

Kind of like using LRU for merge selection instead of FIFO.

Likely not worth the extra complexity, but it's a fun exercise to think through how it could work.

Here is a first idea:

So we have a tree with raw memories as leaves and compressed memories as internal nodes.

Sometimes, the model has to expand a compressed memory to see the children; we want to minimize such operations.

We can keep a count for each node. Whenever the model expands a compressed memory, we add +1 to the children.

The higher the count of a node, the more we want it closer to the top. In fact, what matters is the sum of counts in the subtree of a node, because moving that node closer to the root means having to do less expansions to reach all those highly accessed nodes.

If the subtree sum of a node is mostly concentrated in the subtree of a grandchild, maybe we can do some kind of "rotation" to bring that grandchild up one level, moving its sibling to the other side of the subtree.

(Re: Victor Taelin's post: https://x.com/VictorTaelin/status/2081453432318132603)
