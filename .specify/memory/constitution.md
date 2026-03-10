<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (MAJOR - Initial constitution)
Added sections:
  - Core Principles (6 principles)
  - Visual Design System
  - Animation & Motion System
  - Code Quality & Architecture
  - Development Workflow
  - Governance
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ No updates needed (Constitution Check section exists)
  - .specify/templates/spec-template.md: ✅ No updates needed (technology-agnostic)
  - .specify/templates/tasks-template.md: ✅ No updates needed (adaptable to frontend)
Follow-up TODOs: None
-->

# Bassam Shahid Portfolio Constitution

**Frontend Development Rulebook** | **Dark-Futuristic Premium Portfolio**

## Core Principles

### I. Visual Excellence (NON-NEGOTIABLE)
Every pixel must communicate "premium Silicon Valley AI engineer". The first 3-second impression MUST feel: top-tier, expensive, next-level, cyber-futuristic. All UI elements require glassmorphism, neon glows, and depth effects. Flat, default, or plain designs are strictly prohibited.

**Rationale**: Portfolio positioning as premium SaaS product landing page + AI-engineer showcase.

### II. Animation-First (MANDATORY)
Nothing stays static. Every element MUST have motion: entrance animations, hover states, micro-interactions, scroll-triggered reveals. Framer Motion 11+ is the exclusive animation library. Lenis smooth scrolling is mandatory globally. No element transitions without easing and polish.

**Rationale**: Motion creates the "intelligent/alive" feel essential for Agentic AI branding.

### III. Dark Mode Only (LOCKED)
Exclusively dark theme. No light mode, no theme toggle. Background base: #0B0F19 or #0a0e17. This is a permanent brand decision, not a feature.

**Rationale**: Cyber-futuristic aesthetic requires dark canvas for neon/glow effects to achieve maximum impact.

### IV. Performance Budget (ENFORCED)
Lighthouse scores: 95+ Performance, 95+ Accessibility. LCP under 2.5s. Zero layout shift (CLS < 0.1). No jank, no frame drops. Client components minimized. Animations MUST use GPU-accelerated properties (transform, opacity).

**Rationale**: Premium feel requires premium performance. Slow = cheap perception.

### V. TypeScript Strict (ZERO TOLERANCE)
strict: true enforced. No `any` types. All props, state, events fully typed. Type errors block deployment. shadcn/ui components MUST be customized beyond default styling.

**Rationale**: Type safety prevents visual regressions and ensures component contract clarity.

### VI. Mobile-First Pixel Perfection
Design mobile-first, scale up. Every breakpoint MUST be pixel-perfect. Touch targets 44px minimum. Hover states gracefully degrade to focus/active on touch. Responsive typography and spacing non-negotiable.

**Rationale**: 60%+ traffic is mobile; premium means consistent across all devices.

## Visual Design System

### Color Palette (LOCKED)
| Role | Value |
|------|-------|
| Background Base | `#0B0F19` or `#0a0e17` |
| Primary Gradient | `indigo-500` → `purple-600` → `fuchsia-500` |
| Accent Glow | `cyan-400`, `blue-400`, `purple-500` |
| Text Primary | `zinc-50` / `white` |
| Text Secondary | `zinc-200` |
| Border Subtle | `white/5` to `white/15` |

### Mandatory Effects (EVERY ELEMENT)
- **Glassmorphism**: `bg-black/20` to `bg-black/40` + `backdrop-blur-xl` + `border border-white/10` + `rounded-xl` to `rounded-2xl`
- **Neon Glow**: Subtle box-shadow with cyan/purple at 20-40% opacity; hover increases to 60% + `brightness-110`
- **Hover States**: `scale(1.03-1.06)` + `transition-all 300-400ms` + slight Y lift + glow intensification
- **Depth**: Layered shadows, gradient overlays, floating appearance

### Typography
- **Font Family**: Inter (via `next/font/google`)
- **Headings**: Bold (700+), large scale (3xl-6xl), gradient text on hero/key sections
- **Line Height**: Generous (1.6-1.8 for body, 1.2-1.4 for headings)
- **Letter Spacing**: Tight on headings (-0.02em), normal on body

## Animation & Motion System

