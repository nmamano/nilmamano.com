---
date: '2026-04-20'
timestamp: '2026-04-20T03:01:06.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7451827868252434432'
status: published
xUrl: 'https://x.com/Nil053/status/2046061567503188295'
tweetId: '2046061567503188295'
segments: 1
images: []
tags:
  - personal
---
I almost missed an interview because of my WiFi and now I'm going a bit crazy trying to debug it.

I had this feeling that the WiFi only breaks at the dining table.

So now I'm moving my laptop around the room while running a command that checks for radio interference every second.

This is the command:

while true; do log show --predicate 'subsystem == "com.apple.WiFiManager"' --last 5s --style compact 2>&1 | grep -o 'interferenceTotal=[0-9]*' | tail -1; sleep 1; done

The logs show strong radio interference concentrated around the table. The interference score spikes to 50-79 at the dining table, but drops much lower just a few steps away (0-4 other rooms).

I can't identify the source. It's not the microwave, fridge, lights, or any visible electronics in the room.

It could be something under the floor. I can make it drop by moving the laptop toward the ceiling, but not toward the floor.

Is this normal? Anyone else with crazy WiFI stories?
