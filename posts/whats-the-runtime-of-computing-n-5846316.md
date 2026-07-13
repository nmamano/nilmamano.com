---
date: '2025-02-23'
timestamp: '2025-02-23T23:43:38.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7299573463223017472'
status: published
xUrl: 'https://x.com/Nil053/status/1893808969895846316'
tweetId: '1893808969895846316'
segments: 4
images: []
tags:
  - research
---
Tricky question: What's the runtime of computing n! ?

def f(n):
  acc = 1
  for i in range(1, n+1):
    acc *= i
  return acc

Factorials are very large. If you don't use a language like Python, which uses variable-length representation for integers, you'll quickly run into integer overflow.

So, if we use variable-length representation for integers, what's the runtime?

Writing n! takes log_2(n!) bits, which, by Stirling's approximation, is O(n log n).

So, to compute n!, we have to do n multiplications, where one number ('acc') is pretty big (O(n log n) bits) and the other ('i') is between 1 and n.

Usually, we say that multiplying two numbers takes O(1) time, and that's true for 32 bit or 64-bit integers. Big O analysis gets tricky once you start considering non-constant integer representations.

Assuming that 'i' fits in a single memory word (i.e., 32 or 64 bits), each multiplication probably takes time linear on the size of the big number ('acc'). So, I think the runtime is O(n^2 log n).
