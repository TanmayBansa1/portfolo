"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"

type Skill = {
  name: string
  icon: string
  category: "frontend" | "backend" | "tools" | "AI/ML" 
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const skills: Skill[] = [
    // Frontend
    { name: "NextJs", icon: "▲", category: "frontend" },
    { name: "React.js", icon: "⚛️", category: "frontend" },
    { name: "Tailwind CSS", icon: "💠", category: "frontend" },
    { name: "Shadcn", icon: "✨", category: "frontend" },
    { name: "HTML", icon: "🌐", category: "frontend" },
    { name: "CSS", icon: "🎨", category: "frontend" },
    
    // Backend
    { name: "Node.js", icon: "🟢", category: "backend" },
    { name: "Appwrite", icon: "📝", category: "backend" },
    { name: "Prisma", icon: "🌱", category: "backend" },
    { name: "Mongoose", icon: "🍄", category: "backend" },
    { name: "PostgreSQL", icon: "🐘", category: "backend" },
    { name: "SQL", icon: "📊", category: "backend" },
    { name: "MongoDB", icon: "🍃", category: "backend" },
    { name: "Hono", icon: "🔥", category: "backend" },
    { name: "Firebase", icon: "🔥", category: "backend" },
    { name: "Cloudflare Workers", icon: "☁️", category: "backend" },
    { name: "Websockets", icon: "🔌", category: "backend" },
    { name: "Stripe", icon: "💳", category: "backend" },
    { name: "JsonWebTokens", icon: "🛡️", category: "backend" },
    { name: "ZOD", icon: "🧪", category: "backend" },
    
    // Data Science / ML
    { name: "Python", icon: "🐍", category: "AI/ML" },
    { name: "TensorFlow", icon: "🔶", category: "AI/ML" },
    { name: "Scikit Learn", icon: "📚", category: "AI/ML" },
    { name: "OpenCV", icon: "👁️", category: "AI/ML" },
    { name: "RAG", icon: "📖", category: "AI/ML" },
    
    // Tools
    { name: "Git", icon: "🔄", category: "tools" },
    { name: "Github", icon: "🐙", category: "tools" },
    { name: "LangChain", icon: "🔗", category: "tools" },
    { name: "Postman", icon: "📬", category: "tools" },
    { name: "Hoppscotch", icon: "🚀", category: "tools" },
    { name: "MongoDB Compass", icon: "🧭", category: "tools" },
    { name: "Figma", icon: "🎭", category: "tools" },
    { name: "Docker", icon: "🐳", category: "tools" },
    { name: "C++/C", icon: "💻", category: "tools" },

  ]

  const categories = [
    { id: "frontend", name: "Frontend", description: "Modern UI/UX Development" },
    { id: "backend", name: "Backend", description: "Scalable Server Architecture" },
    { id: "AI/ML", name: "AI/ML", description: "Intelligent Solutions" },
    { id: "tools", name: "Tools & DevOps", description: "Development Ecosystem" },
  ]

  return (
    <section id="skills" className="py-24 md:py-32 bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
      <div 
        className="absolute inset-0 opacity-70 dark:opacity-10 pointer-events-none"
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
            Technical <span className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 dark:from-gray-300 dark:via-white dark:to-gray-300 bg-clip-text text-transparent italic">Expertise</span>
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gray-500 dark:via-gray-400 to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl font-crimson text-gray-600 dark:text-gray-400 leading-relaxed">
            A comprehensive arsenal of technologies and tools, refined through experience and continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              
              <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 backdrop-blur-sm hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-500 h-full">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />
                
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-playfair font-bold text-black dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm font-crimson text-gray-600 dark:text-gray-500 uppercase tracking-wider">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {skills
                      .filter((skill) => skill.category === category.id)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.03 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="group/skill"
                        >
                          <div className="relative">
                            {/* Hover glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full opacity-0 group-hover/skill:opacity-30 blur transition-all duration-300" />
                            
                            <div className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gray-100 dark:bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800 group-hover/skill:border-gray-400 dark:group-hover/skill:border-gray-600 shadow-lg transition-all duration-300">
                              <span className="text-base" role="img" aria-label={skill.name}>
                                {skill.icon}
                              </span>
                              <span className="font-crimson font-medium text-gray-700 dark:text-gray-300 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors">
                                {skill.name}
                              </span>
                            </div>
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