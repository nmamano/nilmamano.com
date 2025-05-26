import Link from "next/link";
import Image from "next/image";

export default function PersonalSection() {
  return (
    <section id="personal" className="py-6 md:py-12 lg:py-16 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
          Personal
        </h2>

        <div className="space-y-4 text-muted-foreground">
          <p>
            On my free time, I like to play guitar. Here are{" "}
            <Link
              href="https://www.youtube.com/playlist?list=PLChBXfQcPfZiEcBoVEE-PXinxyWO6_3GO"
              className="text-primary hover:underline"
              target="_blank"
            >
              a few songs
            </Link>{" "}
            I've written (in phone quality...).
          </p>

          <p>
            During my time in southern California, I started hiking and going on
            motorcycle trips. Here are{" "}
            <Link
              href="https://www.instagram.com/nil_in_the_desert/"
              className="text-primary hover:underline"
              target="_blank"
            >
              some pictures
            </Link>
            .
          </p>

          <p>
            Of course, I also like playing WallWars with friends, the game I'm{" "}
            <Link
              href="/blog/wall-game-intro"
              className="text-primary hover:underline"
            >
              building in public
            </Link>
            .
          </p>

          <div className="h-6"></div>

          <div className="flex justify-center gap-16 flex-col sm:flex-row">
            <Image
              src="/personal/deathvalley.jpg"
              alt="Death Valley"
              width={400}
              height={400}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/personal/cat.jpg"
              alt="Cat"
              width={400}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
