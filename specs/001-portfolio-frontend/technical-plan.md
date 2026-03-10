# Technical Implementation Plan: Bassam Shahid Portfolio

**Branch**: `001-portfolio-frontend`
**Phase**: Frontend-Only (Visual Polish & Animations)
**Constitution**: Dark-Futuristic Premium Portfolio v1.0.0
**Tech Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion 11 + Lenis

---

## 1. Project Architecture & Global Setup

### 1.1 Folder Structure Confirmation

**Exact structure per constitution**:

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + Tailwind
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── skills/
│   │   └── page.tsx
│   ├── experience/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── navigation/
│   │   ├── navbar.tsx
│   │   ├── mobile-menu.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── about-teaser.tsx
│   │   ├── featured-projects.tsx
│   │   ├── skills-section.tsx
│   │   ├── experience-timeline.tsx
│   │   └── contact-section.tsx
│   ├── ui/
│   │   ├── glass-card.tsx
│   │   ├── neon-button.tsx
│   │   ├── animated-text.tsx
│   │   ├── gradient-text.tsx
│   │   ├── skill-ring.tsx
│   │   ├── timeline-card.tsx
│   │   └── tech-badge.tsx
│   └── shared/
│       ├── floating-orbs.tsx
│       ├── smooth-scroll.tsx
│       └── page-transition.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── social.ts
│   └── navigation.ts
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── motion-variants.ts      # Reusable Framer Motion presets
│   └── scroll-helpers.ts       # Lenis + scroll utilities
└── styles/
    └── globals.css             # Tailwind imports + custom utilities
```

---

### 1.2 Root Layout Decisions

**File**: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AnimatePresence } from 'framer-motion'
import { SmoothScroll } from '@/components/shared/smooth-scroll'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'Bassam Shahid — Full Stack & Agentic AI Developer',
  description: 'I architect intelligent agents, scalable web platforms, and automation that thinks ahead. 6+ years building premium AI systems.',
  keywords: ['Full Stack Developer', 'Agentic AI', 'AI Engineer', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'Bassam Shahid' }],
  openGraph: {
    title: 'Bassam Shahid — Full Stack & Agentic AI Developer',
    description: 'Premium portfolio showcasing AI-powered systems and full-stack expertise',
    type: 'website',
    locale: 'en_US'
  },
  themeColor: '#0B0F19'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#0B0F19] text-zinc-50">
        <AnimatePresence mode="wait">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AnimatePresence>
      </body>
    </html>
  )
}
```

**Key Decisions**:
- `Inter` font via `next/font/google` (auto-optimized, no layout shift)
- `AnimatePresence` for page transitions (fade + scale)
- `SmoothScroll` wrapper for Lenis integration
- Dark theme hardcoded (`bg-[#0B0F19]`) — no light mode
- `suppressHydrationWarning` for Next.js + Framer Motion compatibility

---

### 1.3 Custom Tailwind Extensions

**File**: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // Colors — Dark Futuristic Palette
      colors: {
        background: '#0B0F19',
        surface: '#0F1623',
        'surface-glass': 'rgba(15, 22, 35, 0.6)',
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',  // Indigo
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81'
        },
        neon: {
          cyan: '#22D3EE',
          blue: '#3B82F6',
          purple: '#A855F7',
          fuchsia: '#D946EF'
        }
      },
      
      // Glassmorphism Utilities
      backgroundColor: {
        'glass': 'rgba(0, 0, 0, 0.2)',
        'glass-strong': 'rgba(0, 0, 0, 0.4)'
      },
      backdropBlur: {
        'xl': '24px',
        '2xl': '40px'
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-strong': 'rgba(255, 255, 255, 0.15)'
      },
      
      // Neon Glow Shadows
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.4)',
        'neon-cyan-lg': '0 0 40px rgba(34, 211, 238, 0.6)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'neon-purple-lg': '0 0 40px rgba(168, 85, 247, 0.6)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'neon-fuchsia': '0 0 20px rgba(217, 70, 239, 0.4)',
        'neon-gradient': '0 0 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)'
      },
      
      // Gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #D946EF 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
        'gradient-purple': 'linear-gradient(135deg, #A855F7 0%, #D946EF 100%)',
        'gradient-radial': 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)'
      },
      
      // Animations
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(168, 85, 247, 0.7)' }
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      },
      
      // Spacing for Touch Targets
      spacing: {
        '18': '4.5rem',  // 72px — comfortable mobile tap
        '22': '5.5rem'   // 88px — large touch target
      },
      
      // Border Radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      
      // Typography
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.1', fontWeight: '800' }],
        'section': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '700' }]
      }
    }
  },
  plugins: []
}

