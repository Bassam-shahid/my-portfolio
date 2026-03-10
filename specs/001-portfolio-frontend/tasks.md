# Tasks: Premium Dark-Futuristic Portfolio Website

**Input**: Design documents from `/specs/001-portfolio-frontend/`
**Prerequisites**: plan.md, spec.md, technical-plan.md, constitution.md
**Tests**: NOT requested - Visual polish focus, tests added later
**Organization**: Tasks grouped by user story for independent implementation and testing

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3])
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `public/` at repository root
- All paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 15 project with TypeScript and App Router
- [X] T002 [P] Install core dependencies: framer-motion, @studio-freight/lenis, clsx, tailwind-merge, lucide-react
- [X] T003 [P] Configure Tailwind CSS v4 with custom config file
- [X] T004 [P] Setup ESLint and Prettier for code quality
- [X] T005 Create folder structure per technical-plan.md (src/app, src/components, src/data, src/lib, src/styles)
- [X] T006 [P] Configure TypeScript strict mode (no any, strict: true)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Create global styles in `src/styles/globals.css` with Tailwind imports and custom utilities (glass, neon-text, glass-strong classes)
- [X] T008 [P] Configure `tailwind.config.ts` with custom colors, shadows (neon-cyan, neon-purple, neon-gradient), gradients, animations (float, pulse-glow, gradient-shift, cursor-blink)
- [X] T009 [P] Create utility functions in `src/lib/utils.ts` (cn(), gradientText(), glassCard())
- [X] T010 [P] Create motion variants in `src/lib/motion-variants.ts` (fadeUp, fadeUpScale, staggerContainer, hoverGlowScale, neonPulse, typingCursor, floatOrb)
- [X] T011 [P] Create scroll helpers in `src/lib/scroll-helpers.ts` (lenisOptions, viewportOptions, prefersReducedMotion)
- [X] T012 Create `src/components/shared/smooth-scroll.tsx` Lenis wrapper component with RAF loop
- [X] T013 Create `src/components/shared/page-transition.tsx` for fade + scale page transitions
- [X] T014 Create `src/components/shared/floating-orbs.tsx` animated background orbs component
- [X] T015 Setup root layout `src/app/layout.tsx` with metadata, Inter font, AnimatePresence, SmoothScroll wrapper
- [X] T016 Create static data files in `src/data/` (navigation.ts, projects.ts, skills.ts, experience.ts, social.ts) with placeholder content

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Hero Section First Impression (Priority: P1) 🎯 MVP

**Goal**: Create stunning hero section with staggered text reveal, typing cursor, floating orbs, and CTAs that delivers premium first impression within 3 seconds

**Independent Test**: Can be fully tested by opening homepage and verifying hero text animation, floating orbs, CTA buttons with hover effects, and overall dark-futuristic aesthetic - all without needing other sections

### Implementation for User Story 1

- [X] T017 [P] [US1] Create `src/components/ui/gradient-text.tsx` with gradient text component (primary/cyan/purple variants, optional animate prop)
- [X] T018 [P] [US1] Create `src/components/ui/animated-text.tsx` with staggered word/char reveal, typing cursor effect, variant prop (hero/heading/body)
- [X] T019 [P] [US1] Create `src/components/ui/neon-button.tsx` with variants (primary/secondary/outline), icon support, pulse animation, hover/tap/focus states
- [X] T020 [US1] Create `src/components/sections/hero-section.tsx` with staggered hero text, subtitle, floating orbs background, CTA buttons
- [X] T021 [US1] Implement homepage `src/app/page.tsx` with HeroSection component
- [X] T022 [US1] Add scroll indicator animation at bottom of hero section (mouse icon with scrolling animation)
- [X] T023 [US1] Verify mobile responsiveness (text scales, buttons stack, orbs positioned correctly)

**Checkpoint**: At this point, User Story 1 should be fully functional - open homepage and see premium hero with animations

---

## Phase 4: User Story 2 - Featured Projects Showcase (Priority: P2)

