---
date: '2025-03-29'
timestamp: '2025-03-29T13:21:14.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7311738802052481024'
status: published
xUrl: 'https://x.com/Nil053/status/1905973525917180272'
tweetId: '1905973525917180272'
segments: 1
images: []
tags:
  - job-search
---
A trick to move a prefix of any length to the end of an array, in place:

Say k is the length of the prefix.

1. Reverse the array.
2. Reverse the final k elements.
3. Reverse the remaining elements.

For instance, if we have "outbreak" and we need to move "out" to the end:

1. reverse the whole thing to get "kaerbtuo"
2. reverse the final three letters to get "kaerbout"
3. reverse the first five letters to get "breakout"
