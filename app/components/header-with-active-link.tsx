"use client";

import { SiteHeader } from "@/app/components/site-header";
import { usePathname } from "next/navigation";

export function HeaderWithActiveLink() {
  const pathname = usePathname();

  let currentRoute;
  if (pathname.startsWith("/blog")) {
    currentRoute = "blog";
  } else if (pathname === "/") {
    // On home page, we can highlight based on hash if needed
    // This would require client-side JS to track hash changes
    currentRoute = undefined;
  }

  return <SiteHeader currentRoute={currentRoute} />;
}
