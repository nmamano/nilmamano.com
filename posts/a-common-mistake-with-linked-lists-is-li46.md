---
date: '2025-07-18'
timestamp: '2025-07-18T01:22:00.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7351783265994747904'
segments: 1
images:
  - /posts/a-common-mistake-with-linked-lists-is-li46/076-feed-photo.jpg
tags:
  - interview-prep
---
A common mistake with linked lists is doing the operations in the wrong order and losing track of the reference to a node.

Imagine we have a singly linked list with two nodes:

(head)
 1 -------> 2 -----> null

How would we add a node with value 4 between the two nodes?

We can't simply make head.next = new_node. We would lose track of the address for the node with value 2.

The order is key:

1. new_node.next = head.next
2. head.next = new_node
