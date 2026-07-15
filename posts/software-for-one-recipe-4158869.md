---
date: '2026-07-15'
timestamp: '2026-07-15T23:41:09.000Z'
source: both
status: published
xUrl: 'https://x.com/Nil053/status/2077539829127200934'
tweetId: '2077539829127200934'
linkedinUrl: 'https://www.linkedin.com/posts/nilmamano_my-current-recipe-for-making-software-for-one-share-7483306615929241600-4EGq'
segments: 1
tags:
  - ai
  - agents
images:
  - /posts/software-for-one-recipe-4158869/fully-connected-triangle.png
---
My current recipe for making software-for-one today, leveraging an always-on server.

It's a fully connected triangle: me, my agent, and the UI.

I set up a dedicated, always-on agent on my server for the new software. In my case, it's an Isomux agent, so it builds memory about the software across /clears.

I ask it to build v1: a minimal always-on web server, with state as raw files on the local file system, and a browser UI served on a port. The agent fully owns the tech stack and data format - I push back if it wants me to engage with that.

Me, my agent, and the UI all operate on the same state: the agent edits state by POST'ing to the web server, and changes I make in the UI reach the agent via an "updates" endpoint it knows to pull from.

I use the software two ways: through the UI, or by talking to the agent. The agent is best for updating state (I ramble at it with voice-to-text and let it figure out the precise operations needed); the UI is best for looking at it. Both can do both.

I keep refining the UI by talking to the agent, asking for features as I want them.

I can reach both the agent and the UI from any device, at any time. But that part isn't new, it's a principle we kinda forgot when we started running agents on our laptops.
