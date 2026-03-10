'use client'

import { motion } from 'framer-motion'
import { cn, gradientText } from '@/lib/utils'
import { fadeUp } from '@/lib/motion-variants'

interface GradientTextProps {
  children: React.ReactNode
  variant?: 'primary' | 'cyan' | 'purple'
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  animate?: boolean
}

export default function GradientText({
  children,
  variant = 'primary',
  className = '',
  as = 'span',
  animate = false,
}: GradientTextProps) {
  const Component = as

  const content = (
    <span className={cn(gradientText(variant), className)}>
      {children}
    </span>
  )

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
      >
        <Component>{content}</Component>
      </motion.div>
    )
  }

  return <Component>{content}</Component>
}
