/**
 * Lenis smooth scroll options
 */
export const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical' as const,
  gestureDirection: 'vertical' as const,
  smooth: true,
  mouseMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
  touchInertia: true,
  wheelMultiplier: 1,
  normalizeWheel: true,
  prevent: (e: Event) => {
    // Prevent smooth scroll on specific elements if needed
    return false
  },
}

/**
 * Viewport options for framer-motion
 */
export const viewportOptions = {
  once: true, // Only trigger animation once
  margin: '-100px', // Start animation 100px before element enters viewport
  amount: 0.3, // Trigger when 30% of element is visible
}

/**
 * Strict viewport options (for hero sections)
 */
export const strictViewport = {
  once: true,
  margin: '-50px',
  amount: 0.5,
}

/**
 * Lazy viewport options (for below-fold content)
 */
export const lazyViewport = {
  once: true,
  margin: '-200px',
  amount: 0.2,
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get reduced motion options for framer-motion
 */
export function getMotionOptions() {
  const reducedMotion = prefersReducedMotion()
  
  return {
    transition: {
      duration: reducedMotion ? 0.01 : 0.6,
      ease: reducedMotion ? 'linear' : [0.22, 1, 0.36, 1],
    },
  }
}

/**
 * Scroll progress calculation
 */
export function calculateScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? scrollTop / docHeight : 0
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (!element) return
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - offset
  
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

/**
 * Debounce function for scroll events
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
