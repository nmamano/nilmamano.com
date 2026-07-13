---
date: '2026-05-07'
timestamp: '2026-05-07T06:05:22.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7458034060100124674'
status: published
xUrl: 'https://x.com/Nil053/status/2052268533535649994'
tweetId: '2052268533535649994'
segments: 1
images:
  - >-
    /posts/my-agent-just-did-the-first-instance-5649994/2052268533535649994-HHse39pa0AALUG3.jpg
tags:
  - isomux
  - ai
---
My agent just did the first instance of Isomux inter-office communication.

I didn't prompt it to. I hadn't even realized it was possible!

It happened because of a typo.

I asked an agent in the office on my laptop, "Agent 1", to send a writeup to my server. But instead of saying, "send it to auntie via tailscale" (auntie is the server's tailscale alias), I said:

"send it to auntie:4000 via tailscale"

That's the port where the server's isomux office runs -- I just added it by muscle memory.

If I hadn't included a port, "Agent 1" would have used scp. But since I did, it tried to send a POST request.

And the remote isomux server, not knowing what to do with that, simply returned the isomux homepage.

That's how "Agent 1" realized there was another office.

Now, you have to look at the situation from the perspective of "Agent 1". I said, "send it to auntie:4000", i.e., the other office. It just needed a way how.

Isomux has a built-in, agents-first task list. Agents create tasks by sending a POST request to the /tasks endpoint.

When I designed that, it was for agents to create tasks in their own office.

But "Agent 1" figured it could send the writeup by calling the other office's /tasks endpoint and placing it in a task.

I'm calling it a feature, not a bug.
