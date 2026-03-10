---
id: 001
title: Portfolio Frontend Constitution Created
stage: constitution
date: 2026-02-26
surface: agent
model: qwen-3.5-coder
feature: none
branch: main
user: bassam
command: /sp.constitution
labels: ["constitution", "frontend", "portfolio", "design-system"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - None (constitution document)
---

## Prompt

Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.

User input:

"You are exclusively building the FRONTEND of "Bassam Shahid Portfolio" — a premium, dark-futuristic personal portfolio website that positions Bassam as a 6+ years experienced Full Stack & Agentic AI Developer.

This constitution is the absolute, non-negotiable rulebook for ALL frontend decisions, visuals, interactions, animations and polish matter. Backend, form submission, APIs, databases, email sending etc. will be added MUCH LATER — right now ONLY visual design, animations, responsiveness and polish matter.

Core non-negotiable goals:
• The website must instantly feel like: top-tier Silicon Valley/AI-engineer portfolio + premium SaaS product landing page + cyber-futuristic interface
• First 3-second impression must be "next level", "expensive looking", "this guy builds serious AI systems"
• Heavy emphasis on Agentic AI branding through visuals: neon glows, neural/glass effects, subtle motion that feels "intelligent/alive"
• Performance: Lighthouse 95+ (Performance + Accessibility), fast LCP, no jank
• Mobile-first, pixel-perfect on every device
• Only dark mode — no light mode for now

Locked tech stack (frontend only):
• Next.js 15+ App Router (Server Components default, "use client" only when necessary)
• React 19 + TypeScript (strict: true, no any)
• Tailwind CSS v4 + shadcn/ui (but HEAVILY customize — never use default shadcn look)
• Framer Motion 11+ (primary & mandatory for almost everything that moves or interacts)
• Lenis (@studio-freight/lenis or react-lenis) for buttery smooth global scrolling
• Lucide-react for icons
• Optional: react-type-animation (for typing effects), or implement with Framer Motion

Design & visual rules — must follow religiously:
Color system:
• Background base: #0B0F19 or #0a0e17
• Primary gradient: indigo-500 → purple-600 → fuchsia-500 or cyan accents
• Text: zinc-50 / zinc-200 / white
• Accents / glow: cyan-400, blue-400, purple-500

Mandatory effects on almost every element:
• Glassmorphism: bg-black/20 to bg-black/40 + backdrop-blur-xl + border border-white/5 to white/15 + rounded-xl to rounded-2xl
• Neon / glow shadow: subtle to medium box-shadow with cyan/purple opacity (hover/focus: stronger glow + brightness-110)
• Hover / focus states: scale(1.03–1.06) + transition-all 300–400ms + slight y/lift + glow increase
• Cards/sections: always glass + depth + micro-motion on appear/hover

Animation constitution — no exceptions:
• Global: Lenis smooth scroll enabled
• Hero / big text: staggered reveal (word by word or char by char), typing cursor effect, floating subtle orbs/blobs (CSS blur + animate)
• Scroll animations: whileInView + fade-up + slight scale + staggerChildren (0.05–0.15s delay)
• Every card/project/skill: appear from bottom, hover lift + glow + scale
• Buttons/links: pulse subtle glow, scale + brightness on hover, tap scale down
• Page transitions: subtle fade + scale via AnimatePresence in layout.tsx
• Micro-interactions mandatory on ALL interactive elements (no plain hover)

Folder structure reminder (follow exactly):
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
│   ├── sections/               # Hero, AboutTeaser, FeaturedProjects, etc.
│   ├── ui/                     # Customized shadcn components (GlassCard, NeonButton...)
│   └── shared/                 # AnimatedButton, SkillRing, ProjectCard...
├── lib/
│   └── utils.ts                # cn(), motion variants helpers
└── styles/
    └── globals.css

Component rules:
• Reusable + typed props
• Use cn() from class-variance-authority + tailwind-merge
• Motion components preferred (motion.div, motion.button, motion.span...)
• Client components minimal — only where animation/interactivity needed
• Accessibility: semantic tags, aria-labels, focus-visible glow instead of default outline

Success looks like:
When someone opens the site they should immediately think:
"Damn this is clean, premium, futuristic — this developer clearly knows modern web + AI space."

Any generated code MUST:
• Look heavily customized (no default shadcn/tailwind flat cards)
• Include Framer Motion for motion/animation
• Use glass + neon + gradient effects
• Feel premium from the first line of code

This constitution overrides any default behavior. When in doubt → more polish, more glow, more motion, more futuristic depth."

## Response snapshot

Created the complete constitution document at `.specify/memory/constitution.md` with:
- 6 core principles (Visual Excellence, Animation-First, Dark Mode Only, Performance Budget, TypeScript Strict, Mobile-First Pixel Perfection)
- Visual Design System with locked color palette and mandatory effects
- Animation & Motion System with global rules and required animations table
- Code Quality & Architecture with enforced folder structure and component rules
- Development Workflow with pre-commit checklist and code review requirements
- Governance section with amendment process and versioning policy
- Sync Impact Report as HTML comment at top

## Outcome

- ✅ Impact: Established the absolute rulebook for all frontend development. All future components, animations, and visual decisions must comply with these principles.
- 🧪 Tests: N/A (constitution document, no executable tests)
- 📁 Files: Created/updated `.specify/memory/constitution.md` (1 file)
- 🔁 Next prompts: `/sp.specify` to create feature specifications, `/sp.plan` for architecture planning, then begin implementation with `/sp.tasks`
- 🧠 Reflection: Constitution captures all user requirements as declarative, testable principles. Tech stack locked, visual rules explicit, animation requirements mandatory.

## Evaluation notes (flywheel)

- Failure modes observed: None (document creation successful)
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment: Begin feature specification for Home page hero section
