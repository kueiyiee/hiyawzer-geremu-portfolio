import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

function Experience() {
  const { theme } = useContext(ThemeContext);

  const experience = {
    title: 'CodeAlpha Intern',
    company: 'CodeAlpha',
    period: 'Dec 2025 – Mar 2026',
    location: 'Pune, India',
    type: 'Remote',
    description: [
      'Developed and maintained production frontend components using HTML, CSS, and JavaScript.',
      'Built responsive, mobile-first interfaces and implemented UI enhancements focused on usability and performance.',
      'Translated product and design requirements into functional, user-facing features.',
      'Collaborated remotely in a fast-paced startup environment to deliver features within tight timelines.',
    ],
  };

  return (
    <section
      id="experience"
      className={`py-24 px-6 relative overflow-hidden bg-transparent`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-xl md:blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
            }`}
          >
            Experience
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className={`w-24 h-1 mx-auto rounded-full origin-center ${
              theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
            }`}
          />
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className={`absolute left-0 md:left-12 top-0 h-full w-0.5 origin-top ${
              theme === 'dark' ? 'bg-[#b8f2e6]/30' : 'bg-[#aed9e0]/40'
            }`}
          />

          {/* Experience Item */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="relative pl-12 md:pl-32 pb-12"
          >
            {/* Timeline Dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
              className={`absolute left-0 md:left-12 top-2 -translate-x-1/2 w-5 h-5 rounded-full border-4 ${
                theme === 'dark'
                  ? 'bg-[#b8f2e6] border-[#1c1c1c]'
                  : 'bg-[#aed9e0] border-[#fafafa]'
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full ${
                  theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
                }`}
              />
            </motion.div>

            {/* Content */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`text-3xl md:text-4xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                  }`}
                >
                  {experience.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className={`text-xl md:text-2xl font-semibold mb-4 ${
                    theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                  }`}
                >
                  {experience.company}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-wrap gap-4"
                >
                  <div className={`flex items-center gap-2 text-sm md:text-base ${
                    theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                  }`}>
                    <Calendar size={16} className={theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#aed9e0]'} />
                    <span>{experience.period}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm md:text-base ${
                    theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                  }`}>
                    <MapPin size={16} className={theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#aed9e0]'} />
                    <span>{experience.location}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm md:text-base ${
                    theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                  }`}>
                    <Briefcase size={16} className={theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#aed9e0]'} />
                    <span>{experience.type}</span>
                  </div>
                </motion.div>
              </div>

              {/* Description */}
              <ul className="space-y-3">
                {experience.description.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
                    className="group/item"
                  >
                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 90 }}
                        className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                          theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
                        }`}
                      />
                      <span
                        className={`text-base md:text-lg leading-relaxed ${
                          theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                        } opacity-85 group-hover/item:opacity-100 transition-opacity`}
                      >
                        {point}
                      </span>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default Experience;