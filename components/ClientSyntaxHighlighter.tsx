"use client";

import React, { useEffect, useRef } from "react";

export default function ClientSyntaxHighlighter({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prismLoaded = useRef(false);

  useEffect(() => {
    let observer: MutationObserver | null = null;

    const loadAndHighlight = async () => {
      try {
        // Only load Prism once
        if (!prismLoaded.current) {
          // Import and configure Prism
          const Prism = (await import("prismjs")).default;

          // Import CSS theme
          await import("prismjs/themes/prism-tomorrow.css");

          // Import language support in the correct dependency order
          await import("prismjs/components/prism-python");

          // C must be loaded before C++
          await import("prismjs/components/prism-c");
          await import("prismjs/components/prism-cpp");

          prismLoaded.current = true;

          // Apply highlighting to current content
          Prism.highlightAllUnder(containerRef.current!);

          // Set up an observer to detect content changes
          observer = new MutationObserver(() => {
            Prism.highlightAllUnder(containerRef.current!);
          });

          // Observe changes to the container and its descendants
          if (containerRef.current) {
            observer.observe(containerRef.current, {
              childList: true,
              subtree: true,
            });
          }
        }
      } catch (err) {
        console.error("Error initializing syntax highlighting:", err);
      }
    };

    if (typeof window !== "undefined") {
      loadAndHighlight();
    }

    // Cleanup observer on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