**Goal**: Display projects as glassmorphic cards with hover animations, tech stack badges, action buttons, and staggered entrance animations

**Independent Test**: Can be fully tested by navigating to /projects page and verifying card glassmorphism, hover effects (scale 1.03-1.06, lift, glow increase), tech badges, and staggered entrance

### Implementation for User Story 2

- [X] T024 [P] [US2] Create `src/components/ui/tech-badge.tsx` with glass pill styling, subtle glow, hover scale effect
- [X] T025 [P] [US2] Create `src/components/ui/glass-card.tsx` with glassmorphism base, optional hover prop, padding variants, rounded corners
- [X] T026 [P] [US2] Create `src/components/ui/project-card.tsx` with image, title, description, tech stack badges, GitHub/Live Demo buttons, hover lift + glow
- [X] T027 [US2] Create `src/components/sections/featured-projects.tsx` with section header, project grid (1 col mobile, 2 col tablet, 3 col desktop), staggered card animations
- [X] T028 [US2] Create projects page `src/app/projects/page.tsx` with FeaturedProjects section and PageTransition wrapper
- [X] T029 [US2] Populate `src/data/projects.ts` with 4-6 sample projects (id, title, description, imageUrl, techStack, githubUrl, liveUrl, featured)
- [X] T030 [US2] Add subtle animated background effects (gradients or light particles) behind projects section
- [X] T031 [US2] Verify image optimization with next/image (sizes, priority for above-fold, blur placeholder)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - hero on home, full projects page

---

## Phase 5: User Story 3 - Skills Visualization with Animations (Priority: P3)

**Goal**: Display skills categorized with animated rings/cards/badges, staggered entrance, and interactive hover effects (glow + scale + optional rotation)

**Independent Test**: Can be fully tested by navigating to /skills page and verifying skill items animate in with stagger, display with glassmorphism and neon accents, respond to hover with glow/scale/rotation

### Implementation for User Story 3

- [X] T032 [P] [US3] Create `src/components/ui/skill-ring.tsx` with animated SVG progress ring, gradient stroke, icon center, hover scale + rotation
- [X] T033 [P] [US3] Create `src/components/ui/skill-card.tsx` with glassmorphism, skill name, category, level indicator, hover effects
- [X] T034 [US3] Create `src/components/sections/skills-section.tsx` with category headers (glassmorphic with gradient text), skill grid, staggered animations
- [X] T035 [US3] Create skills page `src/app/skills/page.tsx` with SkillsSection and PageTransition wrapper
- [X] T036 [US3] Populate `src/data/skills.ts` with categorized skills (AI & Machine Learning, Frontend, Backend, DevOps & Tools) - 15-20 skills total
- [X] T037 [US3] Highlight Agentic AI category prominently (larger rings, stronger glow, positioned first)
- [X] T038 [US3] Verify mobile responsiveness (skills stack, rings scale appropriately, touch targets 44px minimum)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Smooth Navigation Experience (Priority: P4)

**Goal**: Implement glassmorphic navbar with smooth scroll, hover glow effects, mobile hamburger menu with staggered reveal, and page transitions

**Independent Test**: Can be fully tested by clicking through all navigation items and verifying smooth scrolling, navbar glassmorphism, hover effects, mobile menu functionality, page transitions

### Implementation for User Story 4

- [X] T039 [P] [US4] Create `src/components/navigation/navbar.tsx` with fixed/sticky glass navbar, logo with neon glow, nav links with hover effects, active indicator with layoutId spring animation
- [X] T040 [P] [US4] Create `src/components/navigation/mobile-menu.tsx` with glassmorphic dropdown, staggered link reveal animation, hamburger toggle
- [X] T041 [P] [US4] Create `src/components/navigation/footer.tsx` with social links as glass buttons with hover glow, copyright text
- [X] T042 [US4] Integrate Navbar and Footer into `src/app/layout.tsx` (Navbar fixed at top, Footer at bottom)
- [X] T043 [US4] Implement smooth scroll on nav link clicks (scroll to section or navigate to page)
- [X] T044 [US4] Add active route highlighting in navbar (cyan-400 text + gradient underline with layoutId)
- [X] T045 [US4] Test mobile menu (hamburger tap opens dropdown, links reveal with stagger, close on link click)
- [X] T046 [US4] Verify page transitions work (fade + scale on all route changes via AnimatePresence)

