# Technical Research: Portfolio Frontend

**Feature**: 001-portfolio-frontend
**Date**: 2026-02-26
**Purpose**: Resolve all NEEDS CLARIFICATION items from Technical Context

---

## Animation Library: Framer Motion 11+

**Decision**: Use Framer Motion 11+ as exclusive animation library

**Rationale**: 
- Constitution mandates Framer Motion as exclusive animation library
- Declarative API aligns with React patterns
- Excellent performance with GPU-accelerated transforms
- `AnimatePresence` enables page transitions
- `useAnimation` hook for complex interactive animations
- `whileInView` prop for scroll-triggered animations
- `staggerChildren`, `delayChildren` variants for choreographed reveals

**Alternatives Considered**:
- **GSAP**: More powerful timeline control but heavier bundle (17kb vs 14kb), imperative API conflicts with React patterns
- **CSS Animations Only**: Insufficient for complex staggered reveals, interactive hover states, and dynamic animations
- **React Spring**: Physics-based animations less suited for precise choreographed sequences required by constitution

**References**:
- https://www.framer.com/motion/
- https://www.framer.com/motion/animation/

---

## Smooth Scroll: Lenis

**Decision**: Use Lenis (`@studio-freight/lenis` or `react-lenis`) for global smooth scrolling

**Rationale**:
- Constitution mandates Lenis for "buttery smooth global scrolling"
- Lightweight (~6kb) momentum-based smooth scroll
- Seamless Next.js integration
- No conflicts with native scroll behavior
- Preserves accessibility (keyboard navigation, focus management)
- Works with `prefers-reduced-motion`

**Alternatives Considered**:
- **Locomotive Scroll**: Heavier (~15kb), requires additional setup, virtual scroll conflicts with some React patterns
- **Native CSS smooth-scroll**: `scroll-behavior: smooth` insufficient polish for premium feel
- **react-use-gesture**: Overkill for scroll-only requirement

**References**:
- https://github.com/studio-freight/lenis
- https://react-lenis.vercel.app/

---

## Font Optimization: next/font/google

**Decision**: Use Next.js built-in font optimization for Inter font

**Rationale**:
- Automatically self-hosts Inter font (optimal performance)
- Eliminates layout shift (fonts preloaded)
- Critical for LCP <2.5s requirement
- Zero extra dependencies (built into Next.js)
- Automatic format optimization (WOFF2)

**Alternatives Considered**:
- **Google Fonts CDN**: Potential layout shift, slower loading, external dependency
- **System Fonts**: Fastest but insufficient premium aesthetic
- **Manual self-hosting**: More configuration, next/font automates this

**References**:
- https://nextjs.org/docs/app/building-your-application/optimizing/fonts

---

## Component Styling: Tailwind CSS v4 + Custom shadcn/ui

**Decision**: Tailwind CSS v4 with heavily customized shadcn/ui components

**Rationale**:
- Constitution requires Tailwind CSS v4
- Rapid development with utility-first approach
- Consistent design tokens (colors, spacing, typography)
- shadcn/ui provides accessible base components to customize
- Copy-paste components (no runtime dependency)
- Full TypeScript support

**Alternatives Considered**:
- **CSS Modules**: Slower development, less consistent design system
- **Styled Components**: Runtime overhead, conflicts with Next.js SSR optimization
- **Plain CSS**: Unmaintainable at scale, no design tokens
- **Panda CSS**: Zero-runtime but steeper learning curve

**References**:
- https://tailwindcss.com/
- https://ui.shadcn.com/

---

## Icon Library: Lucide React

**Decision**: Lucide React for all icons

**Rationale**:
- Constitution specifies Lucide React
- Modern, consistent 1.5px stroke width
- Tree-shakeable (only import used icons)
- Excellent TypeScript types
- Matches premium aesthetic with clean lines
- 1000+ icons covering all needs

**Alternatives Considered**:
- **Heroicons**: Good but less variety (200 vs 1000+ icons)
- **React Icons**: Larger bundle, inconsistent styles across icon sets
- **Feather Icons**: Limited selection (250 icons), less maintained

