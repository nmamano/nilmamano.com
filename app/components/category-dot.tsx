import { getCategoryConfig } from "../lib/blog-categories";

/** Small colored dot that marks a blog topic, feed tag or paper type. */
export function Dot({
  bgColor,
  textColor,
}: {
  bgColor: string;
  textColor: string;
}) {
  return (
    <span
      className={`h-2 w-2 shrink-0 rounded-full border border-current ${bgColor} ${textColor}`}
    />
  );
}

export function CategoryDot({ category }: { category: string }) {
  return <Dot {...getCategoryConfig(category)} />;
}
