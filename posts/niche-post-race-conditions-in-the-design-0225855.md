---
date: '2026-01-22'
timestamp: '2026-01-22T19:09:10.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7420177474484989952'
status: published
xUrl: 'https://x.com/Nil053/status/2014415060010225855'
tweetId: '2014415060010225855'
segments: 1
images:
  - >-
    /posts/niche-post-race-conditions-in-the-design-0225855/2014415060010225855-G_SjzrlbMAAVHaf.jpg
tags:
  - wallgame
---
Niche post: Race conditions in the design of timers for board games like chess.

In online chess, especially bullet chess, many games come down to fractions of a second, so it's critical to get the timer logic right.

First, to avoid cheating, the server must be the source of truth for the timers. A move should be considered "official" when it is received by the server, not when the client makes it. Otherwise, a cheating client could manipulate move timestamps.

However, users expect a snappy UX, so the client should render moves optimistically, before the server confirms them. A delay when making a move, even if tiny, would not feel right.

The downside is that the optimistic UX and the authoritative game state may be out of sync while updates are in flight:

RACE CONDITION 1: A player moves just before the clock runs out, sees it rendered locally, and then has it rejected by the server as out of time.

The easiest way to handle this is for the server to send a full authoritative copy of the game state whenever it changes, and for clients to rerender the UI based on it. So:

Make a move -> temporary, optimistic render based on optimistic update -> authoritative render based on received state

However, optimistic renders should still be selective. They should probably refrain from declaring a winner. Otherwise, this could happen:

RACE CONDITION 2: The server accepts Player 1's move with 0.1s left, but the move takes more than 0.1s to reach Player 2. Player 2's client thinks Player 1 ran out of time and optimistically (but incorrectly) declares Player 2 the winner.

An interesting decision arises around premoves (a premove is when you stage your next move before the opponent even moves): should premoves be local-only, or be sent to the server?

Serious chess sites like Lichess send premoves to the server to mitigate the effects of lag.

But no matter what you do, race condition can never be fully eliminated:

RACE CONDITION 3: A player undoes a premove before the opponent moves, but the premove still executes because the cancellation reaches the server too late.
