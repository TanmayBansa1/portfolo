"use client";
import { IconArrowNarrowDown} from "@tabler/icons-react";
import { useState, useId } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  image: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const id = useId();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };


  return (
    <div className="relative w-full mx-auto" aria-labelledby={`carousel-heading-${id}`}>
      <div className="flex justify-center [perspective:1200px] [transform-style:preserve-3d]">
        <div className="relative w-[90vw] max-w-[350px] h-[500px]">
          {projects.map((project, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                transform: index === currentIndex 
                  ? "scale(1) rotateX(0deg)" 
                  : "scale(0.95) rotateX(8deg)",
                opacity: index === currentIndex ? 1 : 0.5,
                zIndex: index === currentIndex ? 1 : 0,
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out",
                transformOrigin: "bottom",
              }}
            >
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border">
                <div className="relative overflow-hidden">
                  <div className="h-48 bg-muted overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {project.github && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {project.live && (
                    <Button asChild size="sm">
                      <Link href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <button
          className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 rotate-180"
          title="Go to previous slide"
          onClick={prevSlide}
        >
          <IconArrowNarrowDown className="text-neutral-600 dark:text-neutral-200" />
        </button>

        <button
          className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200"
          title="Go to next slide"
          onClick={nextSlide}
        >
          <IconArrowNarrowDown className="text-neutral-600 dark:text-neutral-200" />
        </button>
      </div>
    </div>
  );
} 