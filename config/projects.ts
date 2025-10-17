export type Project = {
  id: number
  slug: string
  title: string
  description: string
  fullDescription: string
  technologies: string[]
  github?: string
  live?: string
  image: string
  featured: boolean
  category: "AI/ML" | "Full Stack" | "Web App" | "Cloud" | "Other"
  year: string
  highlights?: string[]
}

export const projects: Project[] = [
  {
    id: 0,
    slug: "sunoai",
    title: "SunoAI",
    description:
      "A ResNet-inspired model that listens to sounds, transforms them into spectrograms, and classifies them across 50 categories with precision.",
    fullDescription:
      "SunoAI is an advanced audio classification system built with deep learning. Using a ResNet-inspired architecture, it processes audio files by converting them into Mel spectrograms and classifies them across 50 different categories. The model achieves high accuracy through convolutional neural networks and is deployed using Modal for serverless inference. The frontend is built with Next.js and ShadCN UI for a seamless user experience.",
    technologies: [
      "CNN",
      "ML",
      "Python",
      "NextJS",
      "PyTorch",
      "ResNet",
      "Modal",
      "Audio",
      "Mel Spectrograms",
      "ShadCN",
    ],
    image: "/sunoai.png",
    github: "https://github.com/TanmayBansa1/CNN-Audio-Classifier",
    live: "https://sunoai.tanmay.space/",
    featured: true,
    category: "AI/ML",
    year: "2024",
    highlights: [
      "50+ audio categories classification",
      "ResNet-inspired architecture",
      "Mel spectrogram processing",
      "Serverless deployment with Modal",
    ],
  },
  {
    id: 1,
    slug: "geninvoice",
    title: "GenInvoice",
    description:
      "A sophisticated web application designed to streamline invoice generation and management with elegant automation.",
    fullDescription:
      "GenInvoice is a comprehensive invoicing solution that automates the entire invoice lifecycle. Built with Next.js and TypeScript, it features user authentication via Clerk, database management with Prisma and NeonDB, email notifications through Mailtrap, and rate limiting with Upstash. The application provides a clean, intuitive interface for creating, managing, and tracking invoices with automated reminders and payment tracking.",
    technologies: [
      "NextJS",
      "TypeScript",
      "Mailtrap",
      "Prisma",
      "Clerk",
      "Upstash",
      "NeonDB",
      "ShadCN",
    ],
    github: "https://github.com/TanmayBansa1/GenInvoice",
    image: "/geninvoice.png",
    live: "https://geninvoice.tanmay.space",
    featured: true,
    category: "Full Stack",
    year: "2024",
    highlights: [
      "Automated invoice generation",
      "Email notifications",
      "Payment tracking",
      "User authentication",
    ],
  },
  {
    id: 2,
    slug: "replsage",
    title: "ReplSage",
    description:
      "An innovative platform designed to revolutionize project collaboration, knowledge management, and AI-assisted development.",
    fullDescription:
      "ReplSage is an AI-powered development assistant that combines project collaboration with intelligent code analysis. Using RAG (Retrieval-Augmented Generation) with LangChain and Gemini, it provides context-aware assistance for development projects. Features include voice-to-text transcription with AssemblyAI, project knowledge base management, Stripe integration for subscriptions, and Firebase for real-time collaboration. Built with Next.js and TypeScript for optimal performance.",
    technologies: [
      "TypeScript",
      "NextJS",
      "LangChain",
      "Gemini",
      "NeonDB",
      "Clerk",
      "Stripe",
      "AssemblyAI",
      "RAG",
      "Firebase",
      "ShadCN",
    ],
    github: "https://github.com/TanmayBansa1/ReplSage",
    image: "/replsage.png",
    live: "https://replsage.tanmay.space/",
    featured: true,
    category: "AI/ML",
    year: "2024",
    highlights: [
      "AI-assisted development",
      "RAG-powered knowledge base",
      "Voice transcription",
      "Real-time collaboration",
    ],
  },
  {
    id: 3,
    slug: "miseit",
    title: "Miseit",
    description:
      "A robust and intuitive storage application designed to streamline organization and file management with seamless experience.",
    fullDescription:
      "Miseit is a modern cloud storage solution built with Next.js and TypeScript, powered by Appwrite for backend services. It provides secure file storage, organization, and sharing capabilities with an elegant user interface designed using ShadCN UI. The application focuses on simplicity and performance while offering powerful features for file management.",
    technologies: [
      "TypeScript",
      "NextJS",
      "Cloud Storage",
      "Appwrite",
      "ShadCN",
    ],
    github: "https://github.com/TanmayBansa1/Miseit",
    image: "/miseit.png",
    live: "https://miseit.tanmay.space/",
    featured: false,
    category: "Cloud",
    year: "2024",
    highlights: [
      "Secure file storage",
      "File organization",
      "Sharing capabilities",
      "Clean UI/UX",
    ],
  },
  {
    id: 4,
    slug: "payme-app-v2",
    title: "Payme-App-v2",
    description:
      "A modern digital wallet application featuring real-time transactions, secure authentication, and a pristine interface.",
    fullDescription:
      "Payme-App-v2 is a comprehensive digital wallet platform built with a modern tech stack using TurboRepo for monorepo management. It features real-time transaction processing, webhook integrations for payment notifications, secure authentication with NextAuth, and robust database management using Prisma with NeonDB. The application provides a seamless payment experience with real-time updates and transaction history.",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "TurboRepo",
      "Webhooks",
      "NextAuth",
      "Prisma",
      "NeonDB",
      "ShadCN",
    ],
    github: "https://github.com/TanmayBansa1/Payme-App-v2",
    image: "/payme.png",
    live: "https://payme.tanmay.space/",
    featured: false,
    category: "Full Stack",
    year: "2024",
    highlights: [
      "Real-time transactions",
      "Webhook integrations",
      "Secure authentication",
      "Transaction history",
    ],
  },
  {
    id: 5,
    slug: "quillcraft",
    title: "Quillcraft",
    description:
      "An elegant blogging platform for creators worldwide to share their thoughts, stories, and insights with the world.",
    fullDescription:
      "Quillcraft is a modern blogging platform built with React and Hono.js, leveraging Cloudflare Workers for edge computing. It uses Prisma with AivenDB for data management, providing a fast and reliable platform for content creators. The platform offers a clean writing experience with markdown support, user authentication, and a beautiful reading interface.",
    technologies: [
      "TypeScript",
      "React",
      "Honojs",
      "Cloudflare Workers",
      "Prisma",
      "AivenDB",
    ],
    github: "https://github.com/TanmayBansa1/Quillcraft",
    image: "/quillcraft.png",
    live: "https://quillcraft.tanmay.space/",
    featured: false,
    category: "Full Stack",
    year: "2024",
    highlights: [
      "Edge-powered performance",
      "Markdown support",
      "Clean writing interface",
      "Fast content delivery",
    ],
  },
  {
    id: 6,
    slug: "muzix",
    title: "Muzix",
    description:
      "A beautifully crafted website for an online music academy, providing an exceptional learning experience for music enthusiasts.",
    fullDescription:
      "Muzix is a stunning website built for an online music academy using Next.js, TypeScript, and Aceternity UI. The site features beautiful animations, interactive components, and a modern design that showcases music courses, instructors, and student testimonials. It provides an engaging user experience that reflects the creativity and passion of music education.",
    technologies: ["TypeScript", "NextJS", "Acertinity UI"],
    github: "https://github.com/TanmayBansa1/Muzix",
    image: "/muzix.png",
    live: "https://muzix.tanmay.space/",
    featured: false,
    category: "Web App",
    year: "2024",
    highlights: [
      "Beautiful animations",
      "Interactive components",
      "Modern design",
      "Responsive layout",
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const getProjectBySlug = (slug: string) => {
  return projects.find((project) => project.slug === slug)
}

export const getProjectsByCategory = (category: Project["category"]) => {
  return projects.filter((project) => project.category === category)
}

