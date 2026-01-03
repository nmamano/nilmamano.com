import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOOLKIT-X | Like a problem list, but for reusable techniques",
  description:
    "The essential DS&A tools and techniques for interviews - with problems from Beyond Cracking the Coding Interview.",
  icons: {
    icon: [
      { url: "/toolkit/favicon/favicon.ico" },
      {
        url: "/toolkit/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      { url: "/toolkit/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/toolkit/favicon/apple-touch-icon.png" }],
  },
  manifest: "/toolkit/favicon/site.webmanifest",
  openGraph: {
    title: "TOOLKIT-X | Like a problem list, but for reusable techniques",
    description:
      "The essential DS&A tools and techniques for interviews - with problems from Beyond Cracking the Coding Interview.",
    url: "https://nilmamano.com/toolkit",
    siteName: "Toolkit-X",
    images: [
      {
        url: "https://nilmamano.com/toolkit/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "TOOLKIT-X - Like a problem list, but for reusable techniques",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOOLKIT-X | Like a problem list, but for reusable techniques",
    description:
      "The essential DS&A tools and techniques for interviews - with problems from Beyond Cracking the Coding Interview.",
    images: ["https://nilmamano.com/toolkit/thumbnail.png"],
  },
};

export default function ToolkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
