---
date: '2025-06-24'
timestamp: '2025-06-24T21:19:57.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7343387432379129856'
segments: 1
images:
  - /posts/reddit-user-messed-up-meta-phone-screen-li55/103-feed-photo.jpg
  - /posts/reddit-user-messed-up-meta-phone-screen-li55/104-feed-photo.jpg
tags:
  - job-search
---
Reddit user:  "Messed up Meta Phone Screen really bad.
Got this question: In a binary tree, check if each node is the average of all its descendants. Thought of post order traversal, but could not code it up."

Here is a general framework for approaching tree problems. Before coding, ask yourself:

"What information needs to flow up the tree, down the tree, or sidestep the recursive flow (i.e., be stored in the outer scope)?"

The user was on the right track with postorder traversal because we need to pass information up the tree: (1) the size of the subtree, and (2) the sum of the subtree. With these two pieces of information, we can compute the average at each node. In addition, if we find any node that doesn't satisfy the constraint, then we can also pass that up the tree; or we can just store it as a boolean value outside the recursive flow ("global" state).

I hope that helps!

(Source: https://www.reddit.com/r/leetcode/comments/1ljgdee/messed_up_meta_phone_screen_really_bad)
