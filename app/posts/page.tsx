import { getAllPosts } from "../lib/posts";
import { PostFeed } from "../components/post-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description: "Short-form posts by Nil Mamano.",
  openGraph: {
    title: "Feed — Nil Mamano",
    description: "Short-form posts by Nil Mamano.",
    url: "https://nilmamano.com/posts",
  },
};

export default function PostsPage() {
  const posts = getAllPosts();

  return posts.length === 0 ? (
    <p className="py-12 text-center text-muted-foreground">No posts yet.</p>
  ) : (
    <PostFeed posts={posts} />
  );
}
