"use client";

import React, { useEffect, useRef } from "react";

export default function ClientSyntaxHighlighter({
  children,
}: {
  children: React.ReactNode;
}) {
  const highlighted = useRef(false);

  useEffect(() => {
    // Only run this once per component instance
    if (!highlighted.current && typeof window !== "undefined") {
      const loadAndHighlight = async () => {
        try {
          // Import and configure Prism
          const Prism = (await import("prismjs")).default;

          // Import CSS theme
          await import("prismjs/themes/prism-tomorrow.css");

          // Import language support in the correct dependency order
          await import("prismjs/components/prism-python");

          // C must be loaded before C++
          await import("prismjs/components/prism-c");
          await import("prismjs/components/prism-cpp");

          // Setup complete, run highlighter
          Prism.highlightAll();
          highlighted.current = true;
        } catch (err) {
          console.error("Error initializing syntax highlighting:", err);
        }
      };

      loadAndHighlight();
    }
  }, []);

  return <div>{children}</div>;
}
