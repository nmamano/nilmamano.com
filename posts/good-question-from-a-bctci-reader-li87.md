---
date: '2025-02-17'
timestamp: '2025-02-17T22:58:08.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7297388880628961283'
segments: 1
images: []
tags:
  - interview-prep
---
Good question from a BCtCI reader:

> when discussing space complexity of a solution, is it a convention to include the output space used or is it merely discussing the extra space used by algorithm?

The rule of thumb we use is this:

If it's space allocated by *your* code, then you need to account for it in the space complexity (we call it extra space). If it's allocated by the caller (e.g., the input parameters to your function) then it doesn't count as extra space.

Following this rule, the output space counts as extra space because you created it (except in problems where you are asked to modify an input).

By the same logic, we also count the stack space implicitly used by recursive algorithms as extra space.

In any case, this is a great question to clarify with the interviewer. You can make sure you get it right *and* showcase knowledge about the nuances of big O analysis at the same time--win-win.
