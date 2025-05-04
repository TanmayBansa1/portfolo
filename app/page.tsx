"use client"

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <section>
        <Projects />
      </section>
      <section>
        <Skills />
      </section>
      <section>
        <Contact />
      </section>
      <Footer />
    </main>
  )
}
