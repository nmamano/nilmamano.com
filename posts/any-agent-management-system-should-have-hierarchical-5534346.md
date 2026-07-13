---
date: '2026-05-01'
timestamp: '2026-05-01T08:29:50.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7455894350892306432'
status: published
xUrl: 'https://x.com/Nil053/status/2050130563915534346'
tweetId: '2050130563915534346'
segments: 3
images:
  - >-
    /posts/any-agent-management-system-should-have-hierarchical-5534346/2050130563915534346-HHOF57maQAAWlnA.jpg
tags:
  - isomux
  - ai
---
Any agent management system should have hierarchical, user-defined system prompts.

Isomux has 3 layers:

Office-wide > Per-room > Per-agent

When you start a new conversation, all of those get concatenated and set as preamble.

This has been surprisingly nice at avoiding the typical churn of reexplaining stuff with each new session.

For example:
- all my agents know my preferred dev workflow (office-wide context)
- but only those working on isomux have the instructions for restarting the isomux server ("Isomux dev" room context)
- and only the agent in charge of updating the docs also knows my preferred voice (the "Isomux Writer" Agent)

I believe this is not about isomux, but a *general principle* that anyone building agent management systems should adopt.

---

I added an /isomux-system-prompt slash command so you can see the full concatenated system prompt for the current agent (including the non-user-defined part at the top).

This is all described in more detail in my "build-in-public" isomux design, Agent Identity section: https://nilmamano.com/blog/isomux#agent-identity

---

Hierarchical prompts are also nice in the context of multi-user systems (like isomux). There can be a root "team-wide prompt", and then the root can have a child for each team member, and then additional descendants.
