import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../lib/date-utils";
import { BlogPost } from "../lib/blog";
import { getCategoryConfig } from "../lib/blog-categories";

interface BlogPostCardProps {
  post: BlogPost;
  selectedCategory?: string | null;
}

export function BlogPostCard({ post, selectedCategory }: BlogPostCardProps) {
  return (
    <article className="card-border rounded-lg p-6 hover:shadow-md transition-shadow bg-card text-card-foreground">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="md:w-1/3">
            <Link
              href={`/blog/${post.slug}${
                selectedCategory ? `?category=${selectedCategory}` : ""
              }`}
            >
              <div className="w-full h-[192px] flex items-center justify-center">
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
            </Link>
          </div>
        )}

        {/* Content */}
        <div className={post.coverImage ? "md:w-2/3" : "w-full"}>
          <Link
            href={`/blog/${post.slug}${
              selectedCategory ? `?category=${selectedCategory}` : ""
            }`}
          >
            <h2 className="text-2xl font-semibold hover:text-primary transition-colors mb-2">
              {post.title}
            </h2>
          </Link>

          <div className="text-sm text-muted-foreground mb-2">
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
          </div>

          {/* Category chips */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => {
                const config = getCategoryConfig(category);
                return (
                  <span
                    key={category}
                    className={`text-xs px-2 py-1 rounded-full ${config.bgColor} ${config.textColor}`}
                  >
                    {config.name}
                  </span>
                );
              })}
            </div>
          )}

          {post.excerpt && (
            <p className="text-muted-foreground">{post.excerpt}</p>
          )}

          <div className="mt-4">
            <Link
              href={`/blog/${post.slug}${
                selectedCategory ? `?category=${selectedCategory}` : ""
              }`}
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
        </div>
      </div>
    </article>
  );
}
