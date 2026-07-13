---
date: '2026-01-05'
timestamp: '2026-01-05T20:47:33.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7414045006191091712'
status: published
xUrl: 'https://x.com/Nil053/status/2008279223379915240'
tweetId: '2008279223379915240'
segments: 4
images: []
tags:
  - ai
---
The evolution in vibe coding I'm seeing: spec-based development.

Vibe coding used to be about asking agents for small, incremental steps. Chatting is a good interface for that.

As agents got better, the amount of stuff they can do in "one round" has increased to where the instructions are too long for a chat message.

The prompts start to look more like one-page design docs.

This workflow is arising as more ergonomic:

1. Writing a full feature spec in a markdown file.
2. Point the agent to the file and tell it to implement it end-to-end.

Nailing Step (1) is what matters now. Chatting and iterating with agents used to happen during the coding phase, but it's increasingly becoming a Step (1) thing.

As prompts become more like design docs, they don't feel as ephemeral as chat messages. They are actually solid documentation, so I commit them along with the code.

Final thought: spec-based development ties nicely into what's coming next: orchestration.

For example, it's straightforward to turn Step (2) into a loop that goes on until the agent is sure that the implementation matches the design.

---

Recently, Codex decided to nuke a feature I hadn't committed yet (it was working on unrelated stuff, saw code changes it didn't make, and decided they weren't necessary, lol).

Having the design doc for the feature saved me.

https://x.com/Nil053/status/2007668333659992531?s=20

---

More on my workflow:

https://x.com/Nil053/status/2004653858816135536?s=20

---

Origin of the term "spec based"

https://x.com/trq212/status/2005315275026260309?s=20
