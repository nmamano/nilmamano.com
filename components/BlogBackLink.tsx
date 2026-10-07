"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const linkClass = "text-primary hover:underline inline-flex items-center";

// Reads ?category= on the client, so the post page itself stays static.
function CategoryBackLink() {
  const category = useSearchParams().get("category");
  const href = category ? `/blog/category/${category}` : "/blog";
  return (
    <Link href={href} className={linkClass}>
      ← Back to all posts
    </Link>
  );
}

export default function BlogBackLink() {
  return (
    <Suspense
      fallback={
        <Link href="/blog" className={linkClass}>
          ← Back to all posts
        </Link>
      }
    >
      <CategoryBackLink />
    </Suspense>
  );
}
