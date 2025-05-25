export interface Project {
  id: string;
  title: string;
  coverImage?: string;
  links?: {
    demo?: string;
    github?: string;
  };
  description: string[]; // Array of paragraphs
  additionalImages?: Array<{
    src: string;
    alt: string;
    scale?: number; // Single value to control image size (1 = default, 2 = twice as large, etc.)
    fullWidth?: boolean; // Optional flag to make image span full width
    fullRow?: boolean; // Optional flag to make image take a full row instead of half
  }>;
}

export const PROJECTS: Project[] = [
  {
    id: "wallwars",
    title: "WallWars online board game",
    coverImage: "/projects/wallwarsgame.gif",
    links: {
      demo: "https://www.wallwars.net/",
      github: "https://github.com/nmamano/wallwars",
    },
    description: [
      "Wallwars is an online 2-player strategy board game. The player who gets to their goal before first wins. You can place walls to reshape the terrain to your advantage. WallWars is inspired by board games like Blockade and Quoridor. I built it to learn the MERN stack. Over 400 games have been played. I'm now <a href='/blog/wall-game-intro' class='text-primary hover:underline' onClick='event.stopPropagation()'>rebuilding it in public</a>.",
    ],
  },
  {
    id: "sana",
    title: "SANA: Simulated Annealing Network Aligner",
    coverImage: "/sana/operations.png",
    links: {
      demo: "http://sana.ics.uci.edu/",
      github: "https://github.com/waynebhayes/SANA",
    },
    description: [
      'Network alignment is the algorithmic problem of how to map biological networks to discover their similarities. It can be seen as the analogous of sequence alignment, but for graphs instead of strings. This makes the problem NP-hard. For my undergrad thesis, I developed an algorithm based on the simulated annealing metaheuristic which substantially outperformed other existing methods (I later transferred the repo to a new maintainer). The project spawned a series of papers (<a href="https://academic.oup.com/bioinformatics/article/33/14/2156/2996219" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P1</a>, <a href="https://academic.oup.com/bioinformatics/article/34/8/1345/4708230" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P2</a>, <a href="https://link.springer.com/article/10.1007/s13721-019-0214-4" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P3</a>, <a href="https://ieeexplore.ieee.org/abstract/document/9718505" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P4</a>, <a href="https://www.sciencedirect.com/science/article/abs/pii/S1876162322000475" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P5</a>, <a href="https://www.nature.com/articles/s41540-022-00232-x" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P6</a>), of which I am a coauthor on two of them (see <a href="#research" class="text-primary hover:underline" onClick="event.stopPropagation()">Research</a>). It also placed 4th at <a href="https://codex.flywire.ai/app/vnc_matching_challenge" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">a competition</a>.',
    ],
  },
  {
    id: "racso",
    title: "RACSO Online Judge (contribution)",
    coverImage: "/racso_benchmark.png",
    links: {
      demo: "https://racso.cs.upc.edu/juezwsgi/index",
      github: "https://github.com/nmamano/SATReductionLang",
    },
    description: [
      "The RACSO online Judge is a teaching tool for the 'Theory of Computation' subject. It contains a collection of automatically-evaluated exercises asking to define recognizers/generators of formal languages (regular or context-free), as well as exercises asking for reductions between problems (undecidable or NP-complete). The judge also contains exercises for a compilers course.",

      'RACSO was developed at Polytechnic University of Catalonia, where it is used for homework and even for exams. After using it myself as a student, I started a working on expanding it. I contributed most of the exercises in the lists for <a href="https://racso.cs.upc.edu/juezwsgi/exercise-list?inputkind=redsat" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">reductions to SAT</a> and <a href="https://racso.cs.upc.edu/juezwsgi/exercise-list?inputkind=antlrsyn" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">syntax parsers</a>, and some exercises in other lists. I also helped <a href="https://github.com/nmamano/SATReductionLang" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">code</a> the interpreter for the language in which the SAT reductions are given.',

      'The interesting aspect of these judges is that the evaluation is not simply based on test cases. Here is a <a href="https://upcommons.upc.edu/handle/2117/119781" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">technical report</a> about the inner workings of the judge for evaluating syntax parsers.',
    ],
  },
  // {
  //   id: "merging-geometry",
  //   title: "Merging Geometries",
  //   coverImage: "/merging_geometry/twisted_square_torus.gif",
  //   links: {
  //     github: "https://github.com/nmamano/mobiustorus",
  //   },
  //   description: [
  //     "I've been researching the types of shapes you can get by taking a 3D shape and 'merging' two of its faces. Blog post WIP.",
  //   ],
  //   additionalImages: [
  //     {
  //       src: "/merging_geometry/cube.png",
  //       alt: "Cube derivations",
  //       scale: 1,
  //       fullRow: true,
  //       fullWidth: true,
  //     },
  //     {
  //       src: "/merging_geometry/rules.png",
  //       alt: "Rules for merging edges",
  //       scale: 1,
  //     },
  //     {
  //       src: "/merging_geometry/octahedron2.png",
  //       alt: "Merging octahedron faces (2)",
  //       scale: 1,
  //     },
  //     {
  //       src: "/merging_geometry/2face.gif",
  //       alt: "Blender experiment",
  //       scale: 1,
  //     },
  //     {
  //       src: "/merging_geometry/octahedron1.png",
  //       alt: "Merging octahedron faces (1)",
  //       scale: 1,
  //     },
  //   ],
  // },
  {
    id: "bandwidth-enforcer",
    title: "Bandwidth Enforcer Visualizer",
    coverImage: "/projects/bwevisualizer.png",
    links: {
      demo: "http://nilmamano.com/bandwidth-enforcer-plotter/",
      github: "https://github.com/nmamano/bandwidth-enforcer-plotter",
    },
    description: [
      'One of the problems in software defined networking (SDN) is how to decide how much traffic each host should be allowed to send without overloading the network. "<a href="https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43838.pdf" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">BwE: Flexible, Hierarchical Bandwidth Allocation for WAN Distributed Computing</a>" is a public research paper from Google which introduces the Bandwidth Enforcer (BwE) network allocation algorithm used in Google\'s internal WAN. Among other things, it introduces the notion of bandwidth functions and how to aggregate them in a fair way. Since this was related to the work I did at Google, I made an interactive app to recreate the examples from the paper and be able to explore how they would change with different parameters.',

      "For more context on the problem of fair network allocation, check out the BwE paper.",
    ],
    additionalImages: [],
  },
  // {
  //   id: "stable-matching",
  //   title: "Two-list stable matching visualizer",
  //   coverImage: "/projects/twolist.png",
  //   links: {
  //     demo: "https://nmamano.github.io/TwoListStableMatching/index.html",
  //     github: "https://github.com/nmamano/TwoListStableMatching",
  //   },
  //   description: [
  //     'The "two-list stable matching problem" is an open problem in the field of market design that I tried to solve during my PhD (and failed). I made an interactive visual exploration tool to assist in solving it. See <a href="https://github.com/nmamano/TwoListStableMatching" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">the github page</a> for a description of the problem and the tool.',

  //     'The <a href="https://nmamano.github.io/TwoListStableMatching/index.html" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">demo</a> requires a mouse, so it is not friendly to mobile browsers.',
  //   ],
  //   additionalImages: [],
  // },
  // {
  //   id: "bctci-parser",
  //   title: "BCTCI Problem Parser",
  //   coverImage: "/book-cover.png",
  //   links: {
  //     demo: "https://bctci.co",
  //   },
  //   description: [
  //     "The online platform that goes along with the book 'Beyond Cracking the Coding Interview' (built by interviewing.io) allows you to try to solve all 200+ problems in the book and shows you solutions in your preferred language among Python, JS, Java, and C++. To make this possible, I built a script that, for each problem, takes the raw solutions in all four languages, runs their tests, and then parses the source code to detect top-level definitions. This allows us (the authors) to inject the corresponding snippets into the solution articles in a language-agnostic way (from a single source solution document, the script generates four different solution articles, one for each language, by injecting the appropriate code snippets). The repo is private.",
  //   ],
  // },
  {
    id: "ttlcache",
    title: "LRU + TTL Cache",
    coverImage: "/multiplicative_hashing.png",
    links: {
      github: "https://github.com/nmamano/ttlcache",
    },
    description: [
      "An in-memory hash table that acts as a Cache for a Key-Value storage. It is inspired by Redis and Memcached. It has an LRU (least recently used) eviction mechanism, and it also supports timeouts: entries expire after a certain TTL (<q>time-to-live</q>). The project focuses on how to handle expired entries. They can be handled in two ways: 1) passively, when they are <q>discovered</q> through read/write operations. 2) actively, by searching for them.",

      'Using only passive removal may result in the LRU mechanism evicting entries that are still <q>alive</q> while the cache is poluted by expired entries. Memcached uses a <a href="https://memcached.org/blog/modern-lru/" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">segmented LRU mechanism</a> which takes TTL\'s into account. It can be considered as a type of passive removal. In contrast, Redis implements an active <a href="https://redis.io/commands/expire" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">probabilistic algorithm</a> to keep the fraction of expired entries low, which I implemented in this project. In the future, this project may serve as a testbed for comparing different algorithms for handling expired entries.',
    ],
  },
];

// Helper function to get all projects
export const getAllProjects = (): Project[] => {
  return PROJECTS;
};
