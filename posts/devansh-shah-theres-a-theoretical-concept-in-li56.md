---
date: '2025-06-23'
timestamp: '2025-06-23T00:01:53.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7342703406253252608'
segments: 1
images: []
tags:
  - research
---
Devansh Shah There's a theoretical concept in statistics that captures much of what you write in this post: the exploration-exploitation trade-off. When you make a decision (like choosing a restaurant), you can choose an option you already like (your favorite restaurant) or an option you don't know much about (try a new restaurant). The first option has a higher expected pay-off (exploitation), but with the second you gain more information that can lead to smarter decisions in the future (exploration). When I make decisions, I check myself: am I balancing exploration and exploitation properly?

Interestingly, AlphaZero (Google's chess AI) has to answer the same question: among the possible chess moves, how much time should it spend exploring each? Should it focus on the best moves found so far, ensuring they're good (exploitation), or look for alternative moves that seem unpromising but could turn out to be good (exploration)?

AlphaZero uses an elegant solution known as Upper Confidence Bound (UCB). Suppose you have to choose among several options. For each option, you need to know two things: the expected payoff and the expected variance. The option with the highest expected payoff maximizes exploitation, while the option with the most variance maximizes exploration. To balance the two, the key is to pick the option with the highest expected payoff one standard deviation above the mean.

So, as long as you're willing to estimate payoffs and variances for your choices, you can make life decisions like AlphaZero!

(Re: Devansh Shah's article on probabilistic decision making: https://lnkd.in/gYuqrp5J)
