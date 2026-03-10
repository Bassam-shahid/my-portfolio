'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, buttonTap } from '@/lib/motion-variants'
import AIParticlesBackground from '@/components/shared/ai-particles-background'
import AIGlowOrb from '@/components/shared/ai-glow-orb'
import TypingAnimation from '@/components/ui/typing-animation'

interface HeroSectionProps {
  title?: string
  name?: string
  role?: string
  tagline?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string; download?: string }
}

export default function HeroSection({
  title = "Hi, I'm",
  name = 'Bassam Shahid',
  role = 'Full Stack & Agentic AI Developer',
  tagline = 'Building autonomous AI systems that scale intelligence, automate complexity, and turn vision into reality.',
  ctaPrimary = { label: 'View My Work', href: '/projects' },
  ctaSecondary = { label: 'Download Resume', href: '/resume.pdf', download: 'Bassam-Shahid-Resume.pdf' },
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-16"
      aria-label="Hero section"
    >
      {/* 3D AI Particles Background */}
      <AIParticlesBackground />

      {/* AI Glow Orb - Right Side Visual Element */}
      <AIGlowOrb size="lg" position="right" className="hidden lg:block opacity-40" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          {/* Main Heading */}
          <motion.div variants={fadeUp} className="mb-4 pt-12 sm:pt-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] tracking-tight">
              <span className="text-white">{title} </span>
              <br className="hidden sm:block" />
              <span className="text-white">{name}</span>
            </h1>
          </motion.div>

          {/* Role with Typing Animation & Blue Gradient */}
          <motion.div variants={fadeUp} className="mb-8">
            <p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-400 leading-relaxed"
              aria-label={role}
            >
              Full Stack &{' '}
              <TypingAnimation
                text="Agentic AI Developer"
                cursorColor="blue"
                typingSpeed={80}
                deleteSpeed={40}
                delayBeforeDelete={2500}
                loop={true}
              />
            </p>
          </motion.div>

          {/* Visionary Tagline */}
          <motion.div variants={fadeUp} className="mb-12 max-w-3xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              {tagline}
            </p>
          </motion.div>

          {/* CTA Buttons with Glassmorphism */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            role="group"
            aria-label="Call to action buttons"
          >
            {/* Primary Button - Gradient Purple to Blue */}
            <motion.div
              variants={buttonTap}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={ctaPrimary.href}
                aria-label={ctaPrimary.label}
                className={cn(
                  'group relative inline-flex items-center justify-center gap-2.5',
                  'px-8 py-4 rounded-2xl',
                  'bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600',
                  'text-white font-semibold text-lg',
                  'transition-all duration-300 ease-out',
                  'hover:scale-105',
                  'hover:shadow-[0_0_50px_rgba(168,85,247,0.5),0_0_100px_rgba(59,130,246,0.3)]',
                  'focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-background',
                  'active:scale-[0.98]'
                )}
              >
                <Briefcase
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{ctaPrimary.label}</span>
                {/* Shine effect */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            {/* Secondary Button - Neon Cyan Outline */}
            <motion.div
              variants={buttonTap}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={ctaSecondary.href}
                download={ctaSecondary.download}
                aria-label={ctaSecondary.label}
                className={cn(
                  'group inline-flex items-center justify-center gap-2.5',
                  'px-8 py-4 rounded-2xl',
                  'bg-white/5 backdrop-blur-xl',
                  'text-cyan-400 font-semibold text-lg',
                  'border border-cyan-500/50',
                  'transition-all duration-300 ease-out',
                  'hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300',
                  'hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]',
                  'focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-background',
                  'active:scale-[0.98]'
                )}
              >
                <Download
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{ctaSecondary.label}</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-8 text-gray-500"
            role="list"
            aria-label="Technologies I work with"
          >
            {[
              { name: 'React / Next.js', color: 'bg-cyan-500' },
              { name: 'Node.js / Python', color: 'bg-purple-500' },
              { name: 'AI / ML Agents', color: 'bg-fuchsia-500' },
              { name: 'TypeScript', color: 'bg-amber-500' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2.5"
                role="listitem"
              >
                <div
                  className={cn('w-1.5 h-1.5 rounded-full', tech.color)}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
