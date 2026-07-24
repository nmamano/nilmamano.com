---
date: '2025-06-17'
timestamp: '2025-06-17T21:41:04.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7340856032493039618'
segments: 1
images:
  - /posts/the-guess-and-check-technique-is-a-trick-used-li58/106-photo.jpg
tags:
  - job-search
---
The "guess-and-check" technique is a trick used in competitive coding and coding interviews. Imagine being given a tough maximization or minimization problem. Something like, "Find the longest subarray with X property". When you are in this situation, you can think of the "guess-and-check" technique as a trade offer:

- What you get: instead of solving the optimization problem, you get to solve the yes/no version: "For a given k, is there any subarray of length k with X property?"
- What you pay: an extra logarithmic factor in the runtime and having to implement binary search.

Here's how it works: If you can solve the yes/no version, then you can binary search for the optimal answer by identifying the transition point where the answer changes from yes to no.

For minimization problems, there is often a transition point where smaller values do not satisfy the constraint, but larger values do. Conversely, for maximization problems, there is often a transition point where larger values do not satisfy the constraint, but smaller values do. By *guessing* the midpoint value of k and *checking* whether it's too high or too low, you can narrow down on the transition point.

This is an advanced binary search technique we cover in Beyond Cracking the Coding Interview. The binary search chapter is available for free as a sneak peek: https://lnkd.in/gQRui_rK
