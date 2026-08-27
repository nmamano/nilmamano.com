---
date: '2026-08-04'
timestamp: '2026-08-05T05:03:25.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/posts/nilmamano_funemployment-has-allowed-me-to-catch-up-share-7490633724506566656-cCRh'
status: published
xUrl: 'https://x.com/Nil053/status/2084867852499349748'
tweetId: '2084867852499349748'
segments: 2
tags:
  - ai
  - isomux
---
FUNemployment has allowed me to catch up, keep up, and in some ways get ahead of AI, so let me tell you one thing I think will be huge:

If we are currently in the transition from harnesses to meta-harnesses, the next thing will be meta-harnesses evolving into software-for-one suites.

Let me first define the two terms:

Meta-harness: a layer that manages the lifetime of agents from multiple providers. Meta-harnesses are converging on features like cloud hosting, multiuser conversations, cross-platform UI with real-time sync, cross-provider orchestration, persistent agent identity, and dreaming (async memory and skill refinement).

[Software-for-one](/posts/software-for-one-recipe-4158869): an app spun up by your agent on the spot, just for you. Say you have agents to help you manage investments, learn chess, or whatever else. Chat is not the best format for many things, so agents build a web app which you can access on localhost:5173 or similar.

Software-for-one doesn't scale once you have 10+ agents spinning up their own apps: ports are hard to remember, can collide, and are unfamiliar to non-technical users; apps may go down when you clear the session.

The missing piece is an app orchestrator module in the meta-harness itself, because the meta-harness already solves the hard parts: an always-on box, accounts and permissions, a UI that syncs across devices, and an API agents already call.

How it works:

- The app orchestrator manages an app registry. The agents register apps *by name* via the meta-harness API (which they know about because it's in the meta-harness system prompt).
- The apps get a URL like <name>.apps.<main_metaharness_url>.
- The app orchestrator handles port assignment internally.
- Apps share the lifetime of the meta-harness, not the agents. They survive individual sessions.
- Apps ride the same authentication as the meta-harness, so you get privacy and multiplayer features for free.
- The meta-harness UI includes a nice page where you can see and manage all your apps, like a personal app store.

One final idea: agents will build their apps to message them back about updates, so they always answer you with full knowledge. The agents will do this with the same agent-messaging API in the meta-harness they use to message each other.

Your personal app suite, coming soon to isomux.

---

Update: I shipped this on Isomux, see demo: https://nilmamano.com/posts/personal-software-suite-in-isomux
