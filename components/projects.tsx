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
    <section id="projects" className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(192,192,192,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(128,128,128,0.05),transparent_50%)]" />
      <div 
        className="absolute inset-0 opacity-70 dark:opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(192, 192, 192, 0.2), transparent 50%)`
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
            Featured <span className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 dark:from-gray-300 dark:via-white dark:to-gray-300 bg-clip-text text-transparent italic">Work</span>
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gray-500 dark:via-gray-400 to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl font-crimson text-gray-600 dark:text-gray-400 leading-relaxed">
            A curated collection of projects that showcase innovation, craftsmanship, and attention to detail.
          </p>
        </motion.div>

        {isMobile ? (
          <ProjectCarousel projects={originalProjects} />
        ) : (
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
            <div ref={containerRef} className="flex overflow-hidden py-10">
              <motion.div
                className="flex"
                style={{ x: xSpring }}
                animate={controls}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={`${project.id}-${index}`}
                    className="flex-shrink-0 w-[420px] mx-3"
                    style={{ 
                      opacity: getOpacity(index),
                      scale: getScale(index),
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-[560px] flex flex-col overflow-hidden group border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 transition-all duration-500">
                      <div className="relative h-[220px] overflow-hidden bg-gray-50 dark:bg-gray-900">
                        <motion.img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <CardHeader className="flex-none min-h-[120px] pb-3">
                        <CardTitle className="text-2xl font-playfair font-semibold text-black dark:text-white line-clamp-1">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="font-crimson text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow min-h-[110px]">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary"
                              className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 font-crimson font-medium"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 6 && (
                            <Badge 
                              variant="secondary"
                              className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 font-crimson font-medium"
                            >
                              +{project.technologies.length - 6}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex-none h-[60px] pt-0">
                        <div className="flex gap-3 w-full">
                          {project.github && (
                            <Button 
                              asChild 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-crimson"
                            >
                              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                Code
                              </Link>
                            </Button>
                          )}
                          {project.live && (
                            <Button 
                              asChild 
                              size="sm" 
                              className="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300 font-crimson"
                            >
                              <Link href={project.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}