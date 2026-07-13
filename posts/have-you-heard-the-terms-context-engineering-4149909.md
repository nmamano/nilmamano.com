---
date: '2025-08-04'
timestamp: '2025-08-04T22:53:56.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/1952503297774149909'
tweetId: '1952503297774149909'
segments: 1
images: []
tags:
  - ai
---
Have you heard the terms "context engineering" and "context rot" recently?

These days, "context" seems to be in everyone's minds, and for good reason.

The way I see it, building AI apps is about creating illusions.

ChatGPT started this paradigm. It created the illusion that you are in a two-way conversation, when, under the hood, the model just receives a single string and predicts the next token in the string.

Cursor creates the illusion that it's editing text.

Agents, reasoning models, deep web research, frontend generators, computer use...

They are all illusions backed by the same predict_next_token(model, context) primitive.

And while the UI is crucial to make the illusion come to life, the success or failure of AI apps comes down to the builder's ability to fill the context with the right information and nothing else.

That's because if the brain of your app is the predict_next_token(model, context) primitive, if you want it to feel smarter, you only have two choices: change the model, or change the context.

For a while, we were riding the wave of bigger and better models: GPT 4 was released in March 2023, followed by DeepSeek in November 2023, and Claude 3.5 in June 2024.

But what we are learning now is that tweaking the context is a lot more flexible and powerful than tweaking the model -- For instance, RAG is a lot more succesful than fine-tuning at reducing hallucinations. RAG changes the context; fine-tuning changes the model.

That's why the term "context engineering" is taking off.
