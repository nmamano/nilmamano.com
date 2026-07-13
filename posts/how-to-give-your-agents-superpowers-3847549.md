---
date: '2026-05-10'
timestamp: '2026-05-10T17:03:48.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7459285911483183104'
status: published
xUrl: 'https://x.com/Nil053/status/2053521396303847549'
tweetId: '2053521396303847549'
segments: 1
images:
  - >-
    /posts/how-to-give-your-agents-superpowers-3847549/2053521396303847549-HH-RPdgbsAARX3t.jpg
tags:
  - ai
---
How to give your agents superpowers:

1. Run your Agent SDK wrappers in your own server and make a custom UI for it (in my case, bun server + web UI).
2. Add a REST API to the server for adding custom components in agent conversations.
3. Tell your agents how to use the API in the system prompt.

Examples of what this enables agents to do:

Render styled side-by-side diffs in chat:
POST /agents/:id/diff { dir }

Surface "Open in editor" cards for files:
POST /agents/:id/edit-file { path }

Surface "Copy to terminal" cards for commands:
POST /agents/:id/terminal-command { command }

Send messages to other agents:
POST /agents/:id/message { text, senderAgentId }

Render images in chat:
GET /agents/:id/read-file { path }

Create and complete tasks on a shared task board:
POST /tasks

That's the architecture behind Isomux.
