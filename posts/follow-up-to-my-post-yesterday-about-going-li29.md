---
date: '2025-12-06'
timestamp: '2025-12-06T03:29:59.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7402912164795363328'
segments: 1
images: []
tags:
  - research
  - personal
---
Follow-up to my post yesterday about going to Don Knuth's Xmas lecture: https://lnkd.in/g8P3_Bf5

Knuth didn't see the letter before the lecture, but I lined up after the lecture and showed him a copy in person.

He said the tour looked gorgeous and asked me to explain the logic behind the colors, which I did.

He had opened the lecture by saying he was interested in knight's tours because it's a left-brain / right-brain thing: mathematically rich, but also visually beautiful.

Our work overlapped a ton - we both studied the problems of minimizing turns and minimizing crossings. Both Knuth and we also looked at some of the same special cases, such as rotationally symmetric tours, and generalizations, such as different types of moves.

The main difference is that he was interested in finding the optimal tours on 8x8 boards, whereas we found a general algorithm that is provably close to optimal for any board size.

He found, and showed, the optimal 8x8 tours minimizing turns and crossings (I attached a pic of the one minimizing turns).

There are over 13 trillion knight's tours in 8x8 boards, so finding tours with a given property (like minimum number of turns) is very challenging.

In fact, we also tried to find the 8x8 tour minimizing turns at one point, but failed. We wrote a program to find it, but it took 2h just for the 6x6 case, so it'd have taken forever for the 8x8 case (I wrote about this on https://lnkd.in/gsMX6Xcm).

It feels good to have Knuth tackle the same problem as you and show you how it's done :)

Conversely, I believe that if Knuth had known about our techniques, it would have made some of his other work easier.

For instance, he showed frame-like knight's tours (see second pic) featured in the walls of Olin Hall in Case Western Reserve University.

Regarding the frame-like tours, he mentioned, "I was not sure if it was possible at first," but our 4-knight-formation technique provides a straightforward playbook for finding tours like these.

---

When I handed him the letter, I thought he'd just look at the picture (he'd been answering questions for a long time already, and there was still a line behind me), but he actually read it.

He noticed the arXiv link, and worked out from the URL that it was published in 2019. At that point, he paused, trying to piece together my background. He asked, "Are you a student here? Or, what's your day job?"

I said, "I was a software engineer, but I quit to write a book about algorithms."

As I said it, The Art of Computer Programming and Beyond Cracking the Coding Interview flashed in my mind, side by side, and I felt like a fraud.

I can't believe that's something I've said to Donald Knuth. One of the most absurd and surreal moments of my life.
