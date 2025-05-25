export interface CategoryConfig {
  name: string;
  bgColor: string;
  textColor: string;
}

export const CATEGORIES: Record<string, CategoryConfig> = {
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
  },
  wallgame: {
    name: "Wall Game",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
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
