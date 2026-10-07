export interface CategoryConfig {
  name: string;
  bgColor: string;
  textColor: string;
  /** Not shown as a tag or a filter; /blog/category/<key> still works. */
  hidden?: boolean;
}

// Insertion order is the order of the filter buttons.
export const CATEGORIES: Record<string, CategoryConfig> = {
  isomux: {
    name: "Isomux",
    bgColor: "bg-teal-100",
    textColor: "text-teal-800",
  },
  bctci: {
    name: "BCtCI",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  wallgame: {
    name: "Wall Game",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
  ai: {
    name: "AI",
    bgColor: "bg-pink-100",
    textColor: "text-pink-800",
  },
  dsa: {
    name: "DS&A",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  research: {
    name: "Research",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  swe: {
    name: "SWE",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    hidden: true,
  },
};

/** A post's categories that are shown as tags, in frontmatter order. */
export function visibleCategories(categories: string[] = []): string[] {
  return categories.filter((category) => !getCategoryConfig(category).hidden);
}

// Feed tags that are not blog topics. Kept out of CATEGORIES so they do not
// become blog filters. Tags marked hidden stay on posts so search finds them,
// but are not shown.
const FEED_ONLY_TAGS: Record<string, CategoryConfig> = {
  blog: { name: "Blog", bgColor: "", textColor: "", hidden: true },
  agents: { name: "Agents", bgColor: "", textColor: "", hidden: true },
  "job-search": {
    name: "Job search",
    bgColor: "bg-amber-100",
    textColor: "text-amber-800",
  },
  personal: {
    name: "Personal",
    bgColor: "bg-stone-200",
    textColor: "text-stone-700",
    hidden: true,
  },
  music: { name: "Music", bgColor: "", textColor: "", hidden: true },
};

export function getCategoryConfig(category: string): CategoryConfig {
  const key = category.toLowerCase();
  return (
    CATEGORIES[key] ||
    FEED_ONLY_TAGS[key] || {
      name: category,
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
    }
  );
}
