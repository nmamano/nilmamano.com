---
date: '2026-01-30'
timestamp: '2026-01-30T23:06:01.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7423139535049506816'
status: published
xUrl: 'https://x.com/Nil053/status/2017373764317810903'
tweetId: '2017373764317810903'
segments: 1
images: []
tags:
  - ai
---
Fix this easy agentic coding mistake now!

Are you doing this?

1. Running a process in a terminal.

2. Manually copying errors from the terminal to your agent.

Here's how to skip the copy-pasting:

1. When you run the process, stream the output to an additional log file. Instead of:

`bun run dev` (just an example)

Do:

`bun run dev 2>&1 | tee logs/server.log`

2. Tell the agent to access the log file as needed.

Now you can simply tell the agent: "check the server error" instead of copy-pasting, and it will use a tail command or similar on the log file.

The more related parallel processes you are running (3 in my case), the better, as the agent can decide on its own which logs to check.
