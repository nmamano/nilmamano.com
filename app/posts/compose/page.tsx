import { notFound } from "next/navigation";
import Link from "next/link";
import { Composer } from "../../components/composer";

// Dev-only authoring page. In production this route 404s.
export default function ComposePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Compose</h1>
        <Link href="/posts" className="text-sm text-primary hover:underline">
          ← Feed
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Write once, save it here as the source of truth, then copy the
        platform-formatted versions to paste into X and LinkedIn.
      </p>
      <Composer />
    </div>
  );
}
