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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Define the original projects
  const originalProjects: Project[] = [
    {
      id: 0,
      title: "GenInvoice",
      description: "A web application designed to streamline invoice generation and management.",
      technologies: ["NextJS", "TypeScript", "Mailtrap", "Prisma", "Clerk", "Upstash", "NeonDB", "ShadCN"],
      github: "https://github.com/TanmayBansa1/GenInvoice",
      image: "/geninvoice.png",
      live: "https://geninvoice.tanmay.space"
    },
    {
      id: 1,
      title: "ReplSage",
      description:
        "An innovative web application designed to streamline project collaboration, knowledge management, and AI-assisted development.",
      technologies: ["TypeScript", "NextJS", "LangChain", "Gemini","NeonDB", "Clerk", "Stripe", "AssemblyAI", "RAG", "Firebase", "ShadCN"],
      github: "https://github.com/TanmayBansa1/RepiSage",
      image: "/replsage.png",
      live: "https://repl-sage.vercel.app/"
    },
    {
      id: 2,
      title: "Miseit",
      description:
        "A robust and intuitive storage application designed to streamline organization and management of files with a seamless experience.",
      technologies: ["TypeScript", "NextJS", "Cloud Storage", "Appwrite","ShadCN"],
      github: "https://github.com/TanmayBansa1/Miseit",
      image: "/miseit.png",
      live: "https://mise-it.vercel.app/"
    },
    {
      id: 3,
      title: "Payme-App-v2",
      description:
        "A modern digital wallet application featuring real-time transactions, authentication, and a clean UI.",
      technologies: ["TypeScript", "React", "Node.js", "TurboRepo", "Webhooks", "NextAuth", "Prisma", "NeonDB", "ShadCN"],
      github: "https://github.com/TanmayBansa1/Payme-App-v2",
      image: "/payme.png",
      live: "https://payme-app-v2.vercel.app/"
    },
    {
      id: 4,
      title: "Quillcraft",
      description: "A blogging platform for people around the world to share their thoughts and stories.",
      technologies: ["TypeScript", "React", "Honojs", "Cloudflare Workers", "Prisma", "AivenDB"],
      github: "https://github.com/TanmayBansa1/Quillcraft",
      image: "/quillcraft.png",
      live: "https://quilllcraft-frontend.vercel.app/"
    },
    {
      id: 5,
      title: "Muzix",
      description:
        "A website designed for an online music academy to provide an exceptional learning experience for music enthusiasts.",
      technologies: ["TypeScript", "NextJS", "Acertinity UI"],
      github: "https://github.com/TanmayBansa1/Muzix",
      image: "/muzix.png",
      live: "https://music-academy-amber-three.vercel.app/"
    },
  ]

  // Duplicate projects for seamless looping
  const projects = [...originalProjects, ...originalProjects]

  // Calculate card width (including margin)
  const CARD_WIDTH = 400 + 24 // Increased from 350px to 400px + mx-3 (12px each side)
  const TOTAL_WIDTH = CARD_WIDTH * originalProjects.length

  // Animation controls for desktop
  const controls = useAnimation()
  const x = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)

  // Start the animation for desktop
  useEffect(() => {
    if (!inView || isMobile) return
    let frame: number
    let lastTime = performance.now()
    const animate = (now: number) => {
      if (!isPaused) {
        const elapsed = now - lastTime
        lastTime = now
        x.set(x.get() - (elapsed * 0.05)) // Slower speed for smoother animation
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

  // Fade in/out based on card position (desktop only)
  function getOpacity(cardIndex: number) {
    if (isMobile) return 1
    const leftEdge = -xSpring.get() + cardIndex * CARD_WIDTH
    const fadeWidth = 200 // Increased fade width for smoother transition
    if (leftEdge < fadeWidth) {
      return Math.max(0, leftEdge / fadeWidth)
    } else if (leftEdge > TOTAL_WIDTH - fadeWidth) {
      return Math.max(0, (TOTAL_WIDTH - leftEdge) / fadeWidth)
    }
    return 1
  }

  // Scale based on position for 3D effect
  function getScale(cardIndex: number) {
    if (isMobile) return 1
    const leftEdge = -xSpring.get() + cardIndex * CARD_WIDTH
    const center = TOTAL_WIDTH / 2
    const distanceFromCenter = Math.abs(leftEdge - center)
    const maxDistance = TOTAL_WIDTH / 2
    const scale = 1 - (distanceFromCenter / maxDistance) * 0.1
    return Math.max(0.9, scale)
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-[radial-gradient(circle_farthest-side,rgba(177,156,217,.35),rgba(255,255,255,0))]
    dark:bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-muted-foreground">
            Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and learning
            experience.
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
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
            <div ref={containerRef} className="flex overflow-hidden py-8">
              <motion.div
                className="flex"
                style={{ x: xSpring }}
                animate={controls}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={`${project.id}-${index}`}
                    className="flex-shrink-0 w-[400px] mx-3"
                    style={{ 
                      opacity: getOpacity(index),
                      scale: getScale(index),
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 20,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card className="h-[500px] flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 border">
                      <div className="relative h-[200px] overflow-hidden">
                        <motion.img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <CardHeader className="flex-none min-h-[100px]">
                        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow min-h-[100px]">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex-none h-[50px]">
                        <div className="flex gap-2 w-full">
                          {project.github && (
                            <Button asChild variant="outline" size="sm" className="flex-1">
                              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                Code
                              </Link>
                            </Button>
                          )}
                          {project.live && (
                            <Button asChild size="sm" className="flex-1">
                              <Link href={project.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Demo
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