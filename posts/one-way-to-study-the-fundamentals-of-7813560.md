---
date: '2026-01-21'
timestamp: '2026-01-21T22:29:58.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7419868690055213056'
status: published
xUrl: 'https://x.com/Nil053/status/2014103204917813560'
tweetId: '2014103204917813560'
segments: 2
images: []
tags:
  - interview-prep
---
One way to study the fundamentals of system design is to pick any two generic features and look at how they intersect.

In this post: long-lived connections x load balancing.

To make it concrete, let's consider a chess website where players connect with WebSockets to send and receive moves in real time.

For any active game on the site, we have a "GameSession" data structure with all the info, like the IDs of the two players.

With multiple servers behind one or more load balancers, the key decision is: "Where is the source of truth for this state?" Many other decisions are downstream of this.

Keeping GameSession instances in memory on one of the servers adds complexity, such as: how can two users play if they are mapped to different servers by the load balancers?

Lichess hosts millions of games daily, so I looked at how they approach this problem.

Their solution is to use Redis to bypass much of this complexity.

That is: the GameSession data structures can live in Redis, and any backend can read and write to them. Backends can hold in-memory copies for convenience, but the copies should not affect correctness.

Our ideal system is one where *all* the components except Redis are replaceable: stateless load balancers, backend servers with only "soft" (non-authoritative) state, and ephemeral client connections.

- If a load balancer dies, clients talk to a different one and establish a new connection. Even if they are mapped to a different server, the server can fetch the GameSession data structure from Redis.

- If a server dies, all connections to it die, but the GameSessions survive in Redis. The clients hit the load balancers again, which map them to a different server.

- If a client loses internet for a second, they can reconnect and reach the same or a different backend.

In all three cases, the user experiences a momentary disconnect and can continue playing.

A key requirement is that the GameSession data structures in Redis are "keyed" by something like user ID, *not* a connection/WS ID (I wrote more about this in a post linked in the comments).

The cost of using Redis is extra latency, as backends usually talk to it over the network. In-memory state is much faster.

This trade-off is worth it in the case of Lichess, where state updates are small and move frequency is relatively low.

---

Post about ephemeral but long-lived connections: https://x.com/Nil053/status/2014085824019931507
