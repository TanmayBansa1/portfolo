"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: "Open Source Contributor",
      company: "Sugar Labs",
      period: "2025 - Present",
      description:
        "Contributing to the sugar labs organisation codebase, helping to improve and maintain existing projects, and learning new skills.",
      skills: ["React", "TypeScript", "Tailwindcss"],
    },
    {
      title: "Tech Intern",
      company: "Ox pro Media",
      period: "May 2024 - June 2024",
      description:
        "Developed and maintained full-stack applications, and implemented new features. WOrked extensively on a inhouse storage solution for the employees",
      skills: ["Appwrite", "Next.js", "PostgreSQL", "Prisma", "Stripe"],
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "2025 - Present",
      description: "Worked on various client projects, developing websites and full stack web applications.",
      skills: ["Next.js", "TypeScript", "ShadCN", "Docker", "AWS", "Figma", "Git", "CI/CD"],
    },
    {
      title: "Tech Volunteer and Event Management Intern",
      company: "Let's Go India Foundation",
      period: "2023 - 2024",
      description: "Assisted in the development of web applications, and managed events and campaigns.",
      skills: ["Reactjs", "JavaScript", "HTML/CSS"],
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About Me</h1>
            <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-xl" />
              <div className="relative bg-card rounded-lg p-6 shadow-lg border">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Delhi, India</span>
                  </div>
                  <h3 className="text-xl font-semibold">Tanmay Bansal</h3>
                  <p className="text-muted-foreground">
                    I&apos;m a passionate full-stack developer with expertise in building modern web applications. I
                    love creating innovative solutions that solve real-world problems.
                  </p>
                  <p className="text-muted-foreground">
                    My journey in web development has led me to work on various projects ranging from collaborative
                    platforms to digital wallets and content management systems.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">What I Do</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Web Development</h4>
                      <p className="text-muted-foreground text-sm">
                        Building responsive and performant web applications using modern frameworks and technologies.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3v14"></path>
                        <path d="M5 10l7 7 7-7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Full-Stack Development</h4>
                      <p className="text-muted-foreground text-sm">
                        Creating end-to-end solutions with both frontend and backend expertise, ensuring seamless user
                        experiences.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Problem Solving</h4>
                      <p className="text-muted-foreground text-sm">
                        Analyzing complex problems and developing efficient solutions with clean, maintainable code.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <div ref={ref} className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Experience</h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
              <p className="text-muted-foreground">My professional journey in the world of web development.</p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20"></div>

              {/* Experience items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10"></div>

                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2">
                              {exp.period}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                          <p className="text-muted-foreground mt-2">{exp.description}</p>
                          <div className="flex flex-wrap gap-2 mt-4 justify-start">
                            {exp.skills.map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Empty space for the other side */}
                    <div className="w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
