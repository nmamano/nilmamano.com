import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader({ currentRoute }: { currentRoute?: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-8 md:px-10">
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
              href="/blog"
              className={`transition-colors hover:text-foreground/80 ${
                currentRoute === "blog" ? "text-primary" : ""
              }`}
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="ml-auto">
          <Link
            href="/resume/Resume_NilMamano.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Resume</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
