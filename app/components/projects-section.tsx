"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaGithub, FaPlay, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

interface Project {
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

// Projects list - moved to the top for easier editing
const PROJECTS: Project[] = [
  {
    id: "wallwars",
    title: "WallWars online board game",
    coverImage: "/projects/wallwarsgame.gif", // You'll need to add this image
    links: {
      demo: "https://www.wallwars.net/",
      github: "https://github.com/nmamano/wallwars",
    },
    description: [
      "Wallwars is an online 2-player strategy board game. The player who gets to their goal before first wins. You can place walls to reshape the terrain to your advantage. WallWars is inspired by board games like Blockade and Quoridor. I built it to learn the MERN stack. Over 400 games have been played.",
    ],
  },
  {
    id: "sana",
    title: "SANA: Simulated Annealing Network Aligner",
    coverImage: "/sana/operations.png", // You'll need to add this image
    links: {
      demo: "http://sana.ics.uci.edu/",
      github: "https://github.com/waynebhayes/SANA",
    },
    description: [
      'Network alignment is the algorithmic problem of how to map biological networks to discover their similarities. It can be seen as the analogous of sequence alignment, but for graphs instead of strings. This makes the problem NP-hard. For my undergrad thesis, I developed an algorithm based on the simulated annealing metaheuristic which substantially outperformed other existing methods (I later transferred the repo to a new maintainer). The project spawned a series of papers (<a href="https://academic.oup.com/bioinformatics/article/33/14/2156/2996219" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P1</a>, <a href="https://academic.oup.com/bioinformatics/article/34/8/1345/4708230" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P2</a>, <a href="https://link.springer.com/article/10.1007/s13721-019-0214-4" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P3</a>, <a href="https://ieeexplore.ieee.org/abstract/document/9718505" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P4</a>, <a href="https://www.sciencedirect.com/science/article/abs/pii/S1876162322000475" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P5</a>, <a href="https://www.nature.com/articles/s41540-022-00232-x" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">P6</a>), of which I am a coauthor on two of them (see <a href="#research" class="text-primary hover:underline" onClick="event.stopPropagation()">Research</a>). It also placed 4th at <a href="https://codex.flywire.ai/app/vnc_matching_challenge" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">a competition</a>.',
    ],
  },
  {
    id: "bctci-parser",
    title: "BCTCI Problem Parser",
    coverImage: "/book-cover.png", // You'll need to add this image
    links: {
      demo: "https://bctci.co",
    },
    description: [
      "The online platform that goes along with the book 'Beyond Cracking the Coding Interview' (built by interviewing.io) allows you to try to solve all 200+ problems in the book and shows you solutions in your preferred language among Python, JS, Java, and C++. To make this possible, I built a script that, for each problem, takes the raw solutions in all four languages, runs their tests, and then parses the source code to detect top-level definitions. This allows us (the authors) to inject the corresponding snippets into the solution articles in a language-agnostic way (from a single source solution document, the script generates four different solution articles, one for each language, by injecting the appropriate code snippets). The repo is private.",
    ],
  },
  {
    id: "merging-geometry",
    title: "Merging Geometries",
    coverImage: "/merging_geometry/twisted_square_torus.gif", // You'll need to add this image
    links: {
      github: "https://github.com/nmamano/mobiustorus",
    },
    description: [
      "I've been researching the types of shapes you can get by taking a 3D shape and 'merging' two of its faces. Blog post WIP.",
    ],
    additionalImages: [
      {
        src: "/merging_geometry/cube.png",
        alt: "Cube with faces labeled",
        scale: 1,
        fullRow: true,
        fullWidth: true,
      },
      {
        src: "/merging_geometry/rules.png",
        alt: "Rules for merging adjacent and opposite edges",
        scale: 1,
      },
      {
        src: "/merging_geometry/octahedron_bad.gif",
        alt: "Blender experiment",
        scale: 1,
      },
      {
        src: "/merging_geometry/octahedron1.png",
        alt: "Merging octahedron faces (1)",
        scale: 1,
      },
      {
        src: "/merging_geometry/octahedron2.png",
        alt: "Merging octahedron faces (2)",
        scale: 1,
      },
    ],
  },
  {
    id: "racso",
    title: "RACSO Online Judge (contribution)",
    coverImage: "/racso_benchmark.png", // You'll need to add this image
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
  {
    id: "bandwidth-enforcer",
    title: "Bandwidth Enforcer Visualizer",
    coverImage: "/projects/bwevisualizer.png", // You'll need to add this image
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
  {
    id: "stable-matching",
    title: "Two-list stable matching visualizer",
    coverImage: "/projects/twolist.png", // You'll need to add this image
    links: {
      demo: "https://nmamano.github.io/TwoListStableMatching/index.html",
      github: "https://github.com/nmamano/TwoListStableMatching",
    },
    description: [
      'The "two-list stable matching problem" is an open problem in the field of market design that I tried to solve during my PhD (and failed). I made an interactive visual exploration tool to assist in solving it. See <a href="https://github.com/nmamano/TwoListStableMatching" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">the github page</a> for a description of the problem and the tool.',

      'The <a href="https://nmamano.github.io/TwoListStableMatching/index.html" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">demo</a> requires a mouse, so it is not friendly to mobile browsers.',
    ],
    additionalImages: [],
  },
  // {
  //   id: "simplified-svg",
  //   title: "Simplified SVG",
  //   coverImage: "/projects/simplifiedsvg.png", // You'll need to add this image
  //   links: {
  //     demo: "http://nilmamano.com/simplifiedsvg/",
  //     github: "https://github.com/nmamano/simplifiedsvg",
  //   },
  //   description: [
  //     "My research often has geometric aspects, and geometric concepts are not easy to convey in text form. To aid in this, I made the <em>Simplified SVG</em> library which accepts geometric primitives, specified in JSON, and shows the result on the resulting drawing in the browser using SVG. This is useful to visualize computationally-generated geometric data and avoid having to draw it out by hand.",

  //     'While drawing software with support for <q>scripting</q> already exists, I kept the syntax minmalistic so that it is easy to generate the drawing instructions from any language/environment, and instead of running a drawing software/library, one can just copy-paste them on the <a href="http://nilmamano.com/simplifiedsvg/" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">sandbox</a>.',

  //     "Note: the sandbox is not intended for mobile browsers.",
  //   ],
  // },
  // {
  //   id: "sanim",
  //   title: "Sanim (Slide ANIMation)",
  //   coverImage: "/projects/sanim.png", // You'll need to add this image
  //   links: {
  //     demo: "https://nmamano.github.io/sanim/index.html",
  //     github: "https://github.com/nmamano/sanim",
  //   },
  //   description: [
  //     "Sanim is both a markup language for preparing presentations, and a parser for this language that produces the presentations. The transition between slides is animated using Manim.",

  //     '<a href="https://github.com/3b1b/manim" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">Manim (Math ANIMation)</a> is an animation engine for explanatory math videos made for the youtube channel <a href="https://www.youtube.com/c/3blue1brown" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">3Blue1Brown</a>.',

  //     "Sanim encapsulates Manim so that the user can prepare slides with a style similar to Manim but without needing to write code. In addition, the slides are displayed in a browser, and the user can trigger the forward and backward animations using arrow keys.",

  //     "For the demo, use the right arrow key to show the slides (not possible on mobile browsers). See more on the github repo.",
  //   ],
  // },
  {
    id: "ttlcache",
    title: "LRU + TTL Cache",
    coverImage: "/multiplicative_hashing.png", // You'll need to add this image
    links: {
      github: "https://github.com/nmamano/ttlcache",
    },
    description: [
      "An in-memory hash table that acts as a Cache for a Key-Value storage. It is inspired by Redis and Memcached. It has an LRU (least recently used) eviction mechanism, and it also supports timeouts: entries expire after a certain TTL (<q>time-to-live</q>). The project focuses on how to handle expired entries. They can be handled in two ways: 1) passively, when they are <q>discovered</q> through read/write operations. 2) actively, by searching for them.",

      'Using only passive removal may result in the LRU mechanism evicting entries that are still <q>alive</q> while the cache is poluted by expired entries. Memcached uses a <a href="https://memcached.org/blog/modern-lru/" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">segmented LRU mechanism</a> which takes TTL\'s into account. It can be considered as a type of passive removal. In contrast, Redis implements an active <a href="https://redis.io/commands/expire" class="text-primary hover:underline" target="_blank" onClick="event.stopPropagation()">probabilistic algorithm</a> to keep the fraction of expired entries low, which I implemented in this project. In the future, this project may serve as a testbed for comparing different algorithms for handling expired entries.',
    ],
  },
];

// Create a wrapper component that combines ProjectCard with expandable content
const ProjectCard = ({
  project,
  index,
  expandedCards,
  toggleExpanded,
}: {
  project: Project;
  index: number;
  expandedCards: Set<number>;
  toggleExpanded: (index: number) => void;
}) => {
  const isExpanded = expandedCards.has(index);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Capture the image width when first rendered
  useEffect(() => {
    if (imageRef.current && !isExpanded) {
      setImageWidth(imageRef.current.offsetWidth);
    }
  }, []);

  // Reset images loaded state when expanded changes
  useEffect(() => {
    if (isExpanded) {
      setImagesLoaded(false);
    }
  }, [isExpanded]);

  // Handle height measurement for smooth animation
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      // Initial height calculation
      const height = contentRef.current.scrollHeight;
      setContentHeight(`${height}px`);

      // Recalculate after a short delay to account for initial rendering
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const updatedHeight = contentRef.current.scrollHeight;
          setContentHeight(`${updatedHeight}px`);
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setContentHeight("0px");
    }
  }, [isExpanded, imagesLoaded]);