**Checkpoint**: Navigation now works across all pages with smooth transitions and mobile support

---

## Phase 7: User Story 5 - Mobile-First Responsive Experience (Priority: P5)

**Goal**: Ensure pixel-perfect layout across all viewports (320px-1920px), readable typography, 44px touch targets, smooth animations without jank

**Independent Test**: Can be fully tested by viewing site on multiple viewport sizes and verifying layout integrity, readability, touch target sizes, animation performance

### Implementation for User Story 5

- [ ] T047 [P] [US5] Audit all buttons and interactive elements for 44px minimum touch targets (add min-h-[44px], min-w-[44px] where needed)
- [ ] T048 [P] [US5] Configure responsive typography in `tailwind.config.ts` (hero and section sizes with clamp())
- [ ] T049 [US5] Test and fix mobile layout at 320px viewport (no horizontal scroll, text readable, images scale)
- [ ] T050 [US5] Test and fix tablet layout at 768px viewport (grid columns adjust, navbar collapses to hamburger)
- [ ] T051 [US5] Test and fix desktop layout at 1024px, 1440px, 1920px viewports (proper spacing, grid columns, max-width containers)
- [ ] T052 [US5] Verify Lenis smooth scroll works on mobile (touchMultiplier: 2, no jank)
- [ ] T053 [US5] Test hover states gracefully degrade to focus/active on touch devices
- [ ] T054 [US5] Run performance audit (Chrome DevTools Performance tab) and fix any jank or frame drops
- [ ] T055 [US5] Verify `prefers-reduced-motion` support (minimal/fade-only transitions for users who prefer reduced motion)

**Checkpoint**: Site is now fully responsive and performs smoothly on all devices

---

## Phase 8: User Story 6 - About Section with Personality (Priority: P6)

**Goal**: Create about section with glassmorphic layout, profile image with glass frame, staggered text reveal, and subtle background effects

**Independent Test**: Can be fully tested by navigating to /about page and verifying glassmorphism, text animations, profile image frame, background effects

### Implementation for User Story 6

- [X] T056 [P] [US6] Create `src/components/sections/about-teaser.tsx` for homepage preview (optional, links to full about page)
- [X] T057 [P] [US6] Create profile image component with glass frame and neon border (if profile image provided)
- [X] T058 [US6] Create about page `src/app/about/page.tsx` with staggered text reveal, journey story, achievements, background effects
- [X] T059 [US6] Populate about content (bio, journey, achievements, passion for AI)
- [X] T060 [US6] Add subtle background effects (floating particles, code-like matrix vibe, or gradient flows)
- [X] T061 [US6] Verify background effects are subtle (not distracting) and move smoothly

**Checkpoint**: About page now tells Bassam's story with premium visual presentation

---

## Phase 9: User Story 7 - Experience Timeline (Priority: P7)

**Goal**: Display professional experience as vertical timeline with glowing line, glassmorphic cards, alternating layout, hover effects, and staggered entrance

**Independent Test**: Can be fully tested by navigating to /experience page and verifying timeline structure, card animations, hover effects, visual hierarchy

### Implementation for User Story 7

- [X] T062 [P] [US7] Create `src/components/ui/timeline-card.tsx` with glassmorphism, company, role, duration, achievements, technologies, hover effects
- [X] T063 [US7] Create `src/components/sections/experience-timeline.tsx` with glowing vertical line (gradient indigo-purple), alternating cards, staggered entrance animations
- [X] T064 [US7] Create experience page `src/app/experience/page.tsx` with ExperienceTimeline and PageTransition wrapper
- [X] T065 [US7] Populate `src/data/experience.ts` with 4-6 roles (company, role, startDate, endDate, description, achievements, technologies)
- [X] T066 [US7] Implement SVG timeline line with draw animation (stroke-dasharray + stroke-dashoffset)
- [X] T067 [US7] Make timeline responsive (alternating on desktop, stacked on mobile)
- [X] T068 [US7] Verify hover effects on cards (scale 1.02-1.05, lift, glow increase)

