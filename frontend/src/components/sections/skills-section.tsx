'use client'

import { motion } from 'framer-motion'
import SkillRing from '@/components/ui/skill-ring'
import SkillCard from '@/components/ui/skill-card'
import GradientText from '@/components/ui/gradient-text'
import { staggerContainer, fadeUp } from '@/lib/motion-variants'
import { skills, skillCategories, getSkillsByCategory } from '@/data/skills'

interface SkillsSectionProps {
  title?: string
  subtitle?: string
  layout?: 'rings' | 'cards'
}

export default function SkillsSection({
  title = 'Technical Skills',
  subtitle = 'Expertise across the full stack with a focus on AI innovation',
  layout = 'rings',
}: SkillsSectionProps) {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

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

        {/* Skills by Category */}
        {skillCategories.map((category, categoryIndex) => {
          const categorySkills = getSkillsByCategory(category)
          const isAICategory = category === 'AI & Machine Learning'

          return (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="mb-16 last:mb-0"
            >
              {/* Category Header */}
              <motion.div
                variants={fadeUp}
                className={cn(
                  'mb-8 text-left',
                  isAICategory ? 'text-center' : ''
                )}
              >
                <h3
                  className={cn(
                    'text-xl md:text-2xl font-bold mb-2',
                    isAICategory
                      ? 'text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'
                  )}
                >
                  {category}
                </h3>
                {!isAICategory && (
                  <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                )}
              </motion.div>

              {/* Skills Grid */}
              <motion.div
                variants={staggerContainer}
                className={cn(
                  'grid gap-4 md:gap-6',
                  layout === 'rings'
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                )}
              >
                {categorySkills.map((skill, index) =>
                  layout === 'rings' ? (
                    <motion.div key={skill.id} variants={fadeUp}>
                      <SkillRing
                        name={skill.name}
                        level={skill.level}
                        category={skill.category}
                        highlight={isAICategory}
                        index={categoryIndex * 10 + index}
                      />
                    </motion.div>
                  ) : (
                    <motion.div key={skill.id} variants={fadeUp}>
                      <SkillCard
                        name={skill.name}
                        level={skill.level}
                        category={skill.category}
                        index={categoryIndex * 10 + index}
                      />
                    </motion.div>
                  )
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
