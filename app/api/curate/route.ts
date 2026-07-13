import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Dev-only curation endpoint: edits the posts/*.md files on disk.
// Hard-disabled in production (and the files aren't writable there anyway).

const POSTS_DIR = path.join(process.cwd(), "posts");
const MEDIA_DIR = path.join(process.cwd(), "public", "posts");

const ACTIONS = [
  "publish", // status -> published
  "unpublish", // status -> imported (hidden)
  "use-linkedin", // replace body with linkedinText, drop the field
  "keep-x", // keep body, drop the linkedinText field
  "delete", // delete the .md file and its media dir
  "set-tags", // replace tags with the given array
  "set-content", // replace the post body with the given text
] as const;
type Action = (typeof ACTIONS)[number];

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { slug, action, tags, content } = (await req.json()) as {
    slug?: string;
    action?: Action;
    tags?: string[];
    content?: string;
  };

  if (!slug || !/^[a-zA-Z0-9-]+$/.test(slug)) {
    return new NextResponse("Bad slug", { status: 400 });
  }
  if (!action || !ACTIONS.includes(action)) {
    return new NextResponse("Bad action", { status: 400 });
  }

  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) {
    return new NextResponse("Post not found", { status: 404 });
  }

  if (action === "delete") {
    fs.rmSync(file);
    const mediaDir = path.join(MEDIA_DIR, slug);
    if (fs.existsSync(mediaDir)) fs.rmSync(mediaDir, { recursive: true });
    return NextResponse.json({ ok: true, deleted: slug });
  }

  const { data, content: fileBody } = matter(fs.readFileSync(file, "utf8"));
  let body = fileBody;

  switch (action) {
    case "publish":
      data.status = "published";
      break;
    case "unpublish":
      data.status = "imported";
      break;
    case "use-linkedin":
      if (typeof data.linkedinText !== "string") {
        return new NextResponse("No linkedinText on this post", { status: 400 });
      }
      body = data.linkedinText;
      delete data.linkedinText;
      break;
    case "keep-x":
      delete data.linkedinText;
      break;
    case "set-tags": {
      if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) {
        return new NextResponse("tags must be a string array", { status: 400 });
      }
      const clean = [
        ...new Set(
          tags
            .map((t) => t.trim().toLowerCase().replace(/\s+/g, "-"))
            .filter((t) => /^[a-z0-9-]+$/.test(t))
        ),
      ];
      if (clean.length) data.tags = clean;
      else delete data.tags;
      break;
    }
    case "set-content":
      if (typeof content !== "string" || !content.trim()) {
        return new NextResponse("content must be non-empty", { status: 400 });
      }
      body = content;
      break;
  }

  fs.writeFileSync(file, matter.stringify(body.trim() + "\n", data));
  return NextResponse.json({ ok: true, slug, status: data.status });
}
