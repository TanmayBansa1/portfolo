import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Crimson_Pro, Cinzel } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import {Analytics} from "@vercel/analytics/react"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
})

const crimson = Crimson_Pro({ 
  subsets: ["latin"],
  variable: '--font-crimson',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "Tanmay Bansal | Portfolio",
  description: "Full-stack developer portfolio showcasing projects and skills",
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning scroll-behavior="smooth">
      <body className={`${crimson.variable} ${playfair.variable} ${cinzel.variable} ${crimson.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster richColors/>
        <Analytics/>
      </body>
    </html>
  )
}
