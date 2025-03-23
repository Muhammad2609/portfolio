"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { ParticlesBackground } from "./ParticlesBackground";
import { TypeAnimation } from 'react-type-animation';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <ParticlesBackground />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 px-4 relative z-10"
      >
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold pb-2">
            <span>Hi, I'm </span>
            <span className="gradient-text">Muhammad Patel</span>
          </h1>
          <div className="text-xl md:text-2xl text-muted-foreground mt-4">
            <TypeAnimation
              sequence={[
                'Software Developer',
                2000,
                'Technical Consultant',
                2000,
                'Cloud Specialist',
                2000,
                'ServiceNow Expert',
                2000,
                'Full Stack Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-medium"
            />
          </div>
          <div className="absolute -inset-1 blur-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-400/20 dark:to-purple-400/20 -z-10"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="backdrop-blur-sm bg-background/50 hover:bg-background/80 border-2"
            asChild
          >
            <a href="https://linkedin.com/in/muhammad02" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="backdrop-blur-sm bg-background/50 hover:bg-background/80 border-2"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-4 justify-center mt-4"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="backdrop-blur-sm hover:bg-background/80"
            onClick={() => navigator.clipboard.writeText('Muh4mm4d2609@gmail.com')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Copy Email
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="backdrop-blur-sm hover:bg-background/80"
            onClick={() => navigator.clipboard.writeText('+44 7593611113')}
          >
            <Phone className="mr-2 h-4 w-4" />
            Copy Phone
          </Button>
        </motion.div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 z-10"
      >
        <ArrowDown className="h-8 w-8 animate-bounce" />
      </motion.div>
    </section>
  );
}