**References**:
- https://lucide.dev/
- https://github.com/lucide-icons/lucide

---

## Typography Effects: Framer Motion (not react-type-animation)

**Decision**: Use Framer Motion for typing effects and all text animations

**Rationale**:
- Constitution allows Framer Motion for typing effects
- Using single library reduces dependencies
- Consistent behavior across all animations
- `staggerChildren` and `delayChildren` variants handle typing effect elegantly
- Better integration with other motion components

**Alternatives Considered**:
- **react-type-animation**: Simpler API but adds dependency for single use case, less flexible
- **CSS Animations**: Less control over timing, interaction, and dynamic content

**Implementation**:
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

---

## Best Practice: GPU-Accelerated Animations

**Decision**: All animations MUST use GPU-accelerated properties

**Rationale**:
- Constitution enforces GPU-accelerated properties to prevent jank
- Maintain 60fps for premium feel
- Transform and opacity are compositor-only properties
- Avoid triggering layout recalculation

**Implementation**:
- **Use**: `translateX/Y/Z`, `scale`, `rotate`, `opacity`, `will-change`
- **Avoid**: `width`, `height`, `top`, `left`, `margin`, `padding` (trigger layout)

**Example**:
```typescript
// ✅ Good: GPU-accelerated
motion.div({
  animate: { 
    x: [0, 100, 0],  // translateX
    scale: [1, 1.05, 1],
    opacity: [0, 1, 0]
  }
})

// ❌ Bad: Triggers layout
motion.div({
  animate: { 
    left: [0, 100, 0],  // Layout recalculation
    width: [100, 200, 100]
  }
})
```

---

## Best Practice: Mobile-First Breakpoints

**Decision**: Mobile-first responsive design with Tailwind breakpoints

**Rationale**:
- Constitution requires mobile-first pixel-perfect design
- 60%+ traffic is mobile
- Tailwind's mobile-first approach aligns with constitution

**Implementation**:
```typescript
// Tailwind default breakpoints (mobile-first)
// sm: 640px   (tablet portrait)
// md: 768px   (tablet landscape)
// lg: 1024px  (desktop)
// xl: 1280px  (large desktop)
// 2xl: 1536px (extra large desktop)

// Example: Mobile-first styling
<div className="
  text-sm        // Mobile: 14px
  sm:text-base   // Tablet: 16px
  lg:text-lg     // Desktop: 18px
  xl:text-xl     // Large: 20px
">
```

**Touch Targets**:
- Minimum 44px height/width (constitution requirement)
- Use `min-h-[44px]`, `min-w-[44px]` classes

---

## Best Practice: Reduced Motion Support

**Decision**: Respect `prefers-reduced-motion` media query

**Rationale**:
- Constitution requires respecting user motion preferences
- Accessibility compliance (WCAG 2.1 Level AA)
- Lighthouse Accessibility score requirement (95+)

**Implementation**:

**Option 1: Global Framer Motion config**
```typescript
// In layout.tsx or root component
import { domMax, LazyMotion } from 'framer-motion'

<LazyMotion features={domMax}>
  <AnimatePresence reduceMotion>
    {/* Page transitions */}
  </AnimatePresence>
</LazyMotion>
```

**Option 2: CSS media query**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Option 3: Component-level**
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  // Framer Motion automatically respects prefers-reduced-motion
/>
```

---

## Summary of Technical Decisions

| Decision | Choice | Constitution Principle |
|----------|--------|----------------------|
| Animation Library | Framer Motion 11+ | II. Animation-First |
| Smooth Scroll | Lenis | II. Animation-First |
| Font Loading | next/font/google | IV. Performance Budget |
| Styling | Tailwind CSS v4 + shadcn/ui | I. Visual Excellence |
| Icons | Lucide React | I. Visual Excellence |
| Typography Effects | Framer Motion | II. Animation-First |
| Animation Performance | GPU-accelerated only | IV. Performance Budget |
| Responsive Design | Mobile-first breakpoints | VI. Mobile-First |
| Accessibility | Reduced motion support | IV. Performance Budget |

**All NEEDS CLARIFICATION items resolved. Proceeding to Phase 1 design.**
