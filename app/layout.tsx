import type React from "react"
import { Playfair_Display, Crimson_Pro, Cinzel } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/react"
import { constructMetadata } from "@/lib/metadata"
import { baseStructuredData } from "@/lib/structured-data"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
})

const crimson = Crimson_Pro({ 
  subsets: ["latin"],
  variable: '--font-crimson',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning scroll-behavior="smooth">
      <head>
        <meta
          name="google-site-verification"
          content="uTfF1FzhGSq0yg4JMvHGwn0RRpCH2sctkWJkXZ6tkaM"
        />
        {/* Structured Data - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(baseStructuredData.person),
          }}
        />
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(baseStructuredData.website),
          }}
        />
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(baseStructuredData.organization),
          }}
        />
      </head>
      <body
        className={`${crimson.variable} ${playfair.variable} ${cinzel.variable} ${crimson.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
