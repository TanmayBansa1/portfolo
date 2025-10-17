"use client"
import { useState, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProjectCarousel } from "@/components/project-carousel"
import { projects as importedProjects } from "@/config/projects"
import { generateCollectionPageStructuredData } from "@/lib/structured-data"

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isPaused, setIsPaused] = useState(false)
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

  const originalProjects = importedProjects

  // Structured data for projects collection
  const projectsStructuredData = generateCollectionPageStructuredData(
    "Featured Projects",
    "A collection of innovative software projects showcasing expertise in AI/ML, full-stack development, and modern web technologies.",
    originalProjects
  )

  const CARD_WIDTH = 420 + 24
  const TOTAL_WIDTH = CARD_WIDTH * originalProjects.length

  const x = useMotionValue(0)

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


  return (
    <>
      {/* Structured Data for Projects Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData),
        }}
      />

      <section
        id="projects"
        className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden"
        ref={ref}
        aria-label="Featured Projects"
      >
      {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(192,192,192,0.05),transparent_50%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(128,128,128,0.05),transparent_50%)]" aria-hidden="true" />
      <div 
        className="absolute inset-0 opacity-70 dark:opacity-30 pointer-events-none"
        style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(192, 192, 192, 0.2), transparent 50%)`,
        }}
          aria-hidden="true"
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
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full"
                    >
                      <Image
                        src={originalProjects[0].image || "/placeholder.svg"}
                        alt={`${originalProjects[0].title} - ${originalProjects[0].description}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    </motion.div>
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
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full h-full"
                        >
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={`${project.title} - ${project.description}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        </motion.div>
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
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="w-full h-full"
                        >
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={`${project.title} - ${project.description}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading="lazy"
                          />
                        </motion.div>
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
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="w-full h-full"
                        >
                          <Image
                            src={originalProjects[6].image || "/placeholder.svg"}
                            alt={`${originalProjects[6].title} - ${originalProjects[6].description}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            loading="lazy"
                          />
                        </motion.div>
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
    </>
  );
}