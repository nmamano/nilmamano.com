import { getAllPosts } from "../lib/blog";
import BlogList from "../components/blog-list";

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
