import Link from "next/link";
import type { Metadata } from "next";

const description = "Domains I own and what each one hosts.";

export const metadata: Metadata = {
  title: "Domains | Nil Mamano",
  description,
  openGraph: {
    title: "Domains | Nil Mamano",
    description,
    url: "https://nilmamano.com/domains",
    siteName: "Nil Mamano",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Domains | Nil Mamano",
    description,
    creator: "@Nil053",
  },
};

const domains = [
  { domain: "isomux.com", about: "Isomux, agents that act like coworkers." },
  { domain: "isomux.app", about: "Hosted Isomux, a 24/7 office for your agents." },
  { domain: "nilmamano.com", about: "This site." },
  {
    domain: "bigOspeedrun.com",
    about: "Big O Speedrun, improved algorithmic bounds for classic problems.",
  },
  { domain: "wallgame.io", about: "Wall Game, an online strategy board game." },
  {
    domain: "dsatoolkit.com",
    about:
      "DS&A toolkit, reusable techniques for coding interviews, with problems from Beyond Cracking the Coding Interview.",
  },
  { domain: "wallwars.net", about: "WallWars, the original version of the Wall Game." },
  { domain: "mamano.com", about: "Unused." },
];

export default function DomainsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-6 md:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl mb-4 text-center">
            Domains
          </h1>
          <p className="text-center text-muted-foreground mb-10">{description}</p>

          <ul className="divide-y rounded-lg bg-card card-border shadow-sm">
            {domains.map(({ domain, about }) => (
              <li key={domain}>
                <Link
                  href={`https://${domain.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-muted/50"
                >
                  <span className="flex items-center gap-1 font-medium text-foreground group-hover:text-primary transition-colors">
                    {domain}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted-foreground">{about}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
