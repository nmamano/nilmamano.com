"use client";

import Link from "next/link";
import { useState } from "react";
import { getSelectedPublications } from "@/app/lib/publications";
import { PublicationCard } from "./publication-card";

export default function SelectedPublications() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSelectedPublications().map((publication, index) => (
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
      </div>
    </section>
  );
}
