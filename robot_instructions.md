# Developer Portfolio - Robot Guide

This guide provides essential context for working with this Next.js portfolio codebase.

## Key Architecture Context

- **Framework**: Next.js 14 with App Router
- **Package Manager**: Use `bun` (not npm/yarn)
- **UI Components**: shadcn/ui with Tailwind CSS
- **Email Service**: Contact form uses Resend API
- **Validation**: Zod for form validation
- **Content**: Blog posts use MDX format

## Critical Environment Variables

```env
RESEND_API_KEY=your_resend_api_key_here (given to you by Resend)
CONTACT_EMAIL=your.email@example.com (the one you used to sign up for Resend)
```

## File Structure Context

```
├── app/
│   ├── actions.ts                # Server actions for contact form with Resend
│   ├── blog/                     # Blog pages
│   │   ├── page.tsx              # Blog index page
│   │   ├── [slug]/page.tsx       # Individual blog post pages
│   │   └── category/[category]/page.tsx # Blog category pages
│   ├── components/               # Page-specific components
│   │   ├── about-section.tsx     # About/intro section
│   │   ├── contact-form.tsx      # Contact form with validation
│   │   ├── media-kit-header.tsx  # Media kit section
│   │   ├── personal-section.tsx  # Personal interests section
│   │   ├── projects-section.tsx  # Projects showcase
│   │   ├── selected-publications.tsx # Research publications
│   │   ├── site-header.tsx       # Navigation with Contact link
│   │   └── blog-footer.tsx       # Blog post footer
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main homepage with all sections
│   └── research/page.tsx         # Research page
├── blog/                         # MDX blog post content files
│   ├── *.mdx                     # Individual blog posts
├── components/                   # Shared/reusable components
│   ├── MdxComponents.tsx         # Custom MDX components
│   ├── theme-provider.tsx        # Theme context provider
│   ├── theme-toggle.tsx          # Dark/light mode toggle
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx            # Button component
│       ├── card.tsx              # Card component
│       ├── input.tsx             # Input component
│       └── [other-ui].tsx        # Other UI components
├── lib/                          # Utility functions
│   ├── blog.ts                   # Blog post utilities
│   ├── date-utils.ts             # Date formatting
│   └── utils.ts                  # General utilities
├── public/                       # Static assets
│   ├── blog/                     # Blog post images
│   └── projects/                 # Project images
├── .env.local                    # Environment variables (not in git)
├── middleware.ts                 # Next.js middleware
├── next.config.mjs               # Next.js configuration
└── tailwind.config.ts            # Tailwind CSS configuration
```

## Component Architecture

| Component          | Type              | Key Context                                |
| ------------------ | ----------------- | ------------------------------------------ |
| `app/actions.ts`   | Server Action     | Handles contact form with Resend email     |
| `contact-form.tsx` | Client Component  | Uses useTransition, Zod validation         |
| `site-header.tsx`  | Server Component  | Navigation includes #contact anchor        |
| Most others        | Server Components | Default, only use "use client" when needed |

## Development Commands

```bash
bun install          # Install dependencies
bun dev             # Start development server
```

## Contact Form Implementation Notes

- Uses Resend API for email delivery
- Form validation with Zod schema in `app/actions.ts`
- Email template is HTML string in server action
- Environment variables keep email address out of source code
- Form positioned between Personal and Media Kit sections

## Common Patterns

- **Server Components**: Default, most components are server-side
- **Client Components**: Only for interactivity (forms, theme toggle)
- **Styling**: Tailwind utility classes, theme-aware CSS variables
- **Navigation**: Anchor links to page sections (e.g., `/#contact`)

## Troubleshooting Context

- **Contact form issues**: Check environment variables and Resend API key
- **Build errors**: Ensure "use client" directive on interactive components
