'use client'

import { motion } from 'framer-motion'
import { floatOrb } from '@/lib/motion-variants'
import { prefersReducedMotion } from '@/lib/scroll-helpers'

interface FloatingOrbsProps {
  count?: number
  className?: string
}

export default function FloatingOrbs({ count = 3, className = '' }: FloatingOrbsProps) {
  const reducedMotion = prefersReducedMotion()

  // Orb configurations with different positions and colors
  const orbs = [
    {
      cx: '20%',
      cy: '30%',
      r: '15%',
      color: 'url(#gradient-cyan)',
      opacity: 0.3,
    },
    {
      cx: '80%',
      cy: '60%',
      r: '20%',
      color: 'url(#gradient-purple)',
      opacity: 0.25,
    },
    {
      cx: '50%',
      cy: '80%',
      r: '18%',
      color: 'url(#gradient-fuchsia)',
      opacity: 0.2,
    },
    {
      cx: '30%',
      cy: '70%',
      r: '12%',
      color: 'url(#gradient-indigo)',
      opacity: 0.25,
    },
    {
      cx: '70%',
      cy: '25%',
      r: '14%',
      color: 'url(#gradient-blue)',
      opacity: 0.2,
    },
  ]

  if (reducedMotion) {
    return (
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="gradient-cyan">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient-purple">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient-fuchsia">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient-indigo">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient-blue">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>
        {orbs.slice(0, count).map((orb, index) => (
          <circle
            key={index}
            cx={orb.cx}
            cy={orb.cy}
            r={orb.r}
            fill={orb.color}
            opacity={orb.opacity}
          />
        ))}
      </svg>
    )
  }

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="gradient-cyan">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gradient-purple">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gradient-fuchsia">
          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gradient-indigo">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gradient-blue">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {orbs.slice(0, count).map((orb, index) => (
        <motion.circle
          key={index}
          cx={orb.cx}
          cy={orb.cy}
          r={orb.r}
          fill={orb.color}
          opacity={orb.opacity}
          variants={floatOrb}
          animate="animate"
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />
      ))}
    </svg>
  )
}
