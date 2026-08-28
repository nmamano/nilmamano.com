import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Short-form "posts" (microblog). Separate from the long-form MDX blog.
// One Markdown file per post in /posts, git-versioned = source of truth.
const postsDirectory = path.join(process.cwd(), "posts");

// An entry of a post's `images` list. In frontmatter it is either a bare path
// ("/posts/slug/pic.png") or a mapping with a width ({ src: ..., width: 60 }).
export interface PostImage {
  src: string;
  /** Percent of the post column. Omitted = full width. */
  width?: number;
}

export interface Post {
  slug: string;
  date: string; // YYYY-MM-DD (for display)
  timestamp?: string; // full ISO (for sorting)
  content: string;
  source?: "x" | "linkedin" | "both" | "original";
  status?: "imported" | "published" | string; // imported = hidden until promoted
  xUrl?: string;
  linkedinUrl?: string;
  tweetId?: string;
  segments?: number;
  images?: PostImage[];
  tags?: string[];
  linkedinText?: string; // alternate wording kept during curation
  [key: string]: any;
}

function normalizeImages(raw: unknown): PostImage[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const images = raw
    .map((entry): PostImage | null => {
      if (typeof entry === "string") return { src: entry };
      if (entry && typeof entry === "object") {
        const { src, width } = entry as { src?: unknown; width?: unknown };
        if (typeof src === "string")
          return { src, width: typeof width === "number" ? width : undefined };
      }
      return null;
    })
    .filter((image): image is PostImage => !!image && image.src.length > 0);
  return images.length ? images : undefined;
}

function readAll(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        content,
        ...data,
        images: normalizeImages(data.images),
      } as Post;
    })
    .sort((a, b) => {
      const ak = a.timestamp || a.date || "";
      const bk = b.timestamp || b.date || "";
      return ak < bk ? 1 : ak > bk ? -1 : 0; // newest first
    });
}

const isHidden = (p: Post) => p.status === "imported";

/**
 * Public feed posts. Hidden (imported/un-curated) posts are excluded in
 * production but shown in dev so they can be browsed and curated locally.
 */
export function getAllPosts(
  { includeHidden }: { includeHidden?: boolean } = {}
): Post[] {
  const show =
    includeHidden ?? process.env.NODE_ENV !== "production";
  const all = readAll();
  return show ? all : all.filter((p) => !isHidden(p));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const raw = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      content,
      ...data,
      images: normalizeImages(data.images),
    } as Post;
  } catch {
    return null;
  }
}

// Post slugs. By default includes hidden posts (so permalinks resolve in dev);
// pass { publishedOnly: true } to exclude hidden ones (used for prod prerender).
export function getAllPostSlugs(
  { publishedOnly }: { publishedOnly?: boolean } = {}
): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const all = readAll();
  return (publishedOnly ? all.filter((p) => !isHidden(p)) : all).map(
    (p) => p.slug
  );
}

export function getPostStats() {
  const all = readAll();
  return {
    total: all.length,
    imported: all.filter(isHidden).length,
    published: all.filter((p) => !isHidden(p)).length,
    withMedia: all.filter((p) => (p.images?.length ?? 0) > 0).length,
  };
}
