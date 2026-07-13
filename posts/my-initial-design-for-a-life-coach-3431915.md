---
date: '2025-12-28'
timestamp: '2025-12-28T22:44:51.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7411175109106794496'
status: published
xUrl: 'https://x.com/Nil053/status/2005409639983431915'
tweetId: '2005409639983431915'
segments: 1
images: []
tags:
  - ai
---
My initial design for a life coach chatbot. Poke holes at it.

I was writing new year's resolutions, and I thought it'd be great to chat with an LLM about them.

Goal: a chatbot you can talk to from any device, and which can read/edit the document with your goals. You should also be able to read/edit it from any device.

The tricky bit is persistent, shared state across devices.

Example: Claude Desktop can write local files via an MCP, but the phone app cannot read or modify those files.

Here is the workflow I had in mind:

First, you write your goals in a markdown file in dropbox. On desktop, it's a local file you can open with any editor; on your phone, you can still access it with the dropbox app.

To talk to the chatbot, you text a Telegram bot (among the major chat apps, it's the friendliest for bot integrations). Your message is forwarded to a daemon running on your desktop, which calls an LLM API (ChatGPT/Claude) with (1) the message and (2) the Goals file (read from disk).

The response has two parts: (1) a reply sent back to you via the Telegram bot, and (2) what to add to the Goals file, if anything, which the daemon appends to it.

There'd be a secondary prompt to compress the Goals file while saving the uncompressed version for bookkeeping. If we wanted this to be fully automated, we could have the daemon run this prompt automatically whenever the memory file reaches a certain size.

Another cool addition (inspired by @alexhillman): every morning, a cron job reads your goals file, sends it to the LLM API, and asks what you should focus on for the day. The response is sent to you proactively via the Telegram bot.

Does this already exist? Any better way to do this? Am I missing anything?
