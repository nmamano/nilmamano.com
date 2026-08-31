import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead as OriginalTableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TocElement from "./TableOfContents";
import { parseCaption } from "./parse-caption";
import { BlogCarousel } from "./BlogCarousel";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: string;
  centered?: boolean;
  needsBackground?: boolean;
  caption?: string;
}

export function BlogImage({
  src,
  alt,
  width = "100%",
  centered = true,
  needsBackground = false,
  caption,
}: BlogImageProps) {
  // Check if the image is a GIF
  const isGif = src.toLowerCase().endsWith(".gif");

  // Convert width to number for Next.js Image if possible
  // Next.js Image needs numeric width/height
  const numericWidth = width.endsWith("%") ? undefined : parseInt(width);

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    backgroundColor: needsBackground ? "white" : "transparent",
    padding: needsBackground ? "16px" : "0",
    borderRadius: needsBackground ? "8px" : "0",
  };

  return (
    <div
      className="blog-media"
      style={{
        display: centered ? "flex" : "block",
        justifyContent: centered ? "center" : "flex-start",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
      }}
    >
      {isGif ? (
        // Use unoptimized for GIFs to preserve animation
        <NextImage
          src={src}
          alt={alt}
          width={numericWidth || 1000} // Default size, will be constrained by CSS
          height={numericWidth ? numericWidth * 0.75 : 750} // Approximate aspect ratio
          style={{
            ...imageStyle,
            width: width,
          }}
          className="rounded-md"
          unoptimized={true} // Key prop for animated GIFs
        />
      ) : (
        // Regular image
        <img
          src={src}
          alt={alt}
          style={{
            width,
            ...imageStyle,
          }}
          className="rounded-md"
        />
      )}
      {caption && (
        <figcaption
          className="text-base font-medium text-gray-700 dark:text-gray-300"
          style={{
            maxWidth: width === "100%" ? "100%" : width,
            textAlign: centered ? "center" : "left",
            marginTop: "0.6rem",
          }}
        >
          {parseCaption(caption)}
        </figcaption>
      )}
    </div>
  );
}

interface BlogVideoProps {
  src: string;
  width?: string;
  centered?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  caption?: string;
}

export function BlogVideo({
  src,
  width = "100%",
  centered = true,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = true,
  caption,
}: BlogVideoProps) {
  return (
    <div
      className="blog-media"
      style={{
        display: centered ? "flex" : "block",
        justifyContent: centered ? "center" : "flex-start",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
      }}
    >
      <video
        src={src}
        style={{
          width,
          maxWidth: "100%",
          height: "auto",
        }}
        className="rounded-md"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
      />
      {caption && (
        <figcaption
          className="text-base font-medium text-gray-700 dark:text-gray-300"
          style={{
            maxWidth: width === "100%" ? "100%" : width,
            textAlign: centered ? "center" : "left",
            marginTop: "0rem",
          }}
        >
          {parseCaption(caption)}
        </figcaption>
      )}
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

interface BlogTableProps {
  children: React.ReactNode;
  caption?: string;
  centered?: boolean;
}

export function BlogTable({
  children,
  caption,
  centered = false,
}: BlogTableProps) {
  return (
    <div
      className="my-6"
      style={{
        display: centered ? "flex" : "block",
        justifyContent: centered ? "center" : "flex-start",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
      }}
    >
      <Table>{children}</Table>
      {caption && (
        <figcaption
          className="text-base font-medium mt-2 text-gray-700 dark:text-gray-300"
          style={{
            textAlign: centered ? "center" : "left",
          }}
        >
          {parseCaption(caption)}
        </figcaption>
      )}
    </div>
  );
}

interface ProblemProps {
  number: number;
  title: string;
  link: string;
}

export function Problem({ number, title, link }: ProblemProps) {
  return (
    <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 px-4 py-3 my-6 rounded-r-md">
      <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 m-0">
        Problem {number}: {title}
      </h4>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium no-underline hover:underline"
      >
        Try it yourself →
      </a>
    </div>
  );
}

interface SolutionProps {
  number: number;
  title: string;
  link: string;
}

export function Solution({ number, title, link }: SolutionProps) {
  return (
    <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 px-4 py-3 my-6 rounded-r-md">
      <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 m-0">
        Solution {number}: {title}
      </h4>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium no-underline hover:underline"
      >
        Full code & other languages →
      </a>
    </div>
  );
}

// Simple markdown parser for captions

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Define all your MDX components here
const components = {
  BlogImage,
  BlogVideo,
  BlogCarousel,
  BlogTable,
  Callout,
  Problem,
  Solution,
  Toc: TocElement,
  // Table components
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead: (props: any) => (
    <OriginalTableHead
      className="p-4 h-auto align-middle"
      style={{ verticalAlign: "middle", ...props.style }}
      {...props}
    />
  ),
  TableHeader,
  TableRow,
  // Map markdown table elements to our styled components
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: (props: any) => (
    <OriginalTableHead
      className="p-4 h-auto align-middle"
      style={{ verticalAlign: "middle", ...props.style }}
      {...props}
    />
  ),
  td: TableCell,
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
  h4: ({ children, ...props }: any) => {
    const id = slugify(children as string);
    return (
      <h4 id={id} {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }: any) => {
    const id = slugify(children as string);
    return (
      <h5 id={id} {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }: any) => {
    const id = slugify(children as string);
    return (
      <h6 id={id} {...props}>
        {children}
      </h6>
    );
  },

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

    // Handle internal page links. These open in a new tab too, so that reading
    // a post is never interrupted by following a reference.
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} target="_blank" rel="noopener" {...props}>
          {props.children}
        </Link>
      );
    }

    // Handle external links
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
};

export default components;
