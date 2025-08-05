"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Briefcase, Code, DownloadCloud, Github, Home, Linkedin, Mail, Pencil, Twitter, User2 } from "lucide-react"
import { FloatingDock } from "./ui/floating-dock"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { title: "Home", href: "/", icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { title: "About", href: "/about", icon: <User2 className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { title: "Projects", href: "/#projects", icon: <Briefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { title: "Skills", href: "/#skills", icon: <Code className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { title: "Contact", href: "/#contact", icon: <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
    { title: "Toggle Theme", icon: <ModeToggle /> },
    { title: "Github", href: "https://github.com/TanmayBansa1", icon: <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />, target: "_blank" },
    { title: "LinkedIn", href: "https://www.linkedin.com/in/tanmay-bansal-40bb44199/", icon: <Linkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />, target: "_blank" },
    { title: "X", href: "https://x.com/K_A_I11", icon: <Twitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />, target: "_blank" },
    { title: "Resume", href: "https://drive.google.com/file/d/1yvOApjXOsKG9z5FpXxbMf2WIqx3_PrS0/view?usp=drive_link", target: "_blank", icon: <DownloadCloud className="h-full w-full text-neutral-500 dark:text-neutral-300"></DownloadCloud>},
    { title: "Blogs", href: "https://tanmaybansal.hashnode.dev/", target: "_blank", icon: <Pencil className="h-full w-full text-neutral-500 dark:text-neutral-300"></Pencil> }
  ]

  return (
    <div className="flex fixed bottom-5 justify-center w-full z-50">
      <FloatingDock
        mobileClassName="ml-auto pr-2 mr-4 pb-2"
        items={navLinks}
      />
    </div>
  )
}
