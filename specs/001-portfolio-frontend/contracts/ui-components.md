# UI Component Contracts

**Purpose**: Define reusable UI component interfaces for the portfolio
**Version**: 1.0.0
**Constitution**: All components MUST use glassmorphism, neon glows, Framer Motion animations

---

## GlassCard

**File**: `src/components/ui/glass-card.tsx`

```typescript
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  rounded?: 'xl' | '2xl'
}
```

**Styling**:
- Background: `bg-black/20` to `bg-black/40`
- Backdrop: `backdrop-blur-xl`
- Border: `border border-white/10`
- Shadow: Neon glow (cyan/purple at 20-40% opacity)
- Hover: `scale(1.03-1.06)`, `translateY(-4 to -8px)`, glow increase
- Transition: `all 300-400ms ease-out`

**Motion**:
- Entrance: `fade-up` + slight scale
- Hover: `whileHover={{ scale, y, boxShadow }}`

---

## NeonButton

**File**: `src/components/ui/neon-button.tsx`

```typescript
interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  download?: string
  icon?: React.ReactNode
  pulse?: boolean
}
```

**Variants**:
- `primary`: Gradient `indigo-500 → purple-600 → fuchsia-500`
- `secondary`: Solid cyan/blue with glow
- `outline`: Border with glow on hover

**Hover Effects**:
- Scale: `1.05-1.1`
- Brightness: `brightness-110`
- Glow: Increase to 60% opacity
- Transition: `300-400ms ease-out`

**Pulse Animation** (optional):
- Continuous subtle glow pulse for resume button

---

## AnimatedText

**File**: `src/components/ui/animated-text.tsx`

```typescript
interface AnimatedTextProps {
  text: string
  variant?: 'hero' | 'heading' | 'body'
  staggerDelay?: number
  enableCursor?: boolean
  className?: string
}
```

**Variants**:
- `hero`: Staggered word-by-word reveal + typing cursor (0.05s delay)
- `heading`: Staggered fade-up + slight scale
- `body`: Staggered fade-up

**Cursor**:
- Blink animation: opacity 0-1 every 500ms
- Color: `cyan-400` or `purple-500`

---

## SkillRing

**File**: `src/components/ui/skill-ring.tsx`

```typescript
interface SkillRingProps {
  name: string
  level?: number
  icon?: React.ReactNode
  category: string
  interactive?: boolean
}
```

**Visual**:
- Ring: SVG circle with `stroke-dasharray` for progress
- Gradient: `indigo → purple → fuchsia`
- Glow: Cyan/purple shadow

**Hover Effects** (if interactive):
- Scale: `1.03-1.06`
- Rotate: `2-5deg`
- Glow: Increase intensity

---

## TimelineCard

**File**: `src/components/ui/timeline-card.tsx`

```typescript
interface TimelineCardProps {
  company: string
  role: string
  duration: string
  achievements: string[]
  technologies: string[]
  align?: 'left' | 'right'
}
```

**Layout**:
- Glass card with `border-white/10`
- Positioned relative to timeline line
- Alternating left/right on desktop, stacked on mobile

**Hover Effects**:
- Scale: `1.02-1.05`
- Lift: `translateY(-4 to -8px)`
- Glow: Increase intensity

---

## GradientText

**File**: `src/components/ui/gradient-text.tsx`

```typescript
interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: 'primary' | 'cyan' | 'purple'
  animate?: boolean
}
```

**Gradients**:
- `primary`: `indigo-500 → purple-600 → fuchsia-500`
- `cyan`: `cyan-400 → blue-500`
- `purple`: `purple-500 → fuchsia-500`

**Animation** (optional):
- Subtle gradient shift background-position animation

---

## TechStackBadge

**File**: `src/components/ui/tech-stack-badge.tsx`

```typescript
interface TechStackBadgeProps {
  name: string
  icon?: React.ReactNode
}
```

**Styling**:
- Glass pill: `bg-black/30`, `backdrop-blur-lg`, `border-white/10`, `rounded-full`
- Padding: `px-3 py-1`
- Font: `text-sm`, `font-medium`
- Glow: Subtle cyan/purple shadow

**Hover**:
- Scale: `1.05-1.08`
- Glow: Increase intensity
