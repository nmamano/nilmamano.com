---
date: '2025-12-26'
timestamp: '2025-12-26T20:41:39.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7410419609691934720'
status: published
xUrl: 'https://x.com/Nil053/status/2004653858816135536'
tweetId: '2004653858816135536'
segments: 1
images: []
tags:
  - ai
---
Avoiding architectural rot is the most important part of a sustainable vibe-coded project. This is the workflow for adding features I've gradient-descended upon:

1. I describe the feature in info/{feature}.md

2. I copy-paste the feature doc to ChatGPT (website), asking it for feedback (e.g., on underspecified aspects that an agent could go wrong with). I iterate on improving the prompt.

3. I give the feature doc to an agent, asking it to implement it and explain the changes in detail at the end (this is needed for Step 4). For the agent, I use Claude 4.5 Opus or GPT-5.2-Codex, with Thinking enabled.^1^2

Bonus: I make sure my agent knows how to run the formatter, linter, tests, and build.

4. I copy-paste the agent's recap of changes, along with the entire diff (git diff > diff.txt), to the same conversation on the ChatGPT website. I ask for correctness as well as architectural issues.^3

5. I iterate with the agent on feedback from ChatGPT. Some feedback may not make sense or be overly nitpicky; I extract the important bits.

6. Commit the changes along with info/{feature}.md.^4

---

I'm never fully out of the loop. I especially pay attention to the initial design doc, ChatGPT's feedback around architectural issues, and the list of modified files. My focus is architectural rot. If the agent makes a mess in satellite parts of the codebase, I don't really care.

^1: I choose the model based on available credits (right now, I have the $20 subscriptions to Cursor, ChatGPT, and Claude -- this is the cost sweet-spot for my usage band).

^2: Sometimes, I add an intermediate step where I ask the Agent how it would implement the feature, rather than telling it to implement it directly. Then run the answer by ChatGPT (on the same conversation; ChatGPT doesn't have the full code base as context, but it can usually sus out bad choices). Then, I add the approved implementation approach at the end of info/{feature}.md.

^3: I know all agents have review features now, but the website is cheaper and better - IME ChatGPT's lack of context helps bring a different perspective, balancing the agent's weak spots.

^4: I think prompts are important metadata that shouldn't be lost completely.
