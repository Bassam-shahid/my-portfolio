'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface AIParticlesBackgroundProps {
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  z: number
  size: number
  duration: number
  delay: number
}

export default function AIParticlesBackground({ className = '' }: AIParticlesBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [lines, setLines] = useState<{ id: number; start: { x: number; y: number }; end: { x: number; y: number }; duration: number; delay: number }[]>([])

  useEffect(() => {
    // Generate floating particles
    const newParticles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)

    // Generate connecting lines (neural network effect)
    const newLines = []
    for (let i = 0; i < 20; i++) {
      newLines.push({
        id: i,
        start: { x: Math.random() * 100, y: Math.random() * 100 },
        end: { x: Math.random() * 100, y: Math.random() * 100 },
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 3,
      })
    }
    setLines(newLines)
  }, [])

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-950 to-background" />
      
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"
        animate={{
          x: [0, -150, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"
        animate={{
          x: ['-50%', 'calc(-50% + 80px)', '-50%'],
          y: ['-50%', 'calc(-50% - 60px)', '-50%'],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30 * (particle.z / 100), 0],
            x: [0, 15 * Math.sin(particle.z), 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Neural network lines */}
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          style={{
            left: `${Math.min(line.start.x, line.end.x)}%`,
            top: `${(line.start.y + line.end.y) / 2}%`,
            width: `${Math.abs(line.end.x - line.start.x)}%`,
            transform: `rotate(${Math.atan2(line.end.y - line.start.y, line.end.x - line.start.x) * (180 / Math.PI)}deg)`,
            transformOrigin: 'left center',
          }}
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Hexagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%2306b6d4'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating code snippets (AI/ML themed) */}
      <motion.div
        className="absolute text-[10px] md:text-xs font-mono text-cyan-500/10"
        style={{ top: '20%', left: '10%' }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'<NeuralNetwork />'}
      </motion.div>

      <motion.div
        className="absolute text-[10px] md:text-xs font-mono text-purple-500/10"
        style={{ top: '60%', right: '15%' }}
        animate={{
          y: [0, 25, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'const intelligence = AI.create();'}
      </motion.div>

      <motion.div
        className="absolute text-[10px] md:text-xs font-mono text-blue-500/10"
        style={{ bottom: '25%', left: '20%' }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'{ model: "transformer", accuracy: 0.98 }'}
      </motion.div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        animate={{
          y: ['-100%', '1100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
