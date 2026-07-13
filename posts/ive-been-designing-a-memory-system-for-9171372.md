---
date: '2026-05-30'
timestamp: '2026-05-30T00:15:04.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7466281080145481728'
status: published
xUrl: 'https://x.com/Nil053/status/2060515298739171372'
tweetId: '2060515298739171372'
segments: 2
images:
  - >-
    /posts/ive-been-designing-a-memory-system-for-9171372/2060515298739171372-HJhrs6CbAAAKKXK.jpg
tags:
  - isomux
---
I've been designing a memory system for Isomux.

In Isomux, agents are organized hierarchically: Office > Room > Agent

Features are shaped around this mental model.

For example, each layer has its own user-defined system prompt, which is inserted at the beginning of each session.

I want memories to follow the same hierarchy: they can be for a specific agent, a whole room, or the whole office.

Memory creation: a hook that runs after every turn. It extracts facts to remember, chooses their scope (agent/room/office), and stores them.

Memory retrieval: before every assistant turn, we'd pull relevant memories for this agent, the room they're in, and the office-wide context.

---

I experimented with an existing memory solution, mem0, but it doesn't fit this hierarchical memory shape. I'll probably roll my own following their open-source library.
