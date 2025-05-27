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

        <div className="mr-4 hidden md:flex">
          <div className="mr-6 flex items-center space-x-2">
            <Link href="/" className="hidden font-bold sm:inline-block">
              Nil Mamano
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/#about"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "about" ? "text-primary" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/research"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "research" ? "text-primary" : ""
              }`}
            >
              Research
            </Link>
            <Link
              href="/#projects"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "projects" ? "text-primary" : ""
              }`}
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "contact" ? "text-primary" : ""
              }`}
            >
              Contact
            </Link>
            <Link
              href="/media-kit"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "media-kit" ? "text-primary" : ""
              }`}
            >
              Media Kit
            </Link>
            <Link
              href="/personal"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "personal" ? "text-primary" : ""
              }`}
            >
              Personal
            </Link>
          </nav>
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
