export interface Problem {
  id: string
  name: string
  aiInterviewerLink: string
  leetcodeLink?: string
}

export interface Topic {
  name: string
  problems: Problem[]
}

export const topics: Topic[] = [
  {
    name: "Dynamic Arrays",
    problems: [
      { id: "da-1", name: "Two Sum", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/two-sum/" },
      { id: "da-2", name: "Best Time to Buy and Sell Stock", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "da-3", name: "Contains Duplicate", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/contains-duplicate/" },
      { id: "da-4", name: "Product of Array Except Self", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/" },
      { id: "da-5", name: "Maximum Subarray", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/maximum-subarray/" },
    ],
  },
  {
    name: "String Manipulation",
    problems: [
      { id: "sm-1", name: "Valid Anagram", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/valid-anagram/" },
      { id: "sm-2", name: "Valid Parentheses", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/valid-parentheses/" },
      { id: "sm-3", name: "Valid Palindrome", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/valid-palindrome/" },
      { id: "sm-4", name: "Longest Substring Without Repeating Characters", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "sm-5", name: "Group Anagrams", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/group-anagrams/" },
    ],
  },
  {
    name: "Two Pointers",
    problems: [
      { id: "tp-1", name: "3Sum", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/3sum/" },
      { id: "tp-2", name: "Container With Most Water", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/container-with-most-water/" },
      { id: "tp-3", name: "Trapping Rain Water", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: "tp-4", name: "Remove Duplicates from Sorted Array", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { id: "tp-5", name: "Move Zeroes", aiInterviewerLink: "#" },
    ],
  },
  {
    name: "Grids & Matrices",
    problems: [
      { id: "gm-1", name: "Rotate Image", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/rotate-image/" },
      { id: "gm-2", name: "Spiral Matrix", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/spiral-matrix/" },
      { id: "gm-3", name: "Set Matrix Zeroes", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/set-matrix-zeroes/" },
      { id: "gm-4", name: "Word Search", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/word-search/" },
      { id: "gm-5", name: "Number of Islands", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/number-of-islands/" },
    ],
  },
  {
    name: "Binary Search",
    problems: [
      { id: "bs-1", name: "Binary Search", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/binary-search/" },
      { id: "bs-2", name: "Search in Rotated Sorted Array", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { id: "bs-3", name: "Find Minimum in Rotated Sorted Array", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { id: "bs-4", name: "Search a 2D Matrix", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/search-a-2d-matrix/" },
      { id: "bs-5", name: "Koko Eating Bananas", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/koko-eating-bananas/" },
    ],
  },
  {
    name: "Sets & Maps",
    problems: [
      { id: "sm-6", name: "Two Sum", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/two-sum/" },
      { id: "sm-7", name: "Top K Frequent Elements", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { id: "sm-8", name: "Valid Sudoku", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/valid-sudoku/" },
      { id: "sm-9", name: "Encode and Decode Strings", aiInterviewerLink: "#" },
      { id: "sm-10", name: "Longest Consecutive Sequence", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/longest-consecutive-sequence/" },
    ],
  },
  {
    name: "Sorting",
    problems: [
      { id: "sort-1", name: "Merge Intervals", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/merge-intervals/" },
      { id: "sort-2", name: "Insert Interval", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/insert-interval/" },
      { id: "sort-3", name: "Non-overlapping Intervals", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/non-overlapping-intervals/" },
      { id: "sort-4", name: "Meeting Rooms", aiInterviewerLink: "#" },
      { id: "sort-5", name: "Meeting Rooms II", aiInterviewerLink: "#" },
    ],
  },
  {
    name: "Stacks & Queues",
    problems: [
      { id: "sq-1", name: "Valid Parentheses", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/valid-parentheses/" },
      { id: "sq-2", name: "Min Stack", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/min-stack/" },
      { id: "sq-3", name: "Evaluate Reverse Polish Notation", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
      { id: "sq-4", name: "Generate Parentheses", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/generate-parentheses/" },
      { id: "sq-5", name: "Daily Temperatures", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/daily-temperatures/" },
    ],
  },
  {
    name: "Recursion",
    problems: [
      { id: "rec-1", name: "Climbing Stairs", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/climbing-stairs/" },
      { id: "rec-2", name: "House Robber", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/house-robber/" },
      { id: "rec-3", name: "House Robber II", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/house-robber-ii/" },
      { id: "rec-4", name: "Decode Ways", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/decode-ways/" },
      { id: "rec-5", name: "Unique Paths", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/unique-paths/" },
    ],
  },
  {
    name: "Linked Lists",
    problems: [
      { id: "ll-1", name: "Reverse Linked List", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: "ll-2", name: "Linked List Cycle", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: "ll-3", name: "Merge Two Sorted Lists", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: "ll-4", name: "Remove Nth Node From End of List", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { id: "ll-5", name: "Reorder List", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/reorder-list/" },
    ],
  },
  {
    name: "Trees",
    problems: [
      { id: "tree-1", name: "Maximum Depth of Binary Tree", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { id: "tree-2", name: "Same Tree", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/same-tree/" },
      { id: "tree-3", name: "Invert Binary Tree", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/" },
      { id: "tree-4", name: "Binary Tree Maximum Path Sum", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      { id: "tree-5", name: "Binary Tree Level Order Traversal", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    ],
  },
  {
    name: "Graphs",
    problems: [
      { id: "graph-1", name: "Clone Graph", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/clone-graph/" },
      { id: "graph-2", name: "Course Schedule", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/course-schedule/" },
      { id: "graph-3", name: "Pacific Atlantic Water Flow", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      { id: "graph-4", name: "Number of Connected Components in an Undirected Graph", aiInterviewerLink: "#" },
      { id: "graph-5", name: "Graph Valid Tree", aiInterviewerLink: "#" },
    ],
  },
  {
    name: "Heaps",
    problems: [
      { id: "heap-1", name: "Kth Largest Element in a Stream", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
      { id: "heap-2", name: "Last Stone Weight", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/last-stone-weight/" },
      { id: "heap-3", name: "K Closest Points to Origin", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/k-closest-points-to-origin/" },
      { id: "heap-4", name: "Kth Largest Element in an Array", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { id: "heap-5", name: "Task Scheduler", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/task-scheduler/" },
    ],
  },
  {
    name: "Sliding Windows",
    problems: [
      { id: "sw-1", name: "Best Time to Buy and Sell Stock", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "sw-2", name: "Longest Substring Without Repeating Characters", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "sw-3", name: "Longest Repeating Character Replacement", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { id: "sw-4", name: "Permutation in String", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/permutation-in-string/" },
      { id: "sw-5", name: "Minimum Window Substring", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/" },
    ],
  },
  {
    name: "Backtracking",
    problems: [
      { id: "bt-1", name: "Subsets", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/subsets/" },
      { id: "bt-2", name: "Combination Sum", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/combination-sum/" },
      { id: "bt-3", name: "Permutations", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/permutations/" },
      { id: "bt-4", name: "Subsets II", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/subsets-ii/" },
      { id: "bt-5", name: "Combination Sum II", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/combination-sum-ii/" },
    ],
  },
  {
    name: "Dynamic Programming",
    problems: [
      { id: "dp-1", name: "Climbing Stairs", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/climbing-stairs/" },
      { id: "dp-2", name: "House Robber", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/house-robber/" },
      { id: "dp-3", name: "House Robber II", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/house-robber-ii/" },
      { id: "dp-4", name: "Longest Palindromic Substring", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { id: "dp-5", name: "Palindromic Substrings", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/palindromic-substrings/" },
    ],
  },
  {
    name: "Greedy Algorithms",
    problems: [
      { id: "greedy-1", name: "Maximum Subarray", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "greedy-2", name: "Jump Game", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/jump-game/" },
      { id: "greedy-3", name: "Jump Game II", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/jump-game-ii/" },
      { id: "greedy-4", name: "Gas Station", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/gas-station/" },
      { id: "greedy-5", name: "Hand of Straights", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/hand-of-straights/" },
    ],
  },
  {
    name: "Topological Sort",
    problems: [
      { id: "topo-1", name: "Course Schedule", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/course-schedule/" },
      { id: "topo-2", name: "Course Schedule II", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/course-schedule-ii/" },
      { id: "topo-3", name: "Alien Dictionary", aiInterviewerLink: "#" },
      { id: "topo-4", name: "Minimum Height Trees", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/minimum-height-trees/" },
      { id: "topo-5", name: "All Ancestors of a Node in a Directed Acyclic Graph", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/" },
    ],
  },
  {
    name: "Prefix Sums",
    problems: [
      { id: "prefix-1", name: "Range Sum Query - Immutable", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/range-sum-query-immutable/" },
      { id: "prefix-2", name: "Subarray Sum Equals K", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: "prefix-3", name: "Continuous Subarray Sum", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/continuous-subarray-sum/" },
      { id: "prefix-4", name: "Product of Array Except Self", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/" },
      { id: "prefix-5", name: "Find Pivot Index", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/find-pivot-index/" },
    ],
  },
  {
    name: "Tries",
    problems: [
      { id: "trie-1", name: "Implement Trie (Prefix Tree)", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
      { id: "trie-2", name: "Design Add and Search Words Data Structure", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
      { id: "trie-3", name: "Word Search II", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/word-search-ii/" },
      { id: "trie-4", name: "Replace Words", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/replace-words/" },
      { id: "trie-5", name: "Longest Word in Dictionary", aiInterviewerLink: "#", leetcodeLink: "https://leetcode.com/problems/longest-word-in-dictionary/" },
    ],
  },
]


