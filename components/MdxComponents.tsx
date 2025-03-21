import React from "react";
import Link from "next/link";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: string;
  centered?: boolean;
  needsBackground?: boolean;
}

export function BlogImage({
  src,
  alt,
  width = "100%",
  centered = true,
  needsBackground = false,
}: BlogImageProps) {
  // Check if the image is a PNG
  const isPng = src.toLowerCase().endsWith(".png");

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
        style={{
          width,
          maxWidth: "100%",
          backgroundColor: needsBackground ? "white" : "transparent",
          padding: needsBackground ? "16px" : "0",
          borderRadius: needsBackground ? "8px" : "0",
        }}
        className="rounded-md"
      />
    </div>
  );
}

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "error";
  title?: string;
}

export function Callout({ children, type = "info", title }: CalloutProps) {
  const styles = {
    info: {
      borderColor: "#3b82f6", // blue
      backgroundColor: "rgba(59, 130, 246, 0.1)",
    },
    warning: {
      borderColor: "#f59e0b", // amber
      backgroundColor: "rgba(245, 158, 11, 0.1)",
    },
    success: {
      borderColor: "#10b981", // emerald
      backgroundColor: "rgba(16, 185, 129, 0.1)",
    },
    error: {
      borderColor: "#ef4444", // red
      backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
  };

  return (
    <div
      className="rounded-md p-4 my-6"
      style={{
        borderLeft: `4px solid ${styles[type].borderColor}`,
        backgroundColor: styles[type].backgroundColor,
      }}
    >
      {title && (
        <div
          className="font-medium mb-2"
          style={{ color: styles[type].borderColor }}
        >
          {title}
        </div>
      )}
      <div>{children}</div>
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
  Callout,
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
