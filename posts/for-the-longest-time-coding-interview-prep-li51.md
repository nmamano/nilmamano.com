---
date: '2025-07-04'
timestamp: '2025-07-04T01:04:58.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7346705546869149696'
segments: 1
images:
  - /posts/for-the-longest-time-coding-interview-prep-li51/091-feed-photo.gif
  - /posts/for-the-longest-time-coding-interview-prep-li51/092-feed-photo.jpg
  - /posts/for-the-longest-time-coding-interview-prep-li51/093-feed-photo.jpg
tags:
  - job-search
---
For the longest time, coding interview prep has focused on solving leaked problems asked by actual companies.

In LeetCode, each question has company tags so you can see who is asking it.

That's appealing. You're solving the *real thing*, not some academic homework created by a professor, like you did in undergrad.

So, it was a risky call for us to diverge from that and use original questions in BCtCI (not *every* problem is original -- we included the classics that everyone is expected to know).

But we really thought it would be best for our readers (ethical implications aside).

For the book, we asked ourselves, "What point are we trying to make?" and then came up with the best question to illustrate that point.

For example, we wanted to make the point that, to solve binary tree problems, you may need to pass information up the tree, down the tree, and/or outside of the recursive flow (see the table).

To make this point, we came up with a problem where you needed to do all three:

"Given a binary tree, we say a node is aligned if its value is the same as its depth. Return the length of the longest descendant chain of aligned nodes. (see thepicture for an example)"

For this problem:

- We pass the current depth down the tree (a node doesn't know its own depth by itself).
- We pass the longest aligned chain starting at each node up the tree. This way, if a node is aligned, it can extend the longest chain in its children.
We track the longest chain seen so far using a "global" (non-local) state.

See the picture of node (1) communicating the 3 types of info.
