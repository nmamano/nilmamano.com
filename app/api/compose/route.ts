import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Dev-only composer endpoint: creates a NEW posts/<slug>.md authored on the
// site ("owned here first"). Hard-disabled in production.

const POSTS_DIR = path.join(process.cwd(), "posts");

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 7)
    .join("-")
    .slice(0, 55)
    .replace(/-+$/g, "");
}

const pad = (n: number) => String(n).padStart(2, "0");

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { content, tags, slug: slugIn } = (await req.json()) as {
    content?: string;
    tags?: string[];
    slug?: string;
  };

  if (typeof content !== "string" || !content.trim()) {
    return new NextResponse("content is required", { status: 400 });
  }

  const firstLine = content.split("\n").find((l) => l.trim()) || "post";
  let base = (slugIn && slugify(slugIn)) || slugify(firstLine) || "post";
  // suffix keeps slugs unique and mirrors the imported ones' short id tail
  const suffix = Date.now().toString().slice(-7);
  let slug = `${base}-${suffix}`;
  while (fs.existsSync(path.join(POSTS_DIR, `${slug}.md`))) slug += "x";

  const cleanTags = Array.isArray(tags)
    ? [
        ...new Set(
          tags
            .map((t) => String(t).trim().toLowerCase().replace(/\s+/g, "-"))
            .filter((t) => /^[a-z0-9-]+$/.test(t))
        ),
      ]
    : [];

  const d = new Date();
  const data: Record<string, unknown> = {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    timestamp: d.toISOString(),
    source: "original",
    status: "published",
    segments: content.split(/\n-{3,}\n/).length,
    images: [] as string[],
  };
  if (cleanTags.length) data.tags = cleanTags;

  fs.writeFileSync(
    path.join(POSTS_DIR, `${slug}.md`),
    matter.stringify(content.trim() + "\n", data)
  );

  return NextResponse.json({ ok: true, slug });
}
