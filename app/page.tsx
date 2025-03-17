import { Button } from "@/components/ui/button";
import Link from "next/link";
import AboutSection from "./components/about-section";
import ResearchSection from "./components/research-section";
import ProjectsSection from "./components/projects-section";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-8 md:px-10">
          <div className="mr-4 hidden md:flex">
            <div className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Nil Mamano
              </span>
            </div>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="#about"
                className="transition-colors hover:text-foreground/80"
              >
                About
              </Link>
              <Link
                href="#research"
                className="transition-colors hover:text-foreground/80"
              >
                Research
              </Link>
              <Link
                href="#projects"
                className="transition-colors hover:text-foreground/80"
              >
                Projects
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

      <main className="container mx-auto max-w-7xl px-4 md:px-6">
        <AboutSection />
        <ResearchSection />
        <ProjectsSection />
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 nilmamano.com. All rights reserved. Last updated March 2025.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
