---
date: '2025-09-24'
timestamp: '2025-09-24T19:13:07.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7376693856647467011'
status: published
xUrl: 'https://x.com/Nil053/status/1970929506920825249'
tweetId: '1970929506920825249'
segments: 1
images:
  - >-
    /posts/new-skill-unlocked-codebase-wide-llm-refactors-that-0825249/1970929506920825249-G1ol3kLbUAASoXp.png
  - >-
    /posts/new-skill-unlocked-codebase-wide-llm-refactors-that-0825249/1970929506920825249-G1ol48vbUAAcG9k.png
tags:
  - interview-prep
  - ai
---
New skill unlocked: codebase-wide LLM refactors that don't miss any files.

We received a 4-star review for Beyond Cracking the Coding Interview.

Their gripe: the test cases for the problem don't always match the problem constraints. Fair enough.

I wanted to fix this systematically, but we have 274 problems, and the problem constraints and test cases for each one are not even in the same file.

Here's what doesn't work at all: "Hey agent, go through every problem and make sure all the test cases fit the problem constraints."

The Cursor agent tries to make its own internal checklist, starts opening a bunch of files without rhyme or reason, maybe makes some changes, and after a while tells you it's all done.

The key to making this work: an EXPLICIT checklist.

Before I start working with agents, I create a file with one line per problem. Each line looks like this:

path/to/problem/folder | status: TODO | notes:

I then give the agent a prompt that instructs it to process each problem in this file, from top to bottom, updating the status to OK / MISMATCH / UNSURE / ERROR, and adding notes accordingly.

GPT helped me refine this prompt (I can share the exact comments if anyone is interested).

Now, a single agent would take a long time to process 274 problems. They can't even fit more than ~50 in their context.

But the explicit checklist also makes it easy to parallelize. I spawned 4 agents in parallel, adding an extra line at the end of the prompt that is different for each one:

YOUR GOAL IS TO PROCESS ROWS 1 to 40.
YOUR GOAL IS TO PROCESS ROWS 41 to 80.
YOUR GOAL IS TO PROCESS ROWS 81 to 120.
YOUR GOAL IS TO PROCESS ROWS 121 to 160.

They all worked in parallel, smoothly. They missed a few rows, but it was easy for an agent to perform a final pass and look for any remaining rows with a TODO status.

And it paid off: the agents found 13 problems with problematic test cases.

Next time, I'll try more than 4 agents, but I think I'll give each agent their own file to ensure they stay on track.

Bonus tip: Sometimes, Cursor offers promotions where certain models are "free" (I think you still need a subscription, but they don't count toward the usage cap). I used one of those for this refactor.
