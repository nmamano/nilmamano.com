import { getPostBySlug, getAllPostSlugs } from "../../lib/posts";
import { renderPostBody } from "../../lib/post-render";
import { formatDate } from "../../lib/date-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { CurationControls } from "../../components/curation-controls";
import { Metadata } from "next";

const DEV = process.env.NODE_ENV !== "production";

export async function generateStaticParams() {
  // In production only pre-render published posts; hidden ones 404.
  return getAllPostSlugs({ publishedOnly: !DEV }).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const text = post.content.replace(/\n-{3,}\n/g, " ").slice(0, 160);
  return {
    title: `Post — ${formatDate(post.date)}`,
    description: text,
    openGraph: {
      title: `Post — Nil Mamano`,
      description: text,
      type: "article",
      publishedTime: post.timestamp || post.date,
      url: `https://nilmamano.com/posts/${post.slug}`,
      images: post.images?.length ? [{ url: post.images[0] }] : undefined,
    },
  };
}

export default async function PostPermalink({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  // Hidden (unpublished) posts are unreachable in production, like the feed.
  if (!DEV && post.status === "imported") notFound();

  const bodyHtml = renderPostBody(post.content);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/posts"
          className="text-primary hover:underline inline-flex items-center"
        >
          ← All posts
        </Link>
      </div>

      <article className="card-border rounded-lg p-6 bg-card text-card-foreground">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.status === "imported" && (
            <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted">
              imported · hidden
            </span>
          )}
        </div>

        <div
          className="text-[15px] leading-relaxed [&_p]:mb-3 [&_a]:break-words"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {post.images && post.images.length > 0 && (
          <div className="mt-4 grid gap-3">
            {post.images.map((src) =>
              src.toLowerCase().endsWith(".mp4") ? (
                <video
                  key={src}
                  src={src}
                  controls
                  className="w-[70%] mx-auto rounded-md border border-border"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="w-full rounded-md border border-border"
                />
              )
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm border-t border-border pt-4">
          {post.xUrl && (
            <a
              href={post.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5"
            >
              <FaXTwitter className="h-4 w-4" /> Discuss on X ↗
            </a>
          )}
          {post.linkedinUrl && (
            <a
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5"
            >
              <FaLinkedin className="h-4 w-4" /> Discuss on LinkedIn ↗
            </a>
          )}
        </div>

        {DEV && (
          <CurationControls
            slug={post.slug}
            status={post.status}
            content={post.content}
            linkedinText={post.linkedinText}
            tags={post.tags}
          />
        )}
      </article>
    </div>
  );
}
