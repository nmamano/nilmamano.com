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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Publications</h2>
        <ul className="text-muted-foreground mb-8 list-disc pl-6 space-y-2">
          <li>Click on a publication for a brief summary.</li>
          <li>
            All papers are <b>freely available online</b> (PDF icon).
          </li>
          <li>
            Authors are in alphabetical order, per convention in CS theory,
            except when marked with "*".
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
          <h3 className="text-xl font-semibold mb-6">
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
          <h3 className="text-xl font-semibold mb-6">
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
          <h3 className="text-xl font-semibold mb-6">
            PhD Dissertation
          </h3>
          <PublicationGrid publications={dissertations} />
        </div>
      </div>
    </section>
  );
}

function AcademicBackground() {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h1 className="text-3xl font-bold mb-6">Research</h1>
      <div className="space-y-4 text-muted-foreground">
        <p>
          I received a PhD as part of the{" "}
          <Link
            href="http://www.ics.uci.edu/~theory"
            target="_blank"
            className="text-primary hover:underline"
          >
            CS Theory group
          </Link>{" "}
          at{" "}
          <Link
            href="http://www.uci.edu/"
            target="_blank"
            className="text-primary hover:underline"
          >
            UCI
          </Link>
          . I was fortunate to be advised by{" "}
          <Link
            href="https://www.ics.uci.edu/~eppstein/"
            target="_blank"
            className="text-primary hover:underline"
          >
            David Eppstein
          </Link>{" "}
          and{" "}
          <Link
            href="http://www.ics.uci.edu/~goodrich/"
            target="_blank"
            className="text-primary hover:underline"
          >
            Michael Goodrich
          </Link>
          . Before that, I got a bachelor&apos;s degree in CS from UPC in my
          hometown, Barcelona.
        </p>
        <p>
          My research spans computational geometry, greedy algorithms, graph
          data structures, computational biology, and recreational mathematics.
          My dissertation,{" "}
          <Link
            href="/dissertation/nildissertation.pdf"
            className="text-primary hover:underline"
            target="_blank"
          >
            <em>New Applications of the Nearest-neighbor Chain Algorithm</em>
          </Link>{" "}
          (see also:{" "}
          <Link
            href="/blog/greedy-algorithms"
            className="text-primary hover:underline"
          >
            blog post
          </Link>
          ,{" "}
          <Link
            href="https://11011110.github.io/blog/2019/09/26/congratulations-dr-mamano.html"
            className="text-primary hover:underline"
            target="_blank"
          >
            advisor&apos;s blog post
          </Link>
          ,{" "}
          <Link
            href="/dissertation/nildissertationslides.pdf"
            className="text-primary hover:underline"
            target="_blank"
          >
            defense slides
          </Link>
          ) studies how to relax the &quot;greedy choice&quot; in certain greedy
          algorithms without affecting the final solution. This idea, paired
          with an algorithmic technique called nearest-neighbor chain, allows us
          to speed up some greedy algorithms (like the{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Multi-fragment_algorithm"
            className="text-primary hover:underline"
            target="_blank"
          >
            Multi-fragment algorithm
          </Link>{" "}
          for{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Travelling_salesman_problem"
            className="text-primary hover:underline"
            target="_blank"
          >
            Euclidean TSP
          </Link>{" "}
          from O(n<sup>2</sup>) to O(n log n) (
          <Link
            href="https://arxiv.org/abs/1902.06875"
            className="text-primary hover:underline"
            target="_blank"
          >
            paper
          </Link>
          )).
        </p>
        <p>
          My personal highlight is{" "}
          <Link
            href="https://x.com/Nil053/status/2067322147819946361"
            className="text-primary hover:underline"
            target="_blank"
          >
            being cited by Donald Knuth
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AcademicBackground />
      <ResearchSection />
    </div>
  );
}
