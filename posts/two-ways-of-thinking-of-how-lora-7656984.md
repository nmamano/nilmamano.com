---
date: '2025-08-22'
timestamp: '2025-08-22T16:14:26.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7364847913090412544'
status: published
xUrl: 'https://x.com/Nil053/status/1958925743087656984'
tweetId: '1958925743087656984'
segments: 2
images:
  - >-
    /posts/two-ways-of-thinking-of-how-lora-7656984/1958925743087656984-Gy-AaIEboAILbev.png
  - >-
    /posts/two-ways-of-thinking-of-how-lora-7656984/1958925743087656984-Gy9_73FboAAkuGo.jpg
tags:
  - research
  - ai
---
Two ways of thinking of how LoRA applies a linear transformation to a d-vector:

1. compressing the d-vector into an r-vector by multiplying it by a d x r matrix, and then expanding the r-vector back to a d-vector by multiplying it by an r x d matrix.

2. multiplying the d-vector by a d x d matrix which is an approximation of an arbitrary d x d matrix (i.e., an arbitrary linear transformation), where the arbitrary d x d matrix is approximated as the product of a d x r matrix and an r x d matrix.

Computationally speaking, you'd want to do the first, but the two are equivalent by associativity of matrix multiplication.

---

Sources for images:
https://ninjalabo.ai/blogs/Low_Rank_Approximation-Part1.html
https://www.youtube.com/watch?v=DhRoTONcyZE
