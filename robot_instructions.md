# Developer Portfolio

A modern, responsive developer portfolio built with Next.js, React, and Tailwind CSS. This template provides a clean, professional layout to showcase your projects, skills, contact information, and blog posts.

## Features

Modern, responsive design
Light/dark mode support
Mobile-friendly layout
Modular component structure
Contact form with server actions
Easily customizable
Blog with MDX support
Image optimization with Next.js Image

Tech Stack
Framework: Next.js 14 (App Router)
UI: React, Tailwind CSS, shadcn/ui components
Icons: Lucide React
Styling: Tailwind CSS with CSS variables for theming
Form Handling: React Hook Form with Server Actions
Content: MDX for blog posts with custom components
Date Formatting: date-fns
Typography: Tailwind Typography plugin for rich text formatting

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- bun (or npm, yarn, or pnpm)

### Installation

1. Clone the repository:

2. Install dependencies:

```shellscript
bun install
```

3. Start the development server:

```shellscript
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```plaintext
├── app/
│   ├── actions.ts                # Server actions for form handling
│   ├── blog/                     # Blog-related pages
│   │   ├── page.tsx              # Blog index page
│   │   ├── [slug]/               # Dynamic routing for blog posts
│   │   └── layout.tsx            # Blog layout (optional)
│   ├── components/               # Page-specific components
│   │   ├── about-section.tsx     # About section component
│   │   ├── contact-form.tsx      # Contact form component
│   │   ├── personal-section.tsx  # Personal section component
│   │   ├── projects-section.tsx  # Projects section component
│   │   ├── research-section.tsx  # Research section component
│   │   ├── media-kit-section.tsx # Media kit section component
│   │   └── site-header.tsx       # Site header with navigation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main page component
├── blog/                         # Blog content files in MDX format
│   ├── first-post.md             # Example blog post
│   └── heapify-analysis.mdx      # Blog post with MDX features
├── components/                   # Shared components
│   ├── MdxComponents.tsx         # Custom components for MDX content
│   ├── theme-provider.tsx        # Theme provider component
│   ├── theme-toggle.tsx          # Theme toggle component
│   └── ui/                       # UI components from shadcn/ui
├── lib/
│   ├── blog.ts                   # Blog utility functions
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
│   ├── blog/                     # Blog-related images and assets
│   │   └── heapify-analysis/     # Images for specific blog posts
│   └── projects/                 # Project images
├── tailwind.config.ts            # Customize the theme
├── postcss.config.mjs            #
└── next.config.mjs               # Next.js configuration with MDX setup
```

## Customization

Projects
Modify the ProjectsSection component to showcase your own projects.

Research
Update the ResearchSection component with your publications and research work.

Blog Posts
Create new blog posts by adding .mdx files to the blog/ directory. Each post should include frontmatter with:

```
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief excerpt of your blog post"
coverImage: "/blog/your-post-slug/cover-image.png"
---
```

Images for blog posts should be placed in /public/blog/your-post-slug/.

log Custom Components
The blog supports custom MDX components like BlogImage for better image display:

```
<BlogImage
  src="/blog/your-post-slug/image.png"
  alt="Image description"
  width="60%"
/>
```

## Deployment

This portfolio is ready to be deployed on Vercel:

https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fdeveloper-portfolio

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Robot Guide for Portfolio Codebase

This guide is designed to help language models (LLMs) understand and work with this portfolio codebase. It provides detailed information about the structure, components, and patterns used in the project.

## Codebase Architecture

This is a Next.js 14 application using the App Router pattern. The key architectural elements are:

1. **App Router Structure**: Uses the newer Next.js file-based routing system with `app/` directory
2. **Server Components**: Most components are React Server Components by default
3. **Client Components**: Components with interactivity are marked with `"use client"` directive
4. **Server Actions**: Form submissions use Next.js Server Actions (in `app/actions.ts`)
5. **shadcn/ui Components**: UI components from shadcn/ui library (in `components/ui/`)

## File Purpose Map

| File                            | Purpose                   | Client/Server    | Key Functions                                               |
| ------------------------------- | ------------------------- | ---------------- | ----------------------------------------------------------- |
| `app/page.tsx`                  | Main portfolio page       | Server Component | Renders all sections (About, Projects, Tech Stack, Contact) |
| `app/layout.tsx`                | Root layout with metadata | Server Component | Sets up document structure, fonts, and ThemeProvider        |
| `components/theme-provider.tsx` | Theme context             | Client Component | Provides theme context using next-themes                    |
| `components/theme-toggle.tsx`   | Theme switcher            | Client Component | Button to toggle between light/dark modes                   |

## Common Modification Patterns

### Adding a New Page

To add a new page:

1. Create a new file in the `app` directory (e.g., `app/about/page.tsx`)
2. Update the navigation links in `app/page.tsx`

## Styling Approach

This project uses:

1. **Tailwind CSS**: For utility-based styling
2. **shadcn/ui**: For pre-built components with consistent styling
3. **CSS Variables**: For theming (light/dark mode)

Key Tailwind classes to know:

- Layout: `container`, `flex`, `grid`, `gap-*`
- Spacing: `p-*`, `m-*`, `py-*`, `px-*`
- Responsive: `md:*`, `lg:*` (mobile-first approach)
- Theme-aware: `bg-background`, `text-foreground`, `border-border`

## Theme System

The theme system uses:

1. `next-themes` for theme management
2. CSS variables for theme-aware styling
3. `ThemeProvider` to provide theme context
4. `ThemeToggle` component to switch themes

## Common Extension Points

1. **Blog Section**: Add a blog with MDX files in `app/blog/`
2. **Project Details Pages**: Create dynamic routes at `app/projects/[slug]/page.tsx`
3. **Analytics**: Add analytics tracking

## Troubleshooting Common Issues

1. **Server/Client Component Errors**: Ensure interactive components use `"use client"` directive
2. **Image Optimization**: All images should use Next.js `Image` component with proper dimensions
3. **Theme Flickering**: Use `suppressHydrationWarning` on the html element (already implemented)

## Best Practices When Modifying

1. Maintain the component structure for consistency
2. Use TypeScript interfaces for component props
3. Keep server components as the default, only use client components when needed
4. Follow the existing naming conventions (kebab-case for files, PascalCase for components)
5. Leverage the existing UI components from shadcn/ui when possible
