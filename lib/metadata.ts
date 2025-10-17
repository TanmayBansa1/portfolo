import { Metadata } from "next"
import { siteConfig } from "@/config/seo"
import type { Project } from "@/config/projects"

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    keywords: Array.from(siteConfig.keywords),
    authors: [
      {
        name: siteConfig.creator.name,
        url: siteConfig.creator.url,
      },
    ],
    creator: siteConfig.creator.name,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@tanmaybansal",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function generateProjectMetadata(project: Project): Metadata {
  const title = `${project.title} | ${siteConfig.name}`
  const description = project.fullDescription || project.description
  
  return {
    title,
    description,
    keywords: [
      ...siteConfig.keywords,
      ...project.technologies,
      project.category,
      project.title,
    ],
    authors: [
      {
        name: siteConfig.creator.name,
        url: siteConfig.creator.url,
      },
    ],
    openGraph: {
      type: "article",
      locale: "en_IN",
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}${project.image}`],
      creator: "@tanmaybansal",
    }
  }
}

