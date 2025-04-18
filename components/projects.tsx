"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

type Project = {
  id: number
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image: string
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])
  const controls = useAnimation()

  // Define the original projects
  const originalProjects: Project[] = [
    {
      id: 1,
      title: "ReplSage",
      description:
        "An innovative web application designed to streamline project collaboration, knowledge management, and AI-assisted development.",
      technologies: ["TypeScript", "React", "Node.js", "AI"],
      github: "https://github.com/TanmayBansa1/RepiSage",
      image: "/replsage.png",
    },
    {
      id: 2,
      title: "Miseit",
      description:
        "A robust and intuitive storage application designed to streamline organization and management of files with a seamless experience.",
      technologies: ["TypeScript", "React", "Cloud Storage"],
      github: "https://github.com/TanmayBansa1/Miseit",
      image: "/miseit.png",
    },
    {
      id: 3,
      title: "Payme-App-v2",
      description:
        "A modern digital wallet application featuring real-time transactions, authentication, and a clean UI.",
      technologies: ["TypeScript", "React", "Node.js", "Payment API"],
      github: "https://github.com/TanmayBansa1/Payme-App-v2",
      image: "/payme.png",
    },
    {
      id: 4,
      title: "Quillcraft",
      description: "A blogging platform for people around the world to share their thoughts and stories.",
      technologies: ["TypeScript", "React", "CMS"],
      github: "https://github.com/TanmayBansa1/Quillcraft",
      image: "/quillcraft.png",
    },
    {
      id: 5,
      title: "Muzix",
      description:
        "A website designed for an online music academy to provide an exceptional learning experience for music enthusiasts.",
      technologies: ["TypeScript", "React", "Audio API"],
      github: "https://github.com/TanmayBansa1/Muzix",
      image: "/muzix.png",
    },
  ]

  // Initialize projects with duplicates for infinite scrolling
  useEffect(() => {
    // Create a duplicate set of projects with new IDs for the infinite scroll effect
    const duplicatedProjects = [...originalProjects, ...originalProjects.map((p) => ({ ...p, id: p.id + 100 }))]
    setProjects(duplicatedProjects)
    setVisibleProjects(duplicatedProjects)
  }, [])

  // Animation for the carousel
  useEffect(() => {
    if (isPaused || !inView) return

    const interval = setInterval(() => {
      if (containerRef.current && !isPaused) {
        // Move projects to create infinite scroll effect
        setVisibleProjects((prev) => {
          const firstProject = prev[0]
          const newProjects = [...prev.slice(1), firstProject]
          return newProjects
        })
      }
    }, 1500) // Adjust timing as needed

    return () => clearInterval(interval)
  }, [isPaused, inView])

  return (
    <section id="projects" className="py-20 md:py-32" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-muted-foreground">
            Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and learning
            experience.
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>

          <div ref={containerRef} className="flex overflow-hidden py-8">
            <div className="flex transition-transform duration-1000 ease-linear">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 w-[300px] md:w-[350px] mx-3"
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
                      {project.demo && (
                        <Button asChild size="sm">
                          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
