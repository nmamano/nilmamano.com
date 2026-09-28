import { NotebookConcept } from "./components/landing/notebook-concept";
import { getAllPosts } from "./lib/blog";

export default function Page() {
  const latestPosts = getAllPosts().slice(0, 4).map(({ slug, title, date }) => ({
    slug,
    title,
    date: new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }),
  }));
  return <NotebookConcept latestPosts={latestPosts} />;
}
