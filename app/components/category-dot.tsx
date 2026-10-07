import { getCategoryConfig } from "../lib/blog-categories";

/** Small colored dot that marks a blog topic or feed tag. */
export function CategoryDot({ category }: { category: string }) {
  const config = getCategoryConfig(category);
  return (
    <span
      className={`h-2 w-2 shrink-0 rounded-full border border-current ${config.bgColor} ${config.textColor}`}
    />
  );
}
