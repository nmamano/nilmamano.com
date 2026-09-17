---
date: "2026-09-15"
timestamp: "2026-09-16T00:18:47.000Z"
source: x
status: published
xUrl: "https://x.com/Nil053/status/2100016513545822526"
tweetId: "2100016513545822526"
segments: 1
tags:
  - ai
  - isomux
---
Hard to get browser use for cloud agents to feel right on browser clients (perhaps ironically).

The main decision is whether to run the browser on the client or headless on the server.

On the server would be ideal so the same browser can be streamed to multiple clients. The easy solution is a stream of screenshots, but it feels teeerrible.

Local browsers works for desktop apps, but browser-in-browser is restricted (CoRS issues etc.).

Then there are browser extension shenangians, but who wants to deal with setting up extensions...

Trying next:

- Server side: remote-DOM-sync libraries like rrweb
- Client side: libraries like Scramjet that help bypass CoRS issues

Would love to hear your take if you've worked on this.
