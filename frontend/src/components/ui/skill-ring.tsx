'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { hoverGlowScale, floatOrb } from '@/lib/motion-variants'
import { Brain, Code, Server, Database, Cloud, Cpu, Zap, GitBranch } from 'lucide-react'

interface SkillRingProps {
  name: string
  level?: number
  category: string
  interactive?: boolean
  highlight?: boolean
  index?: number
}

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  code: Code,
  server: Server,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
  zap: Zap,
  'git-branch': GitBranch,
}

export default function SkillRing({
  name,
  level = 75,
  category,
  interactive = true,
  highlight = false,
  index = 0,
}: SkillRingProps) {
  const IconComponent = iconMap[category.toLowerCase().split(' ')[0]] || Code

  // Calculate stroke dasharray for progress ring
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (level / 100) * circumference

  // Gradient colors based on category or highlight
  const gradientId = `gradient-${name.toLowerCase().replace(/\s+/g, '-')}`
  const gradientColors = highlight
    ? ['#06b6d4', '#a855f7', '#d946ef']
    : category === 'AI & Machine Learning'
    ? ['#06b6d4', '#3b82f6']
    : category === 'Frontend'
    ? ['#a855f7', '#d946ef']
    : category === 'Backend'
    ? ['#6366f1', '#a855f7']
    : ['#3b82f6', '#06b6d4']

  return (
    <motion.div
      variants={hoverGlowScale}
      initial="rest"
      whileHover={interactive ? 'hover' : 'rest'}
      className={cn(
        'relative flex flex-col items-center p-4 md:p-6',
        'bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl',
        'transition-all duration-300',
        highlight ? 'shadow-neon-cyan' : ''
      )}
    >
      {/* SVG Ring */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
          </defs>

          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />

          {/* Progress ring with animation */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>

        {/* Center Icon */}
        <motion.div
          variants={floatOrb}
          animate={interactive ? 'animate' : undefined}
          className="absolute inset-0 flex items-center justify-center"
        >
          <IconComponent
            className={cn(
              'w-8 h-8 md:w-10 md:h-10',
              highlight ? 'text-cyan-400' : 'text-purple-400'
            )}
          />
        </motion.div>

        {/* Level percentage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        >
          <span className="text-xs md:text-sm font-bold text-gray-300">
            {level}%
          </span>
        </motion.div>
      </div>

      {/* Skill Name */}
      <h4
        className={cn(
          'text-sm md:text-base font-semibold text-center',
          highlight
            ? 'bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'
            : 'text-gray-300'
        )}
      >
        {name}
      </h4>

      {/* Glow effect on hover */}
      {interactive && (
        <div
          className={cn(
            'absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none',
            highlight
              ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10'
              : 'bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10'
          )}
        />
      )}
    </motion.div>
  )
}
