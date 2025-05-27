"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "../lib/blog";
import { CATEGORIES, getCategoryConfig } from "../lib/blog-categories";
import { filterPostsByCategory } from "../lib/blog-client";
import { useRouter, usePathname } from "next/navigation";
import { BlogPostCard } from "./blog-post-card";
import { NewsletterSubscription } from "./newsletter-subscription";

interface BlogListProps {
  posts: BlogPost[];
  initialCategory?: string;
}

export default function BlogList({
  posts: allPosts,
  initialCategory,
}: BlogListProps) {
  const router = useRouter();
  const pathname = usePathname();
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

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl mb-4 text-center">
        Nil's Blog
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-12">
        Teaching DS&A · research highlights · SWE thoughts · building in public
      </p>

      {/* Newsletter Subscription */}
      <div className="mb-12">
        <NewsletterSubscription />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-blue-100 text-black opacity-50 hover:opacity-75"
          }`}
        >
          All Posts
        </button>
        {Object.entries(CATEGORIES).map(([key, config]) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
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
            No blog posts found
            {selectedCategory
              ? ` in category "${getCategoryConfig(selectedCategory).name}"`
              : ""}
            .
          </p>
        ) : (
          posts.map((post) => (
            <BlogPostCard
              key={post.slug}
              post={post}
              selectedCategory={selectedCategory}
            />
          ))
        )}
      </div>
    </div>
  );
}
