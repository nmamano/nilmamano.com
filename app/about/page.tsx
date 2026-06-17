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
            <p>
              My original focus was data structures and algorithms. I came to
              the US to do a{" "}
              <Link href="/research" className="text-primary hover:underline">
                PhD
              </Link>{" "}
              on the subject, at UC Irvine. After that, I joined Google&apos;s
              networking infrastructure team, where I was promoted to senior.
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
              , where my DS&amp;A background was a perfect fit. Once the book
              shipped, I spent time on my own projects, like{" "}
              <Link
                href="https://isomux.com"
                target="_blank"
                className="text-primary hover:underline"
              >
                Isomux
              </Link>
              , the{" "}
              <Link
                href="https://wallgame.io"
                target="_blank"
                className="text-primary hover:underline"
              >
                Wall Game
              </Link>
              , and the{" "}
              <Link
                href="https://dsatoolkit.com"
                target="_blank"
                className="text-primary hover:underline"
              >
                DSA Toolkit
              </Link>
              , and writing on my{" "}
              <Link href="/blog" className="text-primary hover:underline">
                blog
              </Link>
              . That&apos;s where I found a new focus: agentic engineering.
            </p>

            <p>
              I&apos;m now looking to join a top AI startup or lab working on
              agentic tooling or vertical AI agents. Here&apos;s my{" "}
              <Link
                href="/resume/resume_nilmamano.pdf"
                target="_blank"
                className="text-primary hover:underline"
              >
                resume
              </Link>
              , and feel free to{" "}
              <Link href="/contact" className="text-primary hover:underline">
                get in touch
              </Link>
              .
            </p>

            <p>
              Outside of work, here&apos;s a bit about my{" "}
              <Link href="/personal" className="text-primary hover:underline">
                hobbies
              </Link>
              .
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0 order-2">
            <Image
              src="/nil2024_opt.jpg"
              alt="Nil, 2024"
              width={300}
              height={300}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
