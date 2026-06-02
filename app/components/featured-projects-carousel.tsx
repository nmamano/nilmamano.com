"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface LatestPost {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage: string;
}

interface FeaturedProjectsCarouselProps {
  latestPost: LatestPost | null;
}

const projects = [
  {
    id: "isomux",
    title: "Isomux: Your Agent Office",
    tagline:
      "Your agent office. Multi-device, multi-user, multi-agent collaboration with Claude Code and Codex. Free & open source, runs locally.",
    image: "/projects/isomux.png",
    href: "https://isomux.com",
    cta: "Try it",
    external: true,
  },
  {
    id: "wallgame",
    title: "Wall Game: Online Board Game with AI",
    tagline:
      "A full-stack online board game with a superhuman AlphaZero-style AI I trained from scratch via self-play.",
    image: "/projects/wallwarsgame.gif",
    href: "https://wallgame.io",
    cta: "Play now",
    external: true,
  },
  {
    id: "bctci",
    title: "Beyond Cracking the Coding Interview",
    tagline:
      "The official sequel to Cracking the Coding Interview, co-authored with Gayle McDowell et al. #1 Best Seller in Data Structures & Algorithms on Amazon.",
    image: "/projects/bctci-cover.png",
    href: "https://www.amazon.com/dp/195570600X",
    cta: "Buy on Amazon",
    external: true,
  },
  {
    id: "toolkit",
    title: "Toolkit-X: DS&A Interview Prep",
    tagline:
      "An AI-first DS&A toolkit so you can learn reusable techniques instead of memorizing problems.",
    image: "https://dsatoolkit.com/thumbnail.png",
    href: "https://dsatoolkit.com",
    cta: "Start learning",
    external: true,
  },
];

export function FeaturedProjectsCarousel({
  latestPost,
}: FeaturedProjectsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {/* BCtCI, Toolkit-X, Wall Game slides */}
          {projects.map((project) => (
            <CarouselItem key={project.id}>
              <div className="h-full p-4 md:p-6 rounded-lg card-border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <div className="md:w-1/4 flex justify-center">
                    <Link
                      href={project.href}
                      target={project.external ? "_blank" : undefined}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={200}
                        height={200}
                        className="rounded-md shadow-lg cursor-pointer"
                      />
                    </Link>
                  </div>
                  <div className="md:w-3/4 space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold">
                      {project.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {project.tagline}
                    </p>
                    <div className="pt-1">
                      <Link
                        href={project.href}
                        target={project.external ? "_blank" : undefined}
                      >
                        <Button size="sm" className="font-medium">
                          {project.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}

          {/* Blog slide with latest post */}
          {latestPost && (
            <CarouselItem>
              <div className="h-full p-4 md:p-6 rounded-lg card-border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <div className="md:w-1/4 flex justify-center">
                    <Link href={`/blog/${latestPost.slug}`}>
                      <Image
                        src={latestPost.coverImage}
                        alt={latestPost.title}
                        width={200}
                        height={200}
                        className="rounded-md shadow-lg cursor-pointer"
                        style={{ objectFit: "contain" }}
                      />
                    </Link>
                  </div>
                  <div className="md:w-3/4 space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold">
                      Latest{" "}
                      <Link
                        href="/blog"
                        className="text-primary hover:underline"
                      >
                        blog
                      </Link>{" "}
                      post
                    </h2>
                    <p className="font-semibold">{latestPost.title}</p>
                    <div className="pt-1">
                      <Link href={`/blog/${latestPost.slug}`}>
                        <Button size="sm" className="font-medium">
                          Read more
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12" />
        <CarouselNext className="hidden sm:flex -right-4 md:-right-12" />
      </Carousel>

      {/* Dot indicators */}
      {count > 0 && (
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === current
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
