---
date: '2026-05-08'
timestamp: '2026-05-08T18:28:34.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7458583553635762176'
status: published
xUrl: 'https://x.com/Nil053/status/2052817954899972381'
tweetId: '2052817954899972381'
segments: 2
images: []
tags:
  - isomux
---
Decision when building agents: queueing vs steering.

What should happen when you send a message to a busy agent?

Steering interrupts the agent and sends it immediately; queueing puts it in a queue for when it's done.

For isomux, I'm going to default to queueing because I want to reuse the same queue for agents sending messages to other agents.

The queue will have a mix of human and agent messages (from multiple humans, too).

An agent steering another agent seems too disruptive.

But sending something that's in the queue immediately should be a UI option.

---

One follow-up question is: if there are multiple messages in the queue, what should happen when the agent is ready for the next message?

1. Send only the next one.
2. Coallesce them all into a single message.

I went with (2).
