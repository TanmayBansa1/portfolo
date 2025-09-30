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
    {
      title: "Home",
      href: "/",
      icon: (
        <Home className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
    },
    {
      title: "About",
      href: "/about",
      icon: (
        <User2 className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
    },
    {
      title: "Projects",
      href: "/#projects",
      icon: (
        <Briefcase className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
    },
    {
      title: "Skills",
      href: "/#skills",
      icon: (
        <Code className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
    },
    {
      title: "Contact",
      href: "/#contact",
      icon: (
        <Mail className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
    },
    { title: "Toggle Theme", icon: <ModeToggle /> },
    {
      title: "Github",
      href: "https://github.com/TanmayBansa1",
      icon: (
        <Github className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
      target: "_blank",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/tanmay-bansal-40bb44199/",
      icon: (
        <Linkedin className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
      target: "_blank",
    },
    {
      title: "X",
      href: "https://x.com/K_A_I11",
      icon: (
        <Twitter className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
      ),
      target: "_blank",
    },
    {
      title: "Resume",
      href: "https://drive.google.com/file/d/1XHREvJwu8655Ssfi7yqv5--zVUuE6FLL/view?usp=drive_link",
      target: "_blank",
      icon: (
        <DownloadCloud className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"></DownloadCloud>
      ),
    },
    {
      title: "Blogs",
      href: "https://medium.com/@tanmay.bansal20",
      target: "_blank",
      icon: (
        <Pencil className="h-full w-full text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"></Pencil>
      ),
    },
  ];

  return (
    <div className="flex fixed bottom-5 justify-center w-full z-50">
      <FloatingDock
        mobileClassName="ml-auto pr-2 mr-4 pb-2"
        items={navLinks}
      />
    </div>
  )
}