export interface CategoryConfig {
  name: string;
  bgColor: string;
  textColor: string;
  /** Keep the badge styling but leave it out of the filter row. */
  hiddenFromFilters?: boolean;
}

// Insertion order is the order of the filter buttons.
export const CATEGORIES: Record<string, CategoryConfig> = {
  ai: {
    name: "AI",
    bgColor: "bg-pink-100",
    textColor: "text-pink-800",
  },
  wallgame: {
    name: "Wall Game",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
  bctci: {
    name: "BCtCI",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
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
    hiddenFromFilters: true,
  },
};

export function getCategoryConfig(category: string): CategoryConfig {
  return (
    CATEGORIES[category.toLowerCase()] || {
      name: category,
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
    }
  );
}
