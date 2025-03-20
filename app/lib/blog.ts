import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  coverImage: string; // Must be 1200x630px because it is used as OG image
  content: string;
  categories?: string[];
  [key: string]: any; // For any additional frontmatter fields
}

// Get all blog posts with metadata
export function getAllPosts(): BlogPost[] {
  // Get all files in the posts directory
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      // Remove ".md" from file name to get the slug
      const slug = fileName.replace(/\.mdx$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Validate that coverImage exists
      if (!data.coverImage) {
        console.warn(`Warning: Blog post ${slug} is missing a coverImage`);
      }

      // Combine the data with the slug
      return {
        slug,
        content,
        ...data,
      } as BlogPost;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get a specific post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the slug and content
    return {
      slug,
      content,
      ...data,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading post: ${slug}`, error);
    return null;
  }
}

// Get all available post slugs
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
