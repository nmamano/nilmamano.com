import type { PostImage } from "./posts";

// A post image (or video) spans the post column unless its frontmatter entry
// gives a width, in which case it is centered at that percent of the column.
export function mediaClass(image: PostImage): string {
  return image.width
    ? "mx-auto rounded-md border border-border"
    : "w-full rounded-md border border-border";
}

export function mediaStyle(image: PostImage) {
  return image.width ? { width: `${image.width}%` } : undefined;
}
