---
date: '2026-02-03'
timestamp: '2026-02-03T20:51:28.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7424553609817702400'
status: published
xUrl: 'https://x.com/Nil053/status/2018789456720142574'
tweetId: '2018789456720142574'
segments: 2
images:
  - >-
    /posts/heres-one-of-my-favorite-math-fun-0142574/2018789456720142574-HAQtqUvaMAAs153.jpg
tags:
  - ai
  - research
---
Here's one of my favorite math fun facts. It's really counterintuitive, but it actually matters a lot for LLMs.

Let me build a bit of background first, which is super interesting too.

In the embedding space (the high-dimensional space that tokens are mapped to), directions can encode concepts.

For example, if we have "... fake tree ..." in the input, with each word being a token, what we expect to happen in the attention block is that the "fake" token will nudge the embedding for "tree" in a direction representing "fake-ness".

(Mandatory disclaimer: we don't know what the billions of trained weights are actually doing -- there may not be a clear "fake-ness" direction. But this is the kind of context transfer that transformers are designed to enable.)

For unrelated concepts, we want their directions to be orthogonal. If the directions for "boring" and "engineering" overlap, the model will accidentally infer that every engineer is boring to some extent, which is not what we want (probably).

So, to be able to encode many different unrelated concepts, we need the embedding space to have many orthogonal directions.

For context, the embedding space for GPT-3 has 12,288 coordinates/dimensions, and that's the maximum number of pairwise orthogonal directions (by definition).

Does that mean that GPT-3 can only encode 12,288 unrelated concepts? That's clearly not enough!

Finally, we get to the fun fact:

While the number of orthogonal directions equals the dimension, the number of *ALMOST* orthogonal directions (where every pair forms an angle between 89 and 91 degrees) grows exponentially with the dimension.

This is counterintuitive because if you think about 3 orthogonal vectors in 3D, adding a bit of wiggle room doesn't allow you to fit a 4th almost-orthogonal vector. Not even close.

But this fun fact is what allows LLMs like GPT-3 to represent a much much richer set of concepts.

---

Image from: https://youtu.be/KJtZARuO3JY?si=oVYIPxOn7LYxKDhZ

It's also where I learned this fact. Amazing lecture by @3blue1brown.
