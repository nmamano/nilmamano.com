"use client";

import Link from "next/link";
import { FaGithub, FaPlay, FaChevronDown, FaBook } from "react-icons/fa";
import Image from "next/image";
import { Project, getAllProjects } from "@/app/lib/projects";
import { ExpandableCardGrid } from "./expandable-card-grid";

interface ProjectCardPreviewProps {
  project: Project;
  isExpanded?: boolean;
}

// Card preview component
const ProjectCardPreview = ({
  project,
  isExpanded = false,
}: ProjectCardPreviewProps) => {
  return (
    <div className="relative h-full">
      <div
        className={`overflow-hidden rounded-lg card-border bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out h-full ${
          isExpanded ? "ring-2 ring-primary" : ""
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cover Image */}
          <div
            className="w-full overflow-hidden"
            style={{
              backgroundColor: project.coverImage?.endsWith(".svg")
                ? "white"
                : "transparent",
              padding: project.coverImage?.endsWith(".svg") ? "16px" : "0",
              borderRadius: project.coverImage?.endsWith(".svg") ? "8px" : "0",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={project.coverImage || "/placeholder.svg?height=400&width=600"}
              alt={project.title}
              width={600}
              height={400}
              className="max-h-full max-w-full object-contain"
              style={{ height: "auto", width: "auto" }}
            />
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-medium">{project.title}</h3>

            {/* Preview text */}
            <div className="mt-3 text-muted-foreground line-clamp-3">
              <p>
                {project.description[0].substring(0, 150) +
                  (project.description[0].length > 150 ? "..." : "")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expand icon */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`bg-muted text-muted-foreground p-2 rounded-full transition-all duration-300 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          title={isExpanded ? "Show less" : "Show more"}
        >
          <FaChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

interface ProjectExpandedContentProps {
  project: Project;
}

// Expanded content component
const ProjectExpandedContent = ({ project }: ProjectExpandedContentProps) => {
  return (
    <div>
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-xl font-medium">{project.title}</h3>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-3">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaPlay size={16} />
              <span>Demo</span>
            </a>
          )}
          {project.links?.blog && (
            <a
              href={project.links.blog}
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaBook size={16} />
              <span>Blog Post</span>
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={16} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Full description */}
      <div className="space-y-4 text-muted-foreground">
        {project.description.map((paragraph, idx) => (
          <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>

      {/* Additional images */}
      {project.additionalImages && project.additionalImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {project.additionalImages.map((image, idx) => (
            <div
              key={idx}
              className={`${
                image.fullWidth || image.fullRow ? "md:col-span-2" : ""
              } ${image.fullRow ? "my-4" : ""} flex justify-center`}
            >
              <div
                style={{
                  width: image.scale ? `${image.scale * 100}%` : "100%",
                  maxWidth: "100%",
                  backgroundColor: image.src.endsWith(".svg")
                    ? "white"
                    : "transparent",
                  padding: image.src.endsWith(".svg") ? "16px" : "0",
                  borderRadius: image.src.endsWith(".svg") ? "8px" : "0",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={450}
                  className="rounded-md w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ProjectsSection() {
  const projects = getAllProjects();

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

        <ExpandableCardGrid
          items={projects}
          getItemKey={(project) => project.id}
          renderCard={(project, index, isExpanded) => (
            <ProjectCardPreview project={project} isExpanded={isExpanded} />
          )}
          renderExpandedContent={(project) => (
            <ProjectExpandedContent project={project} />
          )}
        />
      </div>
    </section>
  );
}
