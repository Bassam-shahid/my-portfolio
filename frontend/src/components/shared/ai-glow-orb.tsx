'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AIGlowOrbProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  position?: 'left' | 'right' | 'center'
}

export default function AIGlowOrb({
  className = '',
  size = 'lg',
  position = 'right',
}: AIGlowOrbProps) {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
  }

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }

  return (
    <div
      className={cn(
        'absolute top-1/2 -translate-y-1/2 pointer-events-none',
        positionClasses[position],
        className
      )}
    >
      {/* Outer glow ring */}
      <motion.div
        className={cn(
          'absolute inset-0 rounded-full',
          'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-fuchsia-500/20',
          'blur-3xl',
          sizeClasses[size]
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle ring */}
      <motion.div
        className={cn(
          'absolute inset-4 rounded-full',
          'bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30',
          'blur-2xl',
          sizeClasses[size]
        )}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core glow */}
      <motion.div
        className={cn(
          'absolute inset-8 rounded-full',
          'bg-gradient-to-r from-cyan-400/40 via-purple-400/40 to-fuchsia-400/40',
          'blur-xl',
          sizeClasses[size]
        )}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner bright core */}
      <motion.div
        className={cn(
          'absolute inset-12 rounded-full',
          'bg-gradient-to-r from-cyan-300/50 to-purple-300/50',
          'blur-md',
          sizeClasses[size]
        )}
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
