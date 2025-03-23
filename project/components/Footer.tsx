"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ExternalLink, Copy, Check, Home, Briefcase, Code2, User2, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    await navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const footerSections = [
    {
      title: "Navigation",
      icon: <Home className="h-4 w-4" />,
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Explore", href: "/explore" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Professional",
      icon: <Briefcase className="h-4 w-4" />,
      links: [
        { name: "Experience", href: "/experience" },
        { name: "Skills", href: "/skills" },
        { name: "Education", href: "/education" }
      ]
    },
    {
      title: "Portfolio",
      icon: <Code2 className="h-4 w-4" />,
      links: [
        { name: "Projects", href: "/projects" },
        { name: "GitHub", href: "https://github.com", external: true },
        { name: "LinkedIn", href: "https://linkedin.com/in/muhammad02", external: true }
      ]
    }
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <motion.div 
        className="container py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold gradient-text mb-4">Muhammad Patel</h3>
            <p className="text-muted-foreground max-w-md">
            Proactive and results-oriented Computer Science student at City, University of London, with a proven track record in delivering technical solutions and troubleshooting complex issues. Recognised with the Jack Petchey Award for Outstanding Achievement. 
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/in/muhammad02"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Muhammad2609"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {section.icon}
                <h3 className="font-semibold">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Send className="h-4 w-4" />
              <h3 className="font-semibold">Contact</h3>
            </div>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto font-normal hover:bg-transparent group"
                onClick={() => handleCopy('Muh4mm4d2609@gmail.com', 'email')}
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="flex-1 text-left">Muh4mm4d2609@gmail.com</span>
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto font-normal hover:bg-transparent group"
                onClick={() => handleCopy('+44 7593611113', 'phone')}
              >
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="flex-1 text-left">+44 7593611113</span>
                  {copiedPhone ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {currentYear} Muhammad Patel. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}