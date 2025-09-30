"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, DownloadCloudIcon, Github, Linkedin, Twitter, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Check if dark mode is active
  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark')
  }

  // Sophisticated particle animation
  useEffect(() => {
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
      opacity: number
    }[] = []

    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.03), 80)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const darkMode = isDarkMode()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Dynamic gradient based on theme
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        if (darkMode) {
          // Light particles for dark mode
          gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`)
          gradient.addColorStop(0.5, `rgba(192, 192, 192, ${p.opacity * 0.6})`)
          gradient.addColorStop(1, `rgba(128, 128, 128, 0)`)
        } else {
          // Dark particles for light mode
          gradient.addColorStop(0, `rgba(50, 50, 50, ${p.opacity})`)
          gradient.addColorStop(0.5, `rgba(80, 80, 80, ${p.opacity * 0.6})`)
          gradient.addColorStop(1, `rgba(128, 128, 128, 0)`)
        }
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        // Connect nearby particles with theme-aware lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            const lineOpacity = (1 - distance / 120) * 0.15
            if (darkMode) {
              ctx.strokeStyle = `rgba(192, 192, 192, ${lineOpacity})`
            } else {
              ctx.strokeStyle = `rgba(80, 80, 80, ${lineOpacity})`
            }
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
      <div 
        className="absolute inset-0 opacity-70 dark:opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(192, 192, 192, 0.2), transparent 50%)`
        }}
      />
      
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/10 dark:bg-gray-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-8"
          >
            {/* Elegant badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-morphism border border-gray-300/30 dark:border-white/10"
            >
              <Sparkles className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-crimson tracking-wider text-gray-600 dark:text-gray-300 uppercase">
                Software Engineer
              </span>
            </motion.div>

            {/* Main heading with elegant typography */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-tight"
              >
                <span className="text-black dark:text-white">Hello, I'm </span>
                <br />
                <span className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 dark:from-gray-300 dark:via-white dark:to-gray-300 bg-clip-text text-transparent inline-block mt-2">
                  {mounted && (
                    <TypeAnimation
                      sequence={[
                        "Tanmay Bansal",
                        3000,
                        "a Developer",
                        1500,
                        "a Creator",
                        1500,
                        "an Innovator",
                        1500,
                        "Tanmay Bansal",
                        5000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  )}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl lg:text-3xl font-crimson text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                Crafting exceptional digital experiences with{" "}
                <span className="text-gray-900 dark:text-gray-200 font-medium italic">elegance</span> and{" "}
                <span className="text-gray-900 dark:text-gray-200 font-medium italic">precision</span>
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300 px-8 py-6 text-base font-crimson font-medium shadow-lg hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20 group"
              >
                <Link href="#projects">
                  <span>Explore My Work</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-gray-300 dark:border-white/20 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 px-8 py-6 text-base font-crimson font-medium"
              >
                <Link
                  href="https://drive.google.com/file/d/1XHREvJwu8655Ssfi7yqv5--zVUuE6FLL/view?usp=drive_link"
                  target="_blank"
                >
                  <DownloadCloudIcon className="mr-2 h-5 w-5" /> 
                  <span>Download Resume</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#projects">
          <div className="w-[30px] h-[50px] rounded-full border-2 border-gray-400 dark:border-white/20 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full"
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}