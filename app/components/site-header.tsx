import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SectionToggle } from "./section-toggle";

export function SiteHeader({ currentRoute }: { currentRoute?: string }) {
  // Blog, feed and papers share one header: back link on phones.
  const isBlog = ["blog", "posts", "papers"].includes(currentRoute ?? "");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-8 md:px-10">
        {/* Mobile back link - only shown on blog pages */}
        {isBlog && (
          <Link
            href="/"
            aria-label="Home"
            className="md:hidden text-primary flex items-center -ml-2 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
        )}

        <div className="mr-4 hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="font-bold leading-none transition-colors hover:text-foreground/80"
          >
            Nil Mamano
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <SectionToggle currentRoute={currentRoute} />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
