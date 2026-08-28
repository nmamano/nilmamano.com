"use client";

import { useState } from "react";
import Link from "next/link";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { formatDate } from "../lib/date-utils";
import type { Post } from "../lib/posts";
import { renderPostBody } from "../lib/post-render";
import { mediaClass, mediaStyle } from "../lib/post-media";
import { CurationControls } from "./curation-controls";

const DEV = process.env.NODE_ENV !== "production";

export function PostCard({
  post,
  onTagClick,
}: {
  post: Post;
  onTagClick?: (tag: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const segments = post.content.split(/\n-{3,}\n/);
  const preview = segments[0].trim();
  const isLong =
    segments.length > 1 ||
    preview.length > 400 ||
    preview.split("\n").length > 10;
  const firstImage = post.images?.[0];
  const isVideo = firstImage?.src.toLowerCase().endsWith(".mp4");

  return (
    <article className="card-border rounded-lg px-5 pt-3 pb-5 bg-card text-card-foreground hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <time dateTime={post.date} className="text-muted-foreground/60">
          {formatDate(post.date)}
        </time>
        {post.status === "imported" && (
          <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            imported
          </span>
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

      {expanded ? (
        <div
          className="text-[15px] leading-relaxed [&_p]:mb-3 [&_a]:break-words"
          dangerouslySetInnerHTML={{ __html: renderPostBody(post.content) }}
        />
      ) : (
        <div
          className="line-clamp-[10] text-[15px] leading-relaxed [&_a]:break-words"
          dangerouslySetInnerHTML={{ __html: renderPostBody(preview) }}
        />
      )}

      <div className="mt-1 flex items-center gap-3">
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-primary hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
        {!expanded && post.segments && post.segments > 1 && (
          <span className="text-xs text-muted-foreground">
            🧵 {post.segments}-part thread
          </span>
        )}
      </div>

      {firstImage && (
        <div className="mt-3">
          {isVideo ? (
            <video
              src={firstImage.src}
              className="max-h-72 rounded-md border border-border"
              controls
              muted
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={firstImage.src}
              alt=""
              className="max-h-72 rounded-md border border-border object-cover"
            />
          )}
          {!expanded && post.images && post.images.length > 1 && (
            <span className="mt-1 inline-block text-xs text-muted-foreground">
              +{post.images.length - 1} more
            </span>
          )}
        </div>
      )}

      {expanded && post.images && post.images.length > 1 && (
        <div className="mt-3 grid gap-3">
          {post.images.slice(1).map((image) =>
            image.src.toLowerCase().endsWith(".mp4") ? (
              <video
                key={image.src}
                src={image.src}
                controls
                className={mediaClass(image)}
                style={mediaStyle(image)}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={image.src}
                src={image.src}
                alt=""
                className={mediaClass(image)}
                style={mediaStyle(image)}
              />
            )
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {(post.tags ?? []).map((t) => (
          <button
            key={t}
            onClick={() => onTagClick?.(t)}
            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
            title={`filter by ${t}`}
          >
            {t}
          </button>
        ))}
        <Link
          href={`/posts/${post.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Permalink
        </Link>
        {post.xUrl && (
          <a
            href={post.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <FaXTwitter className="h-3.5 w-3.5" /> View on X ↗
          </a>
        )}
        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <FaLinkedin className="h-3.5 w-3.5" /> LinkedIn ↗
          </a>
        )}
      </div>
    </article>
  );
}
