import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Database, Globe, GitBranch, Server, Layers } from 'lucide-react';
import { Badge } from './ui/badge';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    { name: 'PHP', icon: Code2 },
    { name: 'Laravel', icon: Server },
    { name: 'React', icon: Globe },
    { name: 'JavaScript', icon: Code2 },
    { name: 'TypeScript', icon: Code2 },
    { name: 'Node.js', icon: Server },
    { name: 'HTML/CSS', icon: Layers },
    { name: 'MySQL', icon: Database },
    { name: 'PostgreSQL', icon: Database },
  ];

  const skills = ['Git', 'REST APIs', 'CI/CD', 'Docker', 'UI Implementation'];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0d0f16]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 text-gray-900 dark:text-white"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Experienced full-stack developer with 5 years in office and freelance work on Upwork and Fiverr. I build scalable backend systems and polished frontend experiences, combining clean engineering with a focus on reliable, user-centered solutions.
            </p>

            <div className="mb-8">
              <h3 className="text-gray-900 dark:text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <Badge
                      key={tech.name}
                      variant="outline"
                      className="px-4 py-2 border-[#6c93ec] text-[#6c93ec] hover:bg-[#6c93ec] hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tech.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-gray-900 dark:text-white mb-4">Additional Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 hover:border-[#6c93ec] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6c93ec]" />
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
