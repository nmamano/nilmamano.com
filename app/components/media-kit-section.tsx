import Image from "next/image";
import Link from "next/link";

export default function MediaKitSection() {
  return (
    <section id="media-kit" className="py-12 md:py-24 lg:py-32 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
          Media Kit
        </h2>

        <div className="space-y-8">
          {/* Bio Section */}
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Bio</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-foreground">Mini</h4>
                <p className="text-muted-foreground">
                  CS PhD from UCI specializing in algorithm design. Author:
                  Beyond Cracking the Coding Interview. Former senior SWE at
                  Google.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-foreground">Short</h4>
                <p className="text-muted-foreground">
                  CS PhD from UC Irvine specializing in algorithms and data
                  structures. Co-author of Beyond Cracking the Coding Interview.
                  Former senior SWE at Google.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-foreground">Medium</h4>
                <p className="text-muted-foreground">
                  Nil Mamano is a computer scientist with a PhD from UC Irvine
                  and the co-author of Beyond Cracking the Coding Interview. His
                  PhD research focused on algorithms and data structures,
                  co-authoring nine peer-reviewed papers with contributions to
                  graph algorithms, computational geometry, computational
                  biology, and recreational mathematics. He previously worked as
                  a senior software engineer at Google, working on scaling the
                  networking infrastructure. Additionally, he developed the
                  technical curriculum for coding interview prep at Pathrise.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground mb-2">Find Nil online at:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="https://nilmamano.com"
                  className="text-primary hover:underline"
                >
                  nilmamano.com
                </Link>
              </li>
              <li>nil @ mamano . com</li>
              <li>
                <Link
                  href="https://linkedin.com/in/nilmamano"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  linkedin.com/in/nilmamano
                </Link>
              </li>
            </ul>
          </div>

          {/* Headshot Section */}
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Headshot</h3>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <div className="flex flex-col items-center">
                <Image
                  src="/nil2024.jpg"
                  alt="Nil headshot"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-md"
                  priority
                />
                <p className="mt-2 text-sm text-muted-foreground">Regular</p>
              </div>

              <div className="flex flex-col items-center">
                <Image
                  src="/nil2024_square.png"
                  alt="Nil headshot square"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                  priority
                />
                <p className="mt-2 text-sm text-muted-foreground">Square</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
