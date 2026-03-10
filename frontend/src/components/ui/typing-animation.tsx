'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TypingAnimationProps {
  text: string
  className?: string
  cursorColor?: 'cyan' | 'blue' | 'purple' | 'white'
  typingSpeed?: number
  deleteSpeed?: number
  delayBeforeDelete?: number
  loop?: boolean
}

export default function TypingAnimation({
  text,
  className = '',
  cursorColor = 'blue',
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBeforeDelete = 2000,
  loop = true,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const cursorColors = {
    cyan: 'from-cyan-400 to-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.6)]',
    blue: 'from-blue-400 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.6)]',
    purple: 'from-purple-400 to-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    white: 'from-white to-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!isPaused) {
      if (!isDeleting) {
        // Typing
        if (currentIndex < text.length) {
          timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, currentIndex + 1))
            setCurrentIndex(currentIndex + 1)
          }, typingSpeed)
        } else {
          // Finished typing, wait before deleting
          timeout = setTimeout(() => {
            setIsDeleting(true)
          }, delayBeforeDelete)
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, currentIndex - 1))
            setCurrentIndex(currentIndex - 1)
          }, deleteSpeed)
        } else {
          // Finished deleting
          if (loop) {
            setIsDeleting(false)
          }
        }
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, isPaused, text, typingSpeed, deleteSpeed, delayBeforeDelete, loop])

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
        {displayedText}
      </span>
      <motion.span
        className={cn(
          'ml-1 w-1 h-6 md:h-8 lg:h-9 rounded-full bg-gradient-to-b',
          cursorColors[cursorColor]
        )}
        animate={{
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </span>
  )
}
