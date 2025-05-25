export interface Publication {
  id: string;
  type: "dissertation" | "conference" | "journal";
  title: string;
  authors: string[];
  not_alphabetical_order?: boolean;
  publisher?: string;
  coverImage?: string;
  links?: {
    demo?: string;
    github?: string;
    pdf?: string;
  };
  description: string[]; // Array of paragraphs
  additionalImages?: Array<{
    src: string;
    alt: string;
    scale?: number; // Single value to control image size (1 = default, 2 = twice as large, etc.)
    fullWidth?: boolean; // Optional flag to make image span full width
    fullRow?: boolean; // Optional flag to make image take a full row instead of half
  }>;
  selected?: boolean; // Whether to show on homepage
}

export const PUBLICATIONS: Publication[] = [
  // PhD Dissertation
  {
    id: "thesis",
    type: "dissertation",
    title: "New Applications of the Nearest-neighbor Chain Algorithm",
    authors: ["Nil Mamano"],
    coverImage: "/blog/greedy-algorithms/local_greedy_tsp_crop.gif",
    links: {
      pdf: "/thesis/nilthesis.pdf",
    },
    description: [
      "The nearest-neighbor chain algorithm was proposed in the eighties as a way to speed up certain clustering algorithms. We show that its application is not limited to clustering: we adapt it to speed up several greedy algorithms for geometric and combinatorial problems.",

      "Greedy algorithms have in common that they construct the solution one step at a time. At each step, if there are multiple options for extending the solution constructed so far, the option optimizing a given criteria is selected (the choice that appears to contribute the most towards a good solution). Greedy algorithms are appealing because of their simplicity. Even when greedy algorithms are not optimal, they often find good solutions.",

      'Our technique for speeding up greedy algorithms consists of two steps. First, we weaken the selection rule of the greedy algorithm so that it may select "suboptimal" choices according to the criteria, but then we prove that the final solution is the same nonetheless. In a sense (formalized in the thesis), our algorithms make locally-optimal choices rather than globally-optimal ones.',

      "Second, we use NNC-based algorithms to navigate to these locally-optimal choices faster than the original greedy algorithm can find the globally-optimal ones. With these two ingredients, we obtain alternative algorithms that are faster and produce the same solution.",

      "The thesis also has a second part about stable-matching Voronoi diagrams. Overall, the thesis contains papers on various algorithms and data structures.",
    ],
    additionalImages: [
      {
        src: "/blog/greedy-algorithms/gleexamples.png",
        alt: "Four different problems and the corresponding solutions found by Greedy algorithms",
        scale: 0.6,
        fullRow: true,
      },
      {
        src: "/blog/greedy-algorithms/greedy_tsp.gif",
        alt: "The multi-fragment algorithm for TSP",
        scale: 0.5,
      },
      {
        src: "/blog/greedy-algorithms/local_greedy_tsp_crop.gif",
        alt: "Our algorithm with a weakened selection rule that finds the same solution",
        scale: 0.5,
      },
    ],
    selected: false,
  },

  // Conference publications
  {
    id: "knighttour",
    type: "conference",
    title: "Taming the Knight's Tour: Minimizing Turns and Crossings",
    publisher: "FUN'20",
    authors: ["J.J. Besa", "T. Johnson", "N. Mamano", "M.C. Osegueda"],
    coverImage: "/knight/3d.svg",
    links: {
      demo: "https://nmamano.github.io/MinCrossingsKnightsTour/index.html",
      github: "https://github.com/nmamano/MinCrossingsKnightsTour",
      pdf: "https://arxiv.org/pdf/1904.02824.pdf",
    },
    description: [
      "In the knight's tour puzzle, a knight starts in the top-left corner of a chess board. The challenge is to visit every square, without repetition, using only knight moves. This puzzle becomes an interesting computational problem when generalized to n x n boards for any n. In particular, sequential heuristics such as Warnsdorff's algorithm quickly reveal their exponential nature.",

      "Before this paper, all the efficient algorithms for the generalized knight's tour were based on a divide-and-conquer strategy, where the board is split into four quadrants, each quadrant is solved recursively, and then some of the boundary moves are changed to concatenate the different bits together. We propose the first algorithm following a completely new approach, where the knight repeatedly crosses the entire board in long lines of moves in the same direction. In doing so, we prove the existence of knight's tours in n x n boards with only O(n) crossings (points where the knight crosses over its prior path). All prior algorithms have O(n²) crossings. We also extended our algorithm to 3D boards, giraffe tours, and other generalizations.",
    ],
    additionalImages: [
      {
        src: "/knight/20x20.png",
        alt: "Our tour for a 20x20 board",
        scale: 0.9,
      },
      {
        src: "/knight/lowerbound.svg",
        alt: "A fractal from our lower bound proof (see paper for context)",
        scale: 0.9,
      },
      {
        src: "/knight/xing.svg",
        alt: "Part of our construction.",
        scale: 0.7,
      },
      {
        src: "/knight/giraffe.svg",
        alt: "Part of our giraffe tour construction.",
        scale: 0.7,
      },
    ],
    selected: true,
  },
  {
    id: "nnc-tsp",
    type: "conference",
    title:
      "Euclidean TSP, Motorcycle Graphs, and Other New Applications of Nearest-Neighbor Chains",
    publisher: "ISAAC'19",
    authors: [
      "N. Mamano",
      "A. Efrat",
      "D. Eppstein",
      "D. Frishberg",
      "M.T. Goodrich",
      "S. Kobourov",
      "P. Matias",
      "V. Polishchuk",
    ],
    not_alphabetical_order: true,
    coverImage: "/nnc/tsp.png",
    links: {
      pdf: "https://arxiv.org/pdf/1902.06875.pdf",
    },
    description: [
      "This paper contains some of the results from the thesis on speeding up greedy algorithms (read the thesis' summary above). For instance, we improve the runtime of the multi-fragment algorithm for Euclidean TSP from O(n²) to O(n log n). See <a href='https://11011110.github.io/blog/2019/02/21/mutual-nearest-neighbors.html' class='text-primary hover:underline' target='_blank' onClick='event.stopPropagation()'>David's blog</a>.",
    ],
    additionalImages: [
      {
        src: "/nnc/flowers.svg",
        alt: "Part of the analysis of a new geometric data structure we use in our Euclidean TSP algorithm (see paper for context)",
        scale: 0.5,
        fullRow: true,
      },
    ],
    selected: true,
  },
  {
    id: "smvd",
    type: "conference",
    title:
      "Stable-Matching Voronoi Diagrams: Combinatorial Complexity and Algorithms",
    publisher: "ICALP'18",
    authors: ["G. Barequet", "D. Eppstein", "M.T. Goodrich", "N. Mamano"],
    coverImage: "/smvd/cones.png",
    links: {
      demo: "https://nmamano.github.io/StableMatchingVoronoiDiagram/index.html",
      pdf: "https://arxiv.org/pdf/1804.09411.pdf",
    },
    description: [
      "Imagine that you have a set of facilities in the plane, such as post offices, and you are tasked with assigning a service region to each one, under two constraints. First, each service region should be close to the corresponding facility. Second, all the service regions should have the same area. If we drop the second condition, we end up with the well known Voronoi diagram. The Voronoi diagram assigns each point in the plane with the closest facility.",

      "Stable matching Voronoi diagrams are a generalization that also addresses the second constraint by borrowing the notion of stable matching from the field of market design. Stable matching studies how to pair, e.g., buyers and sellers in an auction, in a way such that no one is better off by breaking the given assignment. Stable matching Voronoi diagrams model the facilities and the plane as the two sides of a market to be matched in such a manner. In this paper, we give an algorithm to construct these diagrams and show that they may have a quadratic number of faces. See <a href='https://11011110.github.io/blog/2018/04/26/stable-marriage-voronoi.html' class='text-primary hover:underline' target='_blank' onClick='event.stopPropagation()'>David's blog</a>.",
    ],
    additionalImages: [
      {
        src: "/smvd/example.png",
        alt: "A stable matching Voronoi diagram.",
        scale: 0.6,
      },
      {
        src: "/smvd/lowerbound.png",
        alt: "Part of our quadratic lower bound construction (see paper for context)",
        scale: 0.6,
      },
    ],
    selected: true,
  },
  {
    id: "proximity-data",
    type: "conference",
    title: "Reactive Proximity Data Structures for Graphs",
    publisher: "LATIN'18",
    authors: ["D. Eppstein", "M.T. Goodrich", "N. Mamano"],
    coverImage: "/road/roadnetwork.png",
    links: {
      github: "https://github.com/nmamano/NearestNeighborInGraphs",
      pdf: "https://arxiv.org/pdf/1803.04555.pdf",
    },
    description: [
      "The problem in this paper is inspired by private-car services such as Uber or Lyft. We give a data structure that maintains a set of nodes in a graph (the drivers in a road network) subject to two operations: first, updates in the locations of the drivers. Second, queries asking for the closest driver to a given node (the location of a client requesting a ride). In the paper, we study how to strike a balance between the cost of updates and queries. Our technique is based on graph separators: road networks can be split into two similarly-sized parts with a small number of nodes connecting the two and no other edges between them. This is useful because if the closest driver to a client is in the other part, then it must pass through one of a small number of nodes. See <a href='https://11011110.github.io/blog/2018/03/14/finding-nearest-open.html' class='text-primary hover:underline' target='_blank' onClick='event.stopPropagation()'>David's blog</a>.",
    ],
    additionalImages: [
      {
        src: "/road/sep.svg",
        alt: "A graph separator",
        scale: 0.35,
        fullRow: true,
      },
    ],
    selected: true,
  },
  {
    id: "stable-districts",
    type: "conference",
    title:
      "Defining Equitable Geographic Districts in Road Networks via Stable Matching",
    publisher: "SIGSPATIAL'17 (short paper)",
    authors: ["D. Eppstein", "M.T. Goodrich", "D. Korkmaz", "N. Mamano"],
    coverImage: "/maps/la.jpg",
    links: {
      github: "https://github.com/nmamano/StableDistricting",
      pdf: "https://arxiv.org/pdf/1706.09593.pdf",
    },
    description: [
      "In theory, political districts should be balanced in population and should have compact shapes. Partisan gerrymandering is the manipulation of district boundaries for political advantage. A potential solution is to use geometric 'politically-agnostic' algorithms to draw fair districts. In this paper, we consider the use of stable matching, a concept from market design, to assign districts to district centers. Depending on the center locations, we found that the resulting districts from stable matching may be concave or not even connected. This solution can be seen as a network-based variant of the stable-matching Voronoi diagrams studied in the ICALP'18 paper. See <a href='https://11011110.github.io/blog/2017/06/29/stable-redistricting-in.html' class='text-primary hover:underline' target='_blank' onClick='event.stopPropagation()'>David's blog</a>.",
    ],
    additionalImages: [
      {
        src: "/maps/tx.jpg",
        alt: "Stable matching districts in Texas",
        scale: 0.35,
        fullRow: true,
      },
    ],
    selected: false,
  },
  {
    id: "grid-matching",
    type: "conference",
    title: "Algorithms for Stable Matching and Clustering in a Grid",
    publisher: "IWCIA'17",
    authors: ["D. Eppstein", "M.T. Goodrich", "N. Mamano"],
    coverImage: "/grid/random.png",
    links: {
      github: "https://github.com/nmamano/StableMatchingVoronoiDiagram",
      pdf: "https://arxiv.org/pdf/1704.02303.pdf",
    },
    description: [
      "Whereas paper ICALP'18 gives algorithms for stable-matching Voronoi diagrams in the plane, this paper gives algorithms for such diagrams in a pixelated setting. It also considers the use these diagrams for clustering. We show that they can be used to cluster data into compact and equal-sized clusters. In contrast, the classical k-means clustering algorithm optimizes for compactness, but is oblivious of cluster sizes. See <a href='https://11011110.github.io/blog/2017/04/11/stable-grid-matching.html' class='text-primary hover:underline' target='_blank' onClick='event.stopPropagation()'>David's blog</a>.",
    ],
    additionalImages: [
      {
        src: "/grid/random.png",
        alt: "Stable-matching Voronoi diagram before clustering",
        scale: 0.5,
      },
      {
        src: "/grid/cluster.png",
        alt: "Stable-matching Voronoi diagram after clustering",
        scale: 0.5,
      },
    ],
    selected: false,
  },
  {
    id: "graph-watermarking",
    type: "conference",
    title: "Models and Algorithms for Graph Watermarking",
    publisher: "ISC'16 (best student paper award)",
    authors: [
      "D. Eppstein",
      "M.T. Goodrich",
      "J. Lam",
      "N. Mamano",
      "M. Mitzenmacher",
      "M. Torres",
    ],
    coverImage: "/watermarkplot.png",
    links: {
      github: "https://github.com/nmamano/GraphWatermarking",
      pdf: "https://arxiv.org/pdf/1605.09425.pdf",
    },
    description: [
      "Watermarking is more commonly known in the context of images. There are two kinds: a visible watermark is a logo or name added on top of an image to identify the author / owner. This way, 3rd parties cannot claim that they created it. In contrast, hidden watermarks do not visibly affect the image. However, the author's identifying information is still codified in the source's binary representation. This allows an artist, for instance, to share a song with various collaborators and attach a unique identifier to each copy. This way, if any of the collaborators leaks the song, the artist will be able to tell who leaked it. The technical challenge with hidden watermarks is that not only they should be imperceptible, but they should also be impossible to erase by an 'adversary' without significantly distorting the file. This means, for instance, that the hidden watermark cannot simply be encoded in the frequencies outside the human audible range, because the adversary can simply scrap that part of the file without affecting the source. Any modification significant enough to destroy the watermark should also alter the source to an extent that it is no longer valuable.",

      "In this project, we consider the problem of embedding hidden watermarks in graphs. Imagine that a company owns a large graph representing, e.g., a social network. This company wants to share the graph with collaborators so that they can study its topology, but the company does not want the third parties to leak the graph (by topology of a graph, we mean properties of the structure of the graph itself. Things such as the size of the cliques, the diameter of the graph, or the degree distribution).",

      "Our watermarks are small subgraphs that we 'embed' in the original graph. That is, we choose a small subset of the nodes, and change the edges between them to represent the subgraph. We can embed a different watermark for each collaborator. In the event that one of the collaborators leaks its version of the graph, we look for those nodes and the edges between them. Since the collaborator does not know which nodes codify the watermark, it cannot target them and modify their edges, so to destroy the watermark it needs to modify edges across the graph. The difficulty in implementing this scheme is that we need a way to find the nodes that contain the watermark. This is challenging because the leaker could scramble the node labels / ordering before leaking it, which does not affect the topology at all, and finding which node is which is computationally hard. In fact, simply determining if two graphs are the same is already hard.",

      "Our algorithm works for graphs in which the degrees of the nodes follow a power law distribution. That is, if we sort the nodes from highest to lowest degree, there are a few nodes with very high degree, and then the degrees decay exponentially fast, with most nodes having very low degree. We chose this model because it is common in social networks. We exploit this in our scheme by embedding the watermark among the high- and medium-degree nodes. We use the fact that the degrees follow a power law distribution to first identify (with high probability) the degrees with high degree, which have unique degrees. Then, we identify the medium-degree nodes based on their connections to the high-degree nodes which we already identified. Once we have identified the high- and medium-degree nodes, we check the edges corresponding to the watermark, and if we find a significant match with one of our watermarks, we get evidence of which copy was leaked.",
    ],
    selected: false,
  },

  // Journal publications
  {
    id: "knight-tour-journal",
    type: "journal",
    title: "Taming the Knight's Tour: Minimizing Turns and Crossings",
    publisher: "TCS'22",
    authors: [
      "J.J. Besa",
      "T. Johnson",
      "N. Mamano",
      "M.C. Osegueda",
      "P. Williams",
    ],
    coverImage: "/knight/20x20.png",
    links: {
      demo: "https://nmamano.github.io/MinCrossingsKnightsTour/index.html",
      github: "https://github.com/nmamano/MinCrossingsKnightsTour",
      pdf: "https://arxiv.org/pdf/1904.02824.pdf",
    },
    description: [
      "This is a journal version of paper of the FUN'20 paper. We incorporated a contribution by a new author, Parker Williams, who improved the number of crossings from 13n+O(1) to 12n+O(1) and the number of turns from 9.5n+O(1) to 9.25n+O(1).",
    ],
    selected: false,
  },
  {
    id: "smvd-journal",
    type: "journal",
    title:
      "Stable-Matching Voronoi Diagrams: Combinatorial Complexity and Algorithms",
    publisher: "JoCG'20",
    authors: ["G. Barequet", "D. Eppstein", "M.T. Goodrich", "N. Mamano"],
    coverImage: "/smvd/manhattan.png",
    links: {
      demo: "https://nmamano.github.io/StableMatchingVoronoiDiagram/index.html",
      pdf: "https://arxiv.org/pdf/1804.09411.pdf",
    },
    description: [
      "This is a journal version of the ICALP'18 paper. We extended our algorithm to work for other distance metrics, such as Manhattan distance.",
    ],
    additionalImages: [
      {
        src: "/smvd/king.png",
        alt: "SMVD under Chebyshev metric",
        scale: 0.25,
        fullRow: true,
      },
    ],
    selected: false,
  },
  {
    id: "sana-netgo",
    type: "journal",
    title:
      "SANA NetGO: a combinatorial approach to using Gene Ontology (GO) terms to score network alignments",
    publisher: "Bioinformatics: Oxford Journals, 2018",
    authors: ["W. Hayes", "N. Mamano"],
    not_alphabetical_order: true,
    coverImage: "/sana/netgo-diagram.png",
    links: {
      pdf: "https://academic.oup.com/bioinformatics/article/34/8/1345/4708230",
      github: "https://github.com/waynebhayes/SANA",
    },
    description: [
      "Protein-protein interaction networks are graphs where the nodes represent proteins and edges denote that two proteins are physically compatible and can interact. In computational biology, PPI network alignment is the problem of detecting similarities between the PPI networks of diferent species. The motivation is that, in general, we do not have the complete map between the nodes in a PPI network and the corresponding proteins. Instead, we usually have a list of properties, called GO terms, known to be associated with each node. Network alignment can help complete the map between nodes and proteins by transfering our knowledge about the PPI network of one specie to another. The PPI networks of closely related species, such as mouse and rat, are very similar because they have barely evolved since their latest common ancestor. Thus, if we find two nodes with the same or nearly identical GO terms in the two PPI networks, we can infer that those nodes actually correspond to the same protein.",

      "We propose a new objective function to optimize for when aligning PPI networks. Prior objective functions simply try to match pairs of proteins with matching GO terms. However, this fails to account for the frequency of GO terms: rare GO terms allow to identify matching proteins more precisely. We propose the first GO-centric measure (as opposed to protein-centric), which means that the 'score' of an alignment is computed as a sum of the contribution of each GO term, rather than a sum of the contribution of each pair of aligned proteins. We give each GO term one 'unit of score', and we distribute it equally among all possible alignments that align it correctly. For instance, mapping correctly a GO term that appears exactly once in both networks is twice as valuable as mapping correctly the two occurrences of a GO term that appears twice on each network (because there are two ways to map that GO term 'correctly'). This GO-centric approach performed better with the data sets in our experiments.",
    ],
    selected: false,
  },
  {
    id: "sana",
    type: "journal",
    title:
      "SANA: Simulated Annealing far outperforms many other search algorithms for biological network alignment",
    publisher: "Bioinformatics: Oxford Journals, 2017",
    authors: ["N. Mamano", "W. Hayes"],
    not_alphabetical_order: true,
    coverImage: "/sana/temp3d.png",
    links: {
      pdf: "https://academic.oup.com/bioinformatics/article/33/14/2156/2996219#",
      github: "https://github.com/waynebhayes/SANA",
    },
    description: [
      "Protein-protein interaction networks are graphs where the nodes represent proteins and edges denote that two proteins can physically interact. Such graphs carry important biological insight, especially when we know the proteins associated to the nodes. However, in many cases, we have PPI networks with unlabeled nodes. In this paper, we give a method to transfer our knowledge about the PPI network from one specie to another via network alignment. The idea is that if we find nodes that are topologically similar in the PPI networks of, e.g., rat and mouse, the nodes are statistically likely to be the same protein. Thus, topological network alignment is the problem of mapping the nodes of two graphs while preserving the edges as best as possible–a generalization of the graph isomorphism problem. Since the problem is NP-complete, we use the simulated annealing metaheuristic. Our algorithm outperformed the other existing network alignment algorithms.",
    ],
    additionalImages: [
      {
        src: "/sana/comp.png",
        alt: "Comparison between several state-of-the-art network aligners in terms of preserved topology (left) and biology (right), with SANA on top in both",
        scale: 0.9,
        fullRow: true,
      },
    ],
    selected: true,
  },
];

// Helper functions to filter publications
export const getSelectedPublications = () =>
  PUBLICATIONS.filter((pub) => pub.selected);
export const getAllPublications = () => PUBLICATIONS;
