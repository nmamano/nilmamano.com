"use client";

import Link from "next/link";
import { getAllPublications, Publication } from "@/app/lib/publications";
import {
  PublicationCardPreview,
  PublicationExpandedContent,
} from "@/app/components/publication-card";
import { ExpandableCardGrid } from "@/app/components/expandable-card-grid";

function PublicationGrid({ publications }: { publications: Publication[] }) {
  return (
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
  );
}

function ResearchSection() {
  // Full list of publications
  const publications = getAllPublications();

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
    <section
      id="research"
      className="pt-1 pb-6 md:pt-2 md:pb-12 lg:pt-3 lg:pb-16 scroll-mt-16"
    >
      <h2 className="text-2xl font-medium tracking-tighter sm:text-3xl md:text-4xl mb-8 text-center">
        Research Publications
      </h2>
      <div className="max-w-6xl mx-auto">
        <ul className="text-muted-foreground mb-8 list-disc pl-6 space-y-2">
          <li>Click on a publication for a brief summary.</li>
          <li>
            All papers are <b>freely available online</b> (PDF icon).
          </li>
          <li>
            Authors are in alphabetical order—per convention in CS theory—except
            when marked with "*".
          </li>
          <li>
            See also my{" "}
            <Link
              href="/resume/cv_nilmamano.pdf"
              className="text-primary hover:underline"
              target="_blank"
            >
              academic CV
            </Link>{" "}
            or my{" "}
            <Link
              href="https://scholar.google.bg/citations?user=LIuIigEAAAAJ&hl=en"
              className="text-primary hover:underline"
              target="_blank"
            >
              Google Scholar profile
            </Link>
            .
          </li>
        </ul>

        {/* Conference Publications Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold mb-12 text-center">
            Conference Publications
          </h3>
          {conferencePublications.length > 0 ? (
            <PublicationGrid publications={conferencePublications} />
          ) : (
            <p className="text-muted-foreground italic">Coming soon</p>
          )}
        </div>

        {/* Journal Publications Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold mb-12 text-center">
            Journal Publications
          </h3>
          {journalPublications.length > 0 ? (
            <PublicationGrid publications={journalPublications} />
          ) : (
            <p className="text-muted-foreground italic">Coming soon</p>
          )}
        </div>

        {/* PhD Dissertation Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold mb-12 text-center">
            PhD Dissertation
          </h3>
          <PublicationGrid publications={dissertations} />
        </div>
      </div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ResearchSection />
    </div>
  );
}
