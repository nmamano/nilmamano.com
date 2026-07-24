---
date: '2024-11-28'
timestamp: '2024-11-28T23:50:48.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7268048717734117376'
segments: 1
images: []
tags:
  - job-search
---
I was editing Beyond Cracking the Coding Interview and caught past me saying that there are O(n^(n/2)) subsets of size n/2, where n is the number of elements. Oops!

The formula O(n^k) for the number of subsets of size k only works **when k is constant.**

I knew something was off because it doesn't make sense for the number of subsets of size n/2 to be larger than the total number of subsets *of any size*, which is O(2^n). O(n^(n/2)) is super-exponential (somewhere between exponential and factorial).

I haven't done the math myself, but from what I found, the right number is O(2^n / sqrt(n)).
