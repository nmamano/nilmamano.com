---
date: '2026-05-03'
timestamp: '2026-05-03T06:13:10.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7456586432552488961'
status: published
xUrl: 'https://x.com/Nil053/status/2050820945129148560'
tweetId: '2050820945129148560'
segments: 1
images:
  - >-
    /posts/im-thinking-through-whether-to-add-agent-to-agent-9148560/2050820945129148560-HHX6tIqakAASgQR.jpg
tags:
  - isomux
  - ai
---
I'm thinking through whether to add agent-to-agent communication to isomux. Feel free to poke holes in my design.

Agents can already learn about each other through a manifest, which I use to transfer context between agents or to get a second opinion when an agent seems to be going off-track.

But an agent can't inject a message into another agent's chat.

The new mechanism for this would be POST commands to the isomux server, like in this example:

1. Agent Alice is failing at some task.
2. User goes to Agent Bob and says: "Alice is thrashing, can you help her get back on track?"
3. Bob reads the agent manifest to find Alice's ID and the logs for her current session.
4. Bob reads the logs and comes up with what to say to Alice.
5. Bob calls curl -X POST localhost:4000/agents/{alice-id}/message
6. The server (which runs in localhost:4000) queues the message until Alice is idle, and then injects it (labeled as coming from Bob).
7. Alice receives the message and acts upon the feedback.

The question is, how will Bob know if he's completed his task (helping Alice)?

I think the cleanest solution is for Bob to end his message with "Send me a message back if you need anything else, or to confirm when you're done."

Bob goes idle until Alice awakens him.

The two can have an autonomous back-and-forth as long as they feel like it.

A line in the system prompt telling agents to request a reply when messaging another agent should be enough to bootstrap this.

Giving agents new capabilities is fun, but this feature feels a bit gimmicky to me...

What use cases do you see for this?

And how would you prevent two or more agents from spiraling together and burning a ton of tokens?
