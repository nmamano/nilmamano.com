---
date: '2026-04-18'
timestamp: '2026-04-18T00:34:35.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7451065315674767360'
status: published
xUrl: 'https://x.com/Nil053/status/2045299919213543716'
tweetId: '2045299919213543716'
segments: 1
images: []
tags:
  - job-search
---
I'm doing the "Design a URL shortener" system design problem.

One common approach is to use a counter to generate unique URLs. The counter values can be encoded in Base62 format to keep the URLs as short as possible.

The question is how to keep this counter in sync across multiple servers.

At this point, most people reach for Redis.

But I landed on a no-Redis approach, which turns out to be known as the Hi/Lo algorithm.

The central concept is block IDs. Each server owns a block of counter values, which gives it ownership of the range [block_id * 1000, (block_id+1) * 1000).

When a server boots or runs out of IDs in its block, it grabs a new one with a single atomic update on a DB table that contains a single value: the latest block_id handed out.

The DB row-locks internally, so concurrent servers get serialized and nobody ends up with the same block.

Each server keeps an intra-block index in memory for its block.

When a server needs to generate a new short URL, it runs:

short_url = base62(block_id * 1000 + index).
index += 1

Then the short_url and its corresponding original_url are written to the main DB table.

Collisions are impossible by construction.

Block size is a knob, but 1000 is fine in practice. The counters table sees 1/1000 the write traffic of the main table, so contention isn't a concern.

If a server crashes mid-block, the remaining IDs are wasted. Skipping ~1000 counter values from time to time barely impacts our URL length.
