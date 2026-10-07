import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader({ currentRoute }: { currentRoute?: string }) {
  // Blog and feed share one header: back link on phones, no Research link.
  const isBlog = currentRoute === "blog" || currentRoute === "posts";

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
                href="/research"
                className={`leading-none transition-colors hover:text-foreground/80 ${
                  currentRoute === "research" ? "text-primary" : ""
                }`}
              >
                Research
              </Link>
            </nav>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <nav
            aria-label="Blog or feed"
            className="flex items-center rounded-full border border-border p-0.5 text-sm font-medium"
          >
            {[
              { href: "/blog", label: "Blog", route: "blog" },
              { href: "/posts", label: "Feed", route: "posts" },
            ].map(({ href, label, route }) => (
              <Link
                key={route}
                href={href}
                aria-current={currentRoute === route ? "page" : undefined}
                className={`px-4 py-1.5 rounded-full leading-none transition-colors ${
                  currentRoute === route
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
