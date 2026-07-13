---
date: '2025-08-05'
timestamp: '2025-08-05T08:22:02.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7358411953389662209'
segments: 1
images: []
tags:
  - research
---
Some people think that the worst-case runtime of quicksort is O(n log n). Some people think it is O(n^2)... They are both correct.

When we say "worst case", it's important to define worst case *over what*.

Usually, we are talking about worst case *over all possible inputs*, and, in that sense, it is correct to say that the expected worst-case runtime of Quicksort with random pivots is O(n log n): no matter what input you pass to it, it will take O(n log n) time with high probability.

Now, if we are talking about the worst case *over all possible random choices*, i.e., assuming that you get as unlucky as possible at every turn, then the worst case is O(n^2).
