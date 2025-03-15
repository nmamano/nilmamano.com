# Developer Portfolio Template

A modern, responsive developer portfolio built with Next.js, React, and Tailwind CSS. This template provides a clean, professional layout to showcase your projects, skills, and contact information.

## Features

- 🎨 Modern, responsive design
- 🌓 Light/dark mode support
- 📱 Mobile-friendly layout
- 🧩 Modular component structure
- 📝 Contact form with server actions
- 🔧 Easily customizable

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React, Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Server Actions

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/developer-portfolio.git
cd developer-portfolio
```

2. Install dependencies:

```shellscript
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```plaintext
├── app/
│   ├── actions.ts           # Server actions for form handling
│   ├── components/          # Page-specific components
│   │   ├── contact-form.tsx # Contact form component
│   │   ├── project-card.tsx # Project card component
│   │   └── tech-stack.tsx   # Tech stack component
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/              # Shared components
│   ├── theme-provider.tsx   # Theme provider component
│   ├── theme-toggle.tsx     # Theme toggle component
│   └── ui/                  # UI components from shadcn/ui
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Customization

### Personal Information

Edit the content in `app/page.tsx` to update your name, bio, and social links.

### Projects

Modify the `ProjectCard` components in `app/page.tsx` to showcase your own projects:

```javascriptreact
<ProjectCard
  title="Your Project Title"
  description="Description of your project"
  image="/your-project-image.jpg" // Add images to the public folder
  link="https://github.com/yourusername/your-project"
  tags={["React", "Node.js", "Your Technologies"]}
/>
```

### Tech Stack

Update the technologies array in `app/components/tech-stack.tsx` to reflect your skills.

### Contact Form

The contact form in `app/components/contact-form.tsx` is set up to use Next.js Server Actions. Modify the `submitContactForm` function in `app/actions.ts` to handle form submissions according to your needs (e.g., sending emails, saving to a database).

### Styling

This project uses Tailwind CSS for styling. You can customize the theme by editing the `tailwind.config.ts` file.

## Deployment

This portfolio template is ready to be deployed on Vercel:

https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fdeveloper-portfolio

## License

This project is licensed under the MIT License - see the LICENSE file for details.

````plaintext

```md project="Portfolio" file="robot_guide.md" type="markdown"
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

| File | Purpose | Client/Server | Key Functions |
|------|---------|---------------|---------------|
| `app/page.tsx` | Main portfolio page | Server Component | Renders all sections (About, Projects, Tech Stack, Contact) |
| `app/layout.tsx` | Root layout with metadata | Server Component | Sets up document structure, fonts, and ThemeProvider |
| `app/actions.ts` | Server actions | Server-only | `submitContactForm`: Handles contact form submissions |
| `app/components/contact-form.tsx` | Contact form | Client Component | Form with validation and submission handling |
| `app/components/project-card.tsx` | Project display | Server Component | Displays individual project with image, description, and tags |
| `app/components/tech-stack.tsx` | Skills display | Server Component | Displays technology skills grouped by category |
| `components/theme-provider.tsx` | Theme context | Client Component | Provides theme context using next-themes |
| `components/theme-toggle.tsx` | Theme switcher | Client Component | Button to toggle between light/dark modes |

## Component Relationships

````

Layout
└── Page
├── Header (Navigation)
├── About Section
├── Projects Section
│ └── ProjectCard (multiple)
├── Tech Stack Section
│ └── TechStack
└── Contact Section
└── ContactForm

````plaintext

## Data Structures

### ProjectCard Props
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}
````

### Tech Stack Data

```typescript
const technologies = [
  {
    category: string;
    skills: string[];
  }
]
```

## Common Modification Patterns

### Adding a New Project

To add a new project, add a new `ProjectCard` component in `app/page.tsx`:

```javascriptreact
<ProjectCard
  title="New Project Name"
  description="Description of the new project"
  image="/new-project-image.jpg"
  link="https://github.com/username/new-project"
  tags={["Technology1", "Technology2"]}
/>
```

### Adding a New Skill

To add a new skill, modify the `technologies` array in `app/components/tech-stack.tsx`:

```javascript
// Find the appropriate category and add to the skills array
{
  category: "Frontend",
  skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux", "GraphQL", "New Skill"],
}
```

### Modifying the Contact Form

To change the contact form fields, update both:

1. The form JSX in `app/components/contact-form.tsx`
2. The form processing in `app/actions.ts`

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

## Server Actions

The contact form uses a server action defined in `app/actions.ts`. The current implementation:

1. Simulates a delay (1 second)
2. Extracts form data
3. Logs the submission (placeholder for actual processing)
4. Returns a success message

To implement actual functionality, modify the `submitContactForm` function to:

- Send an email
- Store in a database
- Connect to a CRM
- etc.

## Theme System

The theme system uses:

1. `next-themes` for theme management
2. CSS variables for theme-aware styling
3. `ThemeProvider` to provide theme context
4. `ThemeToggle` component to switch themes

## Common Extension Points

1. **Blog Section**: Add a blog with MDX files in `app/blog/`
2. **Project Details Pages**: Create dynamic routes at `app/projects/[slug]/page.tsx`
3. **Authentication**: Add authentication for a dashboard or admin area
4. **CMS Integration**: Connect to a headless CMS for content management
5. **Analytics**: Add analytics tracking

## Troubleshooting Common Issues

1. **Server/Client Component Errors**: Ensure interactive components use `"use client"` directive
2. **Image Optimization**: All images should use Next.js `Image` component with proper dimensions
3. **Form Submissions**: Server actions require proper FormData handling
4. **Theme Flickering**: Use `suppressHydrationWarning` on the html element (already implemented)

## Best Practices When Modifying

1. Maintain the component structure for consistency
2. Use TypeScript interfaces for component props
3. Keep server components as the default, only use client components when needed
4. Follow the existing naming conventions (kebab-case for files, PascalCase for components)
5. Leverage the existing UI components from shadcn/ui when possible

```plaintext

These files provide comprehensive documentation for both human developers and language models to understand and work with the portfolio codebase. The README.md offers a standard project overview with setup instructions, while the robot_guide.md provides detailed technical information specifically designed to help LLMs understand the structure and patterns of the codebase.
```
