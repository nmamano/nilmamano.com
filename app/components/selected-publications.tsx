"use client";

import Link from "next/link";
import { getSelectedPublications } from "@/app/lib/publications";
import {
  PublicationCardPreview,
  PublicationExpandedContent,
} from "./publication-card";
import { ExpandableCardGrid } from "./expandable-card-grid";

export default function SelectedPublications() {
  const publications = getSelectedPublications();

  return (
    <section
      id="selected-publications"
      className="py-6 md:py-12 lg:py-16 scroll-mt-16"
    >
      <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
        Selected publications
      </h2>
      <div className="max-w-6xl mx-auto">
        <p className="text-muted-foreground mb-8 text-center">
          Click on a publication for a brief summary. See{" "}
          <Link href="/research" className="text-primary hover:underline">
            all publications
          </Link>{" "}
          for the complete list.
        </p>

        <ExpandableCardGrid
          items={publications}
          getItemKey={(pub) => pub.id}
          renderCard={(publication, index, isExpanded) => (
            <PublicationCardPreview
              publication={publication}
              isExpanded={isExpanded}
              showExpandIcon={true}
            />
          )}
          renderExpandedContent={(publication) => (
            <PublicationExpandedContent publication={publication} />
          )}
        />
      </div>
    </section>
  );
}