export default config
```

---

### 1.4 Utility Files

**File**: `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function gradientText(...classes: string[]) {
  return cn(
    'bg-clip-text text-transparent bg-gradient-primary',
    ...classes
  )
}

export function glassCard(hover = false) {
  return cn(
    'bg-glass backdrop-blur-xl border border-glass rounded-xl',
    'shadow-glass',
    hover && 'hover:scale-[1.03] hover:-translate-y-1 hover:shadow-neon-purple transition-all duration-300'
  )
}
```

**File**: `src/lib/motion-variants.ts`

```typescript
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const hoverGlowScale: Variants = {
  hover: {
    scale: 1.05,
    y: -4,
    boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 }
  }
}

export const neonPulse: Variants = {
  pulse: {
    boxShadow: [
      '0 0 20px rgba(168, 85, 247, 0.4)',
      '0 0 40px rgba(168, 85, 247, 0.7)',
      '0 0 20px rgba(168, 85, 247, 0.4)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export const typingCursor: Variants = {
  blink: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'stepEnd'
    }
  }
}

export const floatOrb: Variants = {
  float: {
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}
```

**File**: `src/lib/scroll-helpers.ts`

```typescript
// Lenis configuration
export const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical' as const,
  gestureDirection: 'vertical' as const,
  smooth: true,
  mouseMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
  wheelMultiplier: 1
}

// Scroll-triggered animation viewport options
export const viewportOptions = {
  once: true,      // Trigger only once
  margin: '-100px' // Start animation 100px before element enters
}

// Reduced motion check
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
```

---

## 2. Animation & Interaction System (Core to Premium Feel)

### 2.1 Global Framer Motion Patterns

**All animations use GPU-accelerated properties only** (transform, opacity).

```typescript
// Pattern 1: Section Reveal
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={viewportOptions}
  variants={staggerContainer}
>
  {children.map((child, i) => (
    <motion.div key={i} variants={fadeUp}>
      {child}
    </motion.div>
  ))}
</motion.section>

// Pattern 2: Card Hover Effect
<motion.div
  variants={hoverGlowScale}
  whileHover="hover"
  whileTap="tap"
  className={glassCard(true)}
>
  {/* Card content */}
</motion.div>

// Pattern 3: Typing Effect (Hero)
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <motion.span
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
  >
    {"Hi, I'm Bassam Shahid".split('').map((char, i) => (
      <motion.span key={i} variants={fadeUp} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.span>
  <motion.span
    variants={typingCursor}
    animate="blink"
    className="inline-block w-[2px] h-8 bg-cyan-400 ml-1"
  />
</motion.div>
```

---

### 2.2 Lenis Integration Strategy

**File**: `src/components/shared/smooth-scroll.tsx`

```typescript
'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { lenisOptions } from '@/lib/scroll-helpers'

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis(lenisOptions)
    lenisRef.current = lenis

    // RAF loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return <div className="overflow-hidden">{children}</div>
}
```

**Options Rationale**:
- `duration: 1.2`: Smooth momentum without feeling sluggish
- `easing`: Custom exponential ease for premium feel
- `touchMultiplier: 2`: Better mobile scroll response
- `wheelMultiplier: 1`: Precise desktop control

---

### 2.3 Scroll-Triggered Animations Best Practices

```typescript
// ✅ Good: Trigger once, with margin
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>

// ✅ Good: Stagger children
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-50px' }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeUp}>
      {item.name}
    </motion.div>
  ))}
</motion.div>

// ❌ Bad: Triggers every scroll
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}  // No 'once: true'
>
  Content
</motion.div>
```

---

### 2.4 Micro-Interaction Rules

**EVERY interactive element MUST have**:

```typescript
// Button: Hover + Tap + Focus
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.97 }}
  className="
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-cyan-400
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#0B0F19]
  "
