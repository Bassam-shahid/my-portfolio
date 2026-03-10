'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover, neonPulse } from '@/lib/motion-variants'
import { Brain, Code, Server, Database, Cloud, Cpu, Zap, GitBranch, Terminal, Layers } from 'lucide-react'

interface SkillCardProps {
  name: string
  level?: number
  category: string
  interactive?: boolean
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
  terminal: Terminal,
  layers: Layers,
}

export default function SkillCard({
  name,
  level = 75,
  category,
  interactive = true,
  index = 0,
}: SkillCardProps) {
  const IconComponent = iconMap[name.toLowerCase().replace(/\s+/g, '-')] || Code

  // Color based on category
  const categoryColors = {
    'AI & Machine Learning': 'from-cyan-400 to-blue-500 text-cyan-400',
    Frontend: 'from-purple-500 to-fuchsia-500 text-purple-400',
    Backend: 'from-indigo-500 to-purple-500 text-indigo-400',
    'DevOps & Tools': 'from-blue-500 to-cyan-500 text-blue-400',
  }

  const colorClass = categoryColors[category as keyof typeof categoryColors] || categoryColors.Frontend

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover={interactive ? 'hover' : 'rest'}
      className={cn(
        'relative p-4 md:p-5',
        'bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl',
        'transition-all duration-300',
        'group'
      )}
    >
      {/* Top section with icon and name */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={cn(
            'p-2 rounded-lg',
            'bg-gradient-to-br',
            colorClass.split(' ').slice(0, 3).join(' '),
            'bg-opacity-10'
          )}
        >
          <IconComponent className={cn('w-5 h-5 md:w-6 md:h-6', colorClass.split(' ').pop())} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm md:text-base font-semibold text-gray-200 truncate">{name}</h4>
          <p className="text-xs text-gray-500">{category}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 1,
            delay: index * 0.05,
            ease: 'easeOut',
          }}
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            'bg-gradient-to-r',
            colorClass.split(' ').slice(0, 3).join(' ')
          )}
        />
      </div>

      {/* Level percentage */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.05 }}
        className="mt-2 text-right"
      >
        <span className="text-xs font-medium text-gray-400">{level}%</span>
      </motion.div>

      {/* Hover glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
          'bg-gradient-to-r from-white/5 to-white/10'
        )}
      />
    </motion.div>
  )
}
