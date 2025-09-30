"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Code2, Palette, Lightbulb } from "lucide-react"

export default function About() {
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

  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Architecting end-to-end solutions with both frontend finesse and backend robustness, ensuring seamless user experiences."
    },
    {
      icon: Palette,
      title: "Design & Innovation",
      description: "Creating visually stunning interfaces that blend aesthetics with functionality, bringing designs to life with precision."
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Transforming complex challenges into elegant solutions through analytical thinking and clean, maintainable code."
    }
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(192,192,192,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_50%,rgba(128,128,128,0.05),transparent_50%)]" />
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-40 pointer-events-none"
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
            About <span className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 dark:from-gray-300 dark:via-white dark:to-gray-300 bg-clip-text text-transparent italic">Me</span>
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gray-500 dark:via-gray-400 to-transparent mx-auto mb-8" />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column - Personal info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative p-8 lg:p-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-black shadow-xl">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-gray-400 dark:border-gray-700 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gray-400 dark:border-gray-700 rounded-br-2xl" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5" />
                    <span className="font-crimson text-lg">Delhi, India</span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-black dark:text-white">
                    Tanmay Bansal
                  </h3>
                  
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 font-crimson leading-relaxed">
                    <p className="text-lg">
                      A <span className="font-semibold text-black dark:text-white">passionate full-stack developer</span> with a 
                      keen eye for detail and a love for creating innovative solutions that bridge the gap between 
                      technology and human experience.
                    </p>
                    <p className="text-lg">
                      My journey in software development has been driven by curiosity and a commitment to excellence. 
                      I specialize in building modern web applications that are not only functional but also 
                      <span className="font-semibold text-black dark:text-white italic"> beautifully crafted</span>.
                    </p>
                    <p className="text-lg">
                      From collaborative platforms to digital wallets, each project represents a unique challenge 
                      and an opportunity to push the boundaries of what's possible with code.
                    </p>
                  </div>

                  {/* Signature-like element */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                    <p className="font-cinzel text-2xl text-gray-500 dark:text-gray-600 italic">
                      Crafting digital excellence
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column - What I Do */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-playfair font-semibold text-black dark:text-white mb-8">
                What I Do
              </h3>
              
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <div className="relative flex gap-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-6 w-6 text-gray-800 dark:text-gray-300" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-xl font-playfair font-semibold text-black dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="font-crimson text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Stats or additional info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-3 gap-4 pt-6"
              >
                {[
                  { value: "7+", label: "Projects" },
                  { value: "20+", label: "Technologies" },
                  { value: "∞", label: "Ideas" }
                ].map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950"
                  >
                    <div className="text-3xl lg:text-4xl font-playfair font-bold text-black dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-crimson text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}