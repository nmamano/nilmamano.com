---
date: '2025-06-21'
timestamp: '2025-06-21T09:41:56.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7342124605517545472'
segments: 1
images: []
tags:
  - interview-prep
  - research
---
To get good at Greedy algorithms:

1. Brainstorm greedy rules: Greedy algorithms are usually for optimization problems where you can construct a solution by making a sequence of choices. In contrast to backtracking, where we explore all possible choices at every step, Greedy algorithms pick one choice (based on some criterion we must define) and commit to it. The upside is that it's much faster than backtracking, while the downside is that the choice we make may be suboptimal. The rule for what choice to make is known as the "Greedy rule." For the same problem, we can come up with multiple different Greedy rules. Some may be optimal, and some may not. Thus, the first thing we need to do, is to brainstorm different possible Greedy rules for your problem. But be aware that, for some problems, no Greedy rule works, and backtracking truly is the best we can do (or perhaps DP).

2. Focus on finding counterexamples: This is the most important skill. When you brainstorm a greedy rule (e.g., picking the cheapest item, picking the earliest meeting, etc.), immediately try to "set a trap" for it by constructing a small, non-trivial input where that greedy choice leads to a suboptimal outcome. If you find one, you need to either adjust your greedy rule or pivot to a different approach (like DP or backtracking).

3. Be ready to justify your approach: If you believe Greedy works, you must explain your intuition for why it is always optimal, even if you don't provide a formal mathematical proof (which is not expected in interviews). Use examples and diagrams. Without justification, even a correct greedy solution might send a negative signal to the interviewer, suggesting you just got lucky or memorized the problem.

4. Be prepared to pivot: Greedy algorithms are less common in interviews than DP and backtracking. Many problems that could seem like a good fit for Greedy actually require backtracking (when the solution space is small enough for exhaustive search) or DP.

5. Implementation and analysis are the easy part: Implementing Greedy often involves sorting the input elements based on the Greedy rule or sometimes using heaps to keep elements sorted by "most attractive". But this is usually straightforward.
