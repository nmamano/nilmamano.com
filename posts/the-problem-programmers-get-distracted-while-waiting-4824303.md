---
date: '2025-08-10'
timestamp: '2025-08-10T04:50:11.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7360172974722748416'
status: published
xUrl: 'https://x.com/Nil053/status/1954404889414824303'
tweetId: '1954404889414824303'
segments: 2
images:
  - >-
    /posts/the-problem-programmers-get-distracted-while-waiting-4824303/1954404889414824303-Gx9sqrCbsAAMmJb.png
tags:
  - ai
---
The problem: programmers get distracted while waiting for code generation, wasting time and energy context switching back and forth.

My proposed solution: a new AI Notification Queue UI element.

A background "agent" sees what you are doing and is prompted to "come up with things the user might want to know about, actions they may want to take, or changes they may want to implement".

Those things are packaged as notifications and added to a queue that the user can check while waiting for code generation.

Examples of notifications: missing unit tests, deviations from the style guide, missing imports, helpful code comments to add, inconsistent documentation, better variable names, etc.

Ideally, notifications come with a code diff where appropriate.

Goals achieved: (1) the user keeps their mind on the codebase, (2) extra layer to catch mistakes LLMs and humans miss on a first pass.

---

The closest thing I've seen is LLM code reviews. However, that doesn't help with keeping focus while waiting for code generation.

You can think of my proposal as the LLM peer review happening in real time, while you wait for code generation. Much more efficient.

Maybe Cursor should hire me to build this 👀
