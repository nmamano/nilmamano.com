import React from "react";
import Link from "next/link";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: string;
  centered?: boolean;
}

export function BlogImage({
  src,
  alt,
  width = "100%",
  centered = true,
}: BlogImageProps) {
  return (
    <div
      style={{
        display: centered ? "flex" : "block",
        justifyContent: centered ? "center" : "flex-start",
        margin: "1.5rem 0",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width, maxWidth: "100%" }}
        className="rounded-md"
      />
    </div>
  );
}

// Define all your MDX components here
const components = {
  BlogImage,
  // You can add more custom components here
  a: (props: any) => {
    const href = props.href;
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
};

export default components;
