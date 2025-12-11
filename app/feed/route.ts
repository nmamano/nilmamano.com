import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect("https://nilmamano.com/rss.xml", 308);
}

