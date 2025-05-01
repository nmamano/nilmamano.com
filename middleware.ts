import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the URL ends with .html
  if (url.pathname.endsWith(".html")) {
    // Remove .html from the pathname
    const newPathname = url.pathname.replace(/\.html$/, "");

    // Create a new URL with the modified pathname
    const newUrl = new URL(newPathname, url.origin);

    // Preserve query parameters
    newUrl.search = url.search;

    // Redirect to the new URL
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: "/blog/:path*",
};
