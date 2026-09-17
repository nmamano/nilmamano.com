---
date: "2026-09-14"
timestamp: "2026-09-14T18:01:49.000Z"
source: x
status: published
xUrl: "https://x.com/Nil053/status/2099559257675006309"
tweetId: "2099559257675006309"
segments: 1
tags:
  - ai
---
Dumb question, but can you train compaction?

Say you're training an LLM with context size N.

Can you simultaneously train a "compaction network" that maps sequences of N embeddings to N/2 embeddings?

You can train the pair on sequences of length >N, running the compaction network whenever context is full.

The companion network doesn't have its own loss function. What matters is the transformer predicting the next word. But for that to work well for sequences of length >N, the compaction network needs to compact well.

Congrats! You now have infinite context...?
