---
date: '2025-08-18'
timestamp: '2025-08-18T21:30:52.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7363319596906393600'
status: published
xUrl: 'https://x.com/Nil053/status/1957555823716315311'
tweetId: '1957555823716315311'
segments: 2
images: []
tags:
  - research
---
Since the Dijkstra theoretical improvement is going viral again, I want to point out how irrelevant the improvement is for PRACTICAL applications.

Imagine your program uses Dijkstra to find shortest paths for graphs with 1M nodes.

Say your application grows and now the graphs are twice as big: 2M nodes (something that doesn't happen too often for *practical* applications).

All that means for Dijkstra with a plain min-heap is that the heap will have one extra level (~21 levels instead of ~20). Thus, heap operations will have to do one more iteration: about ~10 LoC of basic arithmetic and array reads/writes.

That's how insignificant the impact of the O(log n) factor is to the scaling of Dijkstra.

Now, the new result doesn't eliminate a log factor. It elimintes the CUBIC ROOT of a log factor.

Totally insignificant.

In exchange, it brings in a set of non-trivial steps and techniques, a lot of additional bookkeeping, recursive partitioning, etc.
