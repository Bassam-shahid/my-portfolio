'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface NeuralNetworkBackgroundProps {
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  glow: string
}

interface Node {
  x: number
  y: number
  connections: number[]
}

export default function NeuralNetworkBackground({ className = '' }: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  const glowColors = [
    'rgba(6, 182, 212,', // cyan
    'rgba(168, 85, 247,', // purple
    'rgba(59, 130, 246,', // blue
    'rgba(217, 70, 239,', // fuchsia
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create neural network nodes
    const nodeCount = Math.min(15, Math.floor(window.innerWidth / 100))
    const newNodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      newNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
      })
    }

    // Connect nearby nodes
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)
          if (distance < 250 && node.connections.length < 4) {
            node.connections.push(j)
          }
        }
      })
    })

    setNodes(newNodes)

    // Create floating particles
    const particleCount = 50
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        glow: glowColors[Math.floor(Math.random() * glowColors.length)],
      })
    }

    setParticles(newParticles)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw neural network connections
      newNodes.forEach((node, i) => {
        node.connections.forEach((connIndex) => {
          const targetNode = newNodes[connIndex]
          const distance = Math.hypot(node.x - targetNode.x, node.y - targetNode.y)
          const opacity = (1 - distance / 250) * 0.3

          const gradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y)
          gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`)
          gradient.addColorStop(1, `rgba(168, 85, 247, ${opacity})`)

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      // Draw nodes with pulse effect
      newNodes.forEach((node, i) => {
        const pulse = Math.sin(Date.now() / 1000 + i) * 0.3 + 0.7

        // Outer glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20)
        glowGradient.addColorStop(0, `rgba(6, 182, 212, ${pulse * 0.4})`)
        glowGradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

        ctx.beginPath()
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        // Core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${pulse})`
        ctx.fill()
      })

      // Update and draw particles
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.vx
          let newY = particle.y + particle.vy

          // Bounce off edges
          if (newX < 0 || newX > canvas.width) particle.vx *= -1
          if (newY < 0 || newY > canvas.height) particle.vy *= -1

          newX = Math.max(0, Math.min(canvas.width, newX))
          newY = Math.max(0, Math.min(canvas.height, newY))

          return { ...particle, x: newX, y: newY }
        })
      )

      particles.forEach((particle) => {
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        )
        gradient.addColorStop(0, `${particle.glow} 0.8)`)
        gradient.addColorStop(1, `${particle.glow} 0)`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(() => animate())
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
