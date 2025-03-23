"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { Github, Linkedin, Mail, Phone, Copy, Check, Send, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { toast } = useToast();
  const [state, handleSubmit] = useForm("myzkaejb");

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    await navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      toast({
        title: "Email copied to clipboard",
        description: "You can now paste the email address",
      });
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      toast({
        title: "Phone number copied to clipboard",
        description: "You can now paste the phone number",
      });
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/muhammad02",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/Muhammad2609",
      icon: Github,
    },
  ];

  const contactForm = {
    title: "Get in Touch",
    description: "I'd love to hear from you. Please fill in the form below, and I'll get back to you as soon as possible.",
    fields: {
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      message: "Your Message"
    },
    button: "Send Message",
    success: "Thank you for your message. I will respond shortly.",
    error: "There was an error sending your message. Please try again."
  };

  if (state.succeeded) {
    return (
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <Card className="p-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Message Sent Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Send Another Message
            </Button>
          </motion.div>
        </Card>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
       <h2 className="text-4xl font-bold mb-4 tracking-wide">
       <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
       Let’s Connect! </span> </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Would you like to work together? Have questions about my work? Or would you like to receive a copy of my CV?
          Fill out the form, and I'll get back to you as soon as possible!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Quick Contact Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-xl font-semibold mb-6">Quick Contact</h3>
            <div className="space-y-6">
              <Button
                variant="ghost"
                className="w-full justify-start group"
                onClick={() => handleCopy('Muh4mm4d2609@gmail.com', 'email')}
                aria-label="Copy email address"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
                className="w-full justify-start group"
                onClick={() => handleCopy('+44 7593611113', 'phone')}
                aria-label="Copy phone number"
              >
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="flex-1 text-left">+44 7593611113</span>
                  {copiedPhone ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </Button>

              <div className="flex gap-4 justify-center pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
                    aria-label={`Visit ${social.name}`}
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-2"
        >
          <Card className="p-6 backdrop-blur-lg bg-card/80">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  minLength={2}
                  className="transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:outline-none
                    [&:not(:placeholder-shown):invalid]:[border-color:rgb(255,68,68)] [&:not(:placeholder-shown):invalid]:[box-shadow:0_0_5px_rgba(255,0,0,0.3)]
                    [&:not(:placeholder-shown):valid]:[border-color:rgb(76,175,80)] [&:not(:placeholder-shown):valid]:[box-shadow:0_0_5px_rgba(76,175,80,0.3)]
                    focus:[border-width:2px] focus:[box-shadow:0_0_8px_rgba(0,0,0,0.2)]"
                />
                <ValidationError 
                  prefix="Name" 
                  field="name" 
                  errors={state.errors}
                  className="text-[#ff4444] text-sm mt-1 animate-[fadeIn_0.3s_ease-in]"
                />
              </div>

              <div className="space-y-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:outline-none
                    [&:not(:placeholder-shown):invalid]:[border-color:rgb(255,68,68)] [&:not(:placeholder-shown):invalid]:[box-shadow:0_0_5px_rgba(255,0,0,0.3)]
                    [&:not(:placeholder-shown):valid]:[border-color:rgb(76,175,80)] [&:not(:placeholder-shown):valid]:[box-shadow:0_0_5px_rgba(76,175,80,0.3)]
                    focus:[border-width:2px] focus:[box-shadow:0_0_8px_rgba(0,0,0,0.2)]"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email" 
                  errors={state.errors}
                  className="text-[#ff4444] text-sm mt-1 animate-[fadeIn_0.3s_ease-in]"
                />
              </div>

              <div className="space-y-2">
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  required
                  minLength={10}
                  className="min-h-[150px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:outline-none
                    [&:not(:placeholder-shown):invalid]:[border-color:rgb(255,68,68)] [&:not(:placeholder-shown):invalid]:[box-shadow:0_0_5px_rgba(255,0,0,0.3)]
                    [&:not(:placeholder-shown):valid]:[border-color:rgb(76,175,80)] [&:not(:placeholder-shown):valid]:[box-shadow:0_0_5px_rgba(76,175,80,0.3)]
                    focus:[border-width:2px] focus:[box-shadow:0_0_8px_rgba(0,0,0,0.2)]"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message" 
                  errors={state.errors}
                  className="text-[#ff4444] text-sm mt-1 animate-[fadeIn_0.3s_ease-in]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requestCV"
                  name="requestCV"
                  aria-label="Request CV"
                />
                <label
                  htmlFor="requestCV"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  I would like to receive your CV
                </label>
              </div>

              <Button
                type="submit"
                className="w-full transition-all duration-300 hover:scale-[1.02]"
                disabled={state.submitting}
                aria-label={state.submitting ? "Sending message..." : "Send message"}
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}