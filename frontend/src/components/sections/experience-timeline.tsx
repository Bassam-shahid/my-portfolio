'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, slideInLeft, slideInRight } from '@/lib/motion-variants'
import GradientText from '@/components/ui/gradient-text'
import GlassCard from '@/components/ui/glass-card'
import { experiences } from '@/data/experience'
import { Calendar, Building, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ExperienceTimeline() {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <GradientText
              variant="primary"
              className="text-3xl md:text-5xl lg:text-6xl font-bold"
              as="h2"
            >
              Work Experience
            </GradientText>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="mt-4 text-lg md:text-xl text-gray-400">
              A journey through my professional career
            </p>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-fuchsia-500 md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={staggerContainer}
                  className={cn(
                    'relative flex items-start gap-8',
                    'md:flex-row flex-col',
                    isLeft ? 'md:flex-row-reverse' : ''
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-2 border-background md:-translate-x-1/2 z-10 mt-1.5" />

                  {/* Content */}
                  <div className={cn(
                    'flex-1 ml-12 md:ml-0',
                    isLeft ? 'md:pr-12' : 'md:pl-12'
                  )}>
                    <motion.div
                      variants={fadeUp}
                      className="group"
                    >
                      <GlassCard
                        hover
                        padding="lg"
                        rounded="2xl"
                        glow="purple"
                        className="transition-all duration-300"
                      >
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-1">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Building className="w-4 h-4" />
                              <span className="text-sm">{exp.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(exp.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                              })}{' '}
                              -{' '}
                              {exp.current
                                ? 'Present'
                                : exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : 'Present'}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-gray-400 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
