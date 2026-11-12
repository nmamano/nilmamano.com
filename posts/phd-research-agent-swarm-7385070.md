---
date: '2026-10-20'
timestamp: '2026-10-20T16:28:25.000Z'
source: both
status: published
xUrl: 'https://x.com/Nil053/status/2112581713977385070'
tweetId: '2112581713977385070'
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7518347966328225793'
segments: 1
tags:
  - ai
  - research
---

I did my phd in algorithms and data structures. A few weeks back, I tried giving problems from my reseach to an agent swarm, asking them to try to close some asymptotic gaps.

They went crazy; they went on for days, improving my results again and again. Research is like catnip to them - OpenCode blocked my IP for abusive use, lol.

A few days later, OAI and Ant drop breakthroughs to classic problems like 3SUM and integer multiplication.

But just by tiny epsilons. Organically, a community effort started pushing these epsilons further down. You don't need any knowledge to join, just as much LLM inference as possible.

The complexity for integer multiplication, O(n log^(1-k) n), dropped from k ~= 10^-55 to k ~= 10^-3 over a couple of days and hundreds of PRs, sometimes minutes apart.

But what do you do with a firehose of agent-generated "claims"?

That's where Lean comes in. Some breakthroughs (like 3SUM) came with a Lean proof, while others (Integer multiplication) did not.

For integer multiplication, there's now a second race, trailing behind, of what's the best  epsilon that has been verified.

To my engineering brain, it seems there's a need for new infrastructure for this kind of research. New ways to aggregate, verify, coordinate, and broadcast findings.

So I built https://bigOspeedrun.com. But it's just one of many projects popping up. The category is still being defined.
