"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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

    // Set up intersection observer for active section highlighting
    const observerOptions = {
      rootMargin: "-80px 0% -80% 0%",
      threshold: 0,
    };

    // Keep track of visible headings
    const visibleHeadings = new Set<string>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target.id);
        } else {
          visibleHeadings.delete(entry.target.id);
        }
      });

      // Find the topmost visible heading
      if (visibleHeadings.size > 0) {
        const visibleHeadingElements = Array.from(visibleHeadings)
          .map((id) => document.getElementById(id))
          .filter(Boolean)
          .sort((a, b) => a!.offsetTop - b!.offsetTop);

        if (visibleHeadingElements.length > 0) {
          setActiveId(visibleHeadingElements[0]!.id);
        }
      } else {
        // No headings visible, clear active state
        setActiveId("");
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Only observe headings that are in our ToC
    items.forEach((item) => {
      const heading = document.getElementById(item.id);
      if (heading) {
        observer.observe(heading);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (tocItems.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Calculate position accounting for sticky header (56px height + some padding)
      const headerOffset = 80;
      const elementPosition = element.offsetTop - headerOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      // Update URL without triggering navigation
      window.history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav
      className={`toc border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 ${className}`}
      aria-label="Table of contents"
    >
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
        Table of Contents
      </h4>
      <ul className="space-y-1 text-sm">
        {tocItems.map((item, index) => {
          const isActive = activeId === item.id;
          const getIndentClass = (level: number) => {
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
                className={`block py-1 px-2 rounded transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
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
}

// This is the component that will be used in MDX as <toc />
export default function TocElement() {
  return <TableOfContents className="not-prose mb-8" />;
}
