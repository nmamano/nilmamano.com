---
date: '2025-12-17'
timestamp: '2025-12-17T04:53:54.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7406919863610281984'
status: published
xUrl: 'https://x.com/Nil053/status/2001153859792904620'
tweetId: '2001153859792904620'
segments: 1
images:
  - >-
    /posts/in-consistent-hashing-why-always-go-to-2904620/2001153859792904620-G8WGJUjbsAAW64Z.jpg
tags:
  - job-search
---
In consistent hashing, why always go to the server with the *next* hash instead of the *closest* one?

ChatGPT tells me that it's to avoid having to deal with "tie breaking" for equidistant points, but that seems like a trivial obstacle.

Intuitively, closest hash makes more sense. For example, if there are only 2 servers:

- With closest-hash matching, each will get 50% of the requests.
- With next-hash matching, there's a 50% chance that one server will get >=75% of requests.
