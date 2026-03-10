'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion-variants'
import GradientText from '@/components/ui/gradient-text'
import GlassCard from '@/components/ui/glass-card'
import PageTransition from '@/components/shared/page-transition'
import { User, Code, Lightbulb, Trophy } from 'lucide-react'

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
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
                className="text-4xl md:text-6xl font-bold mb-6"
                as="h1"
              >
                About Me
              </GradientText>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Passionate about building intelligent systems that push the boundaries of what&apos;s possible
              </p>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Bio Section */}
            <motion.div variants={fadeUp}>
              <GlassCard padding="lg" rounded="2xl" className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      Hi, I&apos;m Bassam Shahid
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      A Full Stack & Agentic AI Developer with 6+ years of experience architecting intelligent agents, 
                      scalable web platforms, and automation systems that think ahead. I specialize in bridging the gap 
                      between cutting-edge AI research and practical, production-ready applications.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      My passion lies in creating autonomous AI agents that can reason, plan, and execute complex tasks 
                      independently. From RAG systems that process hundreds of thousands of documents to multi-agent 
                      collaborations that reduce manual work by 60%, I&apos;m driven by the challenge of making AI 
                      genuinely useful in real-world scenarios.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: Code, label: 'Years Experience', value: '6+' },
                { icon: Lightbulb, label: 'Projects Completed', value: '50+' },
                { icon: Trophy, label: 'Happy Clients', value: '30+' },
                { icon: User, label: 'Technologies', value: '20+' },
              ].map((stat, index) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <GlassCard
                    padding="md"
                    rounded="xl"
                    className="text-center hover:shadow-neon-cyan/20 transition-shadow duration-300"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* What I Do */}
            <motion.div variants={fadeUp}>
              <GlassCard padding="lg" rounded="2xl">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
                  What I Do
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Agentic AI Systems',
                      description: 'Autonomous agents that can reason, plan, and execute complex tasks with minimal human intervention.',
                    },
                    {
                      title: 'RAG Pipelines',
                      description: 'Retrieval-Augmented Generation systems for intelligent document Q&A with semantic search.',
                    },
                    {
                      title: 'Full Stack Development',
                      description: 'End-to-end web applications using modern frameworks like Next.js, React, and Node.js.',
                    },
                    {
                      title: 'AI Integration',
                      description: 'Seamlessly integrating LLMs and ML models into production systems at scale.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="space-y-2">
                      <h4 className="text-lg font-semibold text-gray-200">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Journey Section */}
            <motion.div variants={fadeUp}>
              <GlassCard padding="lg" rounded="2xl">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  My Journey
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    My journey into software development began over 6 years ago when I built my first website. 
                    What started as curiosity about how things work on the internet quickly evolved into a 
                    deep passion for creating intelligent systems.
                  </p>
                  <p>
                    Today, I focus on Agentic AI and Full Stack development, helping organizations leverage 
                    the power of autonomous agents and modern web technologies to solve complex problems. 
                    Whether it&apos;s building a multi-agent collaboration platform or architecting a 
                    scalable e-commerce solution, I bring the same level of dedication and innovation 
                    to every project.
                  </p>
                  <p>
                    When I&apos;m not coding, you&apos;ll find me exploring the latest AI research, 
                    contributing to open-source projects, or sharing knowledge with the developer community.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  )
}
