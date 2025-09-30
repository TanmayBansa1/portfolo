"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { ProjectCarousel } from "@/components/project-carousel"

type Project = {
  id: number
  title: string
  description: string
  technologies: string[]
  github?: string
  live?: string
  image: string
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const originalProjects: Project[] = [
    {
      id: 0,
      title: "SunoAI",
      description:
        "A ResNet-inspired model that listens to sounds, transforms them into spectrograms, and classifies them across 50 categories with precision.",
      technologies: [
        "CNN",
        "ML",
        "Python",
        "NextJS",
        "PyTorch",
        "ResNet",
        "Modal",
        "Audio",
        "Mel Spectrograms",
        "ShadCN",
      ],
      image: "/sunoai.png",
      github:
        "https://github.com/TanmayBansa1/CNN-Audio-Classifier",
      live: "https://sunoai.tanmay.space/",
    },
    {
      id: 1,
      title: "GenInvoice",
      description:
        "A sophisticated web application designed to streamline invoice generation and management with elegant automation.",
      technologies: [
        "NextJS",
        "TypeScript",
        "Mailtrap",
        "Prisma",
        "Clerk",
        "Upstash",
        "NeonDB",
        "ShadCN",
      ],
      github: "https://github.com/TanmayBansa1/GenInvoice",
      image: "/geninvoice.png",
      live: "https://geninvoice.tanmay.space",
    },
    {
      id: 2,
      title: "ReplSage",
      description:
        "An innovative platform designed to revolutionize project collaboration, knowledge management, and AI-assisted development.",
      technologies: [
        "TypeScript",
        "NextJS",
        "LangChain",
        "Gemini",
        "NeonDB",
        "Clerk",
        "Stripe",
        "AssemblyAI",
        "RAG",
        "Firebase",
        "ShadCN",
      ],
      github: "https://github.com/TanmayBansa1/ReplSage",
      image: "/replsage.png",
      live: "https://replsage.tanmay.space/",
    },
    {
      id: 3,
      title: "Miseit",
      description:
        "A robust and intuitive storage application designed to streamline organization and file management with seamless experience.",
      technologies: [
        "TypeScript",
        "NextJS",
        "Cloud Storage",
        "Appwrite",
        "ShadCN",
      ],
      github: "https://github.com/TanmayBansa1/Miseit",
      image: "/miseit.png",
      live: "https://miseit.tanmay.space/",
    },
    {
      id: 4,
      title: "Payme-App-v2",
      description:
        "A modern digital wallet application featuring real-time transactions, secure authentication, and a pristine interface.",
      technologies: [
        "TypeScript",
        "React",
        "Node.js",
        "TurboRepo",
        "Webhooks",
        "NextAuth",
        "Prisma",
        "NeonDB",
        "ShadCN",
      ],
      github: "https://github.com/TanmayBansa1/Payme-App-v2",
      image: "/payme.png",
      live: "https://payme.tanmay.space/",
    },
    {
      id: 5,
      title: "Quillcraft",
      description:
        "An elegant blogging platform for creators worldwide to share their thoughts, stories, and insights with the world.",
      technologies: [
        "TypeScript",
        "React",
        "Honojs",
        "Cloudflare Workers",
        "Prisma",
        "AivenDB",
      ],
      github: "https://github.com/TanmayBansa1/Quillcraft",
      image: "/quillcraft.png",
      live: "https://quillcraft.tanmay.space/",
    },
    {
      id: 6,
      title: "Muzix",
      description:
        "A beautifully crafted website for an online music academy, providing an exceptional learning experience for music enthusiasts.",
      technologies: ["TypeScript", "NextJS", "Acertinity UI"],
      github: "https://github.com/TanmayBansa1/Muzix",
      image: "/muzix.png",
      live: "https://muzix.tanmay.space/",
    },
  ];

  const projects = [...originalProjects, ...originalProjects]

  const CARD_WIDTH = 420 + 24
  const TOTAL_WIDTH = CARD_WIDTH * originalProjects.length

  const controls = useAnimation()
  const x = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)

  useEffect(() => {
    if (!inView || isMobile) return
    let frame: number
    let lastTime = performance.now()
    const animate = (now: number) => {
      if (!isPaused) {
        const elapsed = now - lastTime
        lastTime = now
        x.set(x.get() - (elapsed * 0.04))
        if (Math.abs(x.get()) >= TOTAL_WIDTH) {
          x.set(0)
        }
      } else {
        lastTime = now
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isPaused, inView, TOTAL_WIDTH, isMobile])

  function getOpacity(cardIndex: number) {
    if (isMobile) return 1
    const leftEdge = -xSpring.get() + cardIndex * CARD_WIDTH
    const fadeWidth = 250
    if (leftEdge < fadeWidth) {
      return Math.max(0, leftEdge / fadeWidth)
    } else if (leftEdge > TOTAL_WIDTH - fadeWidth) {
      return Math.max(0, (TOTAL_WIDTH - leftEdge) / fadeWidth)
    }
    return 1
  }

  function getScale(cardIndex: number) {
    if (isMobile) return 1
    const leftEdge = -xSpring.get() + cardIndex * CARD_WIDTH
    const center = TOTAL_WIDTH / 2
    const distanceFromCenter = Math.abs(leftEdge - center)
    const maxDistance = TOTAL_WIDTH / 2
    const scale = 1 - (distanceFromCenter / maxDistance) * 0.08
    return Math.max(0.92, scale)
  }

  return (
    <section
      id="projects"
      className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(192,192,192,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(128,128,128,0.05),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-70 dark:opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(192, 192, 192, 0.2), transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 text-black dark:text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 dark:from-gray-300 dark:via-white dark:to-gray-300 bg-clip-text text-transparent italic">
              Work
            </span>
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gray-500 dark:via-gray-400 to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl font-crimson text-gray-600 dark:text-gray-400 leading-relaxed">
            A curated collection of projects that showcase innovation,
            craftsmanship, and attention to detail.
          </p>
        </motion.div>

        {isMobile ? (
          <ProjectCarousel projects={originalProjects} />
        ) : (
          <div className="relative">
            {/* Bento Grid Layout for Desktop */}
            <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
              {/* Featured Project - Large Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="col-span-12 lg:col-span-7 group relative"
                style={{ perspective: "1000px" }}
              >
                <div className="relative h-full min-h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-black border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-700">
                  {/* Spotlight effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-900/10 dark:from-gray-900/20 dark:via-gray-200/20 dark:to-gray-400/20" />
                  </div>

                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={originalProjects[0].image || "/placeholder.svg"}
                      alt={originalProjects[0].title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Floating Badge */}
                    <motion.div
                      className="absolute top-6 right-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="px-4 py-2 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg">
                        <p className="text-sm font-crimson font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Featured
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-playfair font-bold text-black dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        {originalProjects[0].title}
                      </h3>
                      <p className="text-base md:text-lg font-crimson text-gray-600 dark:text-gray-400 leading-relaxed">
                        {originalProjects[0].description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {originalProjects[0].technologies.map((tech, idx) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.05 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 font-crimson font-medium px-3 py-1 hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      {originalProjects[0].github && (
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 border-2 border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 font-crimson group/btn"
                        >
                          <Link
                            href={originalProjects[0].github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                            View Code
                          </Link>
                        </Button>
                      )}
                      {originalProjects[0].live && (
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 hover:from-gray-700 hover:to-gray-500 from-black via-gray-800 to-gray-900 text-white transition-all duration-300 font-crimson shadow-lg hover:shadow-xl group/btn"
                        >
                          <Link
                            href={originalProjects[0].live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            Live
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Projects Grid - Reveal on Hover */}
              <div className="col-span-12 lg:col-span-5 grid grid-cols-1 gap-6">
                {originalProjects.slice(1, 3).map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                    className="group relative"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="relative h-[285px] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-700">
                      {/* Full Image Background */}
                      <div className="absolute inset-0">
                        <motion.img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        />
                        {/* Dark overlay that intensifies on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/60 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500" />
                      </div>

                      {/* Project Title Overlay - Always Visible */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <motion.div
                          className="group-hover:opacity-0 group-hover:-translate-y-2 transition-all duration-300"
                        >
                          <h3 className="text-2xl font-playfair font-bold text-white mb-2 drop-shadow-lg">
                            {project.title}
                          </h3>
                          <div className="flex gap-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge 
                                key={tech}
                                variant="secondary"
                                className="text-xs bg-white/20 dark:bg-white/10 text-white border border-white/30 backdrop-blur-sm font-crimson"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Sliding Info Panel - Appears on Hover */}
                      <div className="absolute inset-y-0 right-0 w-full translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                        <div className="h-full w-full bg-white/95 dark:bg-black backdrop-blur-xl border-l border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between shadow-2xl">
                          <div className="space-y-4">
                            {/* Title with gradient effect */}
                            <div>
                              <h3 className="text-xl font-playfair font-bold bg-gradient-to-r from-gray-600 to-black dark:from-gray-300 dark:to-white bg-clip-text text-transparent mb-2">
                                {project.title}
                              </h3>
                              <div className="h-[2px] w-12 bg-gradient-to-r from-gray-600 to-black dark:from-gray-300 dark:to-white rounded-full" />
                            </div>

                            {/* Description */}
                            <p className="text-sm font-crimson text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                              {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 8).map((tech) => (
                                <Badge 
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 font-crimson"
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 8 && (
                                <Badge 
                                  variant="secondary"
                                  className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 font-crimson"
                                >
                                  +{project.technologies.length - 8}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            {project.github && (
                              <Button 
                                asChild 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 border-2 border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 font-crimson group/btn"
                              >
                                <Link
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                                  Code
                                </Link>
                              </Button>
                            )}
                            {project.live && (
                              <Button 
                                asChild 
                                size="sm" 
                                className="flex-1 bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 hover:from-gray-700 hover:to-gray-500 from-black via-gray-800 to-gray-900 text-white transition-all duration-300 font-crimson shadow-lg group/btn"
                              >
                                <Link
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                  Live
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hover Indicator - Subtle hint */}
                      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center">
                          <svg 
                            className="w-4 h-4 text-white animate-pulse" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M13 7l5 5m0 0l-5 5m5-5H6" 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Row - 3 Column Grid */}
              {originalProjects.slice(3, 6).map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="col-span-12 md:col-span-4 group relative"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-black border  shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">

                    <div className="relative bg-white dark:bg-black rounded-2xl overflow-hidden">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <motion.img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-playfair font-bold text-black dark:text-white mb-2 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-sm font-crimson text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 8).map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 font-crimson"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 8 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 font-crimson"
                            >
                              +{project.technologies.length - 8}
                            </Badge>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          {project.github && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-crimson"
                            >
                              <Link
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-1 h-4 w-4" />
                                Code
                              </Link>
                            </Button>
                          )}
                          {project.live && (
                            <Button
                              asChild
                              size="sm"
                              className="bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 hover:from-gray-700 hover:to-gray-500 from-black via-gray-800 to-gray-900 text-white transition-all duration-300 font-crimson shadow-lg hover:shadow-xl"
                            >
                              <Link
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-1 h-4 w-4" />
                                Live
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Last Project - Full Width */}
              {originalProjects[6] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="col-span-12 group relative"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-700">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                        <motion.img
                          src={originalProjects[6].image || "/placeholder.svg"}
                          alt={originalProjects[6].title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 dark:to-black/40" />
                      </div>

                      {/* Content */}
                      <div className="md:w-3/5 p-8 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-playfair font-bold text-black dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                          {originalProjects[6].title}
                        </h3>
                        <p className="text-base font-crimson text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                          {originalProjects[6].description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {originalProjects[6].technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 font-crimson font-medium px-3 py-1"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                          {originalProjects[6].github && (
                            <Button
                              asChild
                              variant="outline"
                              className="border-2 border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 font-crimson"
                            >
                              <Link
                                href={originalProjects[6].github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-5 w-5" />
                                View Code
                              </Link>
                            </Button>
                          )}
                          {originalProjects[6].live && (
                            <Button
                              asChild
                              className="bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 hover:from-gray-700 hover:to-gray-500 from-black via-gray-800 to-gray-900 text-white transition-all duration-300 font-crimson shadow-lg hover:shadow-xl"
                            >
                              <Link
                                href={originalProjects[6].live}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Live
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}