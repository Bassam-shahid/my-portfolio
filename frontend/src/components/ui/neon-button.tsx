'use client'

import { motion } from 'framer-motion'
import { cn, buttonHoverScale, neonGlow } from '@/lib/utils'
import { buttonTap, neonPulse } from '@/lib/motion-variants'
import Link from 'next/link'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  download?: string
  icon?: React.ReactNode
  pulse?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function NeonButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  href,
  download,
  icon,
  pulse = false,
  className = '',
  type = 'button',
  disabled = false,
}: NeonButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-500 text-white hover:brightness-110',
    secondary: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30',
    outline: 'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5',
  }

  // Base button classes
  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-background',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[size],
    variantStyles[variant],
    buttonHoverScale(size),
    pulse ? 'animate-pulse-glow' : '',
    className
  )

  const buttonContent = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  )

  // If href is provided, render as Link
  if (href) {
    return (
      <motion.div
        variants={buttonTap}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          href={href}
          download={download}
          className={cn(
            baseClasses,
            variant === 'primary' ? neonGlow('gradient') : ''
          )}
        >
          {buttonContent}
        </Link>
      </motion.div>
    )
  }

  // Otherwise render as button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variants={buttonTap}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        baseClasses,
        variant === 'primary' ? neonGlow('gradient') : ''
      )}
    >
      {buttonContent}
    </motion.button>
  )
}
