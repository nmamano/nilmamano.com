---
date: '2026-02-02'
timestamp: '2026-02-02T05:44:17.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/2018198768588570712'
tweetId: '2018198768588570712'
segments: 2
images: []
tags:
  - ai
  - research
---
I recently learned the basic tokenization algorithm for LLMs.

It's called BPE (Byte-Pair Encoding), and it's a fun algorithmic problem that doesn't require other ML background. Optimizing the encoding step is like a LeetCode hard.

I explain it here in my own words from memory, as it's my preferred way of solidifying knowledge.

----------

Overview:

There are three pieces/algorithms:

1. Creating the token alphabet or 'vocab'. This is a one-off preprocessing step.
2. Encoding: going from input byte sequence to -> token list using the precomputed token vocab. This needs to happen for every chatbot message.
3. Decoding: going from a token list (LLM output) to a byte sequence (text returned to the user)

----------

1. Creating the token alphabet.

As the B in BPE suggests, we work at the byte level.

Every byte is by itself a valid token, meaning that we start with 2^8 = 256 valid tokens.

Tokens also have a numeric ID, which, for single-byte tokens, is just the byte value.

One thing we need to decide upfront is how big we want our token alphabet to be.

We can set it to anything, but a common size is ~50k tokens. It's a trade-off:

