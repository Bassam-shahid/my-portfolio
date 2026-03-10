'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Heart, Sparkles } from 'lucide-react'
import { socialLinks } from '@/data/social'
import { cn } from '@/lib/utils'

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 mt-20">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                Bassam Shahid
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Full Stack & Agentic AI Developer crafting intelligent solutions
              that think ahead.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map(
                (link) => (
                  <motion.div
                    key={link}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="text-sm text-gray-400 hover:text-cyan-400 transition-colors inline-block"
                    >
                      {link}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">
              Connect With Me
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const IconComponent =
                  socialIcons[social.platform] || Sparkles
                return (
                  <motion.a
                    key={social.platform}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'p-3 rounded-xl',
                      'bg-black/30 backdrop-blur-sm border border-white/10',
                      'text-gray-400 hover:text-cyan-400',
                      'hover:border-cyan-500/30 hover:shadow-neon-cyan/20',
                      'transition-all duration-300'
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} Bassam Shahid. All rights reserved.
            </p>

            {/* Made with Love */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.div>
              <span>using Next.js & Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
