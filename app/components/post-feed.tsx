"use client";

// Client-side feed: search box (dev + prod), dev-only curation filters,
// and in-place expandable post cards.

import { useState } from "react";
import type { Post } from "../lib/posts";
import { PostCard } from "./post-card";

const DEV_FILTERS = [
  { key: "all", label: "All" },
  { key: "hidden", label: "Hidden" },
  { key: "published", label: "Published" },
  { key: "wording", label: "Needs wording pick" },
] as const;

export function PostFeed({ posts, dev }: { posts: Post[]; dev: boolean }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [tag, setTag] = useState<string | null>(null);

  const tagCounts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  }
  const allTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);

  const q = query.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    if (dev) {
      if (filter === "hidden" && p.status !== "imported") return false;
      if (filter === "published" && p.status === "imported") return false;
      if (filter === "wording" && !p.linkedinText) return false;
    }
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

  const counts = {
    all: posts.length,
    hidden: posts.filter((p) => p.status === "imported").length,
    published: posts.filter((p) => p.status !== "imported").length,
    wording: posts.filter((p) => p.linkedinText).length,
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap justify-center gap-2 text-xs">
          <button
            onClick={() => setTag(null)}
            className={`px-3 py-1 rounded-full border transition-colors ${
              tag === null
                ? "border-primary text-primary bg-primary/10"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            all ({posts.length})
          </button>
          {allTags.map(([t, n]) => (
            <button
              key={t}
              onClick={() => setTag(tag === t ? null : t)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                tag === t
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {t} ({n})
            </button>
          ))}
        </div>
      )}

      {dev && (
        <div className="mb-4 flex flex-wrap justify-center gap-2 text-xs">
          {DEV_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                filter === f.key
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {f.label} ({counts[f.key as keyof typeof counts]})
            </button>
          ))}
        </div>
      )}

      {(q || tag || (dev && filter !== "all")) && (
        <p className="mb-4 text-center text-xs text-muted-foreground">
          showing {filtered.length} of {posts.length} posts
        </p>
      )}

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No matching posts.</p>
        ) : (
          filtered.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              onTagClick={(t) => setTag(t)}
            />
          ))
        )}
      </div>
    </div>
  );
}
