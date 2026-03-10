import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Apply gradient text styling
 */
export function gradientText(variant: 'primary' | 'cyan' | 'purple' = 'primary') {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent',
    cyan: 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent',
    purple: 'bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent',
  }
  return variants[variant]
}

/**
 * Apply glassmorphism card styling
 */
export function glassCard(variant: 'default' | 'strong' | 'light' = 'default') {
  const variants = {
    default: 'bg-black/30 backdrop-blur-xl border border-white/10',
    strong: 'bg-black/40 backdrop-blur-2xl border border-white/15',
    light: 'bg-black/20 backdrop-blur-lg border border-white/5',
  }
  return variants[variant]
}

/**
 * Apply neon glow shadow
 */
export function neonGlow(variant: 'cyan' | 'purple' | 'fuchsia' | 'gradient' = 'cyan') {
  const variants = {
    cyan: 'shadow-neon-cyan',
    purple: 'shadow-neon-purple',
    fuchsia: 'shadow-neon-fuchsia',
    gradient: 'shadow-neon-gradient',
  }
  return variants[variant]
}

/**
 * Apply button hover scale classes
 */
export function buttonHoverScale(variant: 'sm' | 'md' | 'lg' = 'md') {
  const variants = {
    sm: 'hover:scale-105',
    md: 'hover:scale-108',
    lg: 'hover:scale-110',
  }
  return variants[variant]
}

/**
 * Generate stagger delay for animations
 */
export function staggerDelay(index: number, baseDelay: number = 0.05) {
  return `${index * baseDelay}s`
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Format date for display
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
