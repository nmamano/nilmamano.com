---
date: '2026-08-16'
timestamp: '2026-08-17T00:29:46.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/2089147639191445957'
tweetId: '2089147639191445957'
segments: 1
images:
  - >-
    /posts/when-i-saw-the-genie-demos-1445957/2089147639191445957-VmeaC7XfPeTATTVJ.mp4
tags:
  - ai
  - research
---
When I saw the Genie demos - where you can move around in a picture with your arrow keys, like a videogame, and the world stays coherent - it felt like magic.

But the core idea is simple!

You need two things:

1. A ton of videos. Easy for Google.
2. A function that takes two consecutive frames and tells you what "action" happened between them: left, right, forward, etc. More on this later.

Then, train a model to predict the next frame from the current frame + action.

That's it! To steer a world generated from a picture, you supply the actions yourself with the arrow keys instead of using that function.

So, where does that function come from?

It's another model (an "encoder") you train together with the next-frame predictor (the "decoder"):

The encoder looks at both frames and compresses the change between them into a small set of "action codes".

So, during training, for each pair of consecutive frames, f1 and f2, we do encode(f1, f2) = action, and then decode(f1, action) = f2_prediction, and try to minimize the difference between f2 and f2_prediction.

Because there are only a small number of action codes shared across the whole dataset, the encoder is pushed to reuse codes for recurring kinds of changes between consecutive frames: left-like motion, right-like motion, etc.
