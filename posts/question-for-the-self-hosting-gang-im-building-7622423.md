---
date: '2026-05-15'
timestamp: '2026-05-15T17:40:02.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7461108068563623936'
status: published
xUrl: 'https://x.com/Nil053/status/2055342456527622423'
tweetId: '2055342456527622423'
segments: 1
images: []
tags:
  - isomux
---
Question for the self-hosting gang: I'm building a self-hosted collab tool; auth is invite-link based, so the owner's box needs a public HTTPS URL.

Goal: make it as easy to go from "running locally" to "publicly reachable".

The best option I've found is Tailscale Funnel. Tailscale gives you a `*.ts.net` domain for free and exposes it to the public internet.

Other options I considered:

- Cloudflare Tunnel. Same shape, also free, but you must bring a domain.
- Caddy + bring-your-own DNS. No vendor, but needs a domain plus router port-forwarding (fails behind CG-NAT, common on residential ISPs).
- Rent a $5/mo VM. Skips port-forwarding, but you still need a domain for HTTPS.
