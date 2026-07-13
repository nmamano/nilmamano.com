---
date: '2025-11-24'
timestamp: '2025-11-24T03:01:33.000Z'
source: x
status: published
xUrl: 'https://x.com/Nil053/status/1992790666309734845'
tweetId: '1992790666309734845'
segments: 1
images: []
tags:
  - wallgame
  - personal
---
Round-trip chess variant:

Starts like normal chess until pieces are captured. Captured pieces are not removed - they are moved to a second board. The piece doesn't change sides, but the capturer decides where to place it among the valid starting positions for that piece and color.

At each turn, each player moves a piece on either board of their choosing (not both).

Capturing a piece on the second board sends it back to the first board - again, the capturer decides where to place it among the valid starting positions for that piece and color.

The weird part: if you capture a piece and there is another piece in one of its starting positions in the other board, you can place the captured piece there and capture that other piece - even your own piece - which you then need to move to the other board. This can cause long chain reactions and has many strategic applications.

You win by capturing the opponent's king on both boards. That is, sending it round-trip from the first board to the second board and back.

Notes:
- There is no checkmate; you have to actually capture the king.
- If you cause an infinite loop (a rare edge case), you win.
