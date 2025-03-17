import Link from "next/link";
import Image from "next/image";

export default function PersonalSection() {
  return (
    <section id="personal" className="py-12 md:py-24 lg:py-32 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
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
            During my time in southern California, I started hiking. Here are{" "}
            <Link
              href="https://www.instagram.com/nil_in_the_desert/"
              className="text-primary hover:underline"
              target="_blank"
            >
              some pictures
            </Link>{" "}
            from hikes.
          </p>

          <p>
            Of course, I also like playing WallWars with friends, the game I'm
            developing at{" "}
            <Link
              href="https://wallwars.net"
              className="text-primary hover:underline"
              target="_blank"
            >
              wallwars.net
            </Link>
            .
          </p>

          <div className="mt-8 flex justify-center">
            <Image
              src="/deathvalley.jpg"
              alt="Playing guitar in Death Valley"
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
