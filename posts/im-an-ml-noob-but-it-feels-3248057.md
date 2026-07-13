---
date: '2026-03-26'
timestamp: '2026-03-26T06:10:59.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7442816239393120256'
status: published
xUrl: 'https://x.com/Nil053/status/2037049657063248057'
tweetId: '2037049657063248057'
segments: 1
images: []
tags:
  - ai
  - research
---
I'm an ML noob but it feels like I learned just enough to start asking meaningful questions; tell me if I'm just reinventing the wheel.

Attention in an LLM token sequence can be seen as a DAG (Directed Acyclic Graph), with one node per token and an edge from Ti to Tj if Tj attends to Ti. I'll call this the attention DAG.

We can define the Attention Horizon, h(i), of Ti, as the last token Tj that attends "meaningfully"[^1] to Ti​ (across any head in any layer).

After generating h(i), Ti​'s KV entries are dead weight and can be removed.

Can we use this to alleviate the memory bottleneck driven by the KV cache?

A quick search confirms my intuition that the outgoing degree distribution in the attention DAG follows a power law, i.e., most tokens barely influence any future tokens; but even if there are few future tokens that attend to Ti, they could be far in the future, which is what matters.

I'm not an ML researcher, but if I was, I would focus on understanding the topological nature of this DAG. Not just the outgoing degree distribution; how about the distribution of edge lengths (in terms of tokens between them), to start?

What I'm trying to get at is that, if we can reliably predict the attention horizon for tokens, we can reduce KV cache size.

Can we train a classifier model which, given a partial attention DAG and a specific node, predicts whether it will have more outgoing edges in the rest of the DAG?

This is a hard prediction problem, of course, but any AI lab has basically unlimited training data, so maybe it's worth trying?

Architecturally, I would model this as a "garbage collector"-type background process. While the main process is generating tokens, growing the KV cache, the other process is processing much earlier tokens, identifying ones that can be removed, countering the memory pressure.

Regarding which tokens should be considered by this garbage collector, as a general rule, earlier tokens are more promising because more is known about what comes after them, likely leading to stronger predictions.

I think the garbage collector should process >1 token per token generated. This allows the process to revisit tokens that were previously borderline, and, as the DAG grows, can be firmly classified as dead.

My understanding is that decoding is memory-bottlenecked anyway, not GPU-bottlenecked, so adding a bit of computation to the decoding phase should be fine.

I think the garbage collector should probably maintain some sort of priority queue of tokens that should be considered for deletion, based on an estimate for priority(i)=P(still alive at current step | last evaluation); this considers:

1. Age (older = more likely to be dead)
2. Previous predicted horizon (closer to current step = more likely to be newly dead)
3. Prediction uncertainty (high uncertainty = highest value of re-evaluation)

[^1] Claude points out that the "meaningfully attends to" is doing a lot of work. For example, a token can have low attention weight but high impact because the value vector happens to align with the residual stream in a high-leverage direction.