>
  Click Me
</motion.button>

// Link: Hover + Focus
<motion.a
  href="/projects"
  whileHover={{ scale: 1.02, color: '#22D3EE' }}
  className="
    transition-colors duration-300
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-cyan-400
  "
>
  Projects
</motion.a>

// Card: Hover + Tap
<motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  whileTap={{ scale: 0.99 }}
  className={glassCard(true)}
>
  Card Content
</motion.div>

// Icon: Hover
<motion.svg
  whileHover={{ scale: 1.1, rotate: 5 }}
  className="transition-colors duration-300"
>
  {/* Icon paths */}
</motion.svg>
```

---

### 2.5 Page Transition Setup

**File**: `src/components/shared/page-transition.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
```

**Usage in pages**:

```typescript
// src/app/about/page.tsx
'use client'

import { PageTransition } from '@/components/shared/page-transition'

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Page content */}
    </PageTransition>
  )
}
```

---

## 3. Phased Development Roadmap

### Phase 1: Foundation & Shell (1-2 days)

#### 1.1 Setup globals.css + tailwind.config

```bash
# Install dependencies
npm install framer-motion @studio-freight/lenis clsx tailwind-merge lucide-react
npm install -D @types/node

# Verify Tailwind v4 setup
npx tailwindcss init -p
```

**File**: `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #0B0F19;
    --foreground: #FAFAFA;
  }

  * {
    @apply border-glass;
  }

  body {
    @apply bg-background text-foreground antialiased;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-background;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-white/10 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-white/20;
  }
}

@layer components {
  .glass {
    @apply bg-glass backdrop-blur-xl border border-glass;
  }

  .glass-strong {
    @apply bg-glass-strong backdrop-blur-2xl border border-glass-strong;
  }

  .neon-text {
    @apply text-transparent bg-clip-text bg-gradient-primary;
  }

  .neon-shadow {
    @apply shadow-neon-gradient;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite;
  }
}
```

---

#### 1.2 Navbar (Fixed Glass + Neon Text)

**File**: `src/components/navigation/navbar.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/navigation'
import { MobileMenu } from './mobile-menu'

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled 
            ? 'glass-strong py-3 shadow-neon-purple/20' 
            : 'bg-transparent py-5'
        )}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold neon-text"
            >
              BS
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-primary group-hover:w-full transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div key={item.href} whileHover={{ scale: 1.05 }}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors duration-300',
                    pathname === item.href
                      ? 'text-cyan-400'
                      : 'text-zinc-200 hover:text-white'
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 text-zinc-200 hover:text-white"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </motion.button>
        </nav>
      </motion.header>

      <MobileMenu 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />
    </>
  )
}
```

---

#### 1.3 Footer (Simple Social Icons with Glow)

**File**: `src/components/navigation/footer.tsx`

```typescript
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import { socialLinks } from '@/data/social'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail
}

export function Footer() {
  return (
    <footer className="glass-strong border-t border-glass py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.platform as keyof typeof iconMap]
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 glass rounded-full hover:shadow-neon-cyan transition-all duration-300"
                  aria-label={link.label}
                >
                  <Icon size={20} className="text-zinc-200" />
                </motion.a>
              )
            })}
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-400 flex items-center gap-2">
            <span>© {new Date().getFullYear()} Bassam Shahid</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>Built with Next.js + Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

#### 1.4 SmoothScroll Wrapper

Already defined in Section 2.2.

---

#### 1.5 Basic Layout with Providers

Already defined in Section 1.2.

---

### Phase 2: Home Page – Hero & Teasers (Core Wow Factor)

#### 2.1 Hero Section

