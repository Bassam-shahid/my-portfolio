# Section Component Contracts

**Purpose**: Define section-level component interfaces for the portfolio
**Version**: 1.0.0
**Constitution**: All sections MUST use glassmorphism, neon glows, staggered animations

---

## HeroSection

**File**: `src/components/sections/hero.tsx`

```typescript
interface HeroSectionProps {
  title: string
  subtitle: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string; download?: string }
}
```

**Components Used**:
- `AnimatedText` (title + subtitle)
- `FloatingOrbs` (background)
- `NeonButton` (CTAs)
- `GradientText` (for emphasis)

**Animations**:
- Text: Staggered word-by-word reveal (0.05s delay per word)
- Orbs: Continuous floating animation (CSS keyframes, 3-6s duration)
- Buttons: Fade-up after text completes (0.3s delay)

**Layout**:
- Full viewport height (`min-h-screen`)
- Centered content
- Orbs positioned absolutely with blur filters

---

## FeaturedProjects

**File**: `src/components/sections/featured-projects.tsx`

```typescript
interface FeaturedProjectsProps {
  projects: Project[]
  title?: string
}
```

**Layout**:
- Grid: 1 col mobile, 2 col tablet, 3 col desktop
- Gap: `gap-6` to `gap-8` (Tailwind spacing)

**Components Per Project**:
- `GlassCard` (container)
- Image (project screenshot with glass border)
- `GradientText` (title)
- `TechStackBadge[]` (pill badges)
- `NeonButton[]` (GitHub, Live Demo)

**Animations**:
- Section header: Fade-up + scale
- Cards: Staggered fade-up (0.1s delay between cards)
- Hover: Scale 1.03-1.06, lift -4 to -8px, glow increase

---

## SkillsSection

**File**: `src/components/sections/skills-section.tsx`

```typescript
interface SkillsSectionProps {
  skills: Skill[]
  title?: string
  layout?: 'cards' | 'rings' | 'badges'
}
```

**Grouping**:
- Group by category: "AI & Machine Learning", "Frontend", "Backend", "DevOps & Tools"
- Category header: Glassmorphic with gradient text

**Layout Options**:
- `cards`: GlassCard per skill with description
- `rings`: SkillRing with progress indicators
- `badges`: TechStackBadge grid (default)

**Animations**:
- Category headers: Staggered fade-up
- Skills: Staggered fade-up (0.05-0.15s delay)
- Hover: Glow + scale + optional rotation (2-5deg for rings)

---

## ExperienceSection

**File**: `src/components/sections/experience-section.tsx`

```typescript
interface ExperienceSectionProps {
  experiences: Experience[]
  title?: string
}
```

**Layout**:
- Vertical timeline line (gradient indigo-purple)
- Alternating cards on desktop (`align-left`, `align-right`)
- Stacked on mobile (all left-aligned)
- Line glow: Subtle continuous animation

**Components**:
- `TimelineCard[]` (experience cards)
- SVG line (timeline connector with gradient)

**Animations**:
- Timeline line: Draw animation (SVG `stroke-dasharray` + `stroke-dashoffset`)
- Cards: Staggered fade-up + slide from sides (0.1-0.15s delay)
- Hover: Scale 1.02-1.05, lift, glow increase

---

## ContactSection

**File**: `src/components/sections/contact-section.tsx`

```typescript
interface ContactSectionProps {
  email: string
  socialLinks: SocialLink[]
  resumeUrl: string
  showForm?: boolean
}
```

**Components**:
- `GlassCard` (section container)
- Form inputs (glass with focus glow rings)
- `NeonButton[]` (social links, resume download)
- `GradientText` (section header)

**Layout**:
- Centered content
- Social links in horizontal row (wrap on mobile)
- Resume button prominent with pulse animation
- Optional static form (name, email, message - non-functional)

**Animations**:
- Section: Fade-up
- Form inputs: Staggered fade-up
- Buttons: Hover glow pulse + scale
- Resume button: Continuous subtle pulse animation

---

## AboutTeaser

**File**: `src/components/sections/about-teaser.tsx`

```typescript
interface AboutTeaserProps {
  content: string
  imageUrl?: string
  readMoreHref?: string
}
```

**Layout**:
- Two-column on desktop (image left, content right)
- Stacked on mobile
- Glassmorphic containers

**Components**:
- `GlassCard` (content container)
- Image (profile with glass frame + neon border)
- `AnimatedText` (content with staggered reveal)
- `NeonButton` (optional "Read More" link)
- `FloatingOrbs` (subtle background effects)

**Animations**:
- Content: Staggered fade-up
- Image: Scale + glow reveal
- Background orbs: Continuous floating

---

## Background Effects

**File**: `src/components/shared/floating-orbs.tsx`

```typescript
interface FloatingOrbsProps {
  count?: number
  colors?: string[]
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}
```

**Visual**:
- Multiple blurred circles (blur-3xl to blur-2xl)
- Colors: cyan-400, purple-500, indigo-500, fuchsia-500
- Opacity: 20-40%

**Animation**:
- Floating: Translate X/Y with CSS keyframes
- Duration: 3-6s (slow), 2-4s (medium), 1-2s (fast)
- Easing: Smooth infinite loop

**Performance**:
- GPU-accelerated (transform only)
- Will-change: transform
- Reduced motion support
