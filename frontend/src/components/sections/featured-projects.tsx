'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ui/project-card'
import GradientText from '@/components/ui/gradient-text'
import { staggerContainer, fadeUp } from '@/lib/motion-variants'
import { projects, featuredProjects } from '@/data/projects'

interface FeaturedProjectsProps {
  title?: string
  subtitle?: string
  showAll?: boolean
}

// Fixed particle positions to avoid hydration mismatch
const particlePositions = [
  { x: 10, y: 20 },
  { x: 80, y: 60 },
  { x: 50, y: 80 },
  { x: 30, y: 70 },
  { x: 70, y: 25 },
  { x: 20, y: 40 },
]

const particleAnimations = [
  { duration: 8, delay: 0, endY: -100 },
  { duration: 10, delay: 1, endY: -150 },
  { duration: 7, delay: 2, endY: -80 },
  { duration: 9, delay: 3, endY: -120 },
  { duration: 11, delay: 4, endY: -90 },
  { duration: 6, delay: 5, endY: -110 },
]

export default function FeaturedProjects({
  title = 'Featured Projects',
  subtitle = 'Showcasing innovation through intelligent solutions',
  showAll = false,
}: FeaturedProjectsProps) {
  const [isClient, setIsClient] = useState(false)
  const displayProjects = showAll ? projects : featuredProjects

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      {/* Subtle floating particles - only render on client to avoid hydration mismatch */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const pos = particlePositions[i]
            const anim = particleAnimations[i]
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                initial={{
                  x: `${pos.x}%`,
                  y: `${pos.y}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [`${pos.y}%`, `${pos.y + anim.endY / 10}%`, `${pos.y}%`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: anim.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: anim.delay,
                }}
              />
            )
          })}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <GradientText
              variant="primary"
              className="text-3xl md:text-5xl lg:text-6xl font-bold"
              as="h2"
            >
              {title}
            </GradientText>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {displayProjects.map((project, index) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
