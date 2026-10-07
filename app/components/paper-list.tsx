"use client";

// Papers: sidebar with type filters (same layout as the blog list), and one
// row per paper that opens its summary in a dialog.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, BookOpen, Github, Play } from "lucide-react";
import styles from "../papers/papers.module.css";
import { getAllPublications, Publication } from "../lib/publications";
import { PublicationExpandedContent } from "./publication-card";
import { Dot } from "./category-dot";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PaperType = Publication["type"];

const TYPE_CONFIG: Record<
  PaperType,
  { name: string; bgColor: string; textColor: string }
> = {
  conference: {
    name: "Conference",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-800",
  },
  journal: { name: "Journal", bgColor: "bg-cyan-100", textColor: "text-cyan-800" },
  dissertation: {
    name: "Dissertation",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
};

const TYPES: [PaperType | null, string][] = [
  [null, "All"],
  ...(Object.keys(TYPE_CONFIG) as PaperType[]).map(
    (t) => [t, TYPE_CONFIG[t].name] as [PaperType, string]
  ),
];

const inlineLink = "text-primary hover:underline";

function PaperRow({ paper }: { paper: Publication }) {
  const links = [
    { href: paper.links?.pdf, label: "PDF", Icon: FileText },
    { href: paper.links?.blog, label: "Blog post", Icon: BookOpen },
    { href: paper.links?.github, label: "Code", Icon: Github },
    { href: paper.links?.demo, label: "Demo", Icon: Play },
  ].filter((l) => l.href);

  return (
    <li>
      <Dialog>
        <article className="flex gap-4 md:gap-6 py-4">
          <DialogTrigger asChild>
            <button
              type="button"
              tabIndex={-1}
              className={`${styles.thumbnail} shrink-0 self-start w-28 md:w-48 aspect-[1200/630] rounded-md border border-border flex items-center justify-center p-2`}
            >
              <Image
                src={paper.coverImage || "/placeholder.svg"}
                alt=""
                width={400}
                height={210}
                className="max-w-full max-h-full object-contain"
              />
            </button>
          </DialogTrigger>
          <div className="min-w-0 flex flex-col gap-1.5">
            <h2 className="font-semibold md:text-lg leading-snug">
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-left hover:text-primary transition-colors"
                >
                  {paper.title}
                </button>
              </DialogTrigger>
            </h2>
            <p className="text-sm text-muted-foreground">
              {paper.not_alphabetical_order && (
                <a
                  href="#author-order"
                  aria-label="Authors not in alphabetical order"
                  className={inlineLink}
                >
                  *
                </a>
              )}{" "}
              {paper.authors.join(", ")}
            </p>
            <p className="hidden md:block text-sm text-muted-foreground line-clamp-2">
              {paper.description[0].replace(/<[^>]*>/g, "")}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
              {paper.publisher && <span>{paper.publisher}</span>}
              <span className="inline-flex items-center gap-1.5">
                <Dot {...TYPE_CONFIG[paper.type]} />
                {TYPE_CONFIG[paper.type].name}
              </span>
              {links.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  <Icon size={13} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </article>
        <DialogContent
          className={styles.paperDialog}
          aria-describedby={undefined}
        >
          <DialogTitle className={styles.dialogTitle}>{paper.title}</DialogTitle>
          <div className={styles.dialogBody}>
            <PublicationExpandedContent
              publication={paper}
              showTitle={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </li>
  );
}

// Collapsed by default: the first paragraph, then "More" for the dissertation.
function Bio() {
  const [open, setOpen] = useState(false);
  const toggle = (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      className={inlineLink}
    >
      {open ? "Less" : "More"}
    </button>
  );
  return (
    <div className="text-sm leading-relaxed text-muted-foreground space-y-3 pb-4 border-b border-border">
      <p>
        I received a PhD as part of the{" "}
        <Link href="http://www.ics.uci.edu/~theory" target="_blank" className={inlineLink}>
          CS Theory group
        </Link>{" "}
        at{" "}
        <Link href="http://www.uci.edu/" target="_blank" className={inlineLink}>
          UCI
        </Link>
        . I was fortunate to be advised by{" "}
        <Link href="https://www.ics.uci.edu/~eppstein/" target="_blank" className={inlineLink}>
          David Eppstein
        </Link>{" "}
        and{" "}
        <Link href="http://www.ics.uci.edu/~goodrich/" target="_blank" className={inlineLink}>
          Michael Goodrich
        </Link>
        . Before that, I got a bachelor&apos;s degree in CS from UPC in my
        hometown, Barcelona. See also my{" "}
        <Link href="/resume/cv_nilmamano.pdf" target="_blank" className={inlineLink}>
          academic CV
        </Link>{" "}
        or my{" "}
        <Link
          href="https://scholar.google.bg/citations?user=LIuIigEAAAAJ&hl=en"
          target="_blank"
          className={inlineLink}
        >
          Google Scholar profile
        </Link>
        . {!open && toggle}
      </p>
      {open && (
      <p>
        My research spans computational geometry, greedy algorithms, graph
        data structures, computational biology, and recreational mathematics.
        My dissertation,{" "}
        <Link href="/dissertation/nildissertation.pdf" target="_blank" className={inlineLink}>
          <em>New Applications of the Nearest-neighbor Chain Algorithm</em>
        </Link>{" "}
        (see also:{" "}
        <Link href="/blog/greedy-algorithms" className={inlineLink}>
          blog post
        </Link>
        ,{" "}
        <Link
          href="https://11011110.github.io/blog/2019/09/26/congratulations-dr-mamano.html"
          target="_blank"
          className={inlineLink}
        >
          advisor&apos;s blog post
        </Link>
        ,{" "}
        <Link href="/dissertation/nildissertationslides.pdf" target="_blank" className={inlineLink}>
          defense slides
        </Link>
        ) studies how to relax the &quot;greedy choice&quot; in certain greedy
        algorithms without affecting the final solution. This idea, paired
        with an algorithmic technique called nearest-neighbor chain, allows us
        to speed up some greedy algorithms (like the{" "}
        <Link href="https://en.wikipedia.org/wiki/Multi-fragment_algorithm" target="_blank" className={inlineLink}>
          Multi-fragment algorithm
        </Link>{" "}
        for{" "}
        <Link href="https://en.wikipedia.org/wiki/Travelling_salesman_problem" target="_blank" className={inlineLink}>
          Euclidean TSP
        </Link>{" "}
        from O(n<sup>2</sup>) to O(n log n) (
        <Link href="https://arxiv.org/abs/1902.06875" target="_blank" className={inlineLink}>
          paper
        </Link>
        )). {toggle}
      </p>
      )}
    </div>
  );
}

export default function PaperList() {
  const papers = getAllPublications();
  const [type, setType] = useState<PaperType | null>(null);
  const shown = type ? papers.filter((p) => p.type === type) : papers;
  const countOf = (t: PaperType | null) =>
    t ? papers.filter((p) => p.type === t).length : papers.length;

  return (
    <div className="py-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:[@media(min-height:800px)]:sticky lg:top-24 self-start flex flex-col gap-6">
        <h1 className="font-mono text-4xl tracking-tighter">Papers</h1>

        {/* Type filter: a list in the sidebar, chips on narrow screens */}
        <nav aria-label="Paper types" className="hidden lg:flex flex-col text-sm">
          {TYPES.map(([t, label]) => {
            const active = type === t;
            return (
              <button
                key={label}
                onClick={() => setType(t)}
                aria-current={active ? "page" : undefined}
                className={`px-2 py-1.5 rounded-md flex items-center gap-2 text-left transition-colors ${
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {t && <Dot {...TYPE_CONFIG[t]} />}
                <span className="flex-1">{label}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {countOf(t)}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="flex lg:hidden flex-wrap gap-2">
          {TYPES.map(([t, label]) => {
            const active = type === t;
            return (
              <button
                key={label}
                onClick={() => setType(t)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm transition-colors ${
                  active
                    ? "bg-muted border-transparent font-medium text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t && <Dot {...TYPE_CONFIG[t]} />}
                {label}
              </button>
            );
          })}
        </div>

      </aside>

      <div className="lg:-mt-4">
        {type === null && (
          <div className="pt-4">
            <Bio />
          </div>
        )}
        <ul className="divide-y divide-border">
          {shown.map((paper) => (
            <PaperRow key={paper.id} paper={paper} />
          ))}
        </ul>
        <p
          id="author-order"
          className="scroll-mt-24 pt-4 border-t border-border text-sm text-muted-foreground"
        >
          Authors are in alphabetical order, per convention in CS theory,
          except when marked with &quot;*&quot;.
        </p>
      </div>
    </div>
  );
}
