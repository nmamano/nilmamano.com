import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { getRandomPosts } from "../lib/blog";
import { BlogPostCard } from "./blog-post-card";

interface BlogFooterProps {
  currentPostSlug?: string;
}

export default function BlogFooter({ currentPostSlug }: BlogFooterProps) {
  const randomPosts = getRandomPosts(currentPostSlug, 3);

  return (
    <footer className="mt-16 pt-8 border-t border-gray-300 dark:border-white/40">
      {/* Random posts section */}
      {randomPosts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Want to read more? Here are other posts:
          </h3>
          <div className="space-y-4">
            {randomPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Author info section */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-tighter">Nil Mamano</h2>
          <p className="text-muted-foreground">
            Computer scientist, software engineer, author.
          </p>
        </div>
        <div className="space-x-4">
          <Link href="https://linkedin.com/in/nilmamano/" target="_blank">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <FaLinkedin style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://x.com/Nil053" target="_blank">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <FaXTwitter style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">Twitter</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
