---
date: '2026-10-15'
timestamp: '2026-10-15T20:36:29.000Z'
source: both
status: published
xUrl: 'https://x.com/Nil053/status/2110832202133242357'
tweetId: '2110832202133242357'
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7516598301354504192'
segments: 2
images:
  - /posts/isomux-back-room-3242357/back-room.png
tags:
  - isomux
  - ai
---

When I started building isomux, 8 parallel agents seemed more than enough for a given project.

But we are in the swarm era, so I added a hatch on the floor that leads to a back room, effectively increasing the room cap to 108.

I picked up a useful piece of terminology from the gas city blog post: light vs dark software factory. It's about how transparent it is what agents are doing.

It's a spectrum, and you usually want a mix. There are your go-to agents, agents you check in with occasionally, and workers other agents delegate to behind the scenes.

Claude Code popularized "subagents" for workers, which I dislike for being too "dark".

With Isomux, I lean on the light side even for workers. They are first-class agents, just tucked away in the back room.

---

(Isomux agents still can and indeed do spawn subagents, but my typical workflows are based on first-class worker agents and inter-agent communication)
