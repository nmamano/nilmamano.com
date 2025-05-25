import Link from "next/link";

export default function MediaKitHeader() {
  return (
    <section id="media-kit" className="py-6 md:py-12 lg:py-16 scroll-mt-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Media Kit
        </h2>
        <p className="text-muted-foreground">
          Are you looking for a short bio? See the{" "}
          <Link href="/media-kit" className="text-primary hover:underline">
            media kit page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