**File**: `src/components/sections/hero-section.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { FloatingOrbs } from '@/components/shared/floating-orbs'
import { NeonButton } from '@/components/ui/neon-button'
import { AnimatedText } from '@/components/ui/animated-text'
import { staggerContainer, fadeUp } from '@/lib/motion-variants'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Orbs */}
      <FloatingOrbs count={3} speed="slow" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Greeting + Name */}
          <AnimatedText
            text="Hi, I'm Bassam Shahid"
            variant="hero"
            enableCursor
            className="text-hero neon-text mb-6"
          />

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-zinc-200 mb-8 max-w-2xl mx-auto"
          >
            Full Stack & Agentic AI Developer
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            I architect intelligent agents, scalable web platforms, and automation that thinks ahead.
            Transforming complex AI systems into elegant, production-ready solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <NeonButton
              variant="primary"
              href="/projects"
              icon={<ArrowRight size={18} />}
            >
              View My Work
            </NeonButton>

            <NeonButton
              variant="outline"
              href="/resume.pdf"
              download="Bassam-Shahid-Resume.pdf"
              icon={<Download size={18} />}
              pulse
            >
              Download Resume
            </NeonButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 glass rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-cyan-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

---

#### 2.2 Floating Orbs Component

**File**: `src/components/shared/floating-orbs.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { floatOrb } from '@/lib/motion-variants'

interface FloatingOrbsProps {
  count?: number
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}

const speedDuration = {
  slow: 8,
  medium: 5,
  fast: 3
}

export function FloatingOrbs({ count = 3, speed = 'slow', className }: FloatingOrbsProps) {
  const duration = speedDuration[speed]

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          variants={floatOrb}
          animate="float"
          className={cn(
            'absolute rounded-full blur-3xl opacity-30',
            i === 0 && 'w-96 h-96 bg-indigo-500/40 top-1/4 left-1/4',
            i === 1 && 'w-80 h-80 bg-purple-500/40 top-1/2 right-1/4',
            i === 2 && 'w-72 h-72 bg-cyan-500/40 bottom-1/4 left-1/3'
          )}
          style={{
            animationDelay: `${i * 2}s`,
            animationDuration: `${duration}s`
          }}
        />
      ))}
    </div>
  )
}
```

---

#### 2.3 Teaser Sections (About, Skills, Projects, Experience, Contact)

Each teaser is a preview linking to full page. Structure:

```typescript
// Example: About Teaser
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
  variants={staggerContainer}
  className="py-20"
>
  <div className="container mx-auto px-4">
    <motion.div variants={fadeUp} className="text-center mb-12">
      <h2 className="text-section neon-text mb-4">About Me</h2>
      <p className="text-zinc-300 max-w-2xl mx-auto">
        Passionate about building AI systems that think ahead...
      </p>
    </motion.div>

    <motion.div variants={fadeUp}>
      {/* Glass card with preview content */}
    </motion.div>

    <motion.div variants={fadeUp} className="text-center mt-8">
      <NeonButton href="/about" variant="outline">
        Learn More
      </NeonButton>
    </motion.div>
  </div>
