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

          // Import Python support
          await import("prismjs/components/prism-python");

          // Setup complete, run highlighter
          Prism.highlightAll();
          highlighted.current = true;

          // Load C++ support after initial highlighting (for future posts)
          // This avoids the error while still providing C++ support
          setTimeout(async () => {
            try {
              await import("prismjs/components/prism-cpp");
              // No need to run highlightAll again since there's no C++ code yet
            } catch (e) {
              // Silently fail if C++ support can't be loaded
              console.log(
                "Note: C++ syntax highlighting support couldn't be loaded"
              );
            }
          }, 100);
        } catch (err) {
          console.error("Error initializing syntax highlighting:", err);
        }
      };

      loadAndHighlight();
    }
  }, []);

  return <div>{children}</div>;
}