**Checkpoint**: Experience timeline now showcases career progression with engaging visual format

---

## Phase 10: User Story 8 - Contact Section with Polish (Priority: P8)

**Goal**: Create contact page with glassmorphic form UI, neon-focused inputs, social link buttons, resume download button with pulse animation

**Independent Test**: Can be fully tested by navigating to /contact page and verifying form styling, input focus glow rings, social buttons, resume button polish

### Implementation for User Story 8

- [X] T069 [P] [US8] Create `src/components/sections/contact-section.tsx` with glassmorphic container, form UI, social links, resume button
- [X] T070 [US8] Create contact page `src/app/contact/page.tsx` with ContactSection and PageTransition wrapper
- [X] T071 [US8] Style form inputs with glassmorphism (bg-black/30, backdrop-blur, border-white/10) and neon focus glow rings (cyan/purple)
- [X] T072 [US8] Implement form state handling (idle → submitting → success) with animations (simulate submission, no backend)
- [X] T073 [US8] Style social links as glass buttons with hover glow and scale (1.05-1.08)
- [X] T074 [US8] Add resume download button with strong neon glow pulse, scale (1.05-1.1), continuous pulse animation
- [X] T075 [US8] Populate `src/data/social.ts` with actual social links (GitHub, LinkedIn, Twitter, email)
- [X] T076 [US8] Verify input focus states use glow rings instead of default browser outlines

**Checkpoint**: All 8 user stories now complete and independently functional

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final polish, accessibility, SEO, performance optimization

- [X] T077 [P] Audit all interactive elements for hover/focus/active states (buttons, links, cards, icons)
- [X] T078 [P] Verify all focus-visible states use neon glow rings (cyan/purple) instead of default blue outlines
- [X] T079 [P] Add aria-labels to all interactive elements (buttons, links, icons, nav)
- [X] T080 [P] Verify semantic HTML throughout (nav, main, section, article, footer with proper headings)
- [X] T081 [P] Add per-page metadata in each page.tsx (title, description, openGraph)
- [X] T082 [P] Add JSON-LD structured data for Person/Portfolio schema in layout.tsx
- [X] T083 [P] Run Lighthouse audit and fix issues (target 95+ Performance, 95+ Accessibility)
- [X] T084 [P] Optimize images (next/image with proper sizes, priority for hero, blur placeholder)
- [X] T085 [P] Verify all animations use GPU-accelerated properties (transform, opacity only)
- [X] T086 [P] Test color contrast meets WCAG AA minimum
- [X] T087 [P] Run mobile check at all breakpoints (320px, 768px, 1024px, 1440px, 1920px)
- [X] T088 [P] Verify constitution compliance (glassmorphism everywhere, neon glows, motion on all elements, dark mode only)
- [X] T089 [P] Remove any unused code, components, or dependencies
- [X] T090 [P] Final README.md update with setup instructions, tech stack, features

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Setup completion - **BLOCKS all user stories**
- **Phases 3-10 (User Stories P1-P8)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → ... → P8)
- **Phase 11 (Polish)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Hero)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2 - Projects)**: Can start after Foundational (Phase 2) - Independent
- **User Story 3 (P3 - Skills)**: Can start after Foundational (Phase 2) - Independent
- **User Story 4 (P4 - Navigation)**: Can start after Foundational (Phase 2) - Independent
- **User Story 5 (P5 - Mobile)**: Can start after Foundational (Phase 2) - Independent (but affects all stories)
- **User Story 6 (P6 - About)**: Can start after Foundational (Phase 2) - Independent
- **User Story 7 (P7 - Experience)**: Can start after Foundational (Phase 2) - Independent
- **User Story 8 (P8 - Contact)**: Can start after Foundational (Phase 2) - Independent

