import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { SiGooglescholar } from "react-icons/si";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="pt-2 pb-12 md:pt-4 md:pb-24 lg:pt-6 lg:pb-32 scroll-mt-16"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Nil Mamano
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Computer scientist, software engineer, author.
          </p>
        </div>
        <div className="space-x-4">
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
        </div>
      </div>

      <div className="mt-12 p-4 md:p-6 rounded-lg card-border bg-card text-card-foreground shadow-sm max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="md:w-1/4 flex justify-center">
            <Link href="https://www.amazon.com/dp/195570600X" target="_blank">
              <Image
                src="/book-cover.png"
                alt="BCtCI Book Cover"
                width={200}
                height={300}
                className="rounded-md shadow-lg cursor-pointer"
                priority
              />
            </Link>
          </div>
          <div className="md:w-3/4 space-y-2">
            <h2 className="text-xl md:text-2xl font-bold">
              'Beyond Cracking the Coding Interview' is out now!
            </h2>
            <p className="text-sm text-muted-foreground">
              I recently co-wrote the official sequel to CtCI along with Gayle
              Laakmann McDowell, Aline Lerner, and Mike Mroczka.
            </p>
            <div className="pt-1">
              <Link href="https://www.amazon.com/dp/195570600X" target="_blank">
                <Button size="sm" className="font-medium">
                  Get Your Copy
                </Button>
              </Link>
              {/* <Link href="#more-info" className="ml-4">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Biographical Information Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">About Me</h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-2/3 space-y-6 text-muted-foreground order-1 md:order-1">
            <p>
              I am a computer scientist specialized in data structures and
              algorithms.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Academic Background
              </h3>
              <p>
                I received a PhD as part of the{" "}
                <Link
                  href="http://www.ics.uci.edu/~theory"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  CS Theory group
                </Link>{" "}
                at{" "}
                <Link
                  href="http://www.uci.edu/"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  UCI
                </Link>
                . I was fortunate to be advised by Professors{" "}
                <Link
                  href="https://www.ics.uci.edu/~eppstein/"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  David Eppstein
                </Link>{" "}
                and{" "}
                <Link
                  href="http://www.ics.uci.edu/~goodrich/"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Michael Goodrich
                </Link>
                . Before that, I got a bachelor's degree in CS from UPC in my
                hometown of Barcelona.
              </p>
              <p className="mt-2">
                My research spans computational geometry, greedy algorithms,
                graph data structures, computational biology, and recreational
                mathematics. My dissertation,
                <em>
                  {" "}
                  New Applications of the Nearest-neighbor Chain Algorithm{" "}
                </em>
                (
                <Link
                  href="/dissertation/nildissertation.pdf"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  pdf
                </Link>
                ,{" "}
                <Link
                  href="/blog/greedy-algorithms"
                  className="text-primary hover:underline"
                >
                  blog post
                </Link>
                ,{" "}
                <Link
                  href="/dissertation/nildissertationslides.pdf"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  defense slides
                </Link>
                ,{" "}
                <Link
                  href="https://11011110.github.io/blog/2019/09/26/congratulations-dr-mamano.html"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  David's blog
                </Link>
                ) studies how to relax the "greedy choice" in certain greedy
                algorithms without affecting the final solution. This idea,
                paired with an algorithmic technique called nearest-neighbor
                chain, allows us to speed up some greedy algorithms (like the{" "}
                <Link
                  href="https://en.wikipedia.org/wiki/Multi-fragment_algorithm"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Multi-fragment algorithm
                </Link>{" "}
                for{" "}
                <Link
                  href="https://en.wikipedia.org/wiki/Travelling_salesman_problem"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Euclidean TSP
                </Link>{" "}
                from O(n
                <sup>2</sup>) to O(n log n) (
                <Link
                  href="https://arxiv.org/abs/1902.06875"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  paper
                </Link>
                ).
              </p>
              <p className="mt-2">
                See{" "}
                <Link href="#research" className="text-primary hover:underline">
                  Research
                </Link>{" "}
                for more or download my{" "}
                <Link
                  href="/resume/CV_NilMamano.pdf"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  academic CV
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Industry Experience
              </h3>
              <p>
                After my PhD, I spent some time in industry as a senior SWE at
                Google. I worked on Google's internal{" "}
                <Link
                  href="https://research.google/pubs/software-defined-networking-at-scale/"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  software-defined WAN
                </Link>
                , optimizing the allocation of network bandwidth to Google's
                services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Current Projects
              </h3>
              <p>
                I recently had the privilege to co-author Beyond Cracking the
                Coding Interview with{" "}
                <Link
                  href="https://www.gayle.com/"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Gayle Laakmann McDowell
                </Link>
                ,{" "}
                <Link
                  href="https://blog.alinelerner.com/"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Aline Lerner
                </Link>
                , and{" "}
                <Link
                  href="https://www.mikemroczka.com/"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Mike Mroczka
                </Link>
                .
              </p>
              <p className="mt-2">Not yet sure what's next!</p>
              <p className="mt-2">
                My passion project is{" "}
                <Link
                  href="https://wallwars.net"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  wallwars.net
                </Link>
                , an online board game.
              </p>
            </div>
          </div>

          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0 order-2 md:order-2">
            <Image
              src="/nil2024.jpg"
              alt="Nil, 2024"
              width={300}
              height={300}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
