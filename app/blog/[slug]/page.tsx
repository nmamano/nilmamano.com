import { getPostBySlug, getAllPostSlugs } from "../../lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-primary hover:underline inline-flex items-center"
        >
          ← Back to all posts
        </Link>
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="text-sm text-muted-foreground mb-8">
          {post.date && (
            <time dateTime={new Date(post.date).toISOString()}>
              {format(new Date(post.date), "MMMM d, yyyy")}
            </time>
          )}
        </div>

        <div className="markdown-content">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
