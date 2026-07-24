---
date: '2025-07-02'
timestamp: '2025-07-02T18:15:59.000Z'
source: linkedin
status: published
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7346240236294742016'
segments: 1
images:
  - /posts/dp-tabulation-can-be-seen-as-a-li53/096-feed-photo.gif
  - /posts/dp-tabulation-can-be-seen-as-a-li53/097-feed-photo.gif
tags:
  - research
  - job-search
---
DP Tabulation can be seen as a kind of topological sort.

In DP, we have subproblems and dependencies between subproblems. E.g., Fib(n) depends on Fib(n-1) and Fib(n-2).

The subproblems in DP form a DAG (Directed Acyclic Graph) where the nodes are the subproblems and the dependencies are the edges. The DP base cases (subproblems that don't depend on other subproblems) correspond to nodes without any incoming edges.

DP computes the subproblems in an order that respects the dependencies. That is, it computes the subproblems in an order that is a topological order of the subproblem DAG.

If we explicitly built this DAG, we could use a topological sort algorithm to determine the order in which we need to compute the subproblems.

Tabulation is a kind of shortcut for doing that.

Tabulation creates a table with one cell per subproblem and fills in the table in an order where all dependencies are processed before a cell is processed. The order depends on the problem, as the dependencies change.
