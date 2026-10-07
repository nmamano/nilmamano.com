"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BlogPost } from "../lib/blog";
import { filterPostsByCategory } from "../lib/blog-client";
import { BlogPostCard } from "./blog-post-card";

interface RandomPostsProps {
  posts: BlogPost[];
  count: number;
}

function PostList({
  posts,
  category,
}: {
  posts: BlogPost[];
  category?: string | null;
}) {
  if (posts.length === 0) return null;
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-6 text-center">
        Want to read more? Here are other posts:
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            post={post}
            selectedCategory={category}
          />
        ))}
      </div>
    </div>
  );
}

// The page is prerendered, so the random pick happens in the browser on each
// visit. A reader who came from a category (?category=) gets posts from that
// category only.
function ShuffledPosts({ posts, count }: RandomPostsProps) {
  const category = useSearchParams().get("category");
  const [picked, setPicked] = useState(() => posts.slice(0, count));

  useEffect(() => {
    const shuffled = category
      ? filterPostsByCategory(posts, category)
      : [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPicked(shuffled.slice(0, count));
  }, [posts, count, category]);

  return <PostList posts={picked} category={category} />;
}

export default function RandomPosts({ posts, count }: RandomPostsProps) {
  return (
    <Suspense fallback={<PostList posts={posts.slice(0, count)} />}>
      <ShuffledPosts posts={posts} count={count} />
    </Suspense>
  );
}
