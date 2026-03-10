# Implementation Plan: Premium Dark-Futuristic Portfolio Website

**Branch**: `001-portfolio-frontend` | **Date**: 2026-02-26 | **Spec**: [spec.md](./spec.md)
**Input**: Create premium dark-futuristic portfolio website frontend positioning Bassam Shahid as 6+ years experienced Full Stack & Agentic AI Developer

## Summary

Build a premium, dark-futuristic personal portfolio website with heavy glassmorphism, neon glows, intelligent motion animations, and cyber-futuristic aesthetics. The site features 6 pages (Home, About, Projects, Skills, Experience, Contact) with staggered animations, smooth scrolling, interactive hover effects, and Lighthouse 95+ performance. Frontend-only implementation using Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion 11, and Lenis smooth scroll.

## Technical Context

**Language/Version**: TypeScript 5.x (strict: true, no `any`)
**Primary Dependencies**: Next.js 15+, React 19, Tailwind CSS v4, Framer Motion 11+, Lenis
**Storage**: N/A (frontend-only, static content from local JSON)
**Testing**: N/A at this stage (visual polish focus, tests added later)
**Target Platform**: Web (all modern browsers, mobile-first responsive)
**Project Type**: Single Next.js web application
**Performance Goals**: Lighthouse 95+ Performance/Accessibility, LCP <2.5s, 60fps animations, CLS <0.1
**Constraints**: Dark mode only, GPU-accelerated animations only, 44px minimum touch targets, `prefers-reduced-motion` support
**Scale/Scope**: 6 pages, ~20-30 reusable components, static content, no backend integration

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Visual Excellence | ✅ PASS | Glassmorphism, neon glows, depth effects on all elements |
| II. Animation-First | ✅ PASS | Framer Motion mandatory, Lenis scroll, all elements animated |
| III. Dark Mode Only | ✅ PASS | Exclusively dark theme (#0B0F19), no light mode |
| IV. Performance Budget | ✅ PASS | Lighthouse 95+, GPU-accelerated animations, LCP <2.5s |
| V. TypeScript Strict | ✅ PASS | strict: true, no `any`, fully typed props/state/events |
| VI. Mobile-First Pixel Perfection | ✅ PASS | Mobile-first breakpoints, 44px touch targets, pixel-perfect |

**Gate Result**: ✅ PASS - All principles compliant. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-frontend/
├── plan.md              # This file
├── research.md          # Phase 0 output (below)
├── data-model.md        # Phase 1 output (below)
├── quickstart.md        # Phase 1 output (below)
├── contracts/           # Phase 1 output (component contracts)
│   ├── ui-components.md
│   └── section-components.md
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # Home
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── skills/page.tsx
│   ├── experience/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── navigation/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about-teaser.tsx
│   │   ├── featured-projects.tsx
│   │   ├── skills-section.tsx
│   │   └── contact-section.tsx
│   ├── ui/
│   │   ├── glass-card.tsx
│   │   ├── neon-button.tsx
│   │   ├── animated-text.tsx
│   │   ├── skill-ring.tsx
│   │   └── timeline-card.tsx
│   └── shared/
│       ├── animated-button.tsx
│       ├── floating-orbs.tsx
│       └── gradient-text.tsx
├── lib/
│   └── utils.ts                # cn(), motion variants
└── styles/
    └── globals.css
```

**Structure Decision**: Single Next.js project structure per constitution. Components organized by type (navigation, sections, ui, shared) for reusability. App Router for routing with server components default.

---

## Phase 0: Research & Technical Decisions

### research.md

#### Decision: Animation Library - Framer Motion 11+
**Rationale**: Constitution mandates Framer Motion as exclusive animation library. Provides declarative API, excellent performance with GPU acceleration, `AnimatePresence` for page transitions, `useAnimation` for complex interactions, and `whileInView` for scroll animations.
**Alternatives Considered**: 
- GSAP: More powerful but heavier, imperative API
- CSS animations only: Insufficient for complex staggered reveals and interactive motion
- React Spring: Physics-based, less suited for precise choreographed animations

#### Decision: Smooth Scroll - Lenis
**Rationale**: Constitution mandates Lenis for "buttery smooth global scrolling". Lightweight, momentum-based, works seamlessly with Next.js, no conflicts with native scroll behavior.
**Alternatives Considered**:
- Locomotive Scroll: Heavier, requires additional setup
- Native smooth-scroll: Insufficient polish for premium feel
- react-use-gesture: Overkill for scroll-only requirement

#### Decision: Font Optimization - next/font/google
**Rationale**: Next.js built-in font optimization automatically self-hosts Inter font, eliminates layout shift, optimizes loading. Critical for LCP <2.5s requirement.
**Alternatives Considered**:
- Google Fonts CDN: Potential layout shift, slower loading
- System fonts: Insufficient premium aesthetic

#### Decision: Component Styling - Tailwind CSS v4 + Custom shadcn/ui
**Rationale**: Constitution requires Tailwind CSS v4 with heavily customized shadcn/ui. Tailwind provides rapid development, consistent design tokens. shadcn/ui offers accessible base components to customize beyond default look.
**Alternatives Considered**:
- CSS Modules: Slower development, less consistent
- Styled Components: Runtime overhead, conflicts with Next.js SSR
- Plain CSS: Unmaintainable at scale

#### Decision: Icon Library - Lucide React
**Rationale**: Constitution specifies Lucide React. Modern, consistent stroke width, tree-shakeable, excellent TypeScript types, matches premium aesthetic.
**Alternatives Considered**:
- Heroicons: Good but less variety
- React Icons: Larger bundle, inconsistent styles
- Feather Icons: Limited selection

#### Decision: Typography Effects - Framer Motion (not react-type-animation)
**Rationale**: Constitution allows Framer Motion for typing effects. Using single library (Framer Motion) for all animations reduces dependencies, ensures consistent behavior. `staggerChildren` and `delayChildren` variants handle typing effect elegantly.
**Alternatives Considered**:
- react-type-animation: Simpler but adds dependency for single use case
- CSS animations: Less control over timing and interaction

#### Best Practice: GPU-Accelerated Animations
**Rationale**: Constitution enforces GPU-accelerated properties (transform, opacity) to prevent jank and maintain 60fps.
**Implementation**: All animations use `translateX/Y/Z`, `scale`, `rotate`, `opacity`. Avoid `width`, `height`, `top`, `left`, `margin`.

#### Best Practice: Mobile-First Breakpoints
**Rationale**: Constitution requires mobile-first pixel-perfect responsive design.
**Implementation**: Tailwind default breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`. Design mobile-first, scale up.

#### Best Practice: Reduced Motion Support
**Rationale**: Constitution requires respecting `prefers-reduced-motion` media query.
**Implementation**: Wrap animations in `@media (prefers-reduced-motion: reduce)` or use Framer Motion's `reduceMotion` config.

---

## Phase 1: Design & Contracts

### data-model.md

#### Content Entities (Static JSON)

**Project**
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

**Skill**
```typescript
interface Skill {
  id: string
  name: string
  category: 'AI & Machine Learning' | 'Frontend' | 'Backend' | 'DevOps & Tools'
  level?: number  // Optional: 0-100 for progress indicators
  icon?: string
}
```

**Experience**
```typescript
interface Experience {
  id: string
  company: string
  role: string
  startDate: string  // ISO date
  endDate?: string   // ISO date, null if current
  description: string
  achievements: string[]
  technologies: string[]
}
```

**SocialLink**
```typescript
interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email'
  url: string
  icon: string
  label: string
}
```

#### Validation Rules
- All URLs must be valid HTTP/HTTPS or mailto:
- Tech stack items: 2-20 characters, alphanumeric + common symbols
- Dates: ISO 8601 format
- Image URLs: relative paths or CDN URLs

#### State Transitions
- N/A (static content, no dynamic state management required at this stage)

---

### contracts/ui-components.md

#### GlassCard Component
```typescript
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean  // Enable hover lift + glow
  padding?: 'sm' | 'md' | 'lg'
  rounded?: 'xl' | '2xl'
}

// Props:
// - children: Content to render
// - className: Additional Tailwind classes
// - hover: Enable hover effects (scale 1.03-1.06, lift -4 to -8px, glow increase)
// - padding: Internal padding size
// - rounded: Border radius (xl or 2xl)

// Styling:
// - bg: bg-black/20 to bg-black/40
// - backdrop: backdrop-blur-xl
// - border: border-white/10
// - shadow: neon glow (cyan/purple at 20-40% opacity)
// - transition: all 300-400ms ease-out
```

#### NeonButton Component
```typescript
interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string  // If external link
  download?: string  // For resume download
  icon?: React.ReactNode
  pulse?: boolean  // Enable continuous pulse animation
}

// Variants:
// - primary: gradient indigo-500 → purple-600 → fuchsia-500
// - secondary: solid cyan/blue with glow
// - outline: border with glow on hover

// Hover Effects:
// - scale: 1.05-1.1
// - brightness: brightness-110
// - glow: increase to 60% opacity
// - transition: 300-400ms ease-out
```

#### AnimatedText Component
```typescript
interface AnimatedTextProps {
  text: string
  variant?: 'hero' | 'heading' | 'body'
  staggerDelay?: number  // Default: 0.05s
  enableCursor?: boolean
  className?: string
}

// Animations:
// - variant 'hero': staggered word-by-word reveal + typing cursor
// - variant 'heading': staggered fade-up + slight scale
// - variant 'body': staggered fade-up

// Cursor:
// - Blink animation: opacity 0-1 every 500ms
// - Color: cyan-400 or purple-500
```

#### SkillRing Component
```typescript
interface SkillRingProps {
  name: string
  level?: number  // 0-100 for progress
  icon?: React.ReactNode
  category: string
  interactive?: boolean  // Enable hover rotation + glow
}

// Visual:
// - Ring: SVG circle with stroke-dasharray for progress
// - Gradient: indigo → purple → fuchsia
// - Glow: cyan/purple shadow

// Hover Effects (if interactive):
// - scale: 1.03-1.06
// - rotate: 2-5deg
// - glow: increase intensity
```

#### TimelineCard Component
```typescript
interface TimelineCardProps {
  company: string
  role: string
  duration: string
  achievements: string[]
  technologies: string[]
  align?: 'left' | 'right'  // For alternating layout
}

// Layout:
// - Glass card with border-white/10
// - Positioned relative to timeline line
// - Alternating left/right on desktop, stacked on mobile

// Hover Effects:
// - scale: 1.02-1.05
// - lift: translateY -4 to -8px
// - glow: increase intensity
```

---

### contracts/section-components.md

#### Hero Section
```typescript
interface HeroSectionProps {
  title: string  // "Hi, I'm Bassam Shahid — Full Stack & Agentic AI Developer"
  subtitle: string  // "I architect intelligent agents, scalable web platforms, and automation that thinks ahead."
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string; download?: string }
}

// Components:
// - AnimatedText (title + subtitle)
// - FloatingOrbs (background)
// - NeonButton (CTAs)
// - GradientText (for emphasis)

// Animations:
// - Text: staggered word-by-word reveal (0.05s delay)
// - Orbs: continuous floating animation (CSS keyframes)
// - Buttons: fade-up after text completes
```

#### FeaturedProjects Section
```typescript
interface FeaturedProjectsProps {
  projects: Project[]
  title?: string  // Optional section header
}

// Layout:
// - Grid: 1 col mobile, 2 col tablet, 3 col desktop
// - Gap: 6-8 (Tailwind spacing)

// Components per project:
// - GlassCard (container)
// - Image (project screenshot with glass border)
// - GradientText (title)
// - TechStackBadge[] (pill badges)
// - NeonButton[] (GitHub, Live Demo)

// Animations:
// - Section header: fade-up + scale
// - Cards: staggered fade-up (0.1s delay)
// - Hover: scale 1.03-1.06, lift -4 to -8px, glow increase
```

#### Skills Section
```typescript
interface SkillsSectionProps {
  skills: Skill[]
  title?: string
  layout?: 'cards' | 'rings' | 'badges'  // Default: cards
}

// Grouping:
// - Group by category
// - Category header: glassmorphic with gradient text

// Animations:
// - Category headers: staggered fade-up
// - Skills: staggered fade-up (0.05-0.15s delay)
// - Hover: glow + scale + optional rotation (2-5deg)
```

#### Experience Section
```typescript
interface ExperienceSectionProps {
  experiences: Experience[]
  title?: string
}

// Layout:
// - Vertical timeline line (gradient indigo-purple)
// - Alternating cards on desktop, stacked on mobile
// - Line glow: subtle continuous animation

// Animations:
// - Timeline line: draw animation (SVG stroke-dasharray)
// - Cards: staggered fade-up + slide from sides (0.1-0.15s delay)
// - Hover: scale 1.02-1.05, lift, glow increase
```

#### Contact Section
```typescript
interface ContactSectionProps {
  email: string
  socialLinks: SocialLink[]
  resumeUrl: string
  showForm?: boolean  // Static form (non-functional)
}

// Components:
// - GlassCard (section container)
// - Glass inputs (form fields with focus glow rings)
// - NeonButton (social links, resume download)
// - GradientText (section header)

// Animations:
// - Section: fade-up
// - Form inputs: staggered fade-up
// - Buttons: hover glow pulse + scale
// - Resume button: continuous subtle pulse
```

---

### quickstart.md

# Quick Start: Bassam Shahid Portfolio

## Prerequisites

- Node.js 20+ and npm/pnpm
- Modern browser with DevTools

## Installation

```bash
# Clone and install
git clone <repo-url>
cd my-portfolio
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (navigation, sections, ui, shared)
├── lib/              # Utilities (cn(), motion variants)
└── styles/           # Global styles with Tailwind
```

## Development Workflow

1. **Review Constitution**: Always check `.specify/memory/constitution.md` before coding
2. **Component-First**: Build reusable components with motion from start
3. **Mobile Testing**: Test on mobile viewport continuously
4. **Performance**: Verify Lighthouse scores after each section

## Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript validation
```

## Content Management

All content is static, stored in:
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/experience.ts`
- `src/data/social.ts`

Update these files to modify portfolio content.

## Deployment

```bash
npm run build
npm run start  # Production server
```

Deploy to Vercel, Netlify, or any Next.js-compatible host.

---

## Constitution Compliance Summary

| Requirement | Implementation |
|-------------|----------------|
| Glassmorphism | `GlassCard` component with bg-black/20-40, backdrop-blur-xl, border-white/10 |
| Neon Glows | Custom shadow utilities with cyan/purple, hover intensity increase |
| Framer Motion | All animations use `motion.*` components with GPU-accelerated properties |
| Lenis Scroll | Global scroll wrapper in `layout.tsx` |
| Dark Mode Only | Tailwind config with dark theme colors, no light mode toggle |
| TypeScript Strict | All components fully typed, no `any` |
| Mobile-First | Tailwind breakpoints, 44px touch targets |
| Performance | Lighthouse optimization, next/font, image optimization |

---

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. All complexity justified by constitution requirements:
- Framer Motion: Mandatory per constitution (Animation-First principle)
- Lenis: Mandatory per constitution (smooth scroll requirement)
- Multiple component layers: Required for reusability and consistent glassmorphism/neon effects

---

**Next Phase**: Run `/sp.tasks` to break this plan into implementation tasks.
