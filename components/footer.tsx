import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-2xl md:text-3xl font-playfair font-bold mb-3">
              <span className="text-silver">Tanmay Bansal</span>
            </Link>
            <p className="text-sm font-crimson text-gray-600 dark:text-gray-400 max-w-md text-center md:text-left">
              Crafting digital experiences with elegance and precision. Full-stack developer passionate about innovation and excellence.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex space-x-4">
              <Link
                href="https://github.com/TanmayBansa1"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300"
              >
                <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/tanmay-bansal-40bb44199/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300"
              >
                <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://mail.google.com/mail/?view=cm&to=tanmaybansal.20@gmail.com"
                target="_blank"
                className="group p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300"
              >
                <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs font-crimson text-gray-500 dark:text-gray-500">
              <span>&copy; {new Date().getFullYear()} Tanmay Bansal.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1">
                Crafted with <Heart className="h-3 w-3 fill-current" /> and precision
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}