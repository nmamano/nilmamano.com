"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaGithub, FaPlay, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { Project, getAllProjects } from "@/app/lib/research-projects";

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
          className="cursor-pointer overflow-hidden rounded-lg card-border bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out h-full"
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
    <section id="projects" className="py-6 md:py-12 lg:py-16 scroll-mt-16">
      <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
        Projects
      </h2>
      <div className="max-w-6xl mx-auto">
        <p className="text-muted-foreground mb-8 text-center">
          Click on a project for a brief explanation. More projects on{" "}
          <Link
            href="https://github.com/nmamano"
            className="text-primary hover:underline"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAllProjects().map((project, index) => (
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
