---
date: '2026-01-21'
timestamp: '2026-01-21T20:49:58.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7418720680432517120'
status: published
xUrl: 'https://x.com/Nil053/status/2014078039337082994'
tweetId: '2014078039337082994'
segments: 2
images: []
tags:
  - job-search
---
I had this question while studying system design:

> We have a load balancer for a service that requires long-lived connections (users must always go to the same backend). Should all requests go through the load balancer, or should they go directly to the server after the load balancer assigns one to them?

I had an intuition that it should be one way, but ChatGPT convinced me the other way is better. I'll put the answer in the comments so you can think it through first.

How would you answer?

---

My intuition was that requests for established connections going directly to the server is simpler.

The reason is that if the load balancer does request-level routing (for example, using consistent hashing), then adding a server can cause future requests for an existing session to map to a different backend. We need an extra mechanism to enforce stickiness somehow.

In contrast, if requests for existing connections go directly to the backends, they are not affected by adding new servers.

What ChatGPT pointed out: if backend servers allow direct requests, they need public addresses, and that comes with concerns such as security, auth, and DDoS. It's better to have a small public surface.

Two ways to handle adding servers with long-lived connections, while still going through load balancers:

1. The load balancers keep a mapping from existing connections to servers. It only makes mapping decisions for new connections.

2. The requests themselves encapsulate the necessary information to find their way to the right backend.
