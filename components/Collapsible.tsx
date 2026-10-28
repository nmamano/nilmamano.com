"use client";

import { useEffect, useRef, type ReactNode } from "react";

// A section that starts collapsed, with its heading always visible (so it
// stays in the table of contents). It opens by itself when a link or the URL
// hash points at something inside it.
export function Collapsible({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openFor = (hash: string) => {
      const details = ref.current;
      if (!details || !hash) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target && details.contains(target) && !details.open) {
        details.open = true;
        target.scrollIntoView();
      }
    };
    openFor(window.location.hash);
    const onHash = () => openFor(window.location.hash);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (a) openFor(a.getAttribute("href") ?? "");
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <details
      ref={ref}
      className="collapsible-section group my-3 rounded-lg border border-border px-4 py-2 open:pb-4"
    >
      <summary className="not-prose flex cursor-pointer list-none items-center gap-2 py-1 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="inline-block text-muted-foreground transition-transform group-open:rotate-90"
        >
          ▸
        </span>
        <h2 id={id} className="m-0 text-lg font-semibold">
          {title}
        </h2>
      </summary>
      {children}
    </details>
  );
}
