---
date: '2026-01-12'
timestamp: '2026-01-12T16:31:40.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7416518155067375616'
status: published
xUrl: 'https://x.com/Nil053/status/2010751542551613792'
tweetId: '2010751542551613792'
segments: 1
images:
  - >-
    /posts/i-had-to-stop-to-take-a-1613792/2010751542551613792-G-efyn-bYAAGSTU.jpg
tags:
  - research
---
I had to stop to take a picture.

My RTX 4090, however, never stops.

I check on it via ssh while on the road.

It's now on generation 18 of self play.

As my mileage goes up, the validation loss goes down.

Each generation is 4000 games.

Each game lasts around 40 moves (80 'plies' or turns).

In my game, each player must take 2 actions per turn.

For each action, the AlphaZero-style algorithm collects 1200 MCTS samples (Monte Carlo Tree Search).

Each sample plays the game forward until it reaches a new position, which is then evaluated with a model inference.

That comes out to about 18 * 4000 * 80 * 2 * 1200 = 13.824B inferences so far this trip.

Each of which runs a forward pass through the 41 convolutional layers in the ResNet backbone before calculating the position's evaluation and move priors.

And yes, there's a sharded LRU cache reducing the number of inferences a bit.

But the key optimization that makes this possible is batching.

I ride alone.

My GPU, however, chews through batches of 256 inferences at a time.

Without batching, GPU I/O would be the bottleneck. With it, utilization hovers around 100% at all times.

I like to think it keeps her warm in my absence.

I'll be writing more about what I'm training and about the algorithm in the coming days. Along with bike pics, maybe.

I should reach Seattle today.

And generation 30 of self play.
