import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaAmazon } from "react-icons/fa6";
import { SiGooglescholar } from "react-icons/si";
import { getHighlights, type HighlightLink } from "@/app/lib/highlights";

function HighlightLinkItem({ link }: { link: HighlightLink }) {
  const iconOnly = link.icon === "github" || link.icon === "scholar";

  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      title={iconOnly ? link.label : undefined}
      aria-label={iconOnly ? link.label : undefined}
      className="inline-flex items-center gap-1.5 text-primary hover:underline"
    >
      {link.icon === "github" && <FaGithub className="h-[18px] w-[18px]" />}
      {link.icon === "scholar" && (
        <SiGooglescholar className="h-[18px] w-[18px]" />
      )}
      {link.icon === "amazon" && (
        <>
          <FaAmazon className="h-4 w-4" />
          <span>{link.label}</span>
        </>
      )}
      {!link.icon && (
        <span>
          {link.label}
          {link.external ? " ↗" : ""}
        </span>
      )}
    </Link>
  );
}

export default function HighlightsSection() {
  const highlights = getHighlights();

  return (
    <section id="highlights" className="py-6 md:py-10 scroll-mt-16">
      <div className="max-w-3xl mx-auto divide-y divide-border">
        {highlights.map((h) => {
          const primary = h.links[0];
          const isSvg = h.image.endsWith(".svg");
          return (
            <div
              key={h.id}
              className="py-6 first:pt-0 flex flex-col sm:flex-row gap-4 sm:gap-6"
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
                  <Image
                    src={h.image}
                    alt={h.statement}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-contain p-2"
                  />
                </div>
              </Link>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  {h.statement}
                </h2>
                <p className="mt-2 text-muted-foreground">{h.blurb}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                  {h.links.map((l) => (
                    <HighlightLinkItem key={l.href} link={l} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
