"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { parseCaption } from "./parse-caption";

// The arrows live under the stage, not on top of it: floating them over the
// image covered the part of the screenshot the caption was pointing at.
const ARROW =
  "flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg leading-none text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800";

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface BlogCarouselProps {
  images: CarouselImage[];
  /** Height of the stage. Every image is contained inside it, so slides of
   *  different shapes (a wide screenshot, a tall phone shot) do not make the
   *  page jump as the reader steps through them. */
  height?: string;
  width?: string;
  /** Start on a slide other than the first (1-indexed), for deep links. */
  start?: number;
}

export function BlogCarousel({
  images,
  height = "clamp(260px, 58vh, 560px)",
  width = "100%",
  start = 1,
}: BlogCarouselProps) {
  const count = images.length;
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(start, 1), Math.max(count, 1)) - 1,
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  // Keep the browser from restoring a scroll position mid-swap on slide change.
  useEffect(() => {
    if (count === 0) setIndex(0);
  }, [count]);

  if (count === 0) return null;

  const current = images[index];

  return (
    // Centre horizontally only: a `margin` shorthand here would override the
    // vertical margins .blog-media gets from globals.css.
    <div
      className="blog-media"
      style={{ width, marginLeft: "auto", marginRight: "auto" }}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`Image ${index + 1} of ${count}`}
        onKeyDown={onKeyDown}
        className="relative flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
        style={{ height }}
      >
        {images.map((image, i) => (
          // Every slide stays mounted so stepping through is instant after the
          // first pass, and so the browser has already decoded the next one.
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            aria-hidden={i === index ? undefined : true}
            className="absolute max-h-full max-w-full rounded-md object-contain p-2"
            style={{
              opacity: i === index ? 1 : 0,
              visibility: i === index ? "visible" : "hidden",
              transition: "opacity 120ms ease-out",
            }}
          />
        ))}

      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={ARROW}
          >
            <span aria-hidden="true">&#8249;</span>
          </button>
          <div className="flex gap-2">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index
                    ? "bg-gray-700 dark:bg-gray-200"
                    : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className={ARROW}
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
          <span
            aria-live="polite"
            className="ml-1 text-sm tabular-nums text-gray-500 dark:text-gray-400"
          >
            {index + 1} / {count}
          </span>
        </div>
      )}

      {/* Reserved for the longest caption in the set, so stepping through slides
          does not shift the paragraphs underneath. */}
      <figcaption
        className="mx-auto mt-2 text-center text-base font-medium text-gray-700 dark:text-gray-300"
        style={{ minHeight: "5.5rem" }}
      >
        {current.caption ? parseCaption(current.caption) : null}
      </figcaption>
    </div>
  );
}

export default BlogCarousel;
