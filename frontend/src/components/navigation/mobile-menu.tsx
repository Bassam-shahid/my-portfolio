'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { navigation } from '@/data/navigation'
import { cn, glassCard } from '@/lib/utils'

interface MobileMenuProps {
  onClose: () => void
}

// Stagger animation variants
const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 md:hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Menu Panel */}
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          'absolute top-0 right-0 bottom-0 w-full max-w-sm',
          glassCard('strong'),
          'p-6 overflow-y-auto'
        )}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Menu
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Navigation Links */}
        <motion.div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'block px-4 py-3 rounded-xl transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span className="text-base font-medium">{item.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-gray-500 mb-4">Connect with me</p>
          <div className="flex gap-3">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <motion.a
                key={social}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
