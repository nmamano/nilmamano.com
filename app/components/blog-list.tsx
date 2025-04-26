"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../lib/date-utils";
import { useState } from "react";
import { BlogPost } from "../lib/blog";

interface CategoryConfig {
  name: string;
  bgColor: string;
  textColor: string;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  tutorial: {
    name: "Tutorial",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  research: {
    name: "Research",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  "ds&a": {
    name: "DS&A",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  // wallgame: {
  //   name: "Wall Game",
  //   bgColor: "bg-orange-100",
  //   textColor: "text-orange-800",
  // },
  wip: {
    name: "W.I.P.",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
};

function getCategoryConfig(category: string): CategoryConfig {
  return CATEGORIES[category.toLowerCase()] || {
    name: category,
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  };
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts: allPosts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const posts = selectedCategory
    ? allPosts.filter((post) => {
        // If post has WIP category, only show it when WIP is selected
        if (post.categories?.some(category => category.toLowerCase() === 'wip')) {
          return selectedCategory.toLowerCase() === 'wip';
        }
        // For non-WIP posts, show if they match the selected category
        return post.categories?.some((category) => 
          category.toLowerCase() === selectedCategory.toLowerCase()
        );
      })
    : allPosts.filter(post => !post.categories?.some(category => category.toLowerCase() === 'wip'));

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
        Nil's Blog
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All Posts
        </button>
        {Object.entries(CATEGORIES).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === key
                ? `${config.bgColor} ${config.textColor}`
                : `${config.bgColor} ${config.textColor} opacity-50 hover:opacity-75`
            }`}
          >
            {config.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No blog posts found{selectedCategory ? ` in category "${getCategoryConfig(selectedCategory).name}"` : ""}.
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="card-border rounded-lg p-6 hover:shadow-md transition-shadow bg-card text-card-foreground"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="md:w-1/3">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="w-full h-[192px] flex items-center justify-center">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          width={300}
                          height={192}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "auto",
                            height: "auto",
                            objectFit: "contain",
                          }}
                          className="rounded-md"
                        />
                      </div>
                    </Link>
                  </div>
                )}

                {/* Content */}
                <div className={post.coverImage ? "md:w-2/3" : "w-full"}>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-semibold hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="text-sm text-muted-foreground mb-2">
                    {post.date && (
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    )}
                  </div>

                  {/* Category chips */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => {
                        const config = getCategoryConfig(category);
                        return (
                          <span
                            key={category}
                            className={`text-xs px-2 py-1 rounded-full ${config.bgColor} ${config.textColor}`}
                          >
                            {config.name}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {post.excerpt && (
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  )}

                  <div className="mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
} 