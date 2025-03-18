import Link from "next/link";
import { getAllPosts } from "../lib/blog";
import { format } from "date-fns";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
        Blog
      </h1>

      <div className="space-y-10">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No blog posts found.
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-primary transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>

              <div className="text-sm text-muted-foreground mb-4">
                {post.date && (
                  <time dateTime={new Date(post.date).toISOString()}>
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </time>
                )}
              </div>

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
            </article>
          ))
        )}
      </div>
    </div>
  );
}