### Within Each User Story

- Models/Data files before components
- UI components before section components
- Section components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: All setup tasks marked [P] can run in parallel (T002-T004, T006)
- **Phase 2**: All foundational tasks marked [P] can run in parallel (T008-T011, T014)
- **Phases 3-10**: Once Foundational complete, all user stories can start in parallel (if team capacity allows)
- **Within each story**: Tasks marked [P] can run in parallel (different files, no dependencies)
- **Phase 11**: All polish tasks marked [P] can run in parallel

---

## Parallel Execution Examples

### Example 1: User Story 1 (Hero) - Parallel Models/UI

```bash
# Launch all UI component creation together:
Task: "T017 [P] [US1] Create src/components/ui/gradient-text.tsx"
Task: "T018 [P] [US1] Create src/components/ui/animated-text.tsx"
Task: "T019 [P] [US1] Create src/components/ui/neon-button.tsx"

# Then implement section:
Task: "T020 [US1] Create src/components/sections/hero-section.tsx"
```

### Example 2: User Story 2 (Projects) - Parallel Components

```bash
# Launch all UI component creation together:
Task: "T024 [P] [US2] Create src/components/ui/tech-badge.tsx"
Task: "T025 [P] [US2] Create src/components/ui/glass-card.tsx"
Task: "T026 [P] [US2] Create src/components/ui/project-card.tsx"

# Then implement section:
Task: "T027 [US2] Create src/components/sections/featured-projects.tsx"
```

### Example 3: Multiple User Stories in Parallel (Team)

```bash
# Developer A: User Story 1 (Hero)
Task: "T017-T023 [US1] Hero Section implementation"

# Developer B: User Story 2 (Projects)
Task: "T024-T030 [US2] Projects Section implementation"

# Developer C: User Story 3 (Skills)
Task: "T032-T038 [US3] Skills Section implementation"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Hero Section)
4. **STOP and VALIDATE**: Test hero section independently - open homepage, verify animations, visual polish
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Hero) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Projects) → Test independently → Deploy/Demo
4. Add User Story 3 (Skills) → Test independently → Deploy/Demo
5. Add User Story 4 (Navigation) → Test independently → Deploy/Demo
6. Continue with Stories 5-8 → Each adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Hero)
   - Developer B: User Story 2 (Projects)
   - Developer C: User Story 3 (Skills)
   - Developer D: User Story 4 (Navigation)
3. Stories complete and integrate independently
4. Regroup for remaining stories (P5-P8)

---

## Task Summary

| Phase | User Story | Task Count | Tasks |
|-------|------------|------------|-------|
| Phase 1 | Setup | 6 | T001-T006 |
| Phase 2 | Foundational | 10 | T007-T016 |
| Phase 3 | US1 (Hero) | 7 | T017-T023 |
| Phase 4 | US2 (Projects) | 8 | T024-T031 |
| Phase 5 | US3 (Skills) | 7 | T032-T038 |
| Phase 6 | US4 (Navigation) | 8 | T039-T046 |
| Phase 7 | US5 (Mobile) | 9 | T047-T055 |
| Phase 8 | US6 (About) | 6 | T056-T061 |
| Phase 9 | US7 (Experience) | 7 | T062-T068 |
| Phase 10 | US8 (Contact) | 8 | T069-T076 |
| Phase 11 | Polish | 14 | T077-T090 |
| **Total** | **All** | **90** | **T001-T090** |

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Tests are NOT included** - this is a visual polish phase, tests added later

---

## Success Criteria

- ✅ All 90 tasks completed
- ✅ All 8 user stories independently testable
- ✅ Lighthouse 95+ Performance and Accessibility
- ✅ Constitution compliance verified (dark theme, glassmorphism, neon glows, Framer Motion)
- ✅ Mobile-first responsive (320px-1920px)
- ✅ 60fps animations without jank
- ✅ Premium "expensive-looking" visual polish throughout
