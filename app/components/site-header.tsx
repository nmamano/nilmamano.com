import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader({ currentRoute }: { currentRoute?: string }) {
  const isBlog = currentRoute === "blog";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-8 md:px-10">
        {/* Mobile back link - only shown on blog pages */}
        {isBlog && (
          <Link
            href="/"
            className="md:hidden text-primary flex items-center text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Home
          </Link>
        )}

        <div className="mr-4 hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="font-bold leading-none transition-colors hover:text-foreground/80"
          >
            Nil Mamano
          </Link>
          {!isBlog && (
            <nav className="flex items-center gap-6 text-sm font-medium leading-none">
              <Link
                href="/about"
                className={`leading-none transition-colors hover:text-foreground/80 ${
                  currentRoute === "about" ? "text-primary" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/research"
                className={`leading-none transition-colors hover:text-foreground/80 ${
                  currentRoute === "research" ? "text-primary" : ""
                }`}
              >
                Research
              </Link>
              <Link
                href="/posts"
                className={`leading-none transition-colors hover:text-foreground/80 ${
                  currentRoute === "posts" ? "text-primary" : ""
                }`}
              >
                Posts
              </Link>
            </nav>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <Link href="/blog">
            <Button
              variant="default"
              className={`font-bold h-9 !py-0 bg-gray-900 hover:bg-gray-700 text-white dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground ${
                currentRoute === "blog"
                  ? "ring-2 ring-primary ring-offset-2"
                  : ""
              }`}
            >
              Blog
            </Button>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
