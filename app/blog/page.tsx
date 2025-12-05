import { getAllPosts } from "../lib/blog";
import BlogList from "../components/blog-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nil Pointers",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
