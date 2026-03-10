'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CursorBarProps {
  className?: string
  color?: 'cyan' | 'purple' | 'white'
  height?: 'sm' | 'md' | 'lg'
}

export default function CursorBar({
  className = '',
  color = 'cyan',
  height = 'md',
}: CursorBarProps) {
  const colorClasses = {
    cyan: 'bg-gradient-to-b from-cyan-400 to-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.6)]',
    purple: 'bg-gradient-to-b from-purple-400 to-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    white: 'bg-gradient-to-b from-white to-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
  }

  const heightClasses = {
    sm: 'h-6 w-1',
    md: 'h-8 w-1.5',
    lg: 'h-10 w-2',
  }

  return (
    <motion.span
      className={cn(
        'inline-block rounded-full',
        heightClasses[height],
        colorClasses[color],
        className
      )}
      animate={{
        opacity: [1, 0.3, 1],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
