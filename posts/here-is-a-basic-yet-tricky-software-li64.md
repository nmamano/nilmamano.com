---
date: '2025-05-12'
timestamp: '2025-05-12T20:54:31.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7327798354711666688'
segments: 1
images: []
tags:
  - interview-prep
---
Here is a basic yet tricky software architecture question: Suppose you have a full-stack app (frontend, backend, DB) and there is a large table in the DB, which the user can browse in the frontend. We show the user 100 rows at a time, and they can navigate to the next or previous 100 rows (this is called pagination).

How do you implement this pagination?

Assumptions:
- The table is not just static data; it gets updates over time.
- The rows must be shown to the user sorted by a specific column, say, 'rank'.
- The backend runs on a single server.

You have 3 main options for *where* to implement pagination:

1. At the DB level: this is slow, as it requires a DB round-trip every time the user wants to see a new 100-row block, but it guarantees the data is never stale and the backend can remain stateless. We can add a table index on the 'rank' column to speed up the query.

2. At the backend level: if the backend maintains a cached copy of the table (say, as an array), it can return the appropriate range of the array to the frontend, avoiding the DB. This introduces the problem of how to keep the backend's copy of the table always synced with the DB and sorted by 'rank'. For the former, the backend would need to do parallel updates to the DB and the cache. For the latter, if re-sorting on each update is too expensive, something like Redis could take care of it for us.

3. At the frontend level: whenever the user goes to the page, the backend sends the full table (or a big chunk of it), not just the first 100 rows (the backend either maintains a cached copy or queries the DB). This approach makes pagination the most responsive, involving no API calls, but it is also the most stale, as the data won't update until the user refreshes the page. In this case, whether the backend maintains a local copy or not only affects the initial load time.

There's no right answer; each has its pros and cons.

Did I miss something?
