---
date: '2026-06-11'
timestamp: '2026-06-11T19:15:36.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7470916503488622592'
status: published
xUrl: 'https://x.com/Nil053/status/2065150977699938799'
tweetId: '2065150977699938799'
segments: 1
images:
  - >-
    /posts/ive-been-experimenting-with---and-using-9938799/2065150977699938799-HKjj1WbaMAABLJp.jpg
tags:
  - isomux
  - ai
---
I've been experimenting with - and using - inter-agent skills in isomux for a while.

For example, with /pair-programming, one agent implements and another reviews.

This works because agents can send messages to each other by POST'ing to the isomux server.

Anecdotally, pairing a Claude and a Codex agent improves code quality. I do this for all my development.

I had another idea for what to add next: let Agent A subscribe to Agent B's chat. This means that whenever there's a new message in Agent B's chat, Agent A gets a message about it:

"This was posted by {agent or human} in Agent B's chat: {message}"

This could be coupled with a prompt for Agent A along the lines of: "Review Agent B's work as messages come in; if you catch a mistake, let them know with a direct message."

The principle: always have an independent set of eyes on everything your agent does.
