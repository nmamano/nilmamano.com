---
date: '2026-05-09'
timestamp: '2026-05-09T19:13:11.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/2053191571697483866'
tweetId: '2053191571697483866'
segments: 1
images: []
tags:
  - isomux
---
I'm trying to put into words Isomux's thesis.

It started with:

"The agent management system needs to be cute because that's what devs are going to state at all day."

But I think now it's something like:

"Every feature in an agent management system needs to be multi-device, multi-user, and multi-agent."

The new message queue is the perfect example:

Say Alice is an agent in your office, and she's busy.

She can still receive messages from (1) any of your devices, (2) any human user with access to the office, and (3) any other agent in the office.

When she's done, all these messages get coalesced and sent as a single prompt, with clearly labeled origins.
