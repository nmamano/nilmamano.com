---
date: '2026-01-24'
timestamp: '2026-01-24T04:59:39.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7420691365061292032'
status: published
xUrl: 'https://x.com/Nil053/status/2014926044357394724'
tweetId: '2014926044357394724'
segments: 2
images: []
tags:
  - job-search
---
Since I'm studying system design, I read OpenAI's new post:

"Scaling PostgreSQL to power 800 million ChatGPT users" by Bohan Zhang.

I expected to learn something specific to ChatGPT, or at least chatbots, but there are actually no details on how conversations are stored, or really anything about how the data is organized.

It's the opposite: mostly classic DB scaling techniques, just executed well.

That said, here are my notes:

1. THE WRITE INSTANCE

- They have only one, unsharded PostgreSQL instance for all writes - this is the stat making headlines.

- They always have a "hot standby" clone ready to take over if it fails.

- They collaborate with Azure to ensure that things like switching to the clone works reliably even under heavy load.

- Sharding the write instance at this point would be extremely painful, potentially taking "months or even years". They'll push the current setup as far as possible.

- No new tables allowed. New tables must go on separate, shardeable DBs (CosmosDB).

2. THE READ REPLICAS

- They have 50 read replicas geographically distributed, all updated directly from the write instance.

- In the future, they want to do "cascading replication": a tree of replicas updating other replicas. But then, failover becomes harder: if a read replica fails, downstream replicas stop getting updates.

- Reads are redirected to read replicas to reduce load on the write instance.

- They use separate read replicas for high-priority queries and low-priority queries. This way, a spike in low-priority traffic doesn't affect important stuff.

3. SCALING TECHNIQUES

- DB overload is usually caused by (1) new features, (2) cache-miss storms, or (3) spikes in specific queries with too many joins.

- Inefficient SQL queries with lots of joins often came from ORMs.

- Some complex joins can be moved to the application layer.

- The hardcoded 5000 connection limit in Azure PostgreSQL became the bottleneck. They solved this by adding a (co-located) proxy layer called PgBouncer which bundles connections.

- It's important to have timeouts to kill idle queries and connections.

- Their caching layer has "cache locking": If two queries need to read the same data, and it's missing from the cache, only the first one triggers a DB read. The second one sees that someone else is already fetching it and just waits - it doesn't trigger a second DB read.

- To avoid bursty traffic, they do rate-limiting at every level (e.g., when backfilling a table field).

- Low-priority queries may even be dropped at the application level.

- Retries use relatively long timeouts to avoid "retry storms".

All in all, my takeaway is that you can go really far with just "boring" fundamentals.

---

The post: https://openai.com/index/scaling-postgresql/

I wonder if other AI labs do something completely different.
