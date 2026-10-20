---
date: '2026-10-13'
timestamp: '2026-10-13T19:43:37.000Z'
source: both
status: published
xUrl: 'https://x.com/Nil053/status/2110094123223207942'
tweetId: '2110094123223207942'
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7515859406748782592'
segments: 1
tags:
  - ai
  - isomux
---

Whenever I get a bill from a Cloud provider, I tell an agent to migrate the thing to a self-hosted VPS.

Traffic -> Cloudflare free proxy (DNS, DDoS) -> Caddy reverse proxy on the VPS -> Docker containers with services.

Agents set up everything.

Results:

- Cheaper
- Websites feel snappier with DB and server co-located (I didn't expect it to be so noticable)
- Agents debug better: ssh to a VPS > having data/services behind multiple 3rd party APIs.

Win-win-win so far.

The last point is worth pausing on, to use a Claudeism - I think "avoid putting middlemen between your agents and your data" should be a principle of agentic SWEing.

The "downsides" are that you need to manage things like backups and outages "manually". So, if you want to try, start with low-stakes projects. But the answer is the same: agents.

Quoted post by Anthropic: https://x.com/AnthropicAI/status/2110047081414987957
