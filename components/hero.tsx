"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeCanvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  // Tech logos for the globe
  const techLogos = [
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#339933" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "HTML", color: "#E34F26" },
    { name: "CSS", color: "#1572B6" },
    { name: "Next.js", color: "#000000" },
    { name: "MongoDB", color: "#47A248" },
    { name: "Git", color: "#F05032" },
  ]

  useEffect(() => {
    setMounted(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(123, 97, 255, ${Math.random() * 0.5 + 0.1})`,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        // Connect particles that are close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.length = 0
      createParticles()
    }

    createParticles()
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Tech globe animation
  useEffect(() => {
    const canvas = globeCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 300

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 100

    // Create points on a sphere
    const points: {
      x3d: number
      y3d: number
      z3d: number
      x2d: number
      y2d: number
      size: number
      color: string
      text: string
      opacity: number
    }[] = []

    // Create points distributed on a sphere
    for (let i = 0; i < 100; i++) {
      // Use spherical coordinates to distribute points evenly
      const phi = Math.acos(-1 + (2 * i) / 100)
      const theta = Math.sqrt(100 * Math.PI) * phi

      // Convert to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      // Assign a random tech logo to some points
      const logoIndex = i % techLogos.length
      const logo = techLogos[logoIndex]

      points.push({
        x3d: x,
        y3d: y,
        z3d: z,
        x2d: 0,
        y2d: 0,
        size: Math.random() * 3 + 2,
        color: logo.color,
        text: logo.name,
        opacity: 0.7,
      })
    }

    let angleX = 0
    let angleY = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Rotate the sphere
      angleX += 0.003
      angleY += 0.002

      // Update 3D points and project to 2D
      for (const point of points) {
        // Apply rotation around Y axis
        const cosY = Math.cos(angleY)
        const sinY = Math.sin(angleY)

        const x1 = point.x3d * cosY - point.z3d * sinY
        const z1 = point.z3d * cosY + point.x3d * sinY

        // Apply rotation around X axis
        const cosX = Math.cos(angleX)
        const sinX = Math.sin(angleX)

        const y2 = point.y3d * cosX - z1 * sinX
        const z2 = z1 * cosX + point.y3d * sinX

        // Project 3D to 2D
        const scale = 400 / (400 + z2)
        point.x2d = centerX + x1 * scale
        point.y2d = centerY + y2 * scale

        // Adjust opacity based on z position (depth)
        point.opacity = (z2 + radius) / (2 * radius)
      }

      // Sort points by z-coordinate for proper rendering (back to front)
      points.sort((a, b) => a.z3d - b.z3d)

      // Draw connections between close points
      ctx.strokeStyle = "rgba(123, 97, 255, 0.15)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x2d - points[j].x2d
          const dy = points[i].y2d - points[j].y2d
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 50) {
            ctx.beginPath()
            ctx.moveTo(points[i].x2d, points[i].y2d)
            ctx.lineTo(points[j].x2d, points[j].y2d)
            ctx.stroke()
          }
        }
      }

      // Draw points
      for (const point of points) {
        // Draw point
        ctx.fillStyle = `rgba(${hexToRgb(point.color)}, ${point.opacity})`
        ctx.beginPath()
        ctx.arc(point.x2d, point.y2d, point.size * point.opacity, 0, Math.PI * 2)
        ctx.fill()

        // Draw tech name for larger points in the front
        if (point.z3d > 50 && Math.random() > 0.95) {
          ctx.fillStyle = `rgba(${hexToRgb(point.color)}, ${point.opacity})`
          ctx.font = `${Math.floor(10 * point.opacity)}px Arial`
          ctx.textAlign = "center"
          ctx.fillText(point.text, point.x2d, point.y2d - 10)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Helper function to convert hex to rgb
    function hexToRgb(hex: string) {
      // Remove # if present
      hex = hex.replace("#", "")

      // Parse the hex values
      const r = Number.parseInt(hex.substring(0, 2), 16) || 0
      const g = Number.parseInt(hex.substring(2, 4), 16) || 0
      const b = Number.parseInt(hex.substring(4, 6), 16) || 0

      return `${r}, ${g}, ${b}`
    }

    return () => {
      // Cleanup if needed
    }
  }, [mounted])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 hero-mask" />
      <div className="container mx-auto px-4 z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Full-Stack Developer
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Hi, I&apos;m{" "}
                <span className="text-gradient">
                  {mounted && (
                    <TypeAnimation
                      sequence={[
                        "Tanmay Bansal",
                        2000,
                        "a Developer",
                        1000,
                        "a Designer",
                        1000,
                        "a Creator",
                        1000,
                        "Tanmay Bansal",
                        5000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Number.POSITIVE_INFINITY}
                    />
                  )}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground mt-4"
              >
                Building innovative web applications with modern technologies
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="rounded-full">
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex space-x-4 pt-4"
            >
              <Link
                href="https://github.com/TanmayBansa1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/tanmay-bansal-40bb44199/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 animate-float">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-md opacity-70" />
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <canvas ref={globeCanvasRef} className="w-full h-full pointer-events-none z-0" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Link href="#projects" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </Link>
    </section>
  )
}
