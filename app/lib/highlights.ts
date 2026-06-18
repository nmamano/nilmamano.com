export interface HighlightLink {
  label: string;
  href: string;
  external?: boolean;
  // brand icon to show instead of / alongside the label
  icon?: "github" | "scholar" | "amazon";
}

export interface Highlight {
  id: string;
  statement: string;
  image: string;
  blurb: string;
  links: HighlightLink[];
}

// NOTE: copy + links are provisional. Tune wording as needed.
export const HIGHLIGHTS: Highlight[] = [
  {
    id: "agentic-tooling",
    statement: "Agentic tooling",
    image: "/projects/isomux-office-sm.mp4",
    blurb:
      "Isomux gives your agents a cute office: multi-device, multi-user, multi-agent collaboration across Claude and Codex. Context Composer lets you edit an agent's context mid-conversation.",
    links: [
      { label: "isomux.com", href: "https://isomux.com", external: true },
      {
        label: "GitHub",
        href: "https://github.com/nmamano/isomux",
        external: true,
        icon: "github",
      },
      {
        label: "Context Composer",
        href: "https://github.com/nmamano/context-composer",
        external: true,
      },
    ],
  },
  {
    id: "full-stack-ai",
    statement: "Full-stack AI apps",
    image: "/projects/wallwarsgame.gif",
    blurb:
      "Wall Game, an online board game I invented, with a superhuman AlphaZero-style AI I trained via self-play.",
    links: [
      { label: "wallgame.io", href: "https://wallgame.io", external: true },
      { label: "AI write-up", href: "/blog/wall-game-ai" },
      {
        label: "GitHub",
        href: "https://github.com/nmamano/wallgame",
        external: true,
        icon: "github",
      },
    ],
  },
  {
    id: "research",
    statement: "Algorithms research",
    image: "/knight/3d.svg",
    blurb:
      "10 peer-reviewed papers with 180 citations in computational geometry, graphs, computational biology, and recreational math - all publicly available.",
    links: [
      { label: "Research", href: "/research" },
      {
        label: "Google Scholar",
        href: "https://scholar.google.bg/citations?user=LIuIigEAAAAJ&hl=en",
        external: true,
        icon: "scholar",
      },
    ],
  },
  {
    id: "build-in-public",
    statement: "Building in public",
    image: "/blog-node.jpg",
    blurb:
      "40+ posts on agentic engineering, AI, algorithms, and how I build my projects - all open source.",
    links: [
      { label: "Read the blog", href: "/blog" },
      {
        label: "GitHub",
        href: "https://github.com/nmamano",
        external: true,
        icon: "github",
      },
    ],
  },
  {
    id: "author-educator",
    statement: "Author and educator",
    image: "/book-node.jpg",
    blurb:
      "Co-author of Beyond Cracking the Coding Interview and creator of the DS&A Toolkit.",
    links: [
      {
        label: "Beyond Cracking the Coding Interview",
        href: "https://www.amazon.com/dp/195570600X",
        external: true,
        icon: "amazon",
      },
      { label: "dsatoolkit.com", href: "https://dsatoolkit.com", external: true },
    ],
  },
];

export const getHighlights = (): Highlight[] => HIGHLIGHTS;
