'use client'

import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/motion-variants'
import { prefersReducedMotion } from '@/lib/scroll-helpers'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const reducedMotion = prefersReducedMotion()

  // If reduced motion is preferred, render without animation
  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
