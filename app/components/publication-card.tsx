"use client";

import { useState, useRef, useEffect } from "react";
import { FaGithub, FaFilePdf, FaPlay, FaChevronDown, FaBook } from "react-icons/fa";
import Image from "next/image";
import { Publication } from "@/app/lib/publications";

interface PublicationCardPreviewProps {
  publication: Publication;
  isExpanded?: boolean;
  showExpandIcon?: boolean;
}

// Card preview component - used in the grid
export const PublicationCardPreview = ({
  publication,
  isExpanded = false,
  showExpandIcon = true,
}: PublicationCardPreviewProps) => {
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
              backgroundColor: publication.coverImage?.endsWith(".svg")
                ? "white"
                : "transparent",
              padding: publication.coverImage?.endsWith(".svg") ? "16px" : "0",
              borderRadius: publication.coverImage?.endsWith(".svg")
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
                publication.coverImage ||
                "/placeholder.svg?height=400&width=600"
              }
              alt={publication.title}
              width={600}
              height={400}
              className="max-h-full max-w-full object-contain"
              style={{ height: "auto", width: "auto" }}
            />
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-medium">{publication.title}</h3>

            <p className="text-sm text-muted-foreground mt-1">
              {publication.not_alphabetical_order ? "* " : ""}
              {publication.authors.join(", ")}
              {publication.publisher && `. ${publication.publisher}`}
            </p>

            {/* Preview text */}
            <div className="mt-3 text-muted-foreground line-clamp-3">
              <p>
                {publication.description[0].substring(0, 150) +
                  (publication.description[0].length > 150 ? "..." : "")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expand icon */}
      {showExpandIcon && (
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
      )}
    </div>
  );
};

interface PublicationExpandedContentProps {
  publication: Publication;
}

// Expanded content component - rendered below the row
export const PublicationExpandedContent = ({
  publication,
}: PublicationExpandedContentProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImagesLoaded(true);
  };

  return (
    <div>
      {/* Title and metadata */}
      <div className="mb-4">
        <h3 className="text-xl font-medium">{publication.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {publication.not_alphabetical_order ? "* " : ""}
          {publication.authors.join(", ")}
          {publication.publisher && `. ${publication.publisher}`}
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-3">
          {publication.links?.pdf && (
            <a
              href={publication.links.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaFilePdf size={16} />
              <span>Read Paper</span>
            </a>
          )}
          {publication.links?.blog && (
            <a
              href={publication.links.blog}
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaBook size={16} />
              <span>Blog Post</span>
            </a>
          )}
          {publication.links?.github && (
            <a
              href={publication.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={16} />
              <span>Source Code</span>
            </a>
          )}
          {publication.links?.demo && (
            <a
              href={publication.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaPlay size={16} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Full description */}
      <div className="space-y-4 text-muted-foreground">
        {publication.description.map((paragraph, idx) => (
          <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>

      {/* Additional images */}
      {publication.additionalImages && publication.additionalImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {publication.additionalImages.map((image, idx) => (
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
                  onLoad={handleImageLoaded}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Legacy component for backwards compatibility (non-expandable display)
interface PublicationCardProps {
  publication: Publication;
  index?: number;
  expandedCards?: Set<number>;
  toggleExpanded?: (index: number) => void;
  showExpansion?: boolean;
}

export const PublicationCard = ({
  publication,
  showExpansion = false,
}: PublicationCardProps) => {
  // For non-expandable usage, just render the preview
  return (
    <PublicationCardPreview
      publication={publication}
      isExpanded={false}
      showExpandIcon={showExpansion}
    />
  );
};
