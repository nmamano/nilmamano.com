import { notFound } from "next/navigation";
import ReviewNotes from "../components/review-notes";

// Dev-only index of the posts in review (ops-private/review-notes/_index.md).
export default function ReviewIndex() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Posts in review</h1>
      <ReviewNotes name="_index" />
    </div>
  );
}
