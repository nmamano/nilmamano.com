"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { useGridColumns } from "@/hooks/use-grid-columns";
import { FaChevronUp } from "react-icons/fa";

interface ExpandableCardGridProps<T> {
  items: T[];
  renderCard: (item: T, index: number, isExpanded: boolean) => ReactNode;
  renderExpandedContent: (item: T, index: number) => ReactNode;
  getItemKey: (item: T, index: number) => string | number;
}

export function ExpandableCardGrid<T>({
  items,
  renderCard,
  renderExpandedContent,
  getItemKey,
}: ExpandableCardGridProps<T>) {
  const columns = useGridColumns();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);
  const expandedRowRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  // Calculate content height for animation, with ResizeObserver to handle image loading
  useEffect(() => {
    if (expandedIndex !== null && contentRef.current) {
      const updateHeight = () => {
        if (contentRef.current) {
          // Add 4px buffer for border (2px top + 2px bottom)
          const height = contentRef.current.scrollHeight + 4;
          setContentHeight(`${height}px`);
        }
      };

      // Initial calculation with small delay
      const timer = setTimeout(updateHeight, 50);

      // Watch for size changes (e.g., when images load)
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(contentRef.current);

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    } else {
      setContentHeight("0px");
    }
  }, [expandedIndex]);

  // Scroll expanded content into view
  useEffect(() => {
    if (expandedIndex !== null && expandedRowRef.current) {
      const timer = setTimeout(() => {
        expandedRowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [expandedIndex]);

  // Group items into rows based on column count
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  // Find which row contains the expanded item
  const expandedRowIndex =
    expandedIndex !== null ? Math.floor(expandedIndex / columns) : null;

  return (
    <div className="space-y-0">
      {rows.map((row, rowIndex) => {
        const rowStartIndex = rowIndex * columns;
        const isExpandedRow = expandedRowIndex === rowIndex;
        const expandedItem =
          expandedIndex !== null ? items[expandedIndex] : null;

        return (
          <div key={rowIndex}>
            {/* Row of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {row.map((item, indexInRow) => {
                const globalIndex = rowStartIndex + indexInRow;
                const isExpanded = expandedIndex === globalIndex;

                return (
                  <div
                    key={getItemKey(item, globalIndex)}
                    onClick={() => toggleExpanded(globalIndex)}
                    className="cursor-pointer"
                  >
                    {renderCard(item, globalIndex, isExpanded)}
                  </div>
                );
              })}
            </div>

            {/* Expanded content - appears below the row */}
            <div
              ref={isExpandedRow ? expandedRowRef : undefined}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpandedRow ? "mb-6" : ""
              }`}
              style={{
                height: isExpandedRow ? contentHeight : "0px",
                opacity: isExpandedRow ? 1 : 0,
              }}
            >
              {isExpandedRow && expandedItem && (
                <div
                  ref={contentRef}
                  className="rounded-lg card-border bg-card text-card-foreground shadow-md p-6"
                >
                  {renderExpandedContent(expandedItem, expandedIndex!)}

                  {/* Close button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIndex(null);
                    }}
                    className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto"
                  >
                    <FaChevronUp size={14} />
                    <span>Close</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
