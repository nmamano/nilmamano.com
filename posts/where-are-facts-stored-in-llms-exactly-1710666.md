---
date: '2026-02-03'
timestamp: '2026-02-03T22:56:02.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7424584271283027968'
status: published
xUrl: 'https://x.com/Nil053/status/2018820804591710666'
tweetId: '2018820804591710666'
segments: 2
images:
  - >-
    /posts/where-are-facts-stored-in-llms-exactly-1710666/2018820804591710666-HARKoeFb0AARqX0.jpg
tags:
  - ai
  - research
---
Where are facts stored in LLMs, exactly?

Post based on a @3blue1brown video (link below).

If we ask an LLM to predict "Michael Jordan plays _", it will output "basketball".

But how? It's not in the context, so it has to come from the model's weights.

In general, next token prediction requires two things: context and general world knowledge.

Those two things roughly map to the two types of blocks interleaved in LLMs: attention blocks and MLP blocks.

This is not a strict divide, but think of the attention blocks as focusing on context, while the MLP blocks (where each embedding is processed separately) give extra capacity for storing facts.

Despite the title, "Attention is all you need", MLP blocks account for about 2/3 of the weights!

In this post, I go over how an MLP block may represent a fact like "Michael Jordan plays basketball".

Suppose that the embedding space has orthogonal-ish directions associated with "Named Michael", "Last name Jordan", and "Basketball"

(If this notion of orthogonal-ish directions representing concepts is new to you, please see my previous post linked below).

If an input contains "... Michael Jordan ...", as it goes through the attention blocks, the embedding/vector for the token "Jordan" will be updated with the context that "Michael" is in front of it.

It will then point in both the "Named Michael" direction as well as the "Last name Jordan" direction.

To say that an MLP block encodes the fact that "Michael Jordan plays basketball", is to say that when a vector like that reaches the MLP block, it will be nudged in the "basketball" direction.

Let's zoom in on a single neuron inside the MLP block.

A neuron computes a dot product between its learned weight vector and the input embedding E, adds a bias, and passes the result through ReLU (which zeroes out negative values).

Imagine one neuron whose weight vector points in the "Named Michael" and "Last name Jordan" directions, and whose bias is -1.

- If E goes in the "Named Michael" and the "Last name Jordan" directions, the dot product will be ~1 + ~1 = ~2. After the bias: ~1. ReLU keeps it. The neuron fires.
- If E goes in only one of the two directions (say, "Michael Scott"), the dot product will be ~1 + ~0 = ~1. After the bias: ~0. The neuron barely activates.
- If E encodes neither, the dot product will be ~0. After the bias: ~-1. ReLU kills it: 0.

This is a logical AND gate. The neuron fires if and only if both "Named Michael" and "Last name Jordan" are present.

In the back half of the MLP block, a second set of weights maps each neuron's activation into a direction in the embedding space.

If our "Michael Jordan" neuron is wired to push in the direction encoding "basketball", then, when an embedding clears the "Named Michael" AND "Last name Jordan" gate, it will get nudged toward "basketball".

To get a sense of scale, GPT-3 has ~4.7M neurons like this, each nudging embeddings in specific directions under complex activation conditions.

(Mandatory disclaimer: we don't know what the billions of trained weights are actually doing. But this example illustrates the mechanism that enables MLP blocks to store facts.)

---

3blue1brown's video:
https://www.youtube.com/watch?v=9-Jl0dxWQs8

In turn, the video is based on interpretability research from DeepMind:
https://www.lesswrong.com/posts/iGuwZTHWb6DFY3sKB/fact-finding-attempting-to-reverse-engineer-factual-recall

My previous post about how orthogonal-ish directions encode concepts:
https://x.com/Nil053/status/2018789456720142574
