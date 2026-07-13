---
date: '2025-09-09'
timestamp: '2025-09-09T03:07:21.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7371016092598722560'
status: published
xUrl: 'https://x.com/Nil053/status/1965250646191571318'
tweetId: '1965250646191571318'
segments: 1
images: []
tags:
  - ai
---
A question for vibe coders:

How do you get an LLM that can do a task for a single file to do it for many files?

Say I have ~1000 source files, and I want to ask an LLM to validate something for *every* file

Without getting into the specifics, what matters is that the task is simple enough that LLMs get it ~100% right for a single file.

But if I give Cursor the root folder and ask it to do the task for every file in it, it gets lost.

It starts reading random files, it validates a few, and then acts as if it validated all. Even when it creates TODO lists, it is far from exhaustive.

Any advice?

(The solution may be simple, but it's a frequent friction point for me.)
