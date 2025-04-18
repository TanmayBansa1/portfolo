"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"

type Skill = {
  name: string
  icon: string
  category: "frontend" | "backend" | "tools" | "other"
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills: Skill[] = [
    // Frontend
    { name: "HTML/CSS", icon: "🌐", category: "frontend" },
    { name: "JavaScript", icon: "📜", category: "frontend" },
    { name: "TypeScript", icon: "🔷", category: "frontend" },
    { name: "React", icon: "⚛️", category: "frontend" },
    { name: "Next.js", icon: "▲", category: "frontend" },
    { name: "Tailwind CSS", icon: "🎨", category: "frontend" },

    // Backend
    { name: "Node.js", icon: "🟢", category: "backend" },
    { name: "Express", icon: "🚂", category: "backend" },
    { name: "MongoDB", icon: "🍃", category: "backend" },
    { name: "SQL", icon: "📊", category: "backend" },
    { name: "REST API", icon: "🔌", category: "backend" },

    // Tools
    { name: "Git", icon: "🔄", category: "tools" },
    { name: "GitHub", icon: "🐙", category: "tools" },
    { name: "VS Code", icon: "📝", category: "tools" },
    { name: "Figma", icon: "🎭", category: "tools" },

    // Other
    { name: "Problem Solving", icon: "🧩", category: "other" },
    { name: "Team Collaboration", icon: "👥", category: "other" },
    { name: "Agile/Scrum", icon: "🔄", category: "other" },
  ]

  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
    { id: "other", name: "Other" },
  ]

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-muted-foreground">
            Here are the technologies and skills I&apos;ve acquired throughout my journey as a developer.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-lg blur-xl opacity-50" />
              <Card className="relative overflow-hidden border border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 inline-block bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills
                      .filter((skill) => skill.category === category.id)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="group"
                        >
                          <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-primary/10 shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                            <span className="text-lg" role="img" aria-label={skill.name}>
                              {skill.icon}
                            </span>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
