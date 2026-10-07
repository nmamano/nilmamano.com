"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "../lib/blog";
import {
  CATEGORIES,
  getCategoryConfig,
  visibleCategories,
} from "../lib/blog-categories";
import { filterPostsByCategory } from "../lib/blog-client";
import { formatDate } from "../lib/date-utils";
import { useRouter } from "next/navigation";
import { NewsletterSubscription } from "./newsletter-subscription";
import { CategoryDot } from "./category-dot";

interface BlogListProps {
  posts: BlogPost[];
  initialCategory?: string;
  /** Number of published feed posts, for the sidebar's Feed link. */
  feedCount: number;
}

const FILTER_CATEGORIES = Object.entries(CATEGORIES).filter(
  ([, config]) => !config.hidden
);

function BlogPostRow({
  post,
  selectedCategory,
  priority,
}: {
  post: BlogPost;
  selectedCategory: string | null;
  priority: boolean;
}) {
  const href = `/blog/${post.slug}${
    selectedCategory ? `?category=${selectedCategory}` : ""
  }`;
  return (
    <li>
      <article className="flex gap-4 md:gap-6 py-4">
        {post.coverImage && (
          <Link href={href} className="shrink-0 self-start" tabIndex={-1}>
            <Image
              src={post.coverImage}
              alt=""
              width={400}
              height={210}
              sizes="(min-width: 768px) 192px, 112px"
              priority={priority}
              className="w-28 md:w-48 aspect-[1200/630] object-cover rounded-md border border-border"
            />
          </Link>
        )}
        <div className="min-w-0 flex flex-col gap-1.5">
          <h2 className="font-semibold md:text-lg leading-snug">
            <Link href={href} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </h2>
          {post.excerpt && (
            <p className="hidden md:block text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-muted-foreground">
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
            {visibleCategories(post.categories).map((category) => {
              return (
                <span
                  key={category}
                  className="inline-flex items-center gap-1.5"
                >
                  <CategoryDot category={category} />
                  {getCategoryConfig(category).name}
                </span>
              );
            })}
          </div>
        </div>
      </article>
    </li>
  );
}

export default function BlogList({
  posts: allPosts,
  initialCategory,
  feedCount,
}: BlogListProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    const categoryPath = category ? `/blog/category/${category}` : "/blog";
    router.push(categoryPath);
  };

  const posts = selectedCategory
    ? filterPostsByCategory(allPosts, selectedCategory)
    : allPosts;

  const filters: [string | null, string][] = [
    [null, "All posts"],
    ...FILTER_CATEGORIES.map(
      ([key, config]) => [key, config.name] as [string, string]
    ),
  ];

  return (
    <div className="py-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:[@media(min-height:800px)]:sticky lg:top-24 self-start flex flex-col gap-6">
        <h1 className="font-mono text-4xl tracking-tighter">nil pointers</h1>

        {/* Category filter: a list in the sidebar, chips on narrow screens */}
        <nav aria-label="Blog topics" className="hidden lg:flex flex-col text-sm">
          {filters.map(([key, name]) => {
            const active = selectedCategory === key;
            const count = key
              ? filterPostsByCategory(allPosts, key).length
              : allPosts.length;
            return (
              <button
                key={name}
                onClick={() => handleCategoryChange(key)}
                aria-current={active ? "page" : undefined}
                className={`px-2 py-1.5 rounded-md flex items-center gap-2 text-left transition-colors ${
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {key && <CategoryDot category={key} />}
                <span className="flex-1">{name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {count}
                </span>
              </button>
            );
          })}
          <Link
            href="/posts"
            className="mt-2 pt-3 border-t border-border px-2 pb-1.5 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="flex-1">Feed</span>
            <span className="text-xs tabular-nums">{feedCount}</span>
          </Link>
        </nav>
        <div className="flex lg:hidden flex-wrap gap-2">
          {filters.map(([key, name]) => {
            const active = selectedCategory === key;
            return (
              <button
                key={name}
                onClick={() => handleCategoryChange(key)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm transition-colors ${
                  active
                    ? "bg-muted border-transparent font-medium text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {key && <CategoryDot category={key} />}
                {key ? name : "All"}
              </button>
            );
          })}
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Feed <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <NewsletterSubscription compact />
      </aside>

      {posts.length === 0 ? (
        <p className="text-muted-foreground py-4">
          No blog posts found
          {selectedCategory
            ? ` in category "${getCategoryConfig(selectedCategory).name}"`
            : ""}
          .
        </p>
      ) : (
        <ul className="divide-y divide-border lg:-mt-4">
          {posts.map((post, i) => (
            <BlogPostRow
              key={post.slug}
              post={post}
              selectedCategory={selectedCategory}
              priority={i < 3}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
