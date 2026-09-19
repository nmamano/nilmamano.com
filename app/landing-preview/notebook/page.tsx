import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NotebookConcept } from "@/app/components/landing/notebook-concept";

export const metadata: Metadata = {
  title: "Landing page preview | Nil Mamano",
  robots: { index: false, follow: false },
};

export default function NotebookPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <NotebookConcept />;
}
