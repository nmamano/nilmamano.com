"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { FaGithub, FaFilePdf, FaPlay, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

interface Publication {
  id: string;
  type: "dissertation" | "conference" | "journal";
  title: string;
  authors: string[];
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
    width?: number; // Width in pixels (used for image optimization)
    height?: number; // Height in pixels (used for image optimization)
  }>;
}

// Create a wrapper component that combines ProjectCard with expandable content
const PublicationCard = ({
  publication,
  index,
  expanded,
  setExpanded,
}: {
  publication: Publication;
  index: number;
  expanded: number | null;
  setExpanded: (index: number | null) => void;
}) => {
  const isExpanded = expanded === index;
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);

  // Capture the image width when first rendered
  useEffect(() => {
    if (imageRef.current && !isExpanded) {
      setImageWidth(imageRef.current.offsetWidth);
    }
  }, []);

  // Handle height measurement for smooth animation
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(`${height}px`);
    } else {
      setContentHeight("0px");
    }
  }, [isExpanded]);

  const primaryLink =
    publication.links?.pdf ||
    publication.links?.demo ||
    publication.links?.github ||
    "#";

  return (
    <div
      className={`mb-8 transition-all duration-500 ease-in-out ${
        isExpanded ? "col-span-full" : "col-span-1"
      }`}
    >
      <div className="relative">
        {/* Card container */}
        <div
          onClick={() => setExpanded(isExpanded ? null : index)}
          className="cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out"
        >
          {/* Card Content */}
          <div className="flex flex-col">
            {/* Image with fixed width when expanded */}
            <div
              ref={imageRef}
              style={
                isExpanded && imageWidth ? { maxWidth: `${imageWidth}px` } : {}
              }
              className={isExpanded ? "ml-0" : ""}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={
                    publication.coverImage ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  alt={publication.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
                />
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-medium">{publication.title}</h3>

              <p className="text-sm text-muted-foreground mt-1">
                {publication.authors.join(", ")}
              </p>

              {/* Always show first paragraph in preview */}
              <div
                className={`mt-3 text-muted-foreground ${
                  isExpanded ? "" : "line-clamp-3"
                }`}
              >
                <p>
                  {!isExpanded
                    ? publication.description[0].substring(0, 150) +
                      (publication.description[0].length > 150 ? "..." : "")
                    : publication.description[0]}
                </p>
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
                    {publication.description.slice(1).map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Additional images */}
                  {publication.additionalImages &&
                    publication.additionalImages.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {publication.additionalImages.map((image, idx) => (
                          <div
                            key={idx}
                            className="relative h-48 overflow-hidden rounded-md border"
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-contain"
                            />
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
          {publication.links?.demo && (
            <a
              href={publication.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              title="View Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <FaPlay size={16} />
            </a>
          )}

          {publication.links?.github && (
            <a
              href={publication.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background p-2 rounded-full hover:bg-foreground/90 transition-colors"
              title="View Source Code"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={16} />
            </a>
          )}

          {publication.links?.pdf && (
            <a
              href={publication.links.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted text-foreground p-2 rounded-full hover:bg-muted/90 transition-colors"
              title="Read Paper"
              onClick={(e) => e.stopPropagation()}
            >
              <FaFilePdf size={16} />
            </a>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(isExpanded ? null : index);
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

export default function ResearchSection() {
  // Manage which publication is expanded (only one at a time)
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Sample data for one publication
  const publications: Publication[] = [
    {
      id: "thesis",
      type: "dissertation",
      title: "New Applications of the Nearest-neighbor Chain Algorithm",
      authors: ["Nil Mamano"],
      coverImage: "/blog/greedy/localGreedyTSPcrop.gif",
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
          src: "/blog/greedy/gleexamples.PNG",
          alt: "Four different problems and the corresponding solutions found by classic Greedy algorithms whose selection rules can be weakened",
        },
        {
          src: "/blog/greedy/greedyTSP.gif",
          alt: "The multi-fragment algorithm for TSP",
        },
        {
          src: "/blog/greedy/localGreedyTSPcrop.gif",
          alt: "Our algorithm with a weakened selection rule that finds the same solution",
        },
      ],
    },
    // Let's add a dummy publication to test the grid layout
    {
      id: "dummy1",
      type: "conference",
      title: "Stable-Matching Voronoi Diagrams",
      authors: ["Nil Mamano", "David Eppstein", "Michael Goodrich"],
      coverImage: "/placeholder.svg?height=400&width=600",
      links: {
        pdf: "#",
      },
      description: [
        "This is a placeholder description for testing the grid layout.",
        "This is a second paragraph to test the expansion behavior.",
      ],
    },
    {
      id: "dummy2",
      type: "conference",
      title: "Euclidean TSP and Motorcycle Graphs",
      authors: ["Nil Mamano", "Another Author"],
      coverImage: "/placeholder.svg?height=400&width=600",
      links: {
        pdf: "#",
      },
      description: [
        "Another placeholder description for testing the grid layout.",
        "This is a second paragraph to test the expansion behavior.",
      ],
    },
  ];

  // Group publications by type
  const dissertations = publications.filter(
    (pub) => pub.type === "dissertation"
  );
  const conferencePublications = publications.filter(
    (pub) => pub.type === "conference"
  );
  const journalPublications = publications.filter(
    (pub) => pub.type === "journal"
  );

  return (
    <section id="research" className="py-12 md:py-24 lg:py-32 scroll-mt-16">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
        Research
      </h2>
      <div className="max-w-6xl mx-auto">
        <p className="text-muted-foreground mb-8">
          Click on a publication title for a brief summary. All papers are
          freely available online. Authors are in alphabetical order—per
          convention in CS theory—except when marked with "*".
        </p>

        {/* PhD Dissertation Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">PhD Dissertation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dissertations.map((publication, index) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                index={index}
                expanded={expandedCard}
                setExpanded={setExpandedCard}
              />
            ))}
          </div>
        </div>

        {/* Conference Publications Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">
            Conference Publications
          </h3>
          {conferencePublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conferencePublications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  index={dissertations.length + index}
                  expanded={expandedCard}
                  setExpanded={setExpandedCard}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">Coming soon</p>
          )}
        </div>

        {/* Journal Publications Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Journal Publications</h3>
          {journalPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journalPublications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  index={
                    dissertations.length + conferencePublications.length + index
                  }
                  expanded={expandedCard}
                  setExpanded={setExpandedCard}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">Coming soon</p>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/cv/CV_NilMamano.pdf"
            className="text-primary hover:underline"
            target="_blank"
          >
            <Button>View Academic CV</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
