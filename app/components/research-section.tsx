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
    width?: number;
    height?: number;
  }>;
}

// Create a wrapper component that combines ProjectCard with expandable content
const PublicationCard = ({ publication }: { publication: Publication }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle height measurement for smooth animation
  useEffect(() => {
    if (expanded && contentRef.current) {
      // Get the scrollHeight to determine the full height of the content
      const height = contentRef.current.scrollHeight;
      setContentHeight(`${height}px`);
    } else {
      setContentHeight("0px");
    }
  }, [expanded]);

  // Convert links to a primary link for the ProjectCard
  const primaryLink =
    publication.links?.pdf ||
    publication.links?.demo ||
    publication.links?.github ||
    "#";

  return (
    <div className="relative mb-8">
      {/* Card container */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out"
      >
        {/* Card Content */}
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={
              publication.coverImage || "/placeholder.svg?height=400&width=600"
            }
            alt={publication.title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold">{publication.title}</h3>

          <p className="text-sm text-muted-foreground mt-1">
            {publication.authors.join(", ")}
            <span className="ml-2 italic">
              (
              {publication.type.charAt(0).toUpperCase() +
                publication.type.slice(1)}
              )
            </span>
          </p>

          {/* Always show first paragraph */}
          <div className="mt-3 text-muted-foreground">
            <p>
              {publication.description[0].substring(0, 150) +
                (publication.description[0].length > 150 && !expanded
                  ? "..."
                  : "")}
              {expanded && publication.description[0].length > 150
                ? publication.description[0].substring(150)
                : ""}
            </p>
          </div>

          {/* Expandable content area - contains additional paragraphs */}
          <div
            ref={contentRef}
            style={{
              height: contentHeight,
              opacity: expanded ? 1 : 0,
              visibility: expanded ? "visible" : "hidden", // Ensure content is clickable only when expanded
            }}
            className="mt-4 overflow-hidden transition-all duration-500 ease-in-out"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
            className="bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90 transition-colors"
            title="Read Paper"
            onClick={(e) => e.stopPropagation()}
          >
            <FaFilePdf size={16} />
          </a>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className={`bg-muted text-muted-foreground p-2 rounded-full hover:bg-muted/90 transition-all duration-300 ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
          title={expanded ? "Show less" : "Show more"}
          aria-expanded={expanded}
        >
          <FaChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default function ResearchSection() {
  // Sample data for one publication
  const publications: Publication[] = [
    {
      id: "thesis",
      type: "dissertation",
      title: "New Applications of the Nearest-neighbor Chain Algorithm",
      authors: ["Nil Mamano"],
      coverImage: "nnc/localGreedyTSPcrop.gif",
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
    // We'll add more publications later
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
          <div className="grid grid-cols-1 gap-4">
            {dissertations.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </div>

        {/* Conference Publications Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">
            Conference Publications
          </h3>
          {conferencePublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conferencePublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {journalPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
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
