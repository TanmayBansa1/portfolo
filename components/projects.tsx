"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
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
  const [containerWidth, setContainerWidth] = useState(0)
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
  const CARD_WIDTH = 350 + 24 // 350px + mx-3 (12px each side)
  const TOTAL_WIDTH = CARD_WIDTH * originalProjects.length

  // Animation controls for desktop
  const controls = useAnimation()
  const [x, setX] = useState(0)

  // Start the animation for desktop
  useEffect(() => {
    if (!inView || isMobile) return
    let frame: number
    let lastTime = performance.now()
    const animate = (now: number) => {
      if (!isPaused) {
        const elapsed = now - lastTime
        lastTime = now
        setX((prev) => {
          let next = prev - (elapsed * 0.08)
          if (Math.abs(next) >= TOTAL_WIDTH) {
            next = 0
          }
          return next
        })
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
    const leftEdge = -x + cardIndex * CARD_WIDTH
    const fadeWidth = 100
    if (leftEdge < fadeWidth) {
      return leftEdge / fadeWidth
    } else if (leftEdge > TOTAL_WIDTH - fadeWidth) {
      return (TOTAL_WIDTH - leftEdge) / fadeWidth
    }
    return 1
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
          // Mobile view with Aceternity UI Carousel
          <ProjectCarousel projects={originalProjects} />
        ) : (
          // Desktop view with horizontal scroll
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
                style={{ x }}
                animate={controls}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={`${project.id}-${index}`}
                    className="flex-shrink-0 w-[300px] md:w-[350px] mx-3"
                    style={{ opacity: getOpacity(index) }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.03, zIndex: 20 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border">
                      <div className="relative overflow-hidden">
                        <div className="h-48 bg-muted overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                      </div>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {project.github && (
                          <Button asChild variant="outline" size="sm">
                            <Link href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                        )}
                        {project.live && (
                          <Button asChild size="sm">
                            <Link href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </Link>
                          </Button>
                        )}
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