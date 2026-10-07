"use client";

// Client-side feed: sidebar with search, tag filters and a Blog link (same
// layout as the blog list), and in-place expandable post cards.

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "../lib/posts";
import { PostCard } from "./post-card";
import { getCategoryConfig } from "../lib/blog-categories";
import { CategoryDot } from "./category-dot";

export function PostFeed({
  posts,
  blogCount,
}: {
  posts: Post[];
  /** Number of blog posts, for the sidebar's Blog link. */
  blogCount: number;
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tagCounts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  }
  // Product storylines first, in the blog's filter order; then by count.
  const PINNED = ["isomux", "bctci", "wallgame"];
  const rank = (t: string) =>
    PINNED.includes(t) ? PINNED.indexOf(t) : PINNED.length;
  const allTags = [...tagCounts.entries()]
    .filter(([t]) => !getCategoryConfig(t).hidden)
    .sort((a, b) => rank(a[0]) - rank(b[0]) || b[1] - a[1]);

  const q = query.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    if (tag && !(p.tags ?? []).includes(tag)) return false;
    if (q) {
      const hay = (
        p.content +
        " " +
        (p.tags ?? []).join(" ") +
        " " +
        (p.linkedinText ?? "") +
        " " +
        p.slug
      ).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const tagFilters: [string | null, string, number][] = [
    [null, "All posts", posts.length],
    ...allTags.map(([t, n]) => [t, getCategoryConfig(t).name, n] as [string, string, number]),
  ];

  return (
    <div className="py-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:[@media(min-height:800px)]:sticky lg:top-24 self-start flex flex-col gap-6">
        <h1 className="font-mono text-4xl tracking-tighter">feed</h1>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search posts"
          className="order-1 lg:order-none w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* Tag filter: a list in the sidebar, chips on narrow screens */}
        <nav aria-label="Feed tags" className="hidden lg:flex flex-col text-sm">
          {tagFilters.map(([t, label, n]) => {
            const active = tag === t;
            return (
              <button
                key={label}
                onClick={() => setTag(t)}
                aria-current={active ? "page" : undefined}
                className={`px-2 py-1.5 rounded-md flex items-center gap-2 text-left transition-colors ${
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {t && <CategoryDot category={t} />}
                <span className="flex-1">{label}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {n}
                </span>
              </button>
            );
          })}
          <Link
            href="/blog"
            className="mt-2 pt-3 border-t border-border px-2 pb-1.5 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="flex-1">Blog</span>
            <span className="text-xs tabular-nums">{blogCount}</span>
          </Link>
        </nav>
        <div className="flex lg:hidden flex-wrap gap-2">
          {tagFilters.map(([t, label]) => {
            const active = tag === t;
            return (
              <button
                key={label}
                onClick={() => setTag(t)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm transition-colors ${
                  active
                    ? "bg-muted border-transparent font-medium text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t && <CategoryDot category={t} />}
                {t ? label : "All"}
              </button>
            );
          })}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>

      </aside>

      <div className="max-w-2xl">
        {(q || tag) && (
          <p className="mb-4 text-xs text-muted-foreground">
            showing {filtered.length} of {posts.length} posts
          </p>
        )}

        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-4">No matching posts.</p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} onTagClick={(t) => setTag(t)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
