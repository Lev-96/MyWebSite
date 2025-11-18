import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Server, Database, Code2, Brain } from 'lucide-react';
import { Card } from './ui/card';

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: 'Backend Development',
      icon: Code2,
      description:
        'Build robust, scalable server-side applications with Laravel and PHP. Expert in API development, authentication, database design, and server-side architecture.',
    },
    {
      title: 'Server Management',
      icon: Server,
      description:
        'Complete server administration and management. Configuration, deployment, monitoring, security hardening, and optimization of server infrastructure.',
    },
    {
      title: 'Database & Cloud',
      icon: Database,
      description:
        'Database design, optimization, and management with MySQL and PostgreSQL. Cloud infrastructure setup and management with AWS and other cloud providers.',
    },
    {
      title: 'AI Integration',
      icon: Brain,
      description:
        'Integrate AI capabilities into backend systems using OpenAI, Google Gemini, and other AI services. Build intelligent applications with natural language processing and machine learning APIs.',
    },
  ];

  return (
    <section
      id="services"
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
          My Services
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 group h-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#6c93ec]/10 flex items-center justify-center group-hover:bg-[#6c93ec] transition-colors">
                      <Icon className="w-10 h-10 text-[#6c93ec] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white group-hover:text-[#6c93ec] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
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
