---
date: '2026-04-20'
timestamp: '2026-04-20T00:36:11.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7451790319613870080'
status: published
xUrl: 'https://x.com/Nil053/status/2046025096981360668'
tweetId: '2046025096981360668'
segments: 2
images: []
tags:
  - interview-prep
---
I did not expect rolling hashes to come up in the "Design Dropbox" system design problem!

When designing Dropbox, it is important to discuss chunking for large files:

To upload 50GB file, we split it into smaller chunks (say, 4MB each) and upload them individually.

This makes uploads fault-tolerant: a network disconnect doesn't ruin the entire upload; we just resume the remaining chunks.

But what if the file changes locally? Do we reupload the whole thing?

The next idea is to store the hash of each chunk as metadata, locally and remotely. Then, we only reupload chunks whose hash has changed.

But that's just normal hashing; we haven't got to the rolling hash part yet...

Consider the worst case: append one byte at the *start* of the file. Every chunk boundary shifts by one byte, every chunk hash changes, and we reupload everything.

The chunks we previously uploaded are still physically present in the local file, just not aligned to 4MB offsets.

That's where the rolling hash comes in: we use it to compute, in linear time, the hash of every 4MB window in the local file - not just those aligned to offsets that are multiples of 4MB.

This way, if a chunk we previously uploaded is still intact *anywhere* in the local file, even if it moved around, we will detect it, and we can skip uploading it.

We only need to upload the bits between those chunks (and accept that our chunks will not always be exactly 4MB).

---

If you want to learn the rolling hash algorithm, we describe it in one of the online chapters of Beyond Cracking the Coding Interview: https://nilmamano.com/blog/set-and-map-implementations?category=bctci#rolling-hash-algorithm

Also including here notes from Claude's review of my post:

- This is essentially rsync's algorithm. It pairs a cheap rolling checksum for the slide with a strong hash to confirm matches. (https://en.wikipedia.org/wiki/Rsync)
- A natural next thing to learn about would be "content-defined chunking".