More tokens means more compression when encoding text (context won't fill as quickly), but also more computation (every time we do a 'next token' prediction, we compute one probability per possible token).

The other thing we need is a text dataset to base our vocabulary on. Our vocab will be engineered to "compress" that specific dataset, so we want it to be large and representative of the kind of text we'll be encoding.

The vocab is constructed by a greedy algorithm.

We think of the dataset as a sequence of tokens. In practice, this looks like a sequence of numerical token IDs.

Initially, every byte in the dataset is its own token.

We then repeat the following steps in a loop until we reach the desired vocab size:

1. Find the most frequent pair of consecutive tokens in the token sequence (break ties arbitrarily).
2. Create a new token that is the concatenation of these two tokens. This new token gets the next available numerical ID.
3. Replace every occurrence of these two tokens with the new token.

The intuition is that every time we combine two tokens, the token sequence gets shorter. By targeting the most frequent pairs, we compress text the most.

Here is a full example:

- dataset: "BCDEDEDE"
- target vocab size: 258 (we want to add two tokens to the initial 256)

```
1. initial token sequence: B, C, D, E, D, E, D, E
most frequent consecutive pair: D, E (3 occurrences)
new token: "DE" (ID 256)

2. new token sequence: B, C, DE, DE, DE
most frequent pair: DE, DE (2 occurrences)
new token: "DEDE" (ID 257)

3. final token sequence: B, C, DEDE, DE
```

Note: we need a deterministic tie-breaking rule for choosing pairs to merge when the most frequent pair is the same token twice, like in the case of DE, DE. We could end up with DEDE, DE, or DE, DEDE. By convention, we merge the first one.

Without getting into the weeds, it is not hard to implement each iteration of the loop in O(n) time, where n is the dataset length. Thus, the total runtime is O(V * n), where V is the desired vocab size.

I haven't looked into optimizations for this step, but it doesn't seem too important because V is not too large (~50k) and this is a one-off preprocessing step.

----------

2. Encoding

This step is about turning input text into a sequence of tokens.

The general idea is to apply the same sequence of token replacements as we did when creating the vocab.

Let S be the input byte sequence.

Note: the most frequent pair in the dataset used to create the vocab may not be the most frequent pair in S. In fact, we don't use token-pair frequencies in S for anything. But the more aligned they are with the dataset, the more compact the encoding will be.

We can describe the encoding by looking at the naive algorithm, which repeatedly merges token pairs in the same order as the merge order used in the vocab creation algorithm.

We think of S as a sequence of tokens. Initially, every byte in S is its own token.

Then, for each token X in the vocab starting from ID 256:

Let x1 and x2 be the two tokens that we need to concatenate to get X.

1. Find every occurrence of x1 followed by x2.
2. Replace each occurrence with X.

Again, we need to be careful with the case x1 == x2 to make the encoding deterministic. If we find x1, x1, x1, we want to end up with X, x1, not x1, X.

----------

2.a. Optimizing the encoding

Since we do this operation extremely often, it makes sense to optimize it.

The key idea is to use a priority queue to quickly find the highest-priority pair of tokens to merge.

First, we initialize a hash map: (int, int) -> int, with one entry for each vocab token past the initial 256 byte-based tokens, capturing the merge rule to obtain it: (x1, x2) -> X.

As usual, we think of S as a sequence of tokens, starting with the initial byte tokens.

Since we are focusing on efficiency, let's be precise about the data structure for the token sequence: a doubly-linked list. It allows us to efficiently insert and remove elements from the middle of the list.

In addition to next and prev fields, each list node has 4 fields:

- token_id (integer)
- index (integer, initially the index of the node in S)
- deleted flag (boolean, initially false)
- next_token_id (integer, initially the token ID of the next node in S)

The need for the extra fields will be apparent soon.

The priority queue (PQ) is our final data structure. We initialize it by iterating through the initial linked list. For each consecutive pair, (x1, x2), if it exists in the hash map, (x1, x2) -> X, we add an entry to the PQ.

The entry consists of a pointer to x1's list node. The priority is based on the token ID of X, with lower IDs having higher priority (they were merged earlier during the vocab creation process). In other words, we use a min-heap.

We use the index of x1 to break priority ties (lower indices have higher priority). This ensures that the encoding is deterministic, and it's why we need the index field.

For example: if the hash map contains (x1, x1) -> X, and the token sequence contains x1, x1, x1, we add two entries to the PQ, one for the first x1 and one for the second x1, but the first one has higher priority because of the lower index.

The deleted flag is needed because we'll use a technique known as "lazy deletions" in the PQ. It will be used to identify stale entries in the PQ (see Step 2 of the main loop).

The main loop runs until the PQ is empty:

1. Extract the top of the PQ, which is a pointer to a node containing a token ID, x1.
2. Check if the entry is "stale", which happens when either (a) x1 is marked as deleted, or (b) its intended successor (x2) got deleted, which we can confirm by checking that x1.next_token_id doesn't match the token ID of its successor in the linked list. If the entry is stale, we simply move on to the next iteration of the main loop.
3. Identify the linked list nodes surrounding x1 and x2: predecessor <-> x1 <-> x2 <-> successor (I'll omit the cases where the predecessor or successor are missing).
4. Create a new linked-list node with the token ID of X, the index of x1, and next_token_id set to successor.token_id.
5. Rewire the pointers of the linked list so it looks like: predecessor <-> X <-> successor. (This may make existing PQ entries stale.)
6. Mark the nodes of x1 and x2 as deleted. (This may also make existing PQ entries stale.)
7. Check if (predecessor.token_id, X.token_id) exists in the hash map. If so, add a new entry to the PQ. Same for (X.token_id, successor.token_id).

Big O analysis:

- Each iteration takes O(log n) time, with the bottleneck being popping the highest priority entry from the PQ.
- The number of iterations with non-stale entries is at most n-1, since each one reduces the length of the linked list by one.
- The number of iterations with stale entries is O(n) because the total number of entries created, including the n-1 initial ones plus the up to n-1 new ones, is < 2n.

The total runtime is O(n log n).

----------

3. Decoding

Decoding is the most straightforward part, as we don't need to "replay" the token combination rules in a careful order.

We can precompute a table of token ID -> byte sequence:

- if X < 256, byte_seq(X) = X
- otherwise, byte_seq(X) = concatenate(byte_seq(x1), byte_seq(x2))

We then simply construct the output text by concatenating byte_seq(X) for each token X in the token sequence.

----------

This covers vanilla BPE. Production tokenizers add tweaks like special handling of whitespace and punctuation. But the algorithm above is at the core of the tokenization process surrounding every LLM call.

Further reading in the comments.

---

An even faster encoding algorithm with a clever use of dynamic programming:
https://github.blog/ai-and-ml/llms/so-many-tokens-so-little-time-introducing-a-faster-more-flexible-byte-pair-tokenizer/

Karpathy lecture implementing BPE in Python:
https://www.youtube.com/watch?v=zduSFxRajkE
