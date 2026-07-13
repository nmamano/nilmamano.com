---
date: '2026-05-17'
timestamp: '2026-05-17T18:20:51.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7461843698448773120'
status: published
xUrl: 'https://x.com/Nil053/status/2056077504314847238'
tweetId: '2056077504314847238'
segments: 1
images:
  - >-
    /posts/i-have-a-full-lecture-on-designing-4847238/2056077504314847238-HIikeGZaIAAt2O2.jpg
  - >-
    /posts/i-have-a-full-lecture-on-designing-4847238/2056077504314847238-HIikf8HbkAAZfC6.jpg
  - >-
    /posts/i-have-a-full-lecture-on-designing-4847238/2056077504314847238-HIinGSfbAAA1kBu.jpg
tags:
  - isomux
  - ai
---
I have a full lecture on designing an agent management system in my head... here are the main points.

- It should be multi-user: human collaboration at the agent conversation level is the best way for a team to level up together.

- It should be natively multi-device: phones are underused for managing agents, don't make it an afterthought.

- It shouldn't run locally: don't make people run around with an ajar laptop (among other reasons).

- Ephemeral sessions should be wrapped by an agent with a persistent identity and context. Hierarchical system prompts can give each agent all the context they need for their role and nothing else. Bonus points if agents are visually recognizable and cute.

- Conversations should be multi-agent: you probably don't realize how much copy-paste you are doing between chats.

- It should be multi-provider: the obvious one -- it's the one thing claude code and codex can't do.

- Agents should be able to add non-text components in chat (diffs, diagrams, etc.) and act on your system (create tasks, message other agents, etc.). The right architecture for this is a REST API on your server.

- It should have a good (non-linear) hand-off mechanism, like an agent-first task board.

The points above are not orthogonal. They compound into a much richer experience than your typical claude code session.

Let me know if you'd be interested in this becoming an actual lecture!