</motion.section>
```

---

### Phase 3: Static Content Pages

#### 3.1 /about Page

**File**: `src/app/about/page.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/shared/page-transition'
import { GlassCard } from '@/components/ui/glass-card'
import { staggerContainer, fadeUp } from '@/lib/motion-variants'

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h1 className="text-section neon-text mb-4">About Me</h1>
              <p className="text-xl text-zinc-300">
                Building the future with AI, one agent at a time
              </p>
            </motion.div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <GlassCard hover>
                {/* Journey content */}
              </GlassCard>
              <GlassCard hover>
                {/* Achievements content */}
              </GlassCard>
            </div>

            {/* Full Bio */}
            <GlassCard>
              {/* Extended bio text */}
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  )
}
```

---

#### 3.2 /projects Page

**File**: `src/components/ui/project-card.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import { GlassCard } from './glass-card'
import { TechBadge } from './tech-badge'
import { hoverGlowScale } from '@/lib/motion-variants'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  techStack,
  githubUrl,
  liveUrl,
  featured
}: ProjectCardProps) {
  return (
    <motion.div
      variants={hoverGlowScale}
      whileHover="hover"
      whileTap="tap"
    >
      <GlassCard className="overflow-hidden group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold neon-text mb-2">{title}</h3>
          <p className="text-zinc-300 mb-4 line-clamp-2">{description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-neon-cyan transition-all"
              >
                <Github size={16} />
                <span className="text-sm">Code</span>
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-neon-purple transition-all"
              >
                <ExternalLink size={16} />
                <span className="text-sm">Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
```

---

#### 3.3 /skills Page

**File**: `src/components/ui/skill-ring.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkillRingProps {
  name: string
  level?: number
  icon?: React.ReactNode
  category: string
}

export function SkillRing({ name, level = 75, icon, category }: SkillRingProps) {
  const circumference = 2 * Math.PI * 45 // r = 45
  const strokeDashoffset = circumference - (level / 100) * circumference

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      className="flex flex-col items-center gap-3 p-6 glass rounded-2xl"
    >
      {/* Ring SVG */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#D946EF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {icon || <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center" />}
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-bold text-white">{name}</h3>
        <p className="text-sm text-zinc-400">{category}</p>
      </div>
    </motion.div>
  )
}
```

---

#### 3.4 /experience Page

**File**: `src/components/ui/timeline-card.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { GlassCard } from './glass-card'
import { TechBadge } from './tech-badge'

interface TimelineCardProps {
  company: string
  role: string
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
  align: 'left' | 'right'
}

export function TimelineCard({
  company,
  role,
  duration,
  description,
  achievements,
  technologies,
  align
}: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -50 : 50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={cn(
        'relative mb-12',
        align === 'left' ? 'md:mr-auto md:w-[calc(50%-2rem)]' : 'md:ml-auto md:w-[calc(50%-2rem)]'
      )}
    >
      {/* Timeline dot */}
      <div className="absolute top-6 w-4 h-4 bg-gradient-primary rounded-full shadow-neon-cyan-lg" />

      <GlassCard className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold neon-text">{role}</h3>
            <p className="text-zinc-300">{company}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Calendar size={14} />
            <span>{duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-300 mb-4">{description}</p>

        {/* Achievements */}
        <ul className="space-y-2 mb-4">
          {achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-zinc-300">
              <Briefcase size={16} className="mt-1 text-cyan-400 flex-shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
```

---

### Phase 4: Contact & Final Polish

#### 4.1 /contact Page (Form UI Only)

**File**: `src/app/contact/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { PageTransition } from '@/components/shared/page-transition'
import { GlassCard } from '@/components/ui/glass-card'
import { NeonButton } from '@/components/ui/neon-button'
import { staggerContainer, fadeUp } from '@/lib/motion-variants'

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    // Simulate submission (no backend)
    setTimeout(() => {
      setFormState('success')
    }, 1500)
  }

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h1 className="text-section neon-text mb-4">Get In Touch</h1>
              <p className="text-xl text-zinc-300">
                Let's build something amazing together
              </p>
            </motion.div>

            {/* Form */}
            <GlassCard className="p-8">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={64} className="mx-auto text-green-400 mb-4" />
                  <h2 className="text-2xl font-bold neon-text mb-2">Message Sent!</h2>
                  <p className="text-zinc-300">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 glass bg-glass-strong border border-glass rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                        transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 glass bg-glass-strong border border-glass rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                        transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 glass bg-glass-strong border border-glass rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                        transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <NeonButton
                      type="submit"
                      variant="primary"
                      icon={<Send size={18} />}
                      disabled={formState === 'submitting'}
                      className="w-full"
                    >
                      {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                    </NeonButton>
                  </motion.div>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  )
}
```

---

#### 4.2 Global Polish Checklist

**Micro-interactions Audit**:

- [ ] All buttons have hover + tap + focus states
- [ ] All links have hover + focus states
- [ ] All cards have hover lift + glow
- [ ] All icons have hover scale + glow
- [ ] All inputs have focus glow rings (not default blue)
- [ ] All sections have scroll-triggered entrance animations
- [ ] Page transitions work on navigation
- [ ] Mobile menu has staggered link reveal
- [ ] Resume button has continuous pulse animation

**Accessibility Tweaks**:

- [ ] All interactive elements have `aria-label`
- [ ] Focus-visible rings use neon glow (cyan/purple)
- [ ] `prefers-reduced-motion` respected
- [ ] Color contrast meets WCAG AA
- [ ] Semantic HTML throughout (nav, main, section, article, footer)

**SEO Per-Page Metadata**:

```typescript
// Each page.tsx
export const metadata: Metadata = {
  title: 'About — Bassam Shahid',
  description: 'Learn about Bassam Shahid's journey as a Full Stack & Agentic AI Developer'
}
```

---

## 4. Key Reusable Components List & Design

| Component | File | Purpose |
|-----------|------|---------|
| `GlassCard` | `src/components/ui/glass-card.tsx` | Base glassmorphism container with optional hover |
| `NeonButton` | `src/components/ui/neon-button.tsx` | Gradient button with glow + pulse variants |
| `AnimatedText` | `src/components/ui/animated-text.tsx` | Staggered reveal + typing cursor |
| `GradientText` | `src/components/ui/gradient-text.tsx` | Gradient text with optional animation |
| `ProjectCard` | `src/components/ui/project-card.tsx` | Project showcase with image + tech badges |
| `SkillRing` | `src/components/ui/skill-ring.tsx` | Animated progress ring for skills |
| `TimelineCard` | `src/components/ui/timeline-card.tsx` | Experience card with alternating layout |
| `TechBadge` | `src/components/ui/tech-badge.tsx` | Glass pill badge for technologies |
| `FloatingOrbs` | `src/components/shared/floating-orbs.tsx` | Background animated gradient blobs |
| `SmoothScroll` | `src/components/shared/smooth-scroll.tsx` | Lenis wrapper |
| `PageTransition` | `src/components/shared/page-transition.tsx` | Fade + scale page transitions |

---

## 5. Performance & Quality Checklist

### Image Optimization

```typescript
// ✅ Always use Next.js Image
<Image
  src="/images/projects/ai-agent.png"
  alt="AI Agent Platform"
  width={800}
  height={600}
  priority  // Hero/above-fold
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="rounded-xl"
/>
```

### Lazy/Dynamic Imports

```typescript
// Heavy motion sections
const FeaturedProjects = dynamic(
  () => import('@/components/sections/featured-projects').then(mod => mod.FeaturedProjects),
  { ssr: false }
)
```

### CLS Prevention

- All images have explicit `width`/`height` or `aspect-ratio`
- Fonts use `next/font` with `display: 'swap'`
- Skeleton loaders for async content

### LCP Optimization

- Hero image uses `priority`
- Critical CSS inlined by Tailwind
- Minimal client components on initial load

### Code Splitting

- App Router automatically splits by route
- Dynamic imports for below-fold sections

---

## 6. Accessibility & SEO Frontend Touches

### Semantic HTML

```typescript
<nav aria-label="Main navigation">...</nav>
<main id="main-content">...</main>
<section aria-labelledby="projects-heading">...</section>
<article>...</article>
<footer>...</footer>
```

### Focus-visible Glow

```css
.focus-visible-glow {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19];
}
```

### JSON-LD (Optional)

```typescript
// In layout.tsx or page.tsx
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bassam Shahid",
  "jobTitle": "Full Stack & Agentic AI Developer",
  "url": "https://bassam.dev",
  "sameAs": [
    "https://github.com/bassam",
    "https://linkedin.com/in/bassam-shahid"
  ]
}

// In JSX
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
/>
```

---

## 7. Milestones & Testing Notes

### After Each Phase

1. **Mobile Check**: Test at 320px, 768px, 1024px, 1440px
2. **Animation Smoothness**: Chrome DevTools > Performance > Record scroll
3. **Lighthouse Run**: Target 95+ Performance, 95+ Accessibility
4. **Constitution Compliance**: Verify glassmorphism, neon glows, motion on all elements

### Tools

- **React DevTools**: Inspect component tree, check motion props
- **Chrome Performance Tab**: Identify jank, long tasks
- **Lighthouse**: Performance/Accessibility/SEO scores
- **WebPageTest**: LCP, CLS, FID metrics

---

## Constitution Alignment Summary

| Principle | Implementation |
|-----------|----------------|
| Visual Excellence | Glassmorphism everywhere, neon glows, gradient text, floating orbs |
| Animation-First | Framer Motion on all elements, staggered reveals, hover effects |
| Dark Mode Only | Hardcoded `#0B0F19` background, no light mode toggle |
| Performance Budget | `next/image`, `next/font`, GPU-accelerated animations, LCP <2.5s |
| TypeScript Strict | All components fully typed, no `any` |
| Mobile-First | Tailwind breakpoints, 44px touch targets, responsive typography |

---

**This plan is executable. Each section maps to concrete files and code. Follow the phased roadmap, reference the component contracts, and maintain constitution compliance throughout.**
