---
date: '2025-08-10'
timestamp: '2025-08-10T05:27:21.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7360179884138090496'
status: published
xUrl: 'https://x.com/Nil053/status/1954414243119542653'
tweetId: '1954414243119542653'
segments: 2
images: []
tags:
  - interview-prep
---
Leetcode trick: finding a prefix and a suffix is the dual problem of finding the subarray between them.

Some LeetCode questions say: "find a prefix and a suffix with some property and with maximum combined length."

However, it's hard to consider all possible prefix-suffix combinations.

But what is between a prefix and a suffix? A subarray!

Such questions can often be rephrased in terms of finding the *smallest* subarray with some complementary property.

And you can use a sliding window for that.
