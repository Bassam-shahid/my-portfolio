# Data Model: Portfolio Content Entities

**Feature**: 001-portfolio-frontend
**Date**: 2026-02-26
**Purpose**: Define static content entities (frontend-only, no backend)

---

## Overview

All content is **static** and stored in TypeScript files. No database, no API calls, no dynamic fetching at this stage. Content is defined in `src/data/` directory and imported directly into components.

---

## Entity: Project

**File**: `src/data/projects.ts`

```typescript
interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}
```

**Fields**:
- `id`: Unique identifier (slug format: `ai-agent-platform`, `ecommerce-dashboard`)
- `title`: Project name (max 60 characters)
- `description`: Brief description (2-3 sentences, max 200 characters)
- `imageUrl`: Relative path to project screenshot (`/images/projects/...`)
- `techStack`: Array of technology names (e.g., `["Next.js", "TypeScript", "Tailwind CSS"]`)
- `githubUrl`: Optional GitHub repository URL
- `liveUrl`: Optional live demo URL
- `featured`: Boolean to highlight in homepage section

**Example**:
```typescript
const projects: Project[] = [
  {
    id: "ai-agent-platform",
    title: "AI Agent Platform",
    description: "Multi-agent system for automated task orchestration with real-time collaboration and intelligent decision-making.",
    imageUrl: "/images/projects/ai-agent-platform.png",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "FastAPI", "LangChain"],
    githubUrl: "https://github.com/bassam/ai-agent-platform",
    liveUrl: "https://ai-agent-platform.demo.com",
    featured: true
  }
]
```

**Validation Rules**:
- `id`: lowercase alphanumeric + hyphens, 3-50 characters
- `title`: 2-60 characters
- `description`: 20-200 characters
- `techStack`: 1-10 items, each 2-30 characters
- URLs: Valid HTTP/HTTPS format

---

## Entity: Skill

**File**: `src/data/skills.ts`

```typescript
type SkillCategory = 
  | 'AI & Machine Learning'
  | 'Frontend'
  | 'Backend'
  | 'DevOps & Tools'

interface Skill {
  id: string
  name: string
  category: SkillCategory
  level?: number  // 0-100 for progress indicators (optional)
  icon?: string   // Lucide icon name (optional)
  years?: number  // Years of experience (optional)
}
```

**Fields**:
- `id`: Unique identifier (slug format: `react`, `python`, `docker`)
- `name`: Skill name (e.g., "React", "Python", "Docker")
- `category`: One of four predefined categories
- `level`: Optional proficiency percentage (0-100) for ring/bar visualization
- `icon`: Optional Lucide icon name
- `years`: Optional years of experience

**Example**:
```typescript
const skills: Skill[] = [
  {
    id: "agentic-ai",
    name: "Agentic AI Systems",
    category: "AI & Machine Learning",
    level: 95,
    icon: "brain-circuit",
    years: 3
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 90,
    icon: "atom",
    years: 5
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    level: 95,
    icon: "code",
    years: 4
  }
]
```

**Categories**:
1. **AI & Machine Learning**: Agentic AI, LLMs, LangChain, AutoGen, CrewAI, PyTorch, TensorFlow
2. **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
3. **Backend**: Node.js, Python, FastAPI, Django, PostgreSQL, MongoDB
4. **DevOps & Tools**: Docker, Kubernetes, AWS, GCP, Git, CI/CD

**Validation Rules**:
- `name`: 2-40 characters
- `category`: Must be one of predefined values
- `level`: 0-100 (if provided)
- `years`: 0-20 (if provided)

---

## Entity: Experience

**File**: `src/data/experience.ts`

```typescript
interface Experience {
  id: string
  company: string
  role: string
  startDate: string  // ISO date: "2023-01"
  endDate?: string   // ISO date: "2024-06", null if current
  description: string
  achievements: string[]
  technologies: string[]
  logoUrl?: string
}
```

