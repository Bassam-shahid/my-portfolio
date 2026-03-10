'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { hoverGlowScale } from '@/lib/motion-variants'

interface TechBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'cyan' | 'purple' | 'fuchsia'
  size?: 'sm' | 'md'
  className?: string
  icon?: React.ReactNode
}

export default function TechBadge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  icon,
}: TechBadgeProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
  }

  // Variant styles
  const variantStyles = {
    default: 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20',
    fuchsia: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500/20',
  }

  return (
    <motion.span
      variants={hoverGlowScale}
      initial="rest"
      whileHover="hover"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm',
        'transition-all duration-300 ease-out',
        sizeClasses[size],
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </motion.span>
  )
}
