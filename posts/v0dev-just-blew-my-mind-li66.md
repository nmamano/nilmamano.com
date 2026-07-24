---
date: '2025-05-05'
timestamp: '2025-05-05T17:49:03.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7325214963520745472'
segments: 1
images:
  - /posts/v0dev-just-blew-my-mind-li66/114-feed-photo.jpg
tags:
  - ai
---
v0.dev just blew my mind.

So I'm building a side project (an online board game). I usually figure out the shape of things as I code them, but LLMs are better at new code generation than at refactoring, so I decided to write a design doc upfront to try to preempt as many direction shifts as possible.

Once I had the design doc (about 6000 words), I decided to throw it into a frontend generator and see what happens. The result was incredible.

v0.dev (free btw) one-shotted the whole app with great prompt adherence and, in my opinion, great taste to fill in the gaps (the design doc says basically nothing about styling, it's only about the logic).

I'm talking ~10 pages, ~20 files, ~3000 lines of next.js, mock data, and working navigation. Prompt was: "Create mocks for the attached design doc."

I did not have to break down the prompt into smaller chunks, as I'm so used to with tools like Cursor or basically anything LLM-based.

Link to design doc and ~10 screenshots of the output (+ a brief mention of other frontend generators I tried):
https://lnkd.in/gUhVJUaY
