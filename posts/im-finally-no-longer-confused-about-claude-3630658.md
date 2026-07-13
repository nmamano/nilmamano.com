---
date: '2026-03-31'
timestamp: '2026-03-31T16:24:49.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7444781520789237760'
status: published
xUrl: 'https://x.com/Nil053/status/2039016074113630658'
tweetId: '2039016074113630658'
segments: 2
images: []
tags:
  - ai
---
I'm finally no longer confused about Claude Code skills.

This should help your mental model:

Skills can come from a few places, some hardcoded and some discovered dynamically.

There is a hierarchy that determines which one you see if there's a name clash. From highest to lowest priority:

1. Hardcoded commands: /clear, /compact, /model, etc.

These are not actually skills because they don't prompt the model. They just share the slash syntax. The logic is hardcoded in the CLI tool; they can't be overridden.

2. Enterprise skills: set by the company.

They have the highest priority, giving the company control.

3. User skills: folders in ~/.claude/skills/.

These follow you everywhere in that machine.

4. Project skills: folders in .claude/skills/ in your repo.

They are available based on Claude Code's cwd (current working directory). Interestingly, user skills have HIGHER precedence than project skills. That's not intuitive to me.

5. Bundled skills: /review, /simplify, /loop, etc.

These ship with Claude Code and have the lowest priority.

Bonus 1: skills replaced the "command" system; while commands are still supported (e.g., files in ~/.claude/commands/), skills take priority if there's a name clash.

Bonus 2: MCP prompts also appear as slash commands (e.g. /mcp__github__list_prs), but they live in their own namespace so they never collide with skills.

---

I had to understand their system for http://isomux.com. I have in fact added my own tier of isomux-bundled skills, which have priority 4.5.
