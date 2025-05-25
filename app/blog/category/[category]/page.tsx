import { getAllPosts } from "../../../lib/blog";
import BlogList from "../../../components/blog-list";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate metadata for category pages
export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Posts`;

  return {
    title,
    description: `Blog posts in the ${category} category`,
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = new Set<string>();

  posts.forEach((post) => {
    post.categories?.forEach((category) => {
      categories.add(category.toLowerCase());
    });
  });

  return Array.from(categories).map((category) => ({
    category,
  }));
}

export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const { category } = await params;
  const posts = getAllPosts();

  // Check if the category exists in any post
  const categoryExists = posts.some((post) =>
    post.categories?.some((c) => c.toLowerCase() === category.toLowerCase())
  );

  if (!categoryExists) {
    notFound();
  }

  return <BlogList posts={posts} initialCategory={category} />;
}
