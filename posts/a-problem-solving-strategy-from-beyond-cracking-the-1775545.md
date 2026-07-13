---
date: '2025-10-23'
timestamp: '2025-10-23T22:46:17.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7387257812994818049'
status: published
xUrl: 'https://x.com/Nil053/status/1981492401861775545'
tweetId: '1981492401861775545'
segments: 1
images:
  - >-
    /posts/a-problem-solving-strategy-from-beyond-cracking-the-1775545/1981492401861775545-G3-s1UvW4AAC9nb.jpg
tags:
  - interview-prep
---
A problem-solving strategy from Beyond Cracking the Coding Interview that I haven't seen anywhere else, at least put this way:

If you're stuck on a problem, STOP thinking about algorithms and data structures.

Instead, look for properties *about the problem* that are not mentioned in the statement.

Once you find a property, you can THEN ask how it can be leveraged to design an algorithm.

For example, consider the problem of finding the longest path in a rooted tree.

With n nodes, there are O(n^2) possible paths -- too many to inspect individually.
Before thinking about what to implement, ask a more basic question:

"What are things we can say about rooted trees?"

Here's one: any path in a tree has a *single* node with minimum height: the lowest common ancestors of the endpoints.

Now that you have a property, ask: "How could it be leveraged to design an algorithm?"

The property we found allows us to shift our focus from paths (of which there are O(n^2)) to lowest common ancestors (of which there are O(n)). A promising direction to explore.

My mental image is that I'm rock climbing, halfway up the wall, feeling the rock around me for potential holds. Finding a property *feels like* finding a good ledge.
Like in climbing, not all ledges you find end up being necessary or even useful, and you may need a combination to make it up.

So, a property is not an algorithm -- it's an extra tool we can use when we design one.

(Oof, I find myself in the awkward position of having written a sentence that reads LLM-generated; I could change it, but I kinda like it, so I guess I'll just acknowledge it looks suspicious. 😅 Would I have written it this way if I had not been exposed to AI slop for the past however many months? That, we'll never know...)

---------------------------

Anyway, the reason for framing problem-solving this way (find properties first, *then* use them to design algorithms) is that it reverse-engineers how many LeetCode problems are set up.

Yes, some LeetCode questions come from actual work problems, with the context stripped away. But for some others, the problem setter starts from an interesting property, like "an array has (n+1)*n/2 subarrays," and then comes up with problems where the solution is to use that property.

For example: "Given a string s, return the number of substrings of s without the letter A."

Without the property, you are hopeless. With it, it's straightforward.

Problem setters (both in LeetCode and in bouldering gyms) make problems harder by (1) requiring more niche properties (or holds), (2) requiring a combination of them, or (3) obscuring the right one to use.

So, when we say to hunt for properties, we are often looking for something that has been *intentionally* hidden.
