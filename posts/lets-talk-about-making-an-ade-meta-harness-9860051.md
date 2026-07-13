---
date: '2026-06-29'
timestamp: '2026-06-29T06:48:06.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7477247885374320640'
status: published
xUrl: 'https://x.com/Nil053/status/2071485846159860051'
tweetId: '2071485846159860051'
segments: 2
images: []
tags:
  - isomux
  - ai
---
Let's talk about making an ADE / meta-harness multi-provider.

Where do you draw the line between the provider and your own code?

Three approaches, followed by three tools in the space:

Orca: wrap the terminal. The providers' native TUIs run in embedded terminals. This is the easiest integration: any agent with a TUI can run in Orca, untouched. The downside is you can't make different providers look like one product.

AdaL: rebuild the harness. AdaL reimplements tool calling, compaction, the agent loop, etc., and uses the providers only for next-token prediction. Big upfront effort, but it means you can swap any provider underneath and get perfectly uniform UI and harness behavior.

Isomux: drive the SDKs. Isomux runs each provider's harness programmatically and renders one shared UI. It's a middle ground that leans on the provider's own harness for the hard parts while still owning the UI. Since each SDK is different, this approach has the most provider-specific code, requiring the most work per additional provider.

In all three cases, the meta-harness provides the agents with an API to perform actions at the meta-harness level, like driving the UI or orchestration.

Do you know of any other options?

---

Links:
http://github.com/stablyai/orca
http://adalagent.ai
http://isomux.com
