import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Nil Mamano",
  description:
    "About Nil Mamano: software engineer building agentic AI tools, ex-Google, co-author of Beyond Cracking the Coding Interview.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About me</h1>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-2/3 space-y-4 text-muted-foreground order-1">
            <p className="font-medium text-foreground">
              Algorithms PhD &rarr; Google Infra &rarr; Beyond Cracking the
              Coding Interview &rarr; Agentic AI
            </p>

            <p>
              My original focus was data structures and algorithms. I came to
              the US to do a{" "}
              <Link href="/research" className="text-primary hover:underline">
                PhD
              </Link>{" "}
              on the subject, at UC Irvine.
            </p>

            <p>
              After that, I joined Google&apos;s networking infrastructure team,
              where I was promoted to senior.
            </p>

            <p>
              I left Google to co-write{" "}
              <Link
                href="https://www.amazon.com/dp/195570600X"
                target="_blank"
                className="text-primary hover:underline"
              >
                Beyond Cracking the Coding Interview
              </Link>
              , where my DS&amp;A background was a perfect fit.
            </p>

            <p>
              Once the book shipped, I found a new focus:{" "}
              <strong>AI and agentic engineering</strong>. I built{" "}
              <Link
                href="https://isomux.com"
                target="_blank"
                className="text-primary hover:underline"
              >
                isomux.com
              </Link>{" "}
              (a meta-harness where Claude, Codex, and more agents and humans
              collaborate in the same conversation),{" "}
              <Link
                href="/blog/context-composer"
                className="text-primary hover:underline"
              >
                Context Composer
              </Link>{" "}
              (a proxy for fine-grained control over an agent&apos;s live
              context),{" "}
              <Link
                href="https://wallgame.io"
                target="_blank"
                className="text-primary hover:underline"
              >
                wallgame.io
              </Link>{" "}
              (a full-stack board game with an AlphaZero-style AI), and more. I
              build in public at{" "}
              <Link href="/blog" className="text-primary hover:underline">
                nilmamano.com/blog
              </Link>
              .
            </p>

            <p>
              I&apos;m now looking to join a top AI startup or lab working on
              agentic tooling or vertical AI agents.
            </p>

            <p>
              Outside of work, here&apos;s a bit about my{" "}
              <Link href="/personal" className="text-primary hover:underline">
                hobbies
              </Link>
              .
            </p>

            <p>
              To get in touch, please reach out on{" "}
              <Link
                href="https://linkedin.com/in/nilmamano/"
                target="_blank"
                className="text-primary hover:underline"
              >
                LinkedIn
              </Link>
              ,{" "}
              <Link
                href="https://x.com/Nil053"
                target="_blank"
                className="text-primary hover:underline"
              >
                X
              </Link>
              , or use this{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact form
              </Link>
              . I love feedback!
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0 order-2">
            {/* Light mode: daytime photo. Dark mode: nighttime photo. */}
            <Image
              src="/nil2024_opt.jpg"
              alt="Nil, 2024"
              width={300}
              height={300}
              className="rounded-lg shadow-md dark:hidden"
              priority
            />
            <Image
              src="/nil2024_night_opt.jpg"
              alt="Nil, 2024"
              width={300}
              height={300}
              className="hidden rounded-lg shadow-md dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
