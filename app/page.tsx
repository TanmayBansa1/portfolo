import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-10 text-center">
        <Link href="/about">
          <Button variant="outline" size="lg" className="rounded-full">
            Learn More About Me
          </Button>
        </Link>
      </div>
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
