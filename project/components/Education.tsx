"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function Education() {
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
    Education
  </span>
</h2>
      </motion.div>

      {/* University */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">City, University of London</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>London, UK</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>2021 - 2025 </span>
            </div>
          </div>

          <div className="mt-4">
            <Badge variant="secondary">BSc (Hons) Computer Science</Badge>
            <p className="text-muted-foreground mt-2">
              Expected: First-Class Honours
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Key Modules & Areas of Study:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              <li>Software Engineering & Agile Development</li>
              <li>Cloud Computing & DevOps</li>
              <li>Data Structures & Algorithms</li>
            </ul>
          </div>
        </Card>
      </motion.div>

      {/* Secondary School */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">Beal High School</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>London, UK</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>2019 - 2021</span>
            </div>
          </div>

          <div className="mt-4">
            <Badge variant="secondary">A-Levels</Badge>
            <p className="text-muted-foreground mt-2">
              Subjects: Computer Science, Mathematics, Economics
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Notable Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              <li>Jack Petchey Award for Outstanding Achievement</li>
              <li>STEM Club Leader, mentoring younger students in coding</li>
              <li>Developed an automated attendance system for a school project</li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
