"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Github, Link as LinkIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  github: string;
  live?: string;
  video: string;
}

export function Projects() {
  const projects: Project[] = [
    {
      title: "Oxyheal Booking System",
      description: "Built a web-based booking system for oxygen therapy appointments with custom backend logic.",
      fullDescription:
        "Developed a responsive appointment booking platform for oxygen therapy clinics. Patients can book sessions online with real-time availability and receive automated confirmations. Built using HTML, CSS, JavaScript, and Node.js, with API integration to manage data flow and booking logic.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "API Management"],
      github: "https://github.com/Muhammad2609/oxyheal",
      live: "https://oxyheal.vercel.app/",
      video: "/videos/oxyheal-demo.mp4"
    }
    ,
    {
      title: "Java Platform Shooter Game",
      description: "Developed a classic-style 2D platform shooter game inspired by Super Mario Bros.",
      fullDescription:
        "Created a Java-based platform shooter game featuring multiple levels, enemies, health bars, and interactive mechanics. Used object-oriented programming to handle gameplay logic, and the CityEngine library to enhance visuals and physics. Designed to deliver an immersive retro-style experience.",
      tech: ["Java", "CityEngine", "Game Development", "OOP"],
      github: "https://github.com/Muhammad2609/mario-game",
      live: "https://github.com/Muhammad2609/mario-game",
      video: "/videos/mario-game.mp4"
    },
    {
      title: "Network Protocol Development - 2D#4",
      description: "Designed a Java-based peer-to-peer distributed hash table (DHT) to improve network efficiency.",
      fullDescription:
        "Built and tested a distributed hash table protocol (2D#4) in Java to meet RFC specifications. Leveraged TCP/IP and application-layer communication techniques to create a scalable P2P system. Used Wireshark for real-time packet analysis and protocol debugging.",
      tech: ["Java", "Networking", "TCP/IP", "Distributed Systems", "Wireshark"],
      github: "https://github.com/Muhammad2609/networks",
      video: "https://example.com/videos/network-demo.mp4"
    },
    {
      title: "Personal Portfolio Website",
      description: "Built a modern and interactive portfolio to showcase my work, skills, and technical journey.",
      fullDescription:
        "Designed and developed this portfolio using Next.js and Tailwind CSS, with animations powered by Framer Motion and accessible UI via Radix. Features include an interactive chatbot, project filtering, form validation using React Hook Form and Zod, and full mobile responsiveness. Deployed with Vercel.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Vercel"],
      github: "https://github.com",
      video: "https://example.com/videos/portfolio-demo.mp4"
    }
  ];
  
  

  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 tracking-wide">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Projects
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={`https://picsum.photos/seed/${index}/800/400`}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

          <div className="mb-4">
            <p className="text-muted-foreground">
              {expanded ? project.fullDescription : project.description}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary flex items-center gap-1 mt-2 text-sm hover:underline"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
            {project.live && (
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <LinkIcon className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
