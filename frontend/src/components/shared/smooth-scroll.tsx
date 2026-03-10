'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle resize
    const handleResize = () => {
      lenis.resize()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <>{children}</>
}
