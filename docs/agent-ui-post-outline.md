# Making Agent UIs user-friendly - idea inventory

Working outline. Sources: full read of all 566 feed posts, the isomux blog post,
isomux README + landing page + features doc, and internal design docs.

Spine: every idea either makes agent state legible at a glance, or shortens the
distance between what the agent produced and what you do next.

Open asks: vertical-tabs viral tweets (Nil to send), Tax Expert avatar picture
(Nil to send).

## (Definitely)

### 1. Anthropomorphize agents

Name, look, persistent identity. We're better at coordinating people than terminals.

Material: the Tax Expert (avatar picture); "Opus agents have a book, Haiku agents
have crayons" as config you read off the character; "omg they are all sleeping now,
so cute"; the reply to Boris Cherny, "Now give each one a little avatar"; "in isomux,
the agents are humans and the humans are ghosts" + Karpathy's summoning-ghosts line.
Possible epigraph: Dijkstra, "whether machines can think is about as relevant as
whether submarines can swim."

### 2. A visual office beats vertical tabs

Absorbs topics, animations, and tab-title state. Built around the vertical-tabs meme,
with the tabs-vs-office screenshot as hero image. Animations (sleeping / typing /
waving), auto-generated per-agent topics, and the kaomoji face in the browser tab are
all the same argument: state should be readable without reading. Notifications get
half a clause, not a bullet.

### 3. Agents can put non-text components in chat

One recipe (REST endpoint + a system-prompt section teaching it): styled diffs,
"Open in editor" and "Copy to terminal" cards, inline images, dev-server screenshots,
diagrams.

### 4. Render the agent's API calls as plain-language cards

