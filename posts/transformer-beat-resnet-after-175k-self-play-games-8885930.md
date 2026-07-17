---
date: '2026-07-17'
timestamp: '2026-07-17T20:08:05.000Z'
source: original
status: published
xUrl: 'https://x.com/Nil053/status/2078210751966429513'
tweetId: '2078210751966429513'
linkedinUrl: 'https://www.linkedin.com/posts/nilmamano_transformer-beat-resnet-after-175k-self-play-share-7483978155133775872-c6FW'
segments: 2
images:
  - /posts/transformer-beat-resnet-after-175k-self-play-games-8885930/elo-classic-8x8.png
  - /posts/transformer-beat-resnet-after-175k-self-play-games-8885930/elo-standard-8x8.png
tags:
  - wallgame
  - ai
  - research
---
Transformer beat ResNet after 175k self-play games.

ResNet trained for 750k games, so, even though there are a few reasons why it's not a 1-to-1 comparison, the thesis "Transformer > ResNet" seems validated.

Next, I'm going for the holy grail: a single model with superhuman strength for any board dimensions (up to 10x12) and multiple variants (currently, there are two, Classic and Standard).

The ResNet model is superhuman, but it only plays on 8x8 boards and only plays Classic. (I also trained a ResNet model for Standard, warming it up from the Classic one, but it's not as strong.)

Architecturally, the transformer can play up to 10x12 boards, but so far I only trained it on 8x8 (both variants).

Now that it beat ResNet on 8x8 Classic, I'm slowly throwing in larger board sizes into the mix.

For the next 60k games, I'm training on a mix of 8x8, 8x9, 9x8, and 9x9, across both variants.

For Standard, the mix caused an Elo dip for 8x8 games (see generation 37) but keeping 8x8 boards in the mix should help it not forget how to play it, and eventually learn to generalize and get even stronger.

---

You can play vs the transformer at wallgame.io
