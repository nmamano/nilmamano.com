"use client";

// Dev-only composer: write a post once, save it to the site as the source of
// truth, and copy platform-formatted versions to paste into X / LinkedIn.
//
// Convention: a line containing only `---` splits the post into thread
// segments. On X each segment is a separate tweet; on LinkedIn they are joined
// into one post with blank lines between them.

import { useMemo, useState } from "react";
import Link from "next/link";
import { renderPostBody } from "../lib/post-render";

const X_LIMIT = 280;
const LI_LIMIT = 3000;

function splitSegments(text: string): string[] {
  return text
    .split(/\n-{3,}\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// X counts every URL as 23 chars regardless of length.
function xLength(seg: string): number {
  return seg.replace(/https?:\/\/\S+/g, "x".repeat(23)).length;
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="px-2 py-0.5 rounded border border-primary/40 text-primary text-xs hover:bg-primary/10"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}

export function Composer() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const segments = useMemo(() => splitSegments(content), [content]);
  const liText = segments.join("\n\n");

  async function save() {
    setErr(null);
    setSaved(null);
    setBusy(true);
    try {
      const res = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        setErr(await res.text());
        return;
      }
      const j = await res.json();
      setSaved(j.slug);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* left: editor */}
      <div>
        <label className="block text-sm text-muted-foreground mb-1">
          Post (use a line with only <code>---</code> to break into thread
          segments)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          placeholder={"Your post…\n\n---\n\nsecond tweet in the thread"}
          className="w-full rounded-md border border-border bg-background p-3 text-[15px] leading-relaxed font-mono"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tags: ai, isomux"
            className="flex-1 min-w-[180px] rounded border border-border bg-background px-2 py-1 text-sm"
          />
          <button
            className="px-3 py-1 rounded border border-green-600/40 text-green-600 dark:text-green-400 text-sm hover:bg-green-500/10 disabled:opacity-40"
            disabled={busy || !content.trim()}
            onClick={save}
          >
            {busy ? "Saving…" : "Save to site"}
          </button>
        </div>
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        {saved && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            Saved as{" "}
            <Link
              href={`/posts/${saved}`}
              target="_blank"
              className="underline"
            >
              /posts/{saved}
            </Link>{" "}
            (published). Commit &amp; push to deploy.
          </p>
        )}

        {content.trim() && (
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-1">Preview</div>
            <div
              className="card-border rounded-lg p-4 text-[15px] leading-relaxed [&_p]:mb-3 [&_a]:break-words"
              dangerouslySetInnerHTML={{ __html: renderPostBody(content) }}
            />
          </div>
        )}
      </div>

      {/* right: platform-formatted output */}
      <div className="space-y-6">
        {/* X */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium">
              Copy for X{" "}
              <span className="text-muted-foreground">
                ({segments.length} tweet{segments.length === 1 ? "" : "s"})
              </span>
            </h2>
            <CopyButton
              text={segments.join("\n\n---\n\n")}
              label="Copy whole thread"
            />
          </div>
          <div className="space-y-2">
            {segments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing yet.</p>
            ) : (
              segments.map((seg, i) => {
                const n = xLength(seg);
                const over = n > X_LIMIT;
                return (
                  <div
                    key={i}
                    className="rounded-md border border-border p-3 text-[14px]"
                  >
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        tweet {i + 1}/{segments.length} ·{" "}
                        <span className={over ? "text-red-500" : ""}>
                          {n}/{X_LIMIT}
                        </span>
                      </span>
                      <CopyButton text={seg} />
                    </div>
                    <p className="whitespace-pre-line">{seg}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium">
              Copy for LinkedIn{" "}
              <span
                className={`text-muted-foreground ${
                  liText.length > LI_LIMIT ? "text-red-500" : ""
                }`}
              >
                ({liText.length}/{LI_LIMIT})
              </span>
            </h2>
            <CopyButton text={liText} label="Copy post" />
          </div>
          <div className="rounded-md border border-border p-3 text-[14px] whitespace-pre-line">
            {liText || (
              <span className="text-muted-foreground">Nothing yet.</span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            LinkedIn has no threads — segments are joined into one post. Links
            show in full; @mentions are left as written.
          </p>
        </div>
      </div>
    </div>
  );
}
