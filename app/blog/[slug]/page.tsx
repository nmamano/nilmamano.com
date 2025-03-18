import { getPostBySlug, getAllPostSlugs } from "../../lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import components from "../../../components/MdxComponents";
import ClientSyntaxHighlighter from "../../../components/ClientSyntaxHighlighter";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Make the component async and correctly handle params
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  // Await the params object before using it
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Now use the resolved slug
  const post = await getPostBySlug(slug);

  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
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

        {/* Cover Image */}
        {post.coverImage && (
          <div className="flex justify-center mb-8">
            <div className="w-[300px] h-[192px] flex items-center justify-center">
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
          </div>
        )}

        {/* MDX content first rendered server-side */}
        <div className="markdown-content">
          {/* Then wrapped with client-side syntax highlighter */}
          <ClientSyntaxHighlighter>
            <MDXRemote source={post.content} components={components} />
          </ClientSyntaxHighlighter>
        </div>
      </article>
    </div>
  );
}
