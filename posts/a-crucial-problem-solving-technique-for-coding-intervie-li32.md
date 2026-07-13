---
date: '2025-10-06'
timestamp: '2025-10-06T00:43:36.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7380764631125979136'
segments: 1
images: []
tags:
  - interview-prep
---
A crucial problem-solving technique for coding interviews is the "Case Analysis".

With hard problems, you often don't know where to start.

But what you CAN do is sort the inputs into cases and tackle each case one by one.

Take the problem of finding the minimum in a sorted, rotated array with duplicates (a LeetCode hard, linked below).

The array could look like [4, 5, 6, 1, 3, 3, 4], and we should return 1.

My first thought was to apply binary search (given the trigger: sorted array), but the presence of duplicates gave me pause.

Imagine we check the midpoint, and we find...

[4, ?, ?, 4, ?, ?, 4]

It's unclear whether we should go left or right.

To get unstuck, I did a Case Analysis. My intuition was that the relationship between the first and last elements is important, so I classified the inputs based on that:

➤ Case 1: first < last
➤ Case 2: first > last
➤ Case 3: first = last

Tackling each of these cases individually is a lot less daunting.

➤ Case 1: first < last

We have something like [1, ?, ..., ?, 10]. We must realize that the array is not rotated at all; the elements after the rotation point can never be greater than the first element (an array like [1, 2, 3, 0, 10] is impossible).

So, for Case 1, we simply return the first element in O(1) time. ✅ 

➤ Case 2: first > last

This allows us to binary search for the rotation point.
We can define the 'before' region as elements >= first, and the 'after' region as elements < first. Then we binary search for the transition point and return the first element in the 'after' region.

This binary search takes O(log n) time. ✅
(Blog post about finding transition points linked below.)
 
➤ Case 3: first = last

Zoning in on this Case led me to come up with a worst-case input:

Imagine that the sorted array, before the rotation, is this: [0, 1, 1, 1, 1, 1, ...., 1]. After the rotation, this ends up looking like an array with all 1's, except a 0 at a random position. You can't binary search for that!

For this input, NO algorithm can do better than a O(n) linear scan. ❌ 

We could then pivot the conversation to perhaps improving the average runtime for Case 3.

LeetCode is not all about memorizing answers. Interviewers want to see strategic problem-solving like this.
