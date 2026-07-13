import { getAllPosts, getPostStats } from "../lib/posts";
import { PostFeed } from "../components/post-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Short-form posts by Nil Mamano.",
  openGraph: {
    title: "Posts — Nil Mamano",
    description: "Short-form posts by Nil Mamano.",
    url: "https://nilmamano.com/posts",
  },
};

export default function PostsPage() {
  const posts = getAllPosts();
  const stats = getPostStats();
  const showingHidden = process.env.NODE_ENV !== "production";

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl mb-2 text-center">
        Posts
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Short-form thoughts, owned here first.
      </p>

      {showingHidden && (
        <div className="mb-8 rounded-md border border-dashed border-border bg-muted/40 p-3 text-sm text-muted-foreground text-center">
          Dev view — showing all {stats.total} posts, including{" "}
          {stats.imported} imported/hidden. In production only the{" "}
          {stats.published} promoted ones appear. Curation buttons edit the
          posts/*.md files directly.
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet.</p>
      ) : (
        <PostFeed posts={posts} dev={showingHidden} />
      )}
    </div>
  );
}
