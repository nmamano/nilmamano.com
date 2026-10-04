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
    const loadAndHighlight = async () => {
      try {
        // Only load Prism once
        if (!prismLoaded.current) {
          // Import and configure Prism
          const Prism = (await import("prismjs")).default;

          // Import CSS theme
          await import("prismjs/themes/prism-tomorrow.css");

          // Import language support in the correct dependency order
          try {
            await import("prismjs/components/prism-python");
            await import("prismjs/components/prism-c");
            await import("prismjs/components/prism-cpp");
            await import("prismjs/components/prism-typescript");
            await import("prismjs/components/prism-sql");
          } catch (err) {
            console.warn("Failed to load some language support:", err);
            // Continue with basic highlighting
          }

          prismLoaded.current = true;

          // Apply highlighting to current content
          if (containerRef.current) {
            try {
              Prism.highlightAllUnder(containerRef.current);
            } catch (err) {
              console.warn("Failed to highlight code:", err);
              // If highlighting fails, at least preserve the code content
              const codeBlocks =
                containerRef.current.getElementsByTagName("code");
              Array.from(codeBlocks).forEach((block) => {
                if (!block.className) {
                  block.className = "language-plaintext";
                }
              });
            }
          } else {
            console.error(
              "Container ref is null when trying to apply highlighting"
            );
          }
          // No MutationObserver: the MDX is static after hydration, and re-highlighting
          // on class changes (e.g. the TOC scrollspy) looped on blocks Prism leaves as plain text.
        }
      } catch (err) {
        console.error("Error initializing syntax highlighting:", err);
        // Rethrow the error to prevent silent failures
        throw err;
      }
    };

    if (typeof window !== "undefined") {
      loadAndHighlight().catch((err) => {
        console.error("Fatal error in syntax highlighting:", err);
      });
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
