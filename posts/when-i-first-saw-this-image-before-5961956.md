---
date: '2026-07-27'
timestamp: '2026-07-27T19:06:33.000Z'
source: original
status: published
xUrl: 'https://x.com/Nil053/status/2081818544115961956'
tweetId: '2081818544115961956'
segments: 2
images:
  - /posts/when-i-first-saw-this-image-before-5961956/harness.png
tags:
  - ai
  - research
---
When I first saw this image (https://x.com/a1zhang/status/2079203531127406893) before reading on, I pictured something simpler, and I wonder if there's any merit to it (on top of/in combination with the other ideas) (also, it may not be new).

A harness that is aware that the LLM is good at (has been RL'd on) tasks with a specific shape/domain, so it prompts the LLM to decompose arbitrary tasks into 2+ subtasks: one that is "in-distribution", and another that is easier than the original given the result of the first subtask.

Then, we can recursively chip away at out-of-distribution tasks with in-distribution tasks.

The prompt would look something like this:

"""The goal is to solve {current task}. You are really good at tasks that {description of the shape of in-distribution tasks}. If {current task} has that shape, solve it directly. Otherwise, propose a subtask that has that shape and which produces a result that is helpful to solve the original task. Here are the results from previous iterations: {results}."""

The harness would kick off that subtask, get back a result, and iterate.

Maybe doing agentic RL with a harness like that and a model that's already good at a specific domain would make the model improve at the in-distribution tasks *and* the decomposition step conjointly.

What seems promising is that you could do RL with a bunch of tasks from different domains, and instead of different domains pulling the weights in different directions, they'd all refine the same two primitives: decomposing and doing one specific task type well.

But the challenge is picking one domain/shape that a broad class of tasks can be reduced to.

---

Well, it doesn't have to be a single domain/shape. The harness could even dispatch the subtasks to different models RL'd on different task types. Like MoE at the harness level.
