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

// Get all blog posts with metadata (excluding WIP posts)
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

  // Sort posts by date and filter out WIP posts
  return allPostsData
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    })
    .filter(
      (post) =>
        !post.categories?.some((category) => category.toLowerCase() === "wip")
    );
}

// Get posts filtered by category
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.categories?.some(
      (postCategory) => postCategory.toLowerCase() === category.toLowerCase()
    )
  );
}

// Get the latest blog post
export function getLatestPost(): BlogPost | null {
  const allPosts = getAllPosts();
  return allPosts[0] || null; // getAllPosts already filters WIP and sorts by date
}

// Get a specific post by slug (including WIP posts for direct access)
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the slug and content
    const post = {
      slug,
      content,
      ...data,
    } as BlogPost;

    return post;
  } catch (error) {
    console.error(`Error reading post: ${slug}`, error);
    return null;
  }
}

// Get all available post slugs (including WIP posts for static generation)
export function getAllPostSlugs(): string[] {
  // Read all .mdx files directly to include WIP posts for static generation
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

// Posts without their content, for lists that run in the browser (the blog
// list, the footer's random picks), so pages do not ship every post's text.
export function getPostSummaries(excludeSlug?: string): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.slug !== excludeSlug)
    .map(({ content, ...post }) => ({ ...post, content: "" }));
}
