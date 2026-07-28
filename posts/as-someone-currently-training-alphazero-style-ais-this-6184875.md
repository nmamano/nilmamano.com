---
date: '2026-07-28'
timestamp: '2026-07-28T17:50:27.000Z'
source: original
status: published
xUrl: 'https://x.com/Nil053/status/2082161778126184875'
tweetId: '2082161778126184875'
segments: 1
images: []
tags:
  - ai
---
As someone currently training AlphaZero-style AIs, this (https://x.com/MozarellaPesto/status/2081445835636654096) blew my mind!

I see a potential general recipe to solve the assignment problem in RL, even beyond self-play.

Instead of giving the agent full tasks, and then rewarding all the actions in the chain that leads to the goal, the agent learns backward, by starting from almost finished tasks.

We give the agent tasks that are already partially completed, and ask it to take a single step.

Some half-finished tasks will be just one action away from the goal, and if the agent picks it, we can nudge the model toward that (position, action) pair. For the rest of half-finished tasks, we don't learn much - the action didn't reach the goal, but we don't expect the goal to be usually reachable in one action anyway.

The key is to remember all positions for which we know an action that leads to the goal. By growing a data set of such positions, we can see which single-actions lead to one of them.

If (P, A) leads to the goal, and (P', A') leads to P, then (P', A') leads to the goal indirectly, so we can reward A'.

Where this breaks down is probably when the state space is too large/not discrete.
