"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Code2, GraduationCap, Laptop, Users } from "lucide-react";
import { Chatbot } from "./Chatbot";

export function About() {
  const features = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Software Development",
      description:
        "Experienced in Python, JavaScript, Java, C++, and full-stack web development. Passionate about building scalable and efficient solutions.",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Education",
      description:
        "Studying Computer Science at City, University of London. Awarded the Jack Petchey Award for Outstanding Achievement.",
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Professional Experience",
      description:
        "Technical Consultant at Inetum, leading ServiceNow implementations and cloud solutions for high-profile enterprise clients.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Beyond the Code",
      description:
        "Always looking for the next challenge—whether it’s optimising workflows, exploring blockchain, or competing in sports.",
    },
  ];

  return (
    <div className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Neon Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 tracking-wide">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            About Me
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I’ve always had a curious mind, drawn to problem-solving and finding creative solutions. Whether it's 
          engineering software, navigating financial markets, or debating the future of AI, I thrive on tackling 
          challenges head-on. 
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          By day, I’m a Technical Consultant specialising in cloud computing and digital transformation. By night, 
          you’ll find me exploring new technologies, discussing cryptocurrencies, or out on the pitch playing football.  
          I enjoy blending strategic thinking with technical execution, always looking for ways to optimise systems—whether 
          in code or real life.
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          Outside of work, I’m always up for adventure—whether it’s trying a new sport, travelling to unexpected 
          places, or pushing myself out of my comfort zone. I believe in the power of continuous learning, collaboration, 
          and embracing the unknown to build something truly impactful.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Background Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-2xl font-bold mb-4 tracking-wide">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Background
              </span>
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I’m currently pursuing a BSc in Computer Science at City, University of London, where I’ve built 
                expertise in software engineering, cloud computing, and system architecture. I was also awarded 
                the Jack Petchey Award for Outstanding Achievement, a recognition of my commitment to learning and innovation.
              </p>
              <p>
                In my role as a Technical Consultant at Inetum, I lead ServiceNow implementations and cloud solutions, 
                delivering high-impact digital transformation for enterprise clients like London Stock Exchange (LSEG), 
                Primark, and Manchester Airport Group (MAG).
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Core Competencies Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-2xl font-bold mb-4 tracking-wide">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Core Competencies
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-primary">{feature.icon}</div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <Chatbot />
    </div>
  );
}
