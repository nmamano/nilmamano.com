"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

// Dev-only inline review notes (see review-notes.tsx). Each note goes right
// before its target in the post, and the target gets an amber outline.
// Targets: "#id" (a heading), "img:<part of the src>", or a text snippet that
// the smallest matching block contains.
export type InlineNote = { target: string; content: ReactNode };

const BLOCKS = "p, li, h1, h2, h3, h4, blockquote, td, figcaption, pre";

function findTarget(root: Element, target: string): Element | null {
  if (target.startsWith("#")) return root.querySelector(`[id="${target.slice(1)}"]`);
  if (target.startsWith("img:")) {
    const img = Array.from(root.querySelectorAll("img")).find((i) =>
      (i.getAttribute("src") ?? "").includes(target.slice(4)),
    );
    return img ? (img.closest("figure") ?? img.parentElement) : null;
  }
  const norm = (s: string) => s.replace(/\s+/g, " ");
  const hits = Array.from(root.querySelectorAll(BLOCKS)).filter((el) =>
    norm(el.textContent ?? "").includes(norm(target)),
  );
  // The innermost match: a block with no matching block inside it.
  return hits.find((el) => !hits.some((o) => o !== el && el.contains(o))) ?? null;
}

export default function ReviewAnnotations({ notes }: { notes: InlineNote[] }) {
  const [slots, setSlots] = useState<(Element | null)[]>([]);
  const [missing, setMissing] = useState<string[]>([]);

  useEffect(() => {
    const root = document.querySelector(".markdown-content");
    if (!root) return;
    const made: Element[] = [];
    const lost: string[] = [];
    const found = notes.map((n) => {
      const el = findTarget(root, n.target);
      if (!el) {
        lost.push(n.target);
        return null;
      }
      el.classList.add("review-target");
      const slot = document.createElement("div");
      el.parentElement?.insertBefore(slot, el);
      made.push(slot);
      return slot;
    });
    setSlots(found);
    setMissing(lost);
    return () => {
      made.forEach((s) => s.remove());
      root.querySelectorAll(".review-target").forEach((e) => e.classList.remove("review-target"));
    };
  }, [notes]);

  return (
    <>
      <style>{`.review-target{outline:2px dashed #f59e0b;outline-offset:6px;border-radius:4px}`}</style>
      {notes.map((n, i) =>
        slots[i]
          ? createPortal(
              <aside className="not-prose my-4 rounded-md border-l-4 border-amber-500 bg-amber-50 px-4 py-2 font-sans text-[15px] leading-relaxed text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Review note - not part of the post
                </div>
                <div className="[&_a]:underline [&_code]:rounded [&_code]:bg-amber-100 [&_code]:px-1 dark:[&_code]:bg-amber-900 [&_li]:my-0.5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5">
                  {n.content}
                </div>
              </aside>,
              slots[i]!,
            )
          : null,
      )}
      {missing.length > 0 && (
        <div className="not-prose fixed bottom-4 left-4 z-50 rounded bg-red-600 px-3 py-2 text-xs text-white">
          Review notes with no target: {missing.join(" | ")}
        </div>
      )}
    </>
  );
}
