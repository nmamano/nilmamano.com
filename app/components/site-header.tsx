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
              href="/#research"
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
              href="/#personal"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "personal" ? "text-primary" : ""
              }`}
            >
              Personal
            </Link>
            <Link
              href="/#media-kit"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "media-kit" ? "text-primary" : ""
              }`}
            >
              Media Kit
            </Link>

            <Link
              href="/resume/Resume_NilMamano.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-2 py-1 border border-muted-foreground/30 rounded text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 mr-1"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Resume
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <Link href="/blog">
            <Button
              variant="default"
              className={`font-bold h-9 !py-0 ${
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
