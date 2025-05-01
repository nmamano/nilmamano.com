import { getPostBySlug, getAllPostSlugs } from "../../lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import components from "../../../components/MdxComponents";
import ClientSyntaxHighlighter from "../../../components/ClientSyntaxHighlighter";
import { formatDate } from "../../lib/date-utils";
import { Metadata } from "next";
import BlogFooter from "../../components/blog-footer";

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Need to await params before destructuring
  const { slug } = await params;

  // Then use the destructured variable
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  // Now coverImage is mandatory so we don't need to check if it exists
  return {
    title: post.title,
    description: post.excerpt || `${post.title} - Nil Mamano's blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} - Nil Mamano's blog`,
      type: "article",
      publishedTime: post.date,
      url: `https://nilmamano.com/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `${post.title} - Nil Mamano's blog`,
      images: [post.coverImage],
    },
  };
}

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
  searchParams,
}: {
  params: { slug: string };
  searchParams: { category?: string };
}) {
  // Need to await params before destructuring
  const { slug } = await params;
  const searchParamsObj = await searchParams;
  const { category } = searchParamsObj;

  // Then use the destructured variable
  const post = await getPostBySlug(slug);

  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }

  const backLink = category ? `/blog/category/${category}` : "/blog";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <Link
          href={backLink}
          className="text-primary hover:underline inline-flex items-center"
        >
          ← Back to all posts
        </Link>
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="text-sm text-muted-foreground mb-8">
          {post.date && (
            <time dateTime={post.date}>{formatDate(post.date)}</time>
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
      
      {/* Add the footer component */}
      <BlogFooter />
    </div>
  );
}
