# Quick Start: Bassam Shahid Portfolio

**Feature**: 001-portfolio-frontend
**Date**: 2026-02-26
**Purpose**: Developer onboarding and quick reference

---

## Prerequisites

- **Node.js**: Version 20 or higher
- **Package Manager**: npm, pnpm, or yarn
- **Browser**: Modern browser with DevTools (Chrome, Firefox, Edge)
- **Editor**: VS Code or similar with TypeScript support

---

## Installation

```bash
# Clone repository
git clone <repo-url>
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

---

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Home
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── experience/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── navigation/             # Navbar, Footer
│   │   ├── sections/               # Hero, AboutTeaser, FeaturedProjects...
│   │   ├── ui/                     # GlassCard, NeonButton, AnimatedText...
│   │   └── shared/                 # AnimatedButton, FloatingOrbs...
│   ├── data/                       # Static content (projects, skills, etc.)
│   ├── lib/
│   │   └── utils.ts                # cn(), motion variants
│   └── styles/
│       └── globals.css             # Tailwind imports + custom utilities
├── public/
│   └── images/                     # All images (projects, companies, profile)
├── .specify/
│   └── memory/
│       └── constitution.md         # MUST read before coding
└── specs/
    └── 001-portfolio-frontend/
        ├── spec.md                 # Feature specification
        ├── plan.md                 # Technical architecture
        ├── research.md             # Technical decisions
        ├── data-model.md           # Content entities
        └── contracts/              # Component contracts
```

---

## Development Workflow

### 1. Before Coding

**MANDATORY**: Review constitution
```bash
cat .specify/memory/constitution.md
```

Ensure you understand:
- 6 core principles (Visual Excellence, Animation-First, Dark Mode Only, etc.)
- Color palette and mandatory effects
- Animation requirements
- Folder structure enforcement

### 2. Component Development

**Pattern**: Build reusable components with motion from start

```typescript
// Example: GlassCard component
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl',
        'shadow-lg shadow-purple-500/20',
        hover && 'hover:scale-105 hover:-translate-y-1 hover:shadow-purple-500/40',
        'transition-all duration-300',
        className
      )}
      whileHover={hover ? { scale: 1.05, y: -4 } : {}}
    >
      {children}
    </motion.div>
  )
}
```

### 3. Testing Workflow

**Mobile Testing**:
```bash
# Open DevTools
# Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
# Test viewports: 320px, 768px, 1024px, 1440px
```

**Performance Testing**:
```bash
# Run Lighthouse
# Chrome DevTools > Lighthouse > Analyze page load
# Target: 95+ Performance, 95+ Accessibility
```

### 4. Content Management

All content is static in `src/data/`:

```typescript
// src/data/projects.ts
export const projects = [
  {
    id: "my-project",
    title: "My Project",
    // ...
  }
]

// Import in component
import { projects } from '@/data/projects'
```

---

## Key Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Build & Production
npm run build            # Create production build
npm run start            # Start production server

# Code Quality
npm run lint             # ESLint check
npm run type-check       # TypeScript validation (tsc --noEmit)
npm run format           # Prettier formatting

# Testing (when added)
npm run test             # Run tests
npm run test:coverage    # Coverage report
```

---

## Styling Guidelines

### Glassmorphism (EVERYWHERE)

```typescript
// Base glassmorphism classes
className="
  bg-black/20 
  backdrop-blur-xl 
  border border-white/10 
  rounded-xl
  shadow-lg shadow-purple-500/20
"
```

### Neon Glow

```typescript
// Subtle glow
className="shadow-lg shadow-cyan-500/30"

// Strong glow (hover)
className="hover:shadow-xl hover:shadow-cyan-500/60"

// Gradient glow
className="shadow-[0_0_30px_rgba(168,85,247,0.4)]"
```

### Hover Effects

```typescript
<motion.div
  whileHover={{
    scale: 1.05,
    y: -4,
    transition: { duration: 0.3 }
  }}
>
  {/* Content */}
</motion.div>
```

---

## Animation Guidelines

### Staggered Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={containerVariants}>
  {items.map(item => (
    <motion.div variants={childVariants} key={item.id}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### Scroll-Triggered Animations

```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

### Page Transitions

```typescript
// app/layout.tsx
'use client'

import { AnimatePresence } from 'framer-motion'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  )
}
```

---

## Performance Optimization

### Images

```typescript
import Image from 'next/image'

// Always use Next.js Image component
<Image
  src="/images/projects/my-project.png"
  alt="Project screenshot"
  width={800}
  height={600}
  className="rounded-xl"
  priority  // For hero/above-fold images
/>
```

### Fonts

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### Client Components

```typescript
// Only use 'use client' when necessary
'use client'  // For animations, interactivity

// Server components by default (no directive)
```

---

## Accessibility

### Focus States

```typescript
// NEVER use default outline
// ALWAYS use custom glow rings

className="
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-cyan-400
  focus-visible:ring-offset-2
  focus-visible:ring-offset-black
"
```

### ARIA Labels

```typescript
<button aria-label="View project on GitHub">
  <GithubIcon />
</button>

<nav aria-label="Main navigation">
  {/* Nav items */}
</nav>
```

### Reduced Motion

```typescript
// Framer Motion automatically respects prefers-reduced-motion
// For CSS animations:

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Troubleshooting

### Animation Jank

**Problem**: Stuttering during animations

**Solution**:
- Use only GPU-accelerated properties (transform, opacity)
- Add `will-change: transform` to animated elements
- Avoid animating width, height, top, left

### Lighthouse Score Low

**Problem**: Performance score below 95

**Solution**:
- Use `next/image` with proper sizing
- Implement `next/font` for fonts
- Minimize client components
- Check LCP element loading

### Touch Targets Too Small

**Problem**: Mobile accessibility issues

**Solution**:
```typescript
// Minimum 44px touch targets
className="min-h-[44px] min-w-[44px] p-3"
```

---

## Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repository to Vercel
# Automatic deployments on push
# Environment variables in Vercel dashboard
```

### Manual Build

```bash
npm run build
npm run start  # Production server at localhost:3000
```

### Environment Variables

```env
# .env.local (if needed)
NEXT_PUBLIC_SITE_URL=https://bassam.dev
```

---

## Next Steps

1. **Read Constitution**: `.specify/memory/constitution.md`
2. **Review Spec**: `specs/001-portfolio-frontend/spec.md`
3. **Study Plan**: `specs/001-portfolio-frontend/plan.md`
4. **Start Coding**: Begin with Phase 1 tasks from `/sp.tasks`

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/icons/
- **shadcn/ui**: https://ui.shadcn.com/
