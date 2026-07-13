---
date: '2026-04-20'
timestamp: '2026-04-20T20:21:56.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/2046323504560349241'
tweetId: '2046323504560349241'
segments: 1
images: []
tags:
  - ai
---
As far as I can tell, the Claude Agent SDK has a bug with background events:

When a background task completes (e.g., a Monitor notification), the agent's reply gets buffered in an internal queue on the SDK side. The queue is drained lazily, only when session.send() is called.

So:
- background event fires
- agent generates a reply
- reply sits in the queue
- user eventually sends a new message
- the queue drains, and the stale reply pops out first, rendering as a response to the new message.

I tried a number of workarounds, but the clean fix would be upstream...

Drain the event queue eagerly when events arrive, not at send() checkpoints.
