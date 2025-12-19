import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Database, Globe, GitBranch, Server, Cloud, Brain, Box, Settings } from 'lucide-react';
import { Badge } from './ui/badge';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    { name: 'PHP', icon: Code2 },
    { name: 'Laravel', icon: Server },
    { name: 'JavaScript', icon: Code2 },
    { name: 'MySQL', icon: Database },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Cloud AWS', icon: Cloud },
    { name: 'Google Gemini', icon: Brain },
    { name: 'OpenAI', icon: Brain },
    { name: 'Social Engineering', icon: Brain },
    { name: 'Microservices', icon: Box },
    { name: 'Teleport', icon: Server },
    { name: 'Kubernetes', icon: Box },
    { name: 'Linux OS', icon: Server },
    { name: 'VPN Config', icon: Settings },
    { name: 'Proxies', icon: Globe },
    { name: 'AI Integration', icon: Brain },
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
              🇬🇧
              I am a Senior Web Developer and Ethical Hacker with hands-on experience in building secure, scalable, and high-performance digital solutions. I help businesses go beyond simple websites by creating systems that are reliable, protected against real threats, and designed for long-term growth.

              My expertise combines modern web development with cybersecurity. This means I focus not only on functionality and clean architecture, but also on data protection, system resilience, and real business risks. This approach is especially valuable for companies that care about quality, security, and sustainable results.

              I am available for freelance projects, fully remote work, as well as long-term contract collaboration. I adapt quickly, take ownership of my work, and can operate both as an independent expert or as part of a distributed team.

              If you’re looking for a specialist who understands business goals, delivers thoughtful solutions, and values results over promises — you’re in the right place.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              🇷🇺
              Я — Старший Веб-Разработчик и Этичный Хакер с практическим опытом создания надёжных, масштабируемых и безопасных цифровых решений. Я помогаю бизнесу не просто запускать веб-проекты, а строить системы, которые стабильно работают, защищены от угроз и готовы к росту.

              Моя экспертиза объединяет современную веб-разработку и кибербезопасность. Это значит, что я думаю не только о функциональности и дизайне, но и о защите данных, устойчивости архитектуры и реальных бизнес-рисках. Такой подход особенно ценен для компаний, которым важны качество, безопасность и долгосрочный результат.

              Я открыт к сотрудничеству в формате фриланса, удалённой работы, а также долгосрочного контракта. Умею быстро погружаться в проекты, брать ответственность за результат и работать как часть команды или как независимый специалист.

              Если вы ищете профессионала, который говорит с бизнесом на одном языке, предлагает продуманные решения и действительно доводит проекты до результата — вы по адресу.
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
