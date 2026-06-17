import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaLinkedin, FaGithub, FaFilePdf } from "react-icons/fa6";
import { SiGooglescholar } from "react-icons/si";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-8 pb-6 md:pt-12 md:pb-10 lg:pt-16 scroll-mt-16"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Link href="/about" aria-label="About Nil Mamano">
          {/* Light mode: daytime photo. Dark mode: nighttime photo. */}
          <Image
            src="/nil2024_opt.jpg"
            alt="Nil Mamano"
            width={224}
            height={224}
            priority
            className="h-28 w-28 rounded-full object-cover shadow-md transition-opacity hover:opacity-90 dark:hidden"
          />
          <Image
            src="/nil2024_night_opt.jpg"
            alt="Nil Mamano"
            width={224}
            height={224}
            className="hidden h-28 w-28 rounded-full object-cover shadow-md transition-opacity hover:opacity-90 dark:block"
          />
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Nil Mamano
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Computer scientist, software engineer, author
          </p>
        </div>
        <div className="space-x-4 flex flex-nowrap whitespace-nowrap">
          <Link href="https://github.com/nmamano" target="_blank">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <FaGithub style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/nilmamano/" target="_blank">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <FaLinkedin style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://x.com/Nil053" target="_blank">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <FaXTwitter style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">Twitter</span>
            </Button>
          </Link>
          <Link
            href="https://scholar.google.bg/citations?user=LIuIigEAAAAJ&hl=en"
            target="_blank"
          >
            <Button variant="outline" size="icon" className="h-10 w-10">
              <SiGooglescholar style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">Google Scholar</span>
            </Button>
          </Link>
          <Link href="/resume/resume_nilmamano.pdf" target="_blank">
            <Button variant="outline" className="h-10 flex items-center gap-2">
              <FaFilePdf style={{ width: "24px", height: "24px" }} />
              <strong className="text-lg">Resume</strong>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
