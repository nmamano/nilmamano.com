"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllPublications } from "@/app/lib/publications";
import { PublicationCard } from "@/app/components/publication-card";

function ResearchSection() {
  // Change from single expanded card to a Set of expanded cards
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
    <div id="research">
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8 text-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conferencePublications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  index={index}
                  expandedCards={expandedCards}
                  toggleExpanded={toggleExpanded}
                  showExpansion={true}
                />
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journalPublications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  index={conferencePublications.length + index}
                  expandedCards={expandedCards}
                  toggleExpanded={toggleExpanded}
                  showExpansion={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">Coming soon</p>
          )}
        </div>

        {/* PhD Dissertation Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold mb-12 text-center">
            PhD Dissertation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dissertations.map((publication, index) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                index={
                  conferencePublications.length +
                  journalPublications.length +
                  index
                }
                expandedCards={expandedCards}
                toggleExpanded={toggleExpanded}
                showExpansion={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ResearchSection />
    </div>
  );
}
