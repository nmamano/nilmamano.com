import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaLinkedin } from "@/components/site-icons-fa6";
import { getPostSummaries } from "../lib/blog";
import RandomPosts from "./random-posts";
import { NewsletterSubscription } from "./newsletter-subscription";

interface BlogFooterProps {
  currentPostSlug?: string;
}

export default function BlogFooter({ currentPostSlug }: BlogFooterProps) {
  const otherPosts = getPostSummaries(currentPostSlug);

  return (
    <footer className="mt-16 pt-8 border-t border-gray-300 dark:border-white/40">
      {/* Newsletter subscription section */}
      <div className="mb-12">
        <NewsletterSubscription />
      </div>

      {/* Random posts section */}
      <RandomPosts posts={otherPosts} count={3} />

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
