import { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"

export const metadata: Metadata = constructMetadata({
  title: "About Tanmay Bansal | Software Engineer",
  description: "Learn more about Tanmay Bansal, a passionate Software Engineer specializing in AI/ML, full-stack development, and cloud technologies. Experience with AWS, Kubernetes, Next.js, and more.",
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

