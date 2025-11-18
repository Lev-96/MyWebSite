import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Database, Server, Box, GitBranch, Globe, Package, Cloud, Brain, Settings } from 'lucide-react';
import { Card } from './ui/card';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'Laravel', icon: Server, color: '#FF2D20' },
    { name: 'PHP', icon: Code2, color: '#777BB4' },
    { name: 'MySQL', icon: Database, color: '#4479A1' },
    { name: 'Git', icon: GitBranch, color: '#F05032' },
    { name: 'Docker', icon: Box, color: '#2496ED' },
    { name: 'JavaScript', icon: Code2, color: '#F7DF1E' },
    { name: 'PostgreSQL', icon: Database, color: '#4169E1' },
    { name: 'REST APIs', icon: Package, color: '#6c93ec' },
    { name: 'CI/CD', icon: GitBranch, color: '#6c93ec' },
    { name: 'Cloud AWS', icon: Cloud, color: '#FF9900' },
    { name: 'Google Gemini', icon: Brain, color: '#4285F4' },
    { name: 'OpenAI', icon: Brain, color: '#10A37F' },
    { name: 'Social Engineering', icon: Brain, color: '#6c93ec' },
    { name: 'Microservices', icon: Box, color: '#326CE5' },
    { name: 'Teleport', icon: Server, color: '#6c93ec' },
    { name: 'Kubernetes', icon: Box, color: '#326CE5' },
    { name: 'Linux OS', icon: Server, color: '#FCC624' },
    { name: 'VPN Config', icon: Settings, color: '#6c93ec' },
    { name: 'Proxies', icon: Globe, color: '#6c93ec' },
    { name: 'AI Integration', icon: Brain, color: '#10A37F' },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 text-gray-900 dark:text-white"
        >
          My Work Skills
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 group">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: `${skill.color}20`,
                      }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: skill.color }}
                      />
                    </div>
                    <h3 className="text-gray-900 dark:text-white group-hover:text-[#6c93ec] transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
