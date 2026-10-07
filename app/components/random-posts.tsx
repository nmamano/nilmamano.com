"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "../lib/blog";
import { BlogPostCard } from "./blog-post-card";

// The page is prerendered, so the random pick happens in the browser on each
// visit. The prerendered HTML shows the first posts until then.
export default function RandomPosts({
  posts,
  count,
}: {
  posts: BlogPost[];
  count: number;
}) {
  const [picked, setPicked] = useState(() => posts.slice(0, count));

  useEffect(() => {
    const shuffled = [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPicked(shuffled.slice(0, count));
  }, [posts, count]);

  return (
    <div className="space-y-4">
      {picked.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
