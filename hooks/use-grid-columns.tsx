"use client";

import { useState, useEffect } from "react";

// Tailwind breakpoints
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;

export function useGridColumns() {
  const [columns, setColumns] = useState<number>(3); // Default to 3 for SSR

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= LG_BREAKPOINT) {
        setColumns(3);
      } else if (window.innerWidth >= MD_BREAKPOINT) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    // Set initial value
    updateColumns();

    // Listen for resize
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}