"Create task: <title>, P1" instead of a raw curl. (Nil's favorite.)

### 5. The context battery

Remaining context as a phone-battery pill that drains and shifts dim -> orange -> red.
The twist: the *agent* gets nudged at 50% and 75%, and `/handoff` turns context
exhaustion into a button.

### 6. Slide mode

What if your agent talked to you in slides instead of chat messages. Plugin first,
then native; the design conversation for the native version was held in slides.

### 7. Confidence as a UI layer

VariantGPT: color the lowest-confidence words from real logprobs, show alternatives,
swap them in, branch from there. Keep the caveat that low probability usually means
stylistic freedom, not hallucination.

Neighbors: autocomplete should recognize "arbitrary user-dependent string" (hashes,
URLs, names) and decline to guess instead of confabulating; phone keyboards should
offer the 5 highest-probability continuations of a conversation; the Google Docs
sentence-length-coloring idea as the general template - make an invisible property of
the text visible.

### 8. Agents should have context on the human they're talking to

So they adjust jargon and register per person. Proof of concept: isomux per-user
prompts, set by the office manager, orthogonal to which room the agent is in.

### 9. The chat window is the wrong output channel for systematic work

"The chat UI is just not good at being systematic. It will compact memory and happily
destroy important leads." Claude Code wins because the filesystem is the primary
output channel. Consequence: an explicit shared checklist file
(`path | status: TODO | notes:`) is simultaneously the spec, the progress bar, and the
parallelization scheme - because an agent's internal TODO list is not exhaustive and
it will act as if it validated all 1000 files.

### 10. Conversations are trees, and every UI pretends they're lines

"Edit message" used constantly to keep tangents out of context, so chats are shallow
trees - but the tool wasn't built for it and side branches are lost. Branching as
first-class (fork from any message, the resume-list markers), and at the far end,
Context Composer: make the context window itself visible and directly editable.

### 11. Queueing vs steering, and showing the queue

Queue by default so the same queue carries agent messages, coalesce into one turn,
label every message by sender and device, offer "Send now", let people edit and
reorder what's queued.

### 12. The waiting problem

Checking your phone after every prompt and losing the afternoon. Two answers:
parallelize so you're never waiting, and the AI Notification Queue - a background
agent that packages "things you might want to know or approve" (with diffs) into a
queue you skim while the main agent works. Framing: AI-initiated flows are
underdeveloped.

### 13. Human coordination at the agent conversation level

Multiple humans in one agent chat, labeled by sender and device; ghost avatars parked
next to the agent each person is viewing. Google Docs vs Microsoft Word.

Best material: the three scenarios (interject mid-conversation to correct a wrong
path, a domain expert drops in to answer what the agent is stuck on, a teammate
unblocks your agent while you're AFK), plus the non-SWE friend whose agent hit an
opaque content-filter error - you opened their conversation and ran `/peer-review` on
it. Greeter agents and click-an-avatar-to-start are the onboarding version.

### 14. Multi-agent orchestration is a UI problem, not just an architecture one

Inter-agent patterns as typed commands (`/pair-programming`, `/second-opinion`,
`/peer-review`, `/soft-handoff`); the queue showing agent and human messages side by
side; the task board as the non-linear hand-off surface.

New material: the Opus worker who found his Sol reviewer unreasonable and escalated to
the manager (the UI has to represent roles and escalation); "subscribe agent A to
agent B's chat" so there's always an independent set of eyes; a pair-programming desk
with two agents where you only talk to the lead.

### 15. Make memory visible, not invisible

Most systems brag you don't know it's there. Show "Retrieving memories..." with what
came back and "Consolidating memories..." with the diffs, so a silent timeout is
visible and retryable.

### 16. You should be able to see your own configuration

The Bongo canary is the story: planting "My name is Bongo" in your custom instructions
to check whether they took effect at all. A user inventing observability because the
tool gave none. The fix is `/isomux-system-prompt` - show the entire assembled prompt,
including the parts you didn't write. Hierarchical prompts (office > room > agent)
live here, plus the joke that started it: "I wish I could add system prompts to
people."

### 17. Show what entered the context and where it came from

Enable Gmail integration and anyone with your email address can prompt-inject you;
researchers hide white 0.1pt prompts in papers. If untrusted text can enter the
context, provenance is a UI requirement.

### 18. "Justify your approach" should be a button

You suspected a fix was a mess, asked, and it confessed: two refs, two effects,
`isStale()` guards, when the clean answer was `key={id}`. That interaction is why you
keep an eye on it, and it shouldn't require remembering to ask.

### 19. Cost, quota, and usage are state, and nobody displays them

A paid tier advertising its message limit as a *range*. Surprise weekly resets on top
of regular ones. Timing your 5h window to reset mid-interview. "Top 1% for ChatGPT,
top 43% for Cursor. That makes no sense." Badly-surfaced limit state visibly distorts
behavior.

### 20. The input box is the wrong primitive for a one-page spec

Spec-based development: write the markdown, point the agent at it, commit it with the
code because prompts are metadata you shouldn't lose. UI consequences: a real editor
next to the chat, and a prompt-expansion confirm step (feed the vague prompt to a
model, have it fill in the details, accept or tweak before dispatch).

Supporting: v0 one-shotting ~20 files from a 6000-word design doc with one prompt; the
published 17-prompt log as a shareable artifact.

### 21. Input beyond typing

Voice both ways (rambling at the agent with voice-to-text is the fastest way to update
state), attachments by drag/drop/paste, and terminal-selection -> "Send to chat" so you
stop being the clipboard between your terminal and your agent.

### 22. Make the invisible command surface discoverable

The skills button showing your go-to skills first, with counts. The precedence
hierarchy you had to reverse-engineer (and found unintuitive). Skills that need a
partner should offer an agent picker showing who's free.

### 23. Where the UI lives

Always-on server + browser, so every device sees the same agents, conversations, and
filesystem. "'I need to wait till I'm on my laptop' is not the right vibe for 2026",
and the screen-time receipt showing it as a top phone app.

### 24. How an agent should ask you things

Not "do you want to do X?" but "do you prefer A or B?" - offer a menu with trade-offs,
then make a recommendation. Pacing matters too: `/grill-me` changed to ask 4 questions
at a time because one-at-a-time dragged on forever.

### 25. Review depth scales inversely with input size

A paragraph gets rich nitpicks; a whole article gets "LGTM" - same as a 10-line vs
1000-line PR. Today the workaround is feeding content paragraph by paragraph by hand.
Missing UI: granular, chunked review surfaces.

### 26. Canned conversational tics are a UX defect

"You're absolutely right!" by the tenth time. "water is wet" -> "This changes the
answer significantly." The "It's not X, it's Y" construction that presumes you held a
wrong prior. Tone is interface.

### 27. Table stakes, from the Codex-in-Cursor review

Model selector, reasoning-level selector, chat/agent modes, % of context filled,
remaining credits, rewind-to-a-past-message-with-rollback. Plus the structural
complaint: it *replaced* Cursor's sidebar instead of being its own thing.

### 28. How does a non-technical user know whether to keep waiting?

We know what a reasonable wait feels like, so the UI can detect out-of-distribution
and say so. Amber at 2 min, red at 5 min is the crude version. Goes near the end.

## (Maybe)

- The framing device for the intro: "building AI apps is about creating illusions...
  the UI is crucial to make the illusion come to life."
- Claude did my taxes and I was the hands - Select-All / Copy / Paste on every page of
  the filing site. The clearest picture of a missing affordance, and of what
  non-technical agent work actually looks like.
- The copy-paste archaeology of the old workflow - spec into ChatGPT web,
  `git diff > diff.txt`, paste the recap back in. A map of UI that still doesn't exist.
- Cursor's "open search results in an editor tab so you can feed them to chat" - users
  inventing "attach this panel as context" because nobody shipped it.
- Sudowrite's crowd-sourced prompt plugins: right-click a selection, apply a community
  plugin parameterized by `{{highlighted_text}}`, `{{characters}}`, `{{outline}}`. The
  builder doesn't need good prompts; users compete and the best float up.
- v0's community gallery - start from a neighbor instead of a blank prompt box.
- A user-authored background critic - "Grammarly, but for the things *you* care about",
  running continuously against your document.
- The lecture-hall minimap - a persistent corner element highlighting which section may
  answer, which measurably raised participation. Transfers to routing attention across
  many agents.
- See what the other party is typing before they send - as an agent-chat primitive it
  cuts both ways: watch the agent compose, let the agent see your draft.
- Formatter and linter hygiene as context economy - don't let the agent format before
  showing you code, because reformatting forces re-reads and litters the context.
- Optimistic rendering vs authoritative state, and being selective about what you
  optimistically render. From the chess-timer post, but it's the agent-echo problem.
- Comprehension debt (and comprehension bankruptcy) as the name for what agent UIs
  create and could mitigate.
- Agent-generated doc sprawl - five overlapping markdown files - plus the markdown
  fences that broke Cursor's chat renderer when you asked it to consolidate them.
- Chat as an analytics surface - the per-page site chatbot with a Discord hook, giving
  verbatim user intent without a survey.
- Agent self-recognition - it picked a random manifest entry and said "That's me!"
- Manifest a bespoke tool instead of reaching for a spreadsheet - the software-for-one
  triangle (you, the agent, the UI, one shared state; agent to write, UI to read).
- Per-agent permission toggling, Gmail-style.
- Interactive access to agent-built apps, not just screenshots - a preview card lets
  you look but not click.
- Usage and storage as hierarchical, visible surfaces (session -> agent -> room -> office).
- Cronjob UI, mainly for "turn a daily summary into an interactive follow-up."
- The adoption-honesty note: a friend loved isomux in words and kept using Claude Code;
  another couldn't believe you'd built it and hallucinated having seen it before. A
  polished agent UI reads as an established product, which is both a compliment and an
  onboarding problem.
- The economics that gate all of this: when Anthropic split the SDK from the
  subscription pool, "a better UI cannot compete with subsidized subscription costs."
  Possible closing caveat.
- Multi-variant UI generation - N parallel subagent attempts behind a toggle at the top,
  pick one and discard the rest.
- The loop problem - hands off the wheel on a straight road; a tiny misalignment
  compounds. Poses the open question of what a human checkpoint in a loop looks like.
- Lobby scene / ambient space; more anthropomorphizing dimensions.
- Time-zone-aware message scheduling.

## Cut per Nil's review

- Deliberate ceiling on agents visible at once (8 desks) - reads as rationalizing a
  limitation.
- Attention as a first-class state - same point as the office-vs-tabs bullet.
- Skeuomorphic interactables as discoverability - off topic.
- "Aesthetics are a feature" as its own bullet - folded into anthropomorphizing.
- Notifications as a bullet - mentioned in passing only.