**Fields**:
- `id`: Unique identifier (slug format: `senior-engineer-acme-corp`)
- `company`: Company name
- `role`: Job title
- `startDate`: Start date in ISO format (YYYY-MM)
- `endDate`: End date (YYYY-MM) or null/undefined for current position
- `description`: Brief role description (1-2 sentences)
- `achievements`: Array of key achievements (3-6 bullet points)
- `technologies`: Technologies used in this role
- `logoUrl`: Optional company logo path

**Example**:
```typescript
const experiences: Experience[] = [
  {
    id: "senior-engineer-tech-corp",
    company: "Tech Corp",
    role: "Senior Full Stack Engineer",
    startDate: "2023-01",
    endDate: undefined,  // Current position
    description: "Leading development of AI-powered automation platforms and mentoring junior developers.",
    achievements: [
      "Architected multi-agent AI system reducing manual tasks by 60%",
      "Led migration to Next.js 15, improving Lighthouse scores from 75 to 95+",
      "Mentored 5 junior developers, conducting weekly code reviews and pair programming"
    ],
    technologies: ["Next.js", "TypeScript", "Python", "LangChain", "AWS"],
    logoUrl: "/images/companies/tech-corp.png"
  }
]
```

**Validation Rules**:
- `company`: 2-80 characters
- `role`: 2-60 characters
- `startDate`: ISO format YYYY-MM
- `endDate`: ISO format YYYY-MM or undefined
- `achievements`: 2-8 items, each 20-200 characters
- `technologies`: 1-15 items

---

## Entity: SocialLink

**File**: `src/data/social.ts`

```typescript
type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'email'

interface SocialLink {
  platform: SocialPlatform
  url: string
  icon: string  // Lucide icon name
  label: string
}
```

**Fields**:
- `platform`: Platform identifier
- `url`: Full URL (HTTPS for web, mailto: for email)
- `icon`: Lucide icon name
- `label`: Accessibility label

**Example**:
```typescript
const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: "https://github.com/bassam",
    icon: "github",
    label: "GitHub Profile"
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/bassam-shahid",
    icon: "linkedin",
    label: "LinkedIn Profile"
  },
  {
    platform: "twitter",
    url: "https://twitter.com/bassam",
    icon: "twitter",
    label: "Twitter Profile"
  },
  {
    platform: "email",
    url: "mailto:bassam@example.com",
    icon: "mail",
    label: "Send Email"
  }
]
```

**Validation Rules**:
- `platform`: Must be one of predefined values
- `url`: Valid HTTP/HTTPS or mailto: format
- `icon`: Valid Lucide icon name
- `label`: 2-50 characters

---

## Entity: Navigation

**File**: `src/data/navigation.ts`

```typescript
interface NavItem {
  label: string
  href: string
  icon?: string  // Lucide icon name (optional, for mobile)
}
```

**Example**:
```typescript
const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "user" },
  { label: "Projects", href: "/projects", icon: "folder" },
  { label: "Skills", href: "/skills", icon: "award" },
  { label: "Experience", href: "/experience", icon: "briefcase" },
  { label: "Contact", href: "/contact", icon: "mail" }
]
```

---

## Content Management Guidelines

### Adding New Projects

1. Add to `src/data/projects.ts`
2. Add screenshot to `public/images/projects/`
3. Update featured projects section if needed

### Updating Skills

1. Add to `src/data/skills.ts` in appropriate category
2. Optionally add `level` for progress visualization
3. Optionally add `icon` (Lucide icon name)

### Adding Experience

1. Add to `src/data/experience.ts`
2. Add company logo to `public/images/companies/` (optional)
3. Ensure 2-6 achievements per role

### Content Images

All images stored in `public/images/`:
```
public/images/
├── projects/       # Project screenshots
├── companies/      # Company logos
├── profile/        # Profile image
└── og/             # Open Graph images
```

---

## No Dynamic State

**Important**: This is a **static frontend-only** implementation. There is:
- No database
- No API calls
- No server-side rendering of dynamic data
- No authentication
- No form submissions (contact form is visual-only at this stage)

All content is defined at build time in TypeScript files.

**Future Backend Integration** (not in scope):
- Replace static imports with API calls
- Add CMS integration (Sanity, Contentful, Strapi)
- Implement contact form backend (Formspree, EmailJS, custom API)
- Add analytics and tracking
