import { Project } from "@/config/projects"
import { siteConfig, structuredData } from "@/config/seo"

export function generateProjectStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.fullDescription || project.description,
    url: project.live,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.url,
    },
    image: `${siteConfig.url}${project.image}`,
    keywords: project.technologies.join(", "),
    applicationSubCategory: project.category,
    ...(project.github && {
      codeRepository: project.github,
    }),
  }
}

export function generateBreadcrumbStructuredData(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateCollectionPageStructuredData(
  name: string,
  description: string,
  items: Project[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteConfig.url}/#projects`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
      })),
    },
  }
}

export const baseStructuredData = structuredData

