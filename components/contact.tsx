"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react"
import sendMessage from "@/lib/mailtrap"
import {toast} from "sonner"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await sendMessage({
      message: {
        email: formData.email,
        name: formData.name,
        subject: formData.subject,
        message: formData.message
      }
    })

    if(result.success){
      toast.success("Thank you for your message. I'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }else{
      toast.error("Message failed to send. Please try again later.")
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "tanmaybansal.20@gmail.com",
      link: "https://mail.google.com/mail/?view=cm&to=tanmaybansal.20@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Delhi, India",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8742921973",
      link: "tel:+918742921973",
    },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-300/10 dark:bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/10 dark:bg-gray-400/5 rounded-full blur-3xl" />
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
            Let's <span className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 dark:from-gray-300 dark:via-white dark:to-gray-300 bg-clip-text text-transparent italic">Connect</span>
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gray-500 dark:via-gray-400 to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl font-crimson text-gray-600 dark:text-gray-400 leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 backdrop-blur-sm hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-300 group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="h-5 w-5 text-gray-800 dark:text-gray-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-black dark:text-white mb-1 text-lg">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-crimson text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm block"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-crimson text-gray-600 dark:text-gray-400 text-sm">{info.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Decorative quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950/50 dark:to-black/50 backdrop-blur-sm"
            >
              <p className="font-cinzel text-lg text-gray-600 dark:text-gray-400 italic leading-relaxed">
                "Great things are built through collaboration and vision."
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-crimson font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 focus:border-gray-400 dark:focus:border-gray-600 font-crimson"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-crimson font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 focus:border-gray-400 dark:focus:border-gray-600 font-crimson"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-crimson font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 focus:border-gray-400 dark:focus:border-gray-600 font-crimson"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-crimson font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      required
                      className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 focus:border-gray-400 dark:focus:border-gray-600 font-crimson resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300 py-6 text-base font-crimson font-medium shadow-lg hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/10 group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending your message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /> 
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}