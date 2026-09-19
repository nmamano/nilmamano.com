import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LandingConcept } from "../concept";
import { SpinnerOptions } from "../spinner-options";
import { OfficeClockOptions } from "../office-clock-options";
import { DoodleOptions } from "../doodle-options";
import { CinematicConcept } from "../cinematic-concept";
import { BookConcept } from "../book-concept";
import { HelperConcept } from "../helper-concept";

export const metadata: Metadata = {
  title: "Landing page concepts | Nil Mamano",
  robots: { index: false, follow: false },
};

export default async function PreviewPage({ params }: { params: Promise<{ style: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { style } = await params;
  if (!["letter", "study", "journal", "helper", "spread", "reader", "cinematic", "doodles", "office-clocks", "spinners"].includes(style)) notFound();
  if (style === "spinners") return <SpinnerOptions />;
  if (style === "office-clocks") return <OfficeClockOptions />;
  if (style === "doodles") return <DoodleOptions />;
  if (style === "cinematic") return <CinematicConcept />;
  if (style === "spread" || style === "reader") return <BookConcept variant={style} />;
  if (style === "helper") return <HelperConcept />;
  return <LandingConcept variant={style as "letter" | "study" | "journal"} />;
}