### Global Rules
- **Lenis Scroll**: Enabled on all pages, smooth damping
- **Page Transitions**: `AnimatePresence` in `layout.tsx` with fade + subtle scale
- **Stagger Timing**: 0.05-0.15s between children
- **Duration**: 300-600ms for entrances, 200-400ms for interactions
- **Easing**: `easeOut`, `circOut`, or custom cubic-bezier (never linear)

### Required Animations
| Element | Animation |
|---------|-----------|
| Hero Text | Staggered reveal (word/char) + typing cursor + floating orbs |
| Section Headers | Fade-up + slight scale from bottom |
| Cards/Projects | Appear from bottom + hover lift + glow + scale |
| Buttons/Links | Pulse glow + scale + brightness on hover, tap scale-down |
| Skills | Ring animation, staggered fade-in, hover glow |
| Navigation | Slide-down reveal, hover underline with glow |

### Micro-Interactions (MANDATORY)
Every interactive element MUST have:
- Hover state (scale, glow, brightness)
- Focus state (glow ring, never default outline)
- Active/tap state (scale-down 0.95-0.98)
- Transition on ALL properties (never instant)

## Code Quality & Architecture

### Folder Structure (ENFORCED)
```
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
│   ├── navigation/             # Navbar, Footer
│   ├── sections/               # Hero, AboutTeaser, FeaturedProjects...
│   ├── ui/                     # Customized shadcn (GlassCard, NeonButton...)
│   └── shared/                 # AnimatedButton, SkillRing, ProjectCard...
├── lib/
│   └── utils.ts                # cn(), motion variants
└── styles/
    └── globals.css
```

### Component Rules
- **Reusable**: All components accept typed props, no hardcoded content
- **Utility**: Use `cn()` from `tailwind-merge` + `class-variance-authority`
- **Motion**: Prefer `motion.div`, `motion.button`, `motion.span` over plain HTML
- **Client Components**: Minimal use, only where animation/interactivity required
- **Accessibility**: Semantic tags, `aria-labels`, `focus-visible` with glow rings

### Tech Stack (LOCKED)
| Layer | Technology |
|-------|------------|
| Framework | Next.js 15+ App Router |
| Language | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui (heavily customized) |
| Animation | Framer Motion 11+ (mandatory) |
| Scroll | Lenis (`@studio-freight/lenis` or `react-lenis`) |
| Icons | Lucide-react |
| Typography | `react-type-animation` or Framer Motion typing |

## Development Workflow

### Pre-Development
1. Review constitution before any code
2. Define component motion strategy upfront
3. Plan glass/neon effects for each element

### During Development
1. Write component with motion from start (no "add animation later")
2. Test on mobile viewport continuously
3. Verify Lighthouse scores after each section

### Pre-Commit Checklist
- [ ] All interactive elements have hover/focus/active states
- [ ] Glassmorphism applied to cards/sections
- [ ] Neon glow effects present and visible
- [ ] Animations smooth (no jank, GPU-accelerated)
- [ ] TypeScript strict mode passes (no `any`)
- [ ] Mobile responsive verified
- [ ] Accessibility: semantic HTML, aria-labels, focus rings

### Code Review Requirements
- Constitution compliance verified
- Visual polish matches premium standard
- No default shadcn/tailwind flat components
- Motion feels "intelligent/alive"

## Governance

**Compliance**: This constitution supersedes all other practices. Every PR MUST be reviewed against these principles.

**Amendment Process**: Changes require:
1. Documented rationale (why current principle insufficient)
2. Visual/technical justification
3. Migration plan for existing components
4. Version bump with changelog entry

**Versioning Policy**:
- MAJOR: Visual system overhaul, stack changes, principle removals
- MINOR: New effects/components, expanded guidance, animation additions
- PATCH: Clarifications, typo fixes, non-visual refinements

**Complexity Justification**: Any deviation from simplicity (extra libraries, complex patterns) MUST be justified in code comments with rationale.

**YAGNI Enforcement**: Start simple. Add complexity only when required for visual/animation goals.

---

**Version**: 1.0.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26

**Success Mantra**: *"When in doubt → more polish, more glow, more motion, more futuristic depth."*
