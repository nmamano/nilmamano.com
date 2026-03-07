import { getAllPosts } from "../lib/blog";
import BlogList from "../components/blog-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nil Pointers",
  description:
    "Teaching DS&A, CS research highlights, SWE things, building in public.",
  openGraph: {
    title: "nil pointers",
    description:
      "Teaching DS&A, CS research highlights, SWE things, building in public.",
    url: "https://nilmamano.com/blog",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "nil pointers - Nil Mamano's blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nil pointers",
    description:
      "Teaching DS&A, CS research highlights, SWE things, building in public.",
    images: ["/og-blog.jpg"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
