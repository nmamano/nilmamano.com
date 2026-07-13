---
date: '2026-06-18'
timestamp: '2026-06-18T19:53:33.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7473462690318036992'
status: published
xUrl: 'https://x.com/Nil053/status/2067697243772313890'
tweetId: '2067697243772313890'
segments: 2
images:
  - >-
    /posts/day-67-of-building-agentic-tooling-until-2313890/2067697243772313890-HLHvqj-akAAWlPI.jpg
  - >-
    /posts/day-67-of-building-agentic-tooling-until-2313890/2067697243772313890-HLHvqjWa8AAojyy.jpg
tags:
  - isomux
  - blog
---
Day 67 of building agentic tooling until I get hired to build agentic tooling.

This time, I created a proxy that sits between your Claude Code session and Anthropic's servers, letting you see the raw text flowing through.

But more importantly, it gives you full control to edit the context, like doing brain surgery on your agent.

Why? Context accumulates junk, degrading attention and increasing costs.

Here are some examples of what the proxy can do:

- Delete obsolete data, like versions of code that you've iterated upon
- Compact only unimportant messages
- Fix past hallucinations with free-form editing
- Offload context that's unlikely to be needed again to the filesystem
- Strip a 10KB tool result that mattered for just one turn

You can do all this with a web UI or via a CLI, which means an agent can do it too.

The vision is that you can go to an agent and give it precise instructions like the ones above (in English), and it just works.

Full writeup and GitHub linked below.

---

https://nilmamano.com/blog/context-composer

https://github.com/nmamano/context-composer
