'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { wordStagger, staggerContainer, typingCursor } from '@/lib/motion-variants'
import { prefersReducedMotion } from '@/lib/scroll-helpers'

interface AnimatedTextProps {
  text: string
  variant?: 'hero' | 'heading' | 'body'
  staggerDelay?: number
  enableCursor?: boolean
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export default function AnimatedText({
  text,
  variant = 'hero',
  staggerDelay = 0.05,
  enableCursor = false,
  className = '',
  as = 'p',
}: AnimatedTextProps) {
  const reducedMotion = prefersReducedMotion()
  const Component = as

  // Split text into words for staggered animation
  const words = text.split(' ')

  // Hero variant: word-by-word stagger with larger text
  if (variant === 'hero') {
    return (
      <Component className={cn('text-4xl md:text-6xl lg:text-7xl font-bold leading-tight', className)}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-wrap"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordStagger}
              style={{ marginRight: '0.25em' }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
          {enableCursor && (
            <motion.span
              variants={typingCursor}
              className="inline-block w-1 h-10 md:h-12 lg:h-14 bg-cyan-400 ml-1"
            />
          )}
        </motion.div>
      </Component>
    )
  }

  // Heading variant: fade up with slight scale
  if (variant === 'heading') {
    return (
      <Component className={cn('text-2xl md:text-4xl font-semibold', className)}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="flex flex-wrap"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordStagger}
              style={{ marginRight: '0.25em' }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </Component>
    )
  }

  // Body variant: simple fade up
  return (
    <Component className={cn('text-lg md:text-xl', className)}>
      {reducedMotion ? (
        text
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={wordStagger}
        >
          {text}
        </motion.div>
      )}
    </Component>
  )
}
