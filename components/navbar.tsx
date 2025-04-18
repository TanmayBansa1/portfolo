"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Briefcase, Code, Home, Mail, Menu, User2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { FloatingDock } from "./ui/floating-dock"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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
    { title: "Home", href: "/", icon: <Home /> },
    { title: "About", href: "/about", icon: <User2 /> },
    { title: "Projects", href: "/#projects", icon: <Briefcase /> },
    { title: "Skills", href: "/#skills", icon: <Code /> },
    { title: "Contact", href: "/#contact", icon: <Mail /> },
    { title: "Toggle Theme", icon: <ModeToggle /> }
  ]

  return (
    <div className="flex fixed bottom-5 justify-center w-full z-50">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={navLinks}
      />
    </div>
  )
}
