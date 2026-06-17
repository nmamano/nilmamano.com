import Link from "next/link";
import Image from "next/image";
import { getHighlights } from "@/app/lib/highlights";
import { HIGHLIGHT_BODIES } from "@/app/lib/highlight-bodies";

export default function HighlightsSection() {
  const highlights = getHighlights();

  return (
    <section id="highlights" className="py-6 md:py-10 scroll-mt-16">
      <div className="max-w-3xl mx-auto divide-y divide-border">
        {highlights.map((h) => {
          const primary = h.links[0];
          const isSvg = h.image.endsWith(".svg");
          const isVideo = h.image.endsWith(".mp4");
          return (
            <div
              key={h.id}
              id={h.id}
              className="py-6 first:pt-0 flex flex-col sm:flex-row gap-4 sm:gap-6 scroll-mt-20"
            >
              <Link
                href={primary.href}
                target={primary.external ? "_blank" : undefined}
                rel={primary.external ? "noopener noreferrer" : undefined}
                className="shrink-0"
              >
                <div
                  className={`relative w-full sm:w-44 h-32 sm:h-28 overflow-hidden rounded-lg border ${
                    isSvg ? "bg-white" : "bg-muted"
                  }`}
                >
                  {isVideo ? (
                    <video
                      src={h.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-contain p-2"
                    />
                  ) : (
                    <Image
                      src={h.image}
                      alt={h.statement}
                      fill
                      sizes="(max-width: 640px) 100vw, 176px"
                      className="object-contain p-2"
                    />
                  )}
                </div>
              </Link>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  {h.statement}
                </h2>
                <p className="mt-2 text-muted-foreground [&_a:hover]:underline [&_a]:font-medium [&_a]:text-primary">
                  {HIGHLIGHT_BODIES[h.id] ?? h.blurb}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
