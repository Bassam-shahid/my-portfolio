'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion-variants'
import GradientText from '@/components/ui/gradient-text'
import GlassCard from '@/components/ui/glass-card'
import NeonButton from '@/components/ui/neon-button'
import { socialLinks, contactEmail, resumeUrl } from '@/data/social'
import { Mail, Send, Download, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const socialIcons: Record<string, React.ElementType> = {
  github: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  twitter: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: Mail,
}

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    console.log('Submitting contact form:', data)

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Response status:', response.status)

      const result = await response.json()
      console.log('Response data:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit')
      }

      setFormState('success')
      form.reset()
      setTimeout(() => setFormState('idle'), 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState('idle')
      alert('Failed to send message. Please try again.')
    }
  }

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
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
              Get In Touch
            </GradientText>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="mt-4 text-lg md:text-xl text-gray-400">
              Have a project in mind? Let&apos;s build something amazing together
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <GlassCard padding="lg" rounded="2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-500/30 transition-all duration-300"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-500/30 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-500/30 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <NeonButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={formState !== 'idle'}
                    icon={
                      formState === 'submitting' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : formState === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )
                    }
                  >
                    {formState === 'idle'
                      ? 'Send Message'
                      : formState === 'submitting'
                      ? 'Sending...'
                      : 'Message Sent!'}
                  </NeonButton>
                </motion.div>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Email Card */}
            <motion.div variants={fadeUp}>
              <GlassCard padding="lg" rounded="2xl" className="hover:shadow-neon-cyan/20 transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Email</h4>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-lg font-semibold text-gray-200 hover:text-cyan-400 transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp}>
              <GlassCard padding="lg" rounded="2xl">
                <h4 className="text-lg font-semibold text-gray-200 mb-4">
                  Connect With Me
                </h4>
                <div className="space-y-3">
                  {socialLinks.map((social) => {
                    const IconComponent = socialIcons[social.platform] || Mail
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 group-hover:from-purple-500/30 group-hover:to-fuchsia-500/30 transition-colors">
                          <IconComponent />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {social.label}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </GlassCard>
            </motion.div>

            {/* Resume Download */}
            <motion.div variants={fadeUp}>
              <GlassCard padding="lg" rounded="2xl" className="text-center">
                <h4 className="text-lg font-semibold text-gray-200 mb-2">
                  Want to know more about my experience?
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  Download my resume to learn more about my background and skills
                </p>
                <NeonButton
                  variant="secondary"
                  size="lg"
                  href={resumeUrl}
                  download="Bassam-Shahid-Resume.pdf"
                  icon={<Download className="w-5 h-5" />}
                  pulse={true}
                >
                  Download Resume
                </NeonButton>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
