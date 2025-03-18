import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t mt-20">
      <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 nilmamano.com. All rights reserved. Last updated March 2025.
        </p>
        <nav className="flex gap-4 sm:gap-6 mx-auto">
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Home
          </Link>
        </nav>
      </div>
    </footer>
  );
}
