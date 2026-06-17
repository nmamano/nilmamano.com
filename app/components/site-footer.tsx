import Link from "next/link";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

export function SiteFooter() {
  return (
    <footer className="border-t mt-20">
      <div className="container flex flex-col gap-3 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 nilmamano.com. All rights reserved.{" "}
          <span
            className="underline cursor-help [&:hover]:delay-75"
            title="I use Google Analytics to track page views. Data is anonymized, IPs are hidden, and no personal info is stored except what you provide in forms. Emails from blog subscribers are stored by the sender.net service, not myself directly. I do not use data for advertising."
          >
            Privacy policy
          </span>
        </p>
        <nav className="flex gap-4 sm:gap-6 mx-auto items-center">
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 flex items-center gap-1"
            href="/rss.xml"
            aria-label="RSS feed"
          >
            <span role="img" aria-hidden="true">
              🟧
            </span>
            RSS
          </Link>
        </nav>
        <div className="flex gap-4 items-center text-gray-500 dark:text-gray-400">
          <Link
            href="https://github.com/nmamano"
            target="_blank"
            aria-label="GitHub"
            className="hover:text-foreground transition-colors"
          >
            <FaGithub style={{ width: "18px", height: "18px" }} />
          </Link>
          <Link
            href="https://linkedin.com/in/nilmamano/"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:text-foreground transition-colors"
          >
            <FaLinkedin style={{ width: "18px", height: "18px" }} />
          </Link>
          <Link
            href="https://x.com/Nil053"
            target="_blank"
            aria-label="Twitter"
            className="hover:text-foreground transition-colors"
          >
            <FaXTwitter style={{ width: "18px", height: "18px" }} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
