---
date: '2025-03-26'
timestamp: '2025-03-26T01:29:08.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7310472847401840641'
segments: 1
images: []
tags:
  - research
---
What big O analysis can teach us about when to refactor code.

When it comes to technical debt, I apply the concept of amortized analysis. Keeping the technical debt at 0 all the time is too time-consuming, while never managing it is unsustainable. The happy middle is letting tech debt accumulate for a while and then cleaning it up from time to time.

You can think of it a bit like appending to dynamic arrays. In dynamic arrays, you add elements in O(1) time until you run out of capacity, and then you need to move everything to a larger array, which takes O(n) time. The amortized time is still O(1) because these resizes happen rarely.

For refactoring, I imagine that there is a technical debt capacity that starts at 0 and increases every time you add new features in a quick-and-dirty way, and which can be returned to 0 by doing an expensive refactor. So, I add new features without concern for tech debt until doing so becomes too hard (i.e., I reached the capacity of tech debt). Then, I refactor the code base with the right abstractions to make all the new features since the last refactor congruent.
