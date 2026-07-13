---
date: '2026-01-21'
timestamp: '2026-01-21T21:20:55.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7419851410445451264'
status: published
xUrl: 'https://x.com/Nil053/status/2014085824019931507'
tweetId: '2014085824019931507'
segments: 1
images: []
tags:
  - blog
---
System design notes: managing long-lived connections.

To make it concrete, let's consider a chess website where players connect with WebSockets to send and receive moves in real time.

In my experience, the key decision that makes this easier is divorcing the connection lifecycle from the session lifecycle.

When two users start a game, we create a GameSession data structure, with handles to their WS connections as one of the fields. If a WS connection dies or a client stops responding, we can keep the GameSession alive. It just means we temporarily don't have a way to talk to the user.

This matters because losing a game of chess because of a spotty WiFi would be frustrating, so we want sessions that can survive a user losing internet for a second or even switching devices.

If the user regains internet or switches devices, they can reconnect - we just need a way to map them to their preexisting GameSession. This is easy if we only allow logged-in users, as we can keep a mapping user ID -> GameSession. (Implicit assumption: each user can have only a single connection, e.g., only play one chess game at a time.)

Upon reconnecting, we simply update the WS handle in their GameSession data structure and continue business as usual.

Non-logged-in users (guests) are a bit harder to keep track of, especially if they switch devices - we won't cover that case here. It may not be worth it anyway, as we often want to incentivize users to create accounts.

This covers long-lived connections for the single-server setting. The problem becomes much more interesting if we want to scale to multiple servers. Maybe a post for another day!
