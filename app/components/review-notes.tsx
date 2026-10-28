import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import ReviewAnnotations from "./review-annotations";

// Dev-only review notes for Nil, shown above a post. The notes live in the
// gitignored ops-private/review-notes/<slug>.md, so they never ship, and this
// component renders nothing in production. <slug>.inline.md holds the notes
// placed inside the post: blocks that start with a line "@@ <target>" (see
// review-annotations.tsx for the target forms).
const NOTES_DIR = path.join(process.cwd(), "ops-private", "review-notes");

export function readReviewNotes(name: string): string | null {
  if (process.env.NODE_ENV === "production") return null;
  const file = path.join(NOTES_DIR, `${name}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

export default function ReviewNotes({ name }: { name: string }) {
  const notes = readReviewNotes(name);
  if (!notes) return null;
  return (
    <aside
      aria-label="Review notes (not part of the post)"
      className="not-prose mb-10 rounded-lg border-2 border-dashed border-amber-500 bg-amber-50 p-5 font-sans text-[15px] leading-relaxed text-amber-950 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
        <span>Review notes - not part of the post (dev only)</span>
        <a href="/review" className="underline">
          All posts in review
        </a>
      </div>
      <div className="[&_a]:underline [&_code]:rounded [&_code]:bg-amber-100 [&_code]:px-1 dark:[&_code]:bg-amber-900 [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:font-bold [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6">
        <MDXRemote source={notes} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>
    </aside>
  );
}

export function InlineReviewNotes({ name }: { name: string }) {
  const src = readReviewNotes(`${name}.inline`);
  if (!src) return null;
  const notes = src
    .split(/^@@ /m)
    .slice(1)
    .map((block) => {
      const nl = block.indexOf("\n");
      const target = block.slice(0, nl).trim();
      const body = block.slice(nl + 1).trim();
      return {
        target,
        content: <MDXRemote source={body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />,
      };
    });
  return <ReviewAnnotations notes={notes} />;
}

// A dev-only button on every page that opens the review list, for when the
// site is open inside the office app page (which can only open the home page).
export function ReviewLink() {
  if (!readReviewNotes("_index")) return null;
  return (
    <a
      href="/review"
      className="fixed bottom-20 left-4 z-50 rounded-full border-2 border-dashed border-amber-500 bg-amber-50 px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-amber-800 shadow dark:bg-amber-950 dark:text-amber-200"
    >
      Posts in review
    </a>
  );
}
