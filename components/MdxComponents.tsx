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

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Define all your MDX components here
const components = {
  BlogImage,
  // Custom heading components that add IDs
  h1: ({ children, ...props }: any) => {
    const id = slugify(children as string);
    return (
      <h1 id={id} {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: any) => {
    const id = slugify(children as string);
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const id = slugify(children as string);
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },
  // ... and so on for h4, h5, h6 if needed

  // You can add more custom components here
  a: (props: any) => {
    const href = props.href;

    // Handle anchor links (like #proof)
    if (href && href.startsWith("#")) {
      // Regular anchor tag without target="_blank"
      return (
        <a href={href} {...props}>
          {props.children}
        </a>
      );
    }

    // Handle internal page links
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }

    // Handle external links
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
};

export default components;
