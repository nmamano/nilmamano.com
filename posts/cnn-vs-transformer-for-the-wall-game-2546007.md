---
date: '2026-07-29'
timestamp: '2026-07-29T03:10:37.000Z'
source: both
status: published
xUrl: 'https://x.com/Nil053/status/2082302748272546007'
tweetId: '2082302748272546007'
linkedinUrl: 'https://www.linkedin.com/posts/nilmamano_cnn-vs-transformer-for-the-wall-game-alphazero-style-share-7488068457935278081-zEtb/'
segments: 1
images:
  - /posts/cnn-vs-transformer-for-the-wall-game-2546007/cnn-vs-transformer.png
tags:
  - ai
  - research
---
CNN vs transformer for the Wall Game AlphaZero-style AI.

CNN (ResNet) was the original choice by AlphaZero. It makes sense for games with geometric patterns, like chess and the wall game.

But again and again we learn that anything CNNs can do, transformers do better.

The transformer improved faster and further (with one caveat below), but the awesome part is that it's a more general model that can play across game variants and board sizes.

The second plot shows the % of self-play games played on 8x8 Classic, the only setting the CNN plays. The transformer kept improving even when the share dropped below 10%.

To be fair to the CNN, it had a training bug and the impact is impossible to quantify. For half of the positions at every generation (those made by Player 1), instead of training on the rich move distribution found by MCTS, it trained on only the selected move, i.e., a distribution with probability 1 at that move and 0 everywhere else.
