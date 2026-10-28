import { getPostBySlug, getAllPostSlugs } from "../../lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import components from "../../../components/MdxComponents";
import ClientSyntaxHighlighter from "../../../components/ClientSyntaxHighlighter";
import { formatDate } from "../../lib/date-utils";
import { Metadata } from "next";
import BlogFooter from "../../components/blog-footer";
import remarkGfm from "remark-gfm";
import CopyLinkButton from "@/components/CopyLinkButton";
import ChatWidget from "@/components/chat-widget";
import BlogBackLink from "@/components/BlogBackLink";
import ReviewNotes, { InlineReviewNotes } from "../../components/review-notes";

// The footnote back link. The default bare "↩" renders as an emoji on iOS;
// U+FE0E asks for the text glyph. Keeps the default's superscript count for
// a footnote referenced more than once.
function footnoteBackContent(_: number, rereferenceIndex: number) {
  const content: any[] = [{ type: "text", value: "↩︎" }];
  if (rereferenceIndex > 1) {
    content.push({
      type: "element",
      tagName: "sup",
      properties: {},
      children: [{ type: "text", value: String(rereferenceIndex) }],
    });
  }
  return content;
}

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
}: {
  params: { slug: string };
}) {
  // Need to await params before destructuring
  const { slug } = await params;

  // Then use the destructured variable
  const post = await getPostBySlug(slug);

  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="blog-post-container container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <BlogBackLink />
      </div>

      <ReviewNotes name={slug} />
      <InlineReviewNotes name={slug} />

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 id="title" className="text-3xl font-bold mb-2">
          {post.title}
        </h1>

        <div className="text-sm text-muted-foreground mb-8 flex items-center justify-between gap-3">
          <div>
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
          </div>
          <CopyLinkButton slug={post.slug} />
        </div>

        {/* MDX content first rendered server-side */}
        <div className="markdown-content">
          {/* Then wrapped with client-side syntax highlighter */}
          <ClientSyntaxHighlighter>
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                // Our own trusted content: allow JSX expression attributes
                // (e.g. style={{...}}), which next-mdx-remote v6 strips by default.
                blockJS: false,
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [],
                  remarkRehypeOptions: { footnoteBackContent },
                },
              }}
            />
          </ClientSyntaxHighlighter>
        </div>
      </article>

      {/* Add the footer component */}
      <BlogFooter currentPostSlug={post.slug} />
      <ChatWidget context="blog" slug={slug} />
    </div>
  );
}
