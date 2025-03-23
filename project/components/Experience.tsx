"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <div className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold tracking-wide">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Experience
          </span>
        </h2>
      </motion.div>

      {/* Experience Card for Inetum (With Promotion) */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Inetum (Elite ServiceNow Partner)</h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
  <Briefcase className="h-4 w-4" />
  <span>Inetum</span>
  <span>•</span>
  <Badge variant="secondary">Full-time</Badge>
</div>
<div className="flex items-center gap-2 text-muted-foreground mt-1">
  <MapPin className="h-4 w-4" />
  <span>London, UK</span>
</div>

          </div>
          <div className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Aug 2022 – Present</span>
          </div>
        </div>

        {/* Timeline for Promotion */}
        <div className="border-l-4 border-muted mt-6 pl-4 space-y-6 relative">
          {/* Technical Consultant Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -left-[18px] top-[5px] w-4 h-4 bg-muted rounded-full border-2 border-background"></div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Technical Consultant</h4>
                <p className="text-sm text-muted-foreground">Nov 2024 – Present</p>
              </div>
              <ul className="list-disc list-inside text-muted-foreground mt-2 text-sm space-y-1">
                <li>Led enterprise-wide ServiceNow implementations and cloud migrations.</li>
                <li>Designed automation workflows to reduce manual processes.</li>
                <li>Mentored junior consultants and delivered internal technical training.</li>
                <li>Achieved ServiceNow Certified Implementation Specialist (CIS) certification.</li>
              </ul>
            </div>
          </motion.div>

          {/* Consultant Analyst Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -left-[18px] top-[5px] w-4 h-4 bg-muted rounded-full border-2 border-background"></div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Consultant Analyst</h4>
                <p className="text-sm text-muted-foreground">Aug 2022 – Nov 2024</p>
              </div>
              <ul className="list-disc list-inside text-muted-foreground mt-2 text-sm space-y-1">
                <li>Delivered tailored ServiceNow solutions for enterprise clients.</li>
                <li>Developed custom workflows to enhance IT service management.</li>
                <li>Optimised scripting logic to streamline operations and user experience.</li>
                <li>Achieved ServiceNow Certified System Administrator (CSA) certification.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Additional Experience Cards */}
      {[  
        {
          title: "Technical Operations Manager",
          company: "Oxyheal",
          location: "London, UK",
          period: "Aug 2019 – Aug 2022",
          type: "Full-time",
          description: "Managed IT infrastructure and technical operations, improving support delivery and system performance.",
          achievements: [
            "Delivered on-site technical support including system reboots and data backup management.",
            "Diagnosed and resolved hardware and software issues to ensure minimal downtime.",
            "Introduced a cloud-based document management system to streamline file access.",
            "Oversaw inventory and asset tracking using a real-time database solution."
          ],
          skills: ["Technical Support", "Network Management", "Cloud Systems", "Database Administration"]
        },
        {
          title: "Administration Worker",
          company: "Maxcourt LTD",
          location: "London, UK",
          period: "Dec 2018 – Aug 2022",
          type: "Part-time",
          description: "Supported administrative tasks and maintained documentation accuracy for business operations.",
          achievements: [
            "Adapted quickly to new tasks and supported daily office workflows.",
            "Planned schedules and coordinated meetings with internal teams.",
            "Worked effectively in a team-based environment with clear communication.",
            "Produced professional documentation using the Microsoft Office suite."
          ],
          skills: ["Microsoft Office", "Administration", "Time Management", "Organisational Skills", "Communication"]
        }
      ].map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{exp.company}</span>
                  <span>•</span>
                  <Badge variant="secondary">{exp.type}</Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{exp.location}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2 md:mt-0">
                <Calendar className="h-4 w-4" />
                <span>{exp.period}</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 mt-4">{exp.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {exp.achievements?.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {exp.skills?.map((skill, i) => (
                <Badge key={i} variant="outline">{skill}</Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
