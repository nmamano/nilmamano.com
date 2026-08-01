# Agent UI post - thread-style running order

One standalone idea per entry. The sentence below each heading is the one that has
to land; the final post expands it to 20-60 words plus an image.

Marks: `[img]` = asset in hand. `[img*]` = asset I still need to pull from the
isomux repo or one of your posts. `(maybe)` = idea you haven't approved yet.

Write feedback after **Nil:** on each entry. Anything you want gone, just write
"cut". Reordering: write "move after N".

---

## 1. Anthropomorphize agents `[img]`

We're used to working with _people_, so make agents persistent. A name, a look, memories built over time, its own converstion history, etc.

Even better if you give them body language: let them look busy while working, wave when they need you, and nooze off when idle.

7

---

## 2. An office beats a sidebar `[img]`

Every agent management system converges on vertical tabs, so literally anything else stands out.

This office view lets you see, at a glance, each agent's body language, conversation summaries, and other humans' presence.

2

---

## 3. Let agents put things in chat that aren't text `[img]`

Add one REST endpoint per component, tell agents about it in the system prompt, and they stop describing things and start showing them.

3

---

## 4. Prettify curl tool calls `[img]`

Detect via regex when an agent curls your own system and prettify the tool call.

10

Bonus: each tool call should be a single line, unless it errored out. Otherwise they burry useful content.

---

## 5. Don't let agents yap. Make them design a slide `[img]`

A slide can't hold a wall of text, so the model has to decide what actually matters.

"Slide mode" takes the agent's last turn and turns it into a slide.

8

---

## 6. The context meter as a battery `[img]`

Remaining context is like your phone's battery. When it starts to run low, you need to start looking for a good stopping point and recharge.

In addition, when remaining context drops below 50% and 75%, I let the agent know, so they can start prompting the user toward a good stopping point.

10

---

## 7. Show me which words the model wasn't sure about `[img]`

The model produces probabilities for every word, how can we use that?

2

---

## 8. Minimize copy-pasting by letting agents message each other directly `[img]`

Agent-to-agent communication actually enables a whole lot of cool stuff, but we're still early (:

2

---

## 10. Human-collaboration at the agent level `[img: ghost video]`

Everyone is at a different point in their AI journey. Letting the technical users see the conversations of non-technical users and step in when they get stuck will be huge for onboarding non-technical users.

6

---

## 11. Make it easy for agents to tie loose ends. `[img]`

Give them access to a shared human-agent task board where they can put follow-up tasks for later.

I recommend having a /wrap-session skill that tells agents to make sure there's no loose ends by filing follow-up tasks, saving memories, updating skills, git stuff, etc.

3

---

## 13. Don't make users remember skill names `[img]`

Give them a UI to find their skills, sorted by what they use most.

I like to show the counts :)

9

---

## 17. Mixed human-agent queues

For a well-made queue, it's all in the details:

- let agents know who sent each message (which human and/or agent)
- let agents know whether the messages arrived in response to their last message or before that
- let users queue or steer
- let users modify queued messages
- etc.

3

---

## 20. Less magic `[img*]`

- Add commands for seeing the system prompt, disk use, etc.

**Nil:** It can have an image for the disk use command. I don't know if there are others we could add here.

1

---

## 24. The 5-hour hack `[img*]`

Ping each provider every 5 hours automatically. This way, the 5h window resets on average 2.5h after you start working.

1

---

## 28. Ask for variants, not an answer

For anything visual, generate several in parallel and put a toggle at the top.

**Nil:** we need an image for this

2

---

## 29. Stop making me the clipboard `[img*]`

Selecting text in the conversation (or the terminal) should offer to drop it into the chat.

Bonus: make it easy to copy content to clipboard anyway. There should be a copy button on each message, each md block, and for the whole conversation.

2

---

## 38. Usage pill `[img]`

See your 5-hour cap, weekly cap, or whichever one is currently closest to finished.

2

---

## 39. Deterministic hooks for big no-no actions

Like `rm -rf`, reading environment files, etc. Never allow these, but give the agent a way to make it easy for you to do them if you still want.

## Intro and outro

The intro is three sentences plus the thesis callout, and then straight into the
list. Current thesis: every idea here either makes agent state legible at a
glance, or shortens the distance between what the agent produced and what you do
next.

Outro should ask: Anything missing? Tell me your ideas.
