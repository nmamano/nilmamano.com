---
date: '2026-07-15'
timestamp: '2026-07-15T21:24:08.000Z'
source: both
status: published
xUrl: 'https://x.com/Nil053/status/2077512398962069857'
tweetId: '2077512398962069857'
linkedinUrl: 'https://www.linkedin.com/posts/nilmamano_out-of-curiosity-i-checked-whether-the-validation-ugcPost-7483279287869992960-bzN3'
segments: 1
tags:
  - ai
  - research
images:
  - /posts/does-halfway-loss-predict-the-final-loss-4150648/01-fig-sameschedule-diffopt.png
  - /posts/does-halfway-loss-predict-the-final-loss-4150648/02-fig-luck-vs-optimizer.png
---
Out of curiosity, I checked whether the loss at the half-way point of a NanoGPT speedrun predicts the final loss, using PrimeIntellect's corpus of runs.

The trick is that you have to compare runs on the same learning schedule. The schedule decides where you are in the "cool-down" at the half-way mark, so across different schedules the half-way loss is misleading: a run that cools down late looks bad half-way and finishes great. Compare across schedules and the half-way leader is often the eventual loser.

So I grouped runs by schedule and looked within. Here are 780 runs that share one schedule but use 65 different optimizers. Half-way loss predicts final loss at a rank correlation of 0.65: a decent, though not tight, early read.

One thing jumped out while doing this. On that fixed schedule, the random seed moves the final loss more than the choice of optimizer does: about 78% of the spread across these optimizer variants is luck, only 22% is the optimizer. The big historical jumps (the Muon optimizer, changing the schedule shape) are far larger than this, but the small tweaks people try at the frontier are mostly within noise of each other.
