import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games | Nil Mamano",
  description:
    "Board games I've built and put online, including the Wall Game, Round-Trip Chess, Ludwig Chess, RPS Roulette, and the Drawback Analyzer.",
  openGraph: {
    title: "Games | Nil Mamano",
    description:
      "Board games I've built and put online, including the Wall Game, Round-Trip Chess, Ludwig Chess, RPS Roulette, and the Drawback Analyzer.",
    url: "https://nilmamano.com/games",
    siteName: "Nil Mamano",
    images: [
      {
        url: "/games/wall-game.png",
        width: 1200,
        height: 630,
        alt: "Games by Nil Mamano",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Games | Nil Mamano",
    description:
      "Board games I've built and put online, including the Wall Game, Round-Trip Chess, Ludwig Chess, RPS Roulette, and the Drawback Analyzer.",
    creator: "@Nil053",
    images: ["/games/wall-game.png"],
  },
};

const games = [
  {
    name: "Wall Game",
    href: "https://wallgame.io",
    domain: "wallgame.io",
    image: "/games/wall-game.png",
    alt: "Wall Game — an online strategy board game I invented, with a superhuman self-play AI",
  },
  {
    name: "Round-Trip Chess",
    href: "https://chess.nilmamano.com",
    domain: "chess.nilmamano.com",
    image: "/games/roundtrip-chess.png",
    alt: "Round-Trip Chess — a two-board chess variant where captured pieces move to the other board",
  },
  {
    name: "Ludwig Chess",
    href: "https://ludwig.nilmamano.com",
    domain: "ludwig.nilmamano.com",
    image: "/games/ludwig-chess.png",
    alt: "Ludwig Chess — standard chess with a live Stockfish evaluation bar",
  },
  {
    name: "RPS Roulette",
    href: "https://rps.nilmamano.com",
    domain: "rps.nilmamano.com",
    image: "/games/rps-roulette.png",
    alt: "RPS Roulette — Rock-Paper-Scissors where the winning rules reshuffle every round",
  },
  {
    name: "Knight's Puzzle",
    href: "https://knight.nilmamano.com",
    domain: "knight.nilmamano.com",
    image: "/games/knights-puzzle.png",
    alt: "Knight's Puzzle — a knight's-tour puzzle: hop the knight onto every square and finish on the goal",
  },
  {
    name: "Drawback Analyzer",
    href: "https://drawback.nilmamano.com",
    domain: "drawback.nilmamano.com",
    image: "/games/drawback-analyzer.png",
    alt: "Drawback Analyzer — see which Drawback Chess drawbacks each side could still have",
  },
  {
    name: "Dice Battler",
    href: "https://dice.nilmamano.com",
    domain: "dice.nilmamano.com",
    image: "/games/dice-battler.png",
    alt: "Dice Battler — a dice roguelike: roll to battle, collect power-ups, and climb",
  },
  {
    name: "WallWars",
    href: "https://wallwars.net",
    domain: "wallwars.net",
    image: "/games/wallwars.png",
    alt: "WallWars — the original version of the Wall Game",
  },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-6 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl mb-4 text-center">
            Games
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            Board games I&apos;ve built and put online. Click any card to play.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {games.map((game) => (
              <Link
                key={game.href}
                href={game.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Play ${game.name}`}
                className="group block overflow-hidden rounded-lg bg-card card-border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="overflow-hidden border-b">
                  <Image
                    src={game.image}
                    alt={game.alt}
                    width={2400}
                    height={1260}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-medium text-foreground">
                    {game.name}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {game.domain}
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
