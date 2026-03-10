'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: 'cyan-purple' | 'purple-blue' | 'cyan-blue'
  speed?: 'slow' | 'normal' | 'fast'
}

export default function AnimatedGradientText({
  children,
  className = '',
  variant = 'cyan-purple',
  speed = 'normal',
}: AnimatedGradientTextProps) {
  const variantClasses = {
    'cyan-purple': 'from-cyan-400 via-purple-400 to-fuchsia-400',
    'purple-blue': 'from-purple-400 via-blue-400 to-cyan-400',
    'cyan-blue': 'from-cyan-400 via-blue-500 to-purple-500',
  }

  const speedClasses = {
    slow: 'duration-[3s]',
    normal: 'duration-[2s]',
    fast: 'duration-[1.5s]',
  }

  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r bg-300% bg-clip-text text-transparent',
        variantClasses[variant],
        speedClasses[speed],
        className
      )}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: speed === 'slow' ? 3 : speed === 'fast' ? 1.5 : 2,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}
