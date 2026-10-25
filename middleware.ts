import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the URL ends with .html
  if (url.pathname.endsWith(".html")) {
    // Remove .html from the pathname
    const newPathname = url.pathname.replace(/\.html$/, "");

    // Build the target on the public host, query kept. Self-hosted, url.origin is the
    // internal server (localhost:3000); Caddy passes the public Host header.
    const host = request.headers.get("host") ?? url.host;
    const newUrl = new URL(newPathname + url.search, `https://${host}`);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: "/blog/:path*",
};
