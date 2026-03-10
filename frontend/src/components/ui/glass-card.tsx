'use client'

import { motion } from 'framer-motion'
import { cn, glassCard } from '@/lib/utils'
import { cardHover, neonPulse } from '@/lib/motion-variants'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  rounded?: 'xl' | '2xl' | '4xl'
  variant?: 'default' | 'strong' | 'light'
  glow?: 'cyan' | 'purple' | 'fuchsia' | 'none'
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  padding = 'md',
  rounded = 'xl',
  variant = 'default',
  glow = 'none',
}: GlassCardProps) {
  // Padding classes
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  // Rounded classes
  const roundedClasses = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '4xl': 'rounded-4xl',
  }

  // Glow classes
  const glowClasses = {
    cyan: 'hover:shadow-neon-cyan',
    purple: 'hover:shadow-neon-purple',
    fuchsia: 'hover:shadow-neon-fuchsia',
    none: '',
  }

  return (
    <motion.div
      variants={hover ? cardHover : undefined}
      initial="rest"
      whileHover={hover ? 'hover' : undefined}
      className={cn(
        'backdrop-blur-xl border transition-all duration-300 ease-out',
        glassCard(variant),
        paddingClasses[padding],
        roundedClasses[rounded],
        glow ? glowClasses[glow] : '',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
