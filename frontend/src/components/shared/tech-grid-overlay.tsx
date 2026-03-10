'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface TechGridOverlayProps {
  className?: string
  opacity?: number
}

export default function TechGridOverlay({
  className = '',
  opacity = 0.03,
}: TechGridOverlayProps) {
  const [gridSize, setGridSize] = useState(50)

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth
      if (width < 640) setGridSize(30)
      else if (width < 1024) setGridSize(40)
      else setGridSize(50)
    }

    updateGridSize()
    window.addEventListener('resize', updateGridSize)
    return () => window.removeEventListener('resize', updateGridSize)
  }, [])

  return (
    <motion.div
      className={cn(
        'absolute inset-0 pointer-events-none',
        'bg-[linear-gradient(rgba(6,182,212,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.5)_1px,transparent_1px)]',
        'bg-[size:var(--grid-size)_var(--grid-size)]',
        className
      )}
      style={{ '--grid-size': `${gridSize}px` } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 2, delay: 0.5 }}
    />
  )
}
