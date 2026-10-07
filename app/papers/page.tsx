import { Metadata } from "next";
import PaperList from "../components/paper-list";

export const metadata: Metadata = {
  title: "Papers",
  description: "Research papers by Nil Mamano.",
  openGraph: {
    title: "Papers — Nil Mamano",
    description: "Research papers by Nil Mamano.",
    url: "https://nilmamano.com/papers",
  },
};

export default function PapersPage() {
  return <PaperList />;
}
