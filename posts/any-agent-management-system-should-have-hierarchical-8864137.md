---
date: '2026-05-01'
timestamp: '2026-05-01T08:25:58.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/2050129590358864137'
tweetId: '2050129590358864137'
segments: 1
images:
  - >-
    /posts/any-agent-management-system-should-have-hierarchical-8864137/2050129590358864137-HHOF57maQAAWlnA.jpg
tags:
  - isomux
  - ai
---
Any agent management system should have hierarchical, user-defined system prompts.

Isomux has 3 layers:

Office-wide > Per-room > Per-agent

When you start a new conversation, all of those get concatenated and sent to the agent.

This has been surprisingly nice at avoiding the typical churn of reexplaining stuff with each new session.

For example:
- all my agents know my preferred dev workflow (office-wide context)
- but only those working on isomux have the instructions for restarting the isomux server ("Isomux dev" room context)
- and only the agent in charge of updating the docs also knows my preferred voice (the "Isomux Writer" Agent)

I believe this is not about isomux, but a *general principle* that anyone building agent management systems should adopt.
