"use client";

// Dev-only curation controls rendered under each post card.
// Buttons call /api/curate which edits the posts/*.md files on disk.

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function CurationControls({
  slug,
  status,
  content,
  linkedinText,
  tags,
}: {
  slug: string;
  status?: string;
  content: string;
  linkedinText?: string;
  tags?: string[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [compare, setCompare] = useState(false);
  const [editingTags, setEditingTags] = useState(false);
  const [tagDraft, setTagDraft] = useState("");
  const [editingBody, setEditingBody] = useState(false);
  const [bodyDraft, setBodyDraft] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Optimistic local status: the button flips as soon as the API confirms the
  // file write, without waiting for the (slow, 597-card) server re-render.
  const [localStatus, setLocalStatus] = useState(status);
  useEffect(() => setLocalStatus(status), [status]);
  const published = localStatus !== "imported";

  async function act(action: string, extra: Record<string, unknown> = {}) {
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/api/curate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action, ...extra }),
      });
      if (!res.ok) {
        setErr(await res.text());
        return false;
      }
      if (action === "publish") setLocalStatus("published");
      if (action === "unpublish") setLocalStatus("imported");
      startTransition(() => router.refresh());
      return true;
    } finally {
      setBusy(false);
    }
  }

  const btn =
    "px-2 py-0.5 rounded border text-xs disabled:opacity-40 transition-colors";
  const disabled = busy || isPending;

  return (
    <div className="mb-3 border-b border-dashed border-border pb-2">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-muted-foreground uppercase tracking-wide text-[10px]">
          curate
        </span>
        {published ? (
          <>
            <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
              published
            </span>
            <button
              className={`${btn} border-border text-muted-foreground hover:bg-muted`}
              disabled={disabled}
              onClick={() => act("unpublish")}
            >
              Unpublish
            </button>
          </>
        ) : (
          <button
            className={`${btn} border-green-600/40 text-green-600 dark:text-green-400 hover:bg-green-500/10`}
            disabled={disabled}
            onClick={() => act("publish")}
          >
            Publish
          </button>
        )}

        {linkedinText && (
          <button
            className={`${btn} border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10`}
            disabled={disabled}
            onClick={() => setCompare((c) => !c)}
          >
            {compare ? "Close comparison" : "⚖ Pick wording"}
          </button>
        )}

        <button
          className={`${btn} border-border text-muted-foreground hover:bg-muted`}
          disabled={disabled}
          onClick={() => {
            setBodyDraft(content);
            setEditingBody((e) => !e);
          }}
        >
          {editingBody ? "Cancel edit" : "Edit text"}
        </button>

        {confirmDelete ? (
          <span className="ml-auto inline-flex items-center gap-2">
            <span className="text-red-500">Delete this post?</span>
            <button
              className={`${btn} border-red-500/60 bg-red-500/10 text-red-500 hover:bg-red-500/20`}
              disabled={disabled}
              onClick={() => {
                setConfirmDelete(false);
                act("delete");
              }}
            >
              Yes, delete
            </button>
            <button
              className={`${btn} border-border text-muted-foreground hover:bg-muted`}
              disabled={disabled}
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            className={`${btn} border-red-500/40 text-red-500 hover:bg-red-500/10 ml-auto`}
            disabled={disabled}
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        )}
      </div>

      {/* tags row */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
          tags
        </span>
        {(tags ?? []).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full bg-primary/10 text-primary"
          >
            {t}
          </span>
        ))}
        {editingTags ? (
          <form
            className="inline-flex items-center gap-1"
            onSubmit={async (e) => {
              e.preventDefault();
              const ok = await act("set-tags", {
                tags: tagDraft.split(",").map((t) => t.trim()).filter(Boolean),
              });
              if (ok) setEditingTags(false);
            }}
          >
            <input
              autoFocus
              value={tagDraft}
              onChange={(e) => setTagDraft(e.target.value)}
              placeholder="ai, research"
              className="w-44 rounded border border-border bg-background px-2 py-0.5 text-xs"
            />
            <button className={`${btn} border-primary/40 text-primary`} disabled={disabled}>
              Save
            </button>
            <button
              type="button"
              className={`${btn} border-border text-muted-foreground`}
              onClick={() => setEditingTags(false)}
            >
              ✕
            </button>
          </form>
        ) : (
          <button
            className="text-muted-foreground hover:text-primary underline decoration-dotted"
            disabled={disabled}
            onClick={() => {
              setTagDraft((tags ?? []).join(", "));
              setEditingTags(true);
            }}
          >
            {tags?.length ? "edit" : "add"}
          </button>
        )}
      </div>

      {err && <p className="mt-1 text-xs text-red-500">{err}</p>}

      {/* free-form body editor */}
      {editingBody && (
        <div className="mt-3">
          <textarea
            value={bodyDraft}
            onChange={(e) => setBodyDraft(e.target.value)}
            rows={Math.min(20, Math.max(6, bodyDraft.split("\n").length + 1))}
            className="w-full rounded-md border border-border bg-background p-3 text-[13px] leading-relaxed font-mono"
          />
          <div className="mt-1 flex gap-2">
            <button
              className={`${btn} border-primary/40 text-primary hover:bg-primary/10`}
              disabled={disabled || !bodyDraft.trim()}
              onClick={async () => {
                const ok = await act("set-content", { content: bodyDraft });
                if (ok) setEditingBody(false);
              }}
            >
              Save text
            </button>
            <span className="text-[11px] text-muted-foreground self-center">
              markdown body only; use --- on its own line to split thread segments
            </span>
          </div>
        </div>
      )}

      {compare && linkedinText && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 text-[13px]">
          <div className="rounded-md border border-border p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-muted-foreground">
                X wording (current)
              </span>
              <button
                className={`${btn} border-primary/40 text-primary hover:bg-primary/10`}
                disabled={disabled}
                onClick={async () => {
                  const ok = await act("keep-x");
                  if (ok) setCompare(false);
                }}
              >
                Keep this
              </button>
            </div>
            <p className="whitespace-pre-line leading-relaxed">{content}</p>
          </div>
          <div className="rounded-md border border-border p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-muted-foreground">
                LinkedIn wording
              </span>
              <button
                className={`${btn} border-primary/40 text-primary hover:bg-primary/10`}
                disabled={disabled}
                onClick={async () => {
                  const ok = await act("use-linkedin");
                  if (ok) setCompare(false);
                }}
              >
                Use this
              </button>
            </div>
            <p className="whitespace-pre-line leading-relaxed">{linkedinText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
