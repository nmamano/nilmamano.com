"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { HeaderWithActiveLink } from "@/app/components/header-with-active-link";
import { SiteFooter } from "@/app/components/site-footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/landing-preview/")) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWithActiveLink />
      <main className="container mx-auto max-w-7xl px-4 md:px-6 flex-grow">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
