---
date: '2025-09-26'
timestamp: '2025-09-26T23:35:10.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7377482221693227008'
status: published
xUrl: 'https://x.com/Nil053/status/1971720229677072488'
tweetId: '1971720229677072488'
segments: 2
images:
  - >-
    /posts/there-are-many-interesting-ways-to-hash-7072488/1971720229677072488-G1z1Cb8aIAEAvz1.jpg
  - >-
    /posts/there-are-many-interesting-ways-to-hash-7072488/1971720229677072488-G1z1Dk9b0AE385O.png
tags:
  - job-search
  - research
---
There are many interesting ways to hash integers into a fixed range such as [0, 999].

But my favorite is Fibonacci hashing, also known as Knuth's multiplicative hashing.

This method was introduced by Knuth in The Art of Computer Programming, but it didn't receive as much adoption as modular hashing.

Why? Just the flimsiness of history, as far as I can tell.

When I had to choose ONE hashing method to teach in Beyond Cracking the Coding Interview, I chose it for its simplicity and elegance.

Here is how it works:

The key insight is that if you take an arbitrary integer x and multiply it by a "random-looking" fraction between 0 and 1, such as 0.6180339887, we get a number with a "random-looking" fractional part. For instance:

1 * 0.618... = 0.618...
2 * 0.618... = 1.236...
3 * 0.618... = 1.854...

We can then take the fractional part alone, which is between 0 and 1, and multiply it by 1000 to scale it up to the range between 0 and 1000 (1000 is just an example; the output range could be anything).

Finally, we truncate the fractional part and output the integer part, which will be a "random-looking" integer between 0 and 999.

When the output range is 1000, hash(x) amounts to returning the first 3 decimals of 0.6180339887x. (It doesn't get any simpler than that!)

A final warning: as with any hash function, if the number of possible inputs is larger than the output range, collisions are unavoidable:

- hash(2) = 236 because 2 * 0.618... = 1.236...
- hash(612) = 236 because 612 * 0.618... = 378.236...

---

Want to learn how to build a fully functional hash table from scratch, step by step?

That's exactly what we do in the free, online-only chapter "Set & Map Implementations" of Beyond Cracking the Coding Interview, now crossposted to my blog:

https://nilmamano.com/blog/set-and-map-implementations

We also talk about how to hash strings, dynamic resizing for hash tables, how to think about the load factor and collisions, and the tricky rolling-hash algorithm.

It is one of my favorite chapters!
