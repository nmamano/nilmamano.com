---
date: '2024-12-28'
timestamp: '2024-12-28T04:04:25.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7278621792473137153'
segments: 1
images:
  - /posts/any-competitive-coders-around-here-i-have-li94/137-feed-photo.jpg
  - /posts/any-competitive-coders-around-here-i-have-li94/138-feed-photo.jpg
tags:
  - interview-prep
---
Any competitive coders around here? I have a question about monotonic stacks & queues.

Is there something monotonic stacks can do that monotonic queues can't?

I haven't used either of them much myself, so I want to run my thought process below by a more experienced competitive coder.

My understanding is that each of those has one main application.

For monotonic stacks, the application is the "Next Greatest Element" (NGE) problem: given an array, arr, for each index i, we want to find the next element after it that is greater than arr[i] (if any).

For monotonic queues, it is the "Sliding Window Max" problem: given an array and a number k, for each index i, find the maximum among the next k elements starting at i.

So, my observation is that NGE is basically the special case of "Sliding Window Max" where you set k to the length of the array (you need to be careful with how you break ties, but it seems workable). That means that, if you want to be able to solve both NGE and Sliding window max (e.g., for coding interviews or contests), you don't need to learn both monotonic stacks and monotonic queues. You could just learn monotonic queues and solve NGE as a special case of sliding window max.

If you use monotonic stacks/queues, I'd love to hear your thoughts. Thx!
