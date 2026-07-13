---
date: '2026-05-14'
timestamp: '2026-05-14T16:56:00.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7460734344228282368'
status: published
xUrl: 'https://x.com/Nil053/status/2054968986396504298'
tweetId: '2054968986396504298'
segments: 1
images: []
tags:
  - ai
---
Quick, practical agentic engineering tip: Tell your agents NOT to run the formatter before showing you the code.

Tell them to run it ONLY after final human approval.

Reason: A formatter modifies the files the agent is working on. The agent needs to re-read the modified files to keep working on them. The context ends up with multiple versions of the same file, only with slight formatting differences.

Not a good use of context.
