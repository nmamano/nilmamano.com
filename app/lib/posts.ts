import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Short-form "posts" (microblog). Separate from the long-form MDX blog.
// One Markdown file per post in /posts, git-versioned = source of truth.
const postsDirectory = path.join(process.cwd(), "posts");

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
  images?: string[];
  tags?: string[];
  linkedinText?: string; // alternate wording kept during curation
  [key: string]: any;
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
      return { slug, content, ...data } as Post;
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
    return { slug, content, ...data } as Post;
  } catch {
    return null;
  }
}

// All slugs (including hidden) so permalinks are directly reachable.
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
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
