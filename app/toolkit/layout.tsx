import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOOLKIT-X | A new way to do coding interview prep",
  description:
    "The essential DSA tools and techniques for interviews - with problems from Beyond Cracking the Coding Interview.",
  openGraph: {
    title: "TOOLKIT-X | A new way to do coding interview prep",
    description:
      "The essential DSA tools and techniques for interviews - with problems from Beyond Cracking the Coding Interview.",
    url: "https://nilmamano.com/toolkit",
    siteName: "Toolkit-X",
    images: [
      {
        url: "/toolkit/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "TOOLKIT-X - A new way to do coding interview prep",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOOLKIT-X | A new way to do coding interview prep",
    description:
      "The essential DSA tools and techniques for interviews - with problems from Beyond Cracking the Coding Interview.",
    images: ["/toolkit/thumbnail.png"],
  },
};

export default function ToolkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