  // Add this useEffect to handle links in the description
  useEffect(() => {
    if (isExpanded) {
      // Find all links in the expanded content and prevent them from collapsing the card
      const links = contentRef.current?.querySelectorAll("a");
      links?.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      });

      return () => {
        links?.forEach((link) => {
          link.removeEventListener("click", (e) => {
            e.stopPropagation();
          });
        });
      };
    }
  }, [isExpanded]);

  // Function to handle image load events
  const handleImageLoaded = () => {
    setImagesLoaded(true);

    // Update height again after images are loaded
    if (contentRef.current) {
      const updatedHeight = contentRef.current.scrollHeight;
      setContentHeight(`${updatedHeight}px`);
    }
  };

  const primaryLink = project.links?.demo || project.links?.github || "#";

  return (
    <div
      className={`mb-8 transition-all duration-500 ease-in-out ${
        isExpanded ? "col-span-full" : "col-span-1"
      }`}
    >
      <div className="relative">
        {/* Card container */}
        <div
          onClick={(e) => {
            // Don't trigger expansion if user is selecting text
            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
              return; // Exit without toggling if text is selected
            }
            toggleExpanded(index);
          }}
          className="cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out h-full"
        >
          {/* Card Content */}
          <div className="flex flex-col h-full">
            {/* Image with fixed width when expanded */}
            <div
              ref={imageRef}
              style={
                isExpanded && imageWidth ? { maxWidth: `${imageWidth}px` } : {}
              }
              className={isExpanded ? "ml-0" : ""}
            >
              <div
                className="w-full overflow-hidden"
                style={{
                  backgroundColor: project.coverImage?.endsWith(".svg")
                    ? "white"
                    : "transparent",
                  padding: project.coverImage?.endsWith(".svg") ? "16px" : "0",
                  borderRadius: project.coverImage?.endsWith(".svg")
                    ? "8px"
                    : "0",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={
                    project.coverImage ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  alt={project.title}
                  width={600}
                  height={400}
                  className="max-h-full max-w-full object-contain"
                  style={{ height: "auto", width: "auto" }}
                  onLoad={handleImageLoaded}
                />
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-medium">{project.title}</h3>

              {/* Always show first paragraph in preview */}
              <div
                className={`mt-3 text-muted-foreground ${
                  isExpanded ? "" : "line-clamp-3"
                }`}
              >
                {!isExpanded ? (
                  <p>
                    {project.description[0].substring(0, 150) +
                      (project.description[0].length > 150 ? "..." : "")}
                  </p>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: project.description[0],
                    }}
                  ></p>
                )}
              </div>

              {/* Expandable content area - only shown when expanded */}
              {isExpanded && (
                <div
                  ref={contentRef}
                  style={{
                    height: contentHeight,
                    opacity: isExpanded ? 1 : 0,
                    transition:
                      "height 0.5s ease-in-out, opacity 0.5s ease-in-out",
                  }}
                  className="mt-4 overflow-hidden"
                >
                  {/* Additional paragraphs (2nd and onwards) */}
                  <div className="space-y-4 text-muted-foreground">
                    {project.description.slice(1).map((paragraph, idx) => (
                      <p
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      ></p>
                    ))}
                  </div>

                  {/* Additional images */}
                  {project.additionalImages &&
                    project.additionalImages.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {project.additionalImages.map((image, idx) => (
                          <div
                            key={idx}
                            className={`${
                              image.fullWidth || image.fullRow
                                ? "md:col-span-2"
                                : ""
                            } ${
                              image.fullRow ? "my-4" : ""
                            } flex justify-center`}
                          >
                            <div
                              style={{
                                width: image.scale
                                  ? `${image.scale * 100}%`
                                  : "100%",
                                maxWidth: "100%",
                                backgroundColor: image.src.endsWith(".svg")
                                  ? "white"
                                  : "transparent",
                                padding: image.src.endsWith(".svg")
                                  ? "16px"
                                  : "0",
                                borderRadius: image.src.endsWith(".svg")
                                  ? "8px"
                                  : "0",
                              }}
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={450}
                                className="rounded-md w-full h-auto"
                                onLoad={handleImageLoaded}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Icons for links that appear on the card */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted text-foreground p-2 rounded-full hover:bg-muted/90 transition-colors"
              title="View Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <FaPlay size={16} />
            </a>
          )}

          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted text-foreground p-2 rounded-full hover:bg-muted/90 transition-colors"
              title="View Source Code"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={16} />
            </a>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded(index);
            }}
            className={`bg-muted text-muted-foreground p-2 rounded-full hover:bg-muted/90 transition-all duration-300 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            title={isExpanded ? "Show less" : "Show more"}
            aria-expanded={isExpanded}
          >
            <FaChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  // State for expanded cards
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  // Create a toggle function that adds/removes cards from the set
  const toggleExpanded = (index: number) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(index)) {
      newExpandedCards.delete(index);
    } else {
      newExpandedCards.add(index);
    }
    setExpandedCards(newExpandedCards);
  };

  return (
    <section id="projects" className="py-12 md:py-24 lg:py-32 scroll-mt-16">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
        Projects
      </h2>
      <div className="max-w-6xl mx-auto">
        <p className="text-muted-foreground mb-8">
          Click on a project for a brief explanation. More projects on my{" "}
          <Link
            href="https://github.com/nmamano"
            className="text-primary hover:underline"
            target="_blank"
          >
            GitHub page
          </Link>
          .
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              expandedCards={expandedCards}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
