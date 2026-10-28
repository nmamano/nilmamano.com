"use client";

import React, { useEffect, useRef, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className = "" }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  // The wide-screen sidebar can be collapsed; the browser remembers it.
  const [sideOpen, setSideOpen] = useState(true);

  useEffect(() => {
    setSideOpen(localStorage.getItem("toc-sidebar") !== "closed");
  }, []);

  const toggleSide = (open: boolean) => {
    setSideOpen(open);
    localStorage.setItem("toc-sidebar", open ? "open" : "closed");
  };

  useEffect(() => {
    // Extract headings from the page, only h1, h2, h3 (max 3 levels)
    const headings = document.querySelectorAll("h1, h2, h3");
    const items: TocItem[] = [];

    headings.forEach((heading) => {
      const id = heading.id;
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.charAt(1));

      // Exclude footnotes and Problem components
      const isFootnote =
        id &&
        (id.includes("fn-") ||
          id.includes("footnote") ||
          id.includes("user-content-fn") ||
          text.toLowerCase().includes("footnote"));

      // Exclude only auto-numbered headings like "Problem 1:" or "Solution 1:"
      // This avoids filtering legitimate headings like "Problem Statement: ..."
      const isAutoNumberedHeading =
        /^Problem\s+\d+:/i.test(text.trim()) ||
        /^Solution\s+\d+:/i.test(text.trim());

      // Exclude the blog post title
      const isTitle = id === "title";

      if (
        id &&
        text &&
        !isFootnote &&
        !isAutoNumberedHeading &&
        !isTitle &&
        level <= 3
      ) {
        items.push({ id, text, level });
      }
    });

    // De-duplicate by id to avoid duplicate keys/items when the same heading appears multiple times
    const uniqueItems = items.filter(
      (item, index, arr) => arr.findIndex((i) => i.id === item.id) === index
    );

    setTocItems(uniqueItems);

    const headingElements = uniqueItems
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);
    const visibleHeadings = new Set<string>();
    setActiveId(headingElements[0]?.id || "");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleHeadings.add(entry.target.id);
          else visibleHeadings.delete(entry.target.id);
        });

        const current = headingElements.find((heading) =>
          visibleHeadings.has(heading.id)
        );
        // Keep the previous section active between headings.
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar || !activeId) return;

    const activeLink = sidebar.querySelector<HTMLElement>(
      `[data-toc-id="${CSS.escape(activeId)}"]`
    );
    if (!activeLink) return;

    const padding = 24;
    const linkTop = activeLink.offsetTop;
    const linkBottom = linkTop + activeLink.offsetHeight;
    const visibleTop = sidebar.scrollTop + padding;
    const visibleBottom = sidebar.scrollTop + sidebar.clientHeight - padding;

    if (linkTop < visibleTop || linkBottom > visibleBottom) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      sidebar.scrollTo({
        top: Math.max(0, linkTop - sidebar.clientHeight / 2),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  }, [activeId]);

  if (tocItems.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Open any collapsed section (Collapsible) that holds the heading.
      for (let d = element.closest("details"); d; d = d.parentElement?.closest("details") ?? null) {
        d.open = true;
      }
      // Calculate position accounting for sticky header (56px height + some padding)
      const headerOffset = 80;
      const elementPosition = element.offsetTop - headerOffset;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({
        top: elementPosition,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      // Update URL without triggering navigation
      window.history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  const heading =
    "text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide";

  const renderContents = (wide = false) => (
    <nav
      className={wide ? "toc min-h-full py-6 pl-10 pr-4" : "toc"}
      aria-label="Table of contents"
    >
      {wide && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <h4 className={heading}>Table of Contents</h4>
          <button
            type="button"
            onClick={() => toggleSide(false)}
            aria-label="Collapse table of contents"
            title="Collapse"
            className="rounded px-2 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
          >
            ◂
          </button>
        </div>
      )}
      <ul className={`space-y-1 text-sm ${wide ? "" : "mt-3"}`}>
        {tocItems.map((item, index) => {
          const isActive = activeId === item.id;
          const getIndentClass = (level: number) => {
            if (wide) {
              return level >= 3 ? "ml-4" : "";
            }
            switch (level) {
              case 1:
                return ""; // No indent for h1
              case 2:
                return "ml-4"; // Indent for h2
              case 3:
                return "ml-8"; // More indent for h3
              default:
                return "";
            }
          };

          return (
            <li
              key={`${item.id}-${index}`}
              className={getIndentClass(item.level)}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                data-toc-id={wide ? item.id : undefined}
                className={`block py-1 ${wide ? "-ml-2 px-2" : "px-2"} rounded transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Below 2xl, the ToC sits in the post; the reader can collapse it. */}
      <details
        open
        className={`group 2xl:hidden border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 ${className}`}
      >
        <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
          <span
            aria-hidden="true"
            className="inline-block text-gray-500 transition-transform group-open:rotate-90"
          >
            ▸
          </span>
          <span className={heading}>Table of Contents</span>
        </summary>
        {renderContents()}
      </details>
      {sideOpen ? (
        <aside className="not-prose fixed bottom-0 left-0 top-14 z-10 toc-sidebar hidden w-[max(22rem,calc(50%-30.5rem))] border-r border-gray-200 bg-background/95 dark:border-gray-700 2xl:block">
          <div
            ref={sidebarRef}
            className="h-full overflow-y-auto overscroll-contain"
          >
            {renderContents(true)}
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => toggleSide(true)}
          aria-label="Expand table of contents"
          className={`not-prose fixed left-4 top-20 z-10 hidden items-center gap-2 rounded-lg border border-gray-200 bg-background/95 px-3 py-2 text-gray-600 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:text-gray-100 2xl:flex ${heading}`}
        >
          <span aria-hidden="true">▸</span> Table of Contents
        </button>
      )}
    </>
  );
}

// This is the component that will be used in MDX as <toc />
export default function TocElement() {
  return <TableOfContents className="not-prose mb-8" />;
}
