import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t mt-20">
      <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 nilmamano.com. All rights reserved. Last updated May 2025.{" "}
          <span
            className="underline cursor-help [&:hover]:delay-75"
            title="I use Google Analytics to track page views. Data is anonymized, IPs are hidden, and no personal info is stored except what you provide in forms. Emails from blog subscribers are stored by the sender.net service, not myself directly. I do not use data for advertising."
          >
            Privacy policy
          </span>
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
