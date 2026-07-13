---
date: '2026-02-02'
timestamp: '2026-02-02T07:58:38.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/2018232578080424375'
tweetId: '2018232578080424375'
segments: 1
images: []
tags:
  - research
  - ai
---
"You can leave academia but academia will never leave you"-type post.

Yesterday I learned about the BPE encoding for LLM tokenization, which works in a greedy manner and is typically implemented with a priority queue.

It got me thinking about whether I could apply a recipe for optimizing greedy algorithms from my dissertation to speed up the priority-queue implementation.

Unfortunately, it's not looking promising, but I'll leave the idea here.

For context, here is my dissertation: https://nilmamano.com/dissertation/nildissertation.pdf

------------
BPE encoding background:

If you are not familiar with BPE encoding yet, I explained it in my last post: https://x.com/Nil053/status/2018198768588570712?s=20

First, a couple of useful definitions:

Given two tokens x and y, let rank(x, y) be the index of the merge rule that merges x and y, or infinity if there is no merge rule for x and y. Let merge(x, y) be the token resulting from merging x and y.

BPE encoding is a greedy algorithm that:

1. Finds the pair x, y of consecutive tokens with the lowest rank.^1
2. Replaces x and y in the sequence with the single token merge(x, y).
3. Repeats until no more pairs can be merged.

^1: There can be multiple pairs with the lowest rank, but, for simplicity, we'll assume there is only one in this post. Discussing tie-breaking rules would be important in a formal result, but it can usually be addressed without breaking correctness.

The bottleneck in BPE encoding, as with many greedy algorithms, is finding the pair of consecutive tokens with the globally lowest rank at each step. With the typical priority queue implementation, this takes O(log n) time, for a total runtime of O(n log n).

Many greedy algorithms have a O(n log n) runtime for similar reasons.

------------
First optimization idea:

The optimization recipe my co-authors and I introduced goes as follows:

1. Come up with a definition of "locally optimal elements". Locally optimal elements are not necessarily globally optimal, but should still be "safe" choices (see Step 2).

2. Prove that repeatedly picking locally optimal elements eventually leads to the same solution as if we always picked the globally optimal element. If we can prove it, we say we have "global-local equivalence".

3. Come up with an algorithm to exploit this fact. As long as it can find locally optimal elements faster than we can find globally optimal elements, we get a speedup.

To apply this recipe, I began brainstorming definitions of "locally optimal elements" in the case of BPE encoding.

A natural definition of a locally optimal token pair would be:

Two consecutive tokens, x and y, are locally optimal if rank(x, y) is smaller than both rank(predecessor(x), x) and rank(y, successor(y)).

I know a technique we could use to find such pairs in O(1) amortized time (nearest-neighbor chains).

So, **IF** we had global-local equivalence under this definition, we could shave off the O(log n) factor from the runtime.

Unfortunately, we do NOT have global-local equivalence. Here is a counterexample:

input token sequence: b, c, d, e

Token merge rules, from lowest to highest rank:

1. d + e
2. c + de
3. b + c

Globally optimal pair: (d, e)
Locally optimal pairs: (b, c) and (d, e)

Correct output, merging the globally optimal pair at each step:

b, c, d, e -> b, c, de -> b, cde

Possible output, if we pick a locally optimal pair at each step:

b, c, d, e -> bc, d, e -> bc, de

Since we can get a different output, we don't have global-local equivalence.

This means that this particular definition of locally optimal pairs is a dead end.

------------
Second optimization idea:

When a definition for locally optimal elements doesn't have global-local equivalence, it can sometimes be fixed by strengthening the definition.

In fact, I did find one definition of locally optimal pairs which (1) is more relaxed than the globally optimal choice, and (2) does satisfy global-local equivalence.

It goes as follows:

Two consecutive tokens, x and y, are locally optimal if rank(x, y) is smaller than both best_left(x) and best_right(y), where:

- best_left(x) is the minimum rank among pairs (w, x) where w is any token obtainable by merging 0 or more tokens to the left of x and ending immediately before x.
- best_right(y) is the minimum rank among pairs (y, z) where z is any token obtainable by merging 0 or more tokens to the right of y and starting immediately after y.

Under this definition, we DO have global-local equivalence.

(I mean, I don't have a formal proof, but my intuition is that it's the case.)

In the counterexample above, (b, c) wouldn't be a locally optimal pair because rank(b, c) = 3, but best_right(c) = rank(c, de) = 2.

Now that we have a definition of locally optimal pairs that satisfies global-local equivalence, we just need to be able to find such pairs faster than O(log n) time, and we'll beat the priority-queue implementation.

However, this is where this research direction goes cold. The definition works, but it's not straightforward to apply my typical techniques for finding locally optimal elements (nearest-neighbor chains) with this more complicated definition.

Finding such pairs quickly really doesn't look easy to me, but maybe someone else will figure out a way to exploit this global-local equivalence.

------------
Final thoughts:

It's worth mentioning that a O(n) time algorithm for BPE encoding has already been discovered by Hendrik van Antwerpen and Alexander Neubeck. It's totally different but very clever, using dynamic programming:

https://github.blog/ai-and-ml/llms/so-many-tokens-so-little-time-introducing-a-faster-more-flexible-byte-pair-tokenizer/

Thus, even if I could find a faster algorithm than the priority-queue one, it wouldn't break theoretical ground.

Anyway, this took me back to my grad school days a bit. Fun times.
