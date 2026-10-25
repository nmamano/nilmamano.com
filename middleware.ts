import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the URL ends with .html
  if (url.pathname.endsWith(".html")) {
    // Remove .html from the pathname
    const newPathname = url.pathname.replace(/\.html$/, "");

    // Redirect with a relative Location, query kept. Self-hosted, url.origin is the
    // internal server (localhost:3000), not the public host.
    return new NextResponse(null, {
      status: 307,
      headers: { Location: newPathname + url.search },
    });
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: "/blog/:path*",
};
