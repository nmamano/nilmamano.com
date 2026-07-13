---
date: '2026-01-22'
timestamp: '2026-01-22T19:52:11.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7420191457258545152'
status: published
xUrl: 'https://x.com/Nil053/status/2014425881561989197'
tweetId: '2014425881561989197'
segments: 1
images: []
tags:
  - interview-prep
---
First step in system design interviews: requirement gathering.

For functional requirements, I rank them.

"The candidate designed the 2 most important features." sounds better than "The candidate designed 2 out of 4 features."

For non-functional requirements, I keep a short checklist:

- CAP theorem: choose between consistency and availability.
- Latency: does the system need to be real-time (where jitter matters - think Fortnite), interactive/responsive (most apps), eventual (email), or batch (big data processing)?
- Scalability: try to put a number on peak QPS, DAU, etc.
- Security: how much do we care about data leaks? (also DDoS, abuse, etc.)
- Durability: how much do we care about data loss?
- Device constraints: where does this run? E.g., if it's an app, should it work offline?

Notes:

- This is not exhaustive, but it's probably enough for interviews.
- I don't usually memorize stuff, but this checklist may help me start interviews with momentum.
- Addressing all 6 may be too much; I'd focus on the ones central to the system.
