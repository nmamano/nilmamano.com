---
date: '2026-03-31'
timestamp: '2026-03-31T16:35:34.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7444784313566597120'
status: published
xUrl: 'https://x.com/Nil053/status/2039018779296829745'
tweetId: '2039018779296829745'
segments: 1
images: []
tags:
  - ai
  - personal
---
I spent most of yesterday trying to understand Claude Code skills, and today the Claude Code source leaked. 🫠

One of my questions was:

If skills are just prompts, how does "/loop" schedule a prompt to be fired at regular intervals?

It sounds like it needs some runtime support...

So today I peeked at the source code to confirm: skills are just prompts.

How it works: /loop tells the model to call the "CronCreate" tool, which creates a cron job.

The "runtime support" lives in the tools, not the skills.
