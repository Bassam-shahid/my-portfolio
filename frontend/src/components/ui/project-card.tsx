'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import TechBadge from '@/components/ui/tech-badge'
import GlassCard from '@/components/ui/glass-card'
import NeonButton from '@/components/ui/neon-button'
import { Project } from '@/data/projects'
import { cardHover } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <GlassCard
      hover
      padding="lg"
      rounded="2xl"
      glow="cyan"
      className={cn('group relative overflow-hidden h-full flex flex-col')}
    >
      {/* Project Image */}
      <motion.div
        className="relative w-full h-48 md:h-56 mb-6 overflow-hidden rounded-xl"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 2}
        />
        {/* Glass overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm md:text-base mb-4 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 5).map((tech, i) => (
            <TechBadge key={i} variant={i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'purple' : 'fuchsia'} size="sm">
              {tech}
            </TechBadge>
          ))}
          {project.techStack.length > 5 && (
            <TechBadge variant="default" size="sm">
              +{project.techStack.length - 5}
            </TechBadge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <NeonButton
              variant="outline"
              size="sm"
              href={project.githubUrl}
              icon={<Github className="w-4 h-4" />}
            >
              Code
            </NeonButton>
          )}
          {project.liveUrl && (
            <NeonButton
              variant="secondary"
              size="sm"
              href={project.liveUrl}
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Live Demo
            </NeonButton>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
