"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function Skills() {
  const skills = [
    {
      category: "Software Development",
      items: ["Python", "Java", "JavaScript", "C++", "SQL"]
    },
    {
      category: "Web & Cloud Technologies",
      items: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "AWS", "Linux"]
    },
    {
      category: "ServiceNow & ITSM",
      items: ["ServiceNow Development", "Flow Designer", "ITIL Processes", "Scripting"]
    },
    {
      category: "Tools & Version Control",
      items: ["Git", "GitHub", "MySQL", "Figma"]
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
            Skills & Expertise
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A strong technical foundation in software development, cloud computing, and consulting.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="p-6 relative bg-opacity-10 backdrop-blur-lg border border-transparent transition-all duration-300 shadow-lg 
                hover:shadow-lg hover:border-primary hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="px-3 py-1 text-sm border border-transparent bg-opacity-20 backdrop-blur-lg 
                        text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-purple-600"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
