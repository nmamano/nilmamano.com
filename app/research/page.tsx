"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./research.module.css";
import { getAllPublications, Publication } from "@/app/lib/publications";
import {
  PublicationExpandedContent,
} from "@/app/components/publication-card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2, FileText, BookOpen, Github, Play } from "lucide-react";

function PublicationGrid({ publications }: { publications: Publication[] }) {
  return (
    <div className={styles.paperList}>
      {publications.map((publication) => (
        <Dialog key={publication.id}>
          <article className={styles.paper}>
            <DialogTrigger asChild>
              <button type="button" className={styles.paperPreview} aria-label={`Read about ${publication.title}`}>
                <span className={styles.thumbnail}>
                  <Image src={publication.coverImage || "/placeholder.svg"} alt="" width={160} height={110} />
                </span>
                <span className={styles.paperText}>
                  <span className={styles.paperTitle}>{publication.title}</span>
                  <span className={styles.authors}>{publication.not_alphabetical_order ? "* " : ""}{publication.authors.join(", ")}</span>
                  {publication.publisher && <span className={styles.venue}>{publication.publisher}</span>}
                  <span className={styles.excerpt}>{publication.description[0].replace(/<[^>]*>/g, "")}</span>
                </span>
                <Maximize2 className={styles.openIcon} size={16} aria-hidden="true" />
              </button>
            </DialogTrigger>
            <nav className={styles.paperLinks} aria-label={`Resources for ${publication.title}`}>
              {publication.links?.pdf && <a href={publication.links.pdf} target="_blank" rel="noopener noreferrer"><FileText size={15} />Read Paper</a>}
              {publication.links?.blog && <a href={publication.links.blog} target="_blank" rel="noopener noreferrer"><BookOpen size={15} />Blog Post</a>}
              {publication.links?.github && <a href={publication.links.github} target="_blank" rel="noopener noreferrer"><Github size={15} />Source Code</a>}
              {publication.links?.demo && <a href={publication.links.demo} target="_blank" rel="noopener noreferrer"><Play size={15} />Demo</a>}
            </nav>
          </article>
          <DialogContent className={styles.paperDialog} aria-describedby={undefined}>
            <DialogTitle className={styles.dialogTitle}>{publication.title}</DialogTitle>
            <div className={styles.dialogBody}>
              <PublicationExpandedContent publication={publication} showTitle={false} />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
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
      className={styles.publications}
    >
      <div>
        <h2 className={styles.sectionTitle}>Publications</h2>
        <ul className={styles.readingNotes}>
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
        <div className={styles.publicationGroup} id="conference-publications">
          <h3 className={styles.groupTitle}>
            Conference Publications
          </h3>
          {conferencePublications.length > 0 ? (
            <PublicationGrid publications={conferencePublications} />
          ) : (
            <p className="text-muted-foreground italic">Coming soon</p>
          )}
        </div>

        {/* Journal Publications Section */}
        <div className={styles.publicationGroup} id="journal-publications">
          <h3 className={styles.groupTitle}>
            Journal Publications
          </h3>
          {journalPublications.length > 0 ? (
            <PublicationGrid publications={journalPublications} />
          ) : (
            <p className="text-muted-foreground italic">Coming soon</p>
          )}
        </div>

        {/* PhD Dissertation Section */}
        <div className={styles.publicationGroup} id="dissertation">
          <h3 className={styles.groupTitle}>
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
    <section className={styles.background} aria-label="Academic background and research focus">
      <div className={styles.biography}>
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
      </div>
      <div className={styles.researchFocus}>
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
      </div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <div className={styles.researchPage}>
      <header className={styles.pageHeader}>
        <h1>Research</h1>
      </header>
      <AcademicBackground />
      <ResearchSection />
    </div>
  );
}
