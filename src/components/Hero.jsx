import { motion } from 'motion/react';
import { ThemeContext } from '../App';
import { useContext, useMemo } from 'react';
import { Mail } from 'lucide-react';

function Hero() {
  const { theme } = useContext(ThemeContext);

  // Memoize name letters to prevent re-computation
  const nameLetters = useMemo(() => "Hiyawzer Geremu".split(""), []);

  return (
    <section
      id="home"
      className="min-h-[100dvh] flex items-center justify-center px-6 py-20 relative overflow-hidden bg-transparent"
    >
      {/* Optimized background blobs - reduced opacity for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-xl md:blur-3xl opacity-[0.15] ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-xl md:blur-3xl opacity-[0.15] ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10 max-w-5xl mx-auto"
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`text-base md:text-lg mb-6 font-medium tracking-wide ${
            theme === "dark" ? "text-[#aed9e0]/70" : "text-[#5e6472]/60"
          }`}
        >
          Hello! I'm
        </motion.div>

        {/* Name - Optimized with reduced animations */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block group/name mb-8 cursor-default"
        >
          <span className={`whitespace-nowrap text-[2rem] min-[375px]:text-[2.25rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight ${
            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
          }`}>
            {nameLetters.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.4 + i * 0.02,
                  duration: 0.3
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          
          {/* Center-spreading underline */}
          <motion.div
            className={`absolute -bottom-2 left-1/2 h-1 rounded-full ${
              theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
            }`}
            initial={{ width: 0, x: 0 }}
            whileHover={{ 
              width: "100%",
              x: "-50%",
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
            style={{ transformOrigin: "center" }}
          />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xl md:text-2xl lg:text-3xl mb-10 font-light leading-relaxed ${
            theme === "dark" ? "text-[#aed9e0]/90" : "text-[#5e6472]/80"
          }`}
        >
          Full-Stack Developer & Creative Thinker
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-1 w-48 mx-auto rounded-full mb-12 ${
            theme === "dark" ? "bg-[#b8f2e6]/50" : "bg-[#aed9e0]/60"
          }`}
        />

        {/* CTA Buttons - Optimized layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`
              group px-8 py-4 rounded-2xl font-semibold text-base md:text-lg
              transition-all duration-300 border-2
              ${theme === "dark"
                ? "border-[#b8f2e6]/40 text-[#b8f2e6] hover:bg-[#b8f2e6]/10 hover:border-[#b8f2e6]"
                : "border-[#5e6472]/30 text-[#5e6472] hover:bg-[#5e6472]/5 hover:border-[#5e6472]"
              }
            `}
            aria-label="Get In Touch"
          >
            <span className="flex items-center gap-2.5">
              <Mail size={20} className="flex-shrink-0" />
              Get In Touch
            </span>
          </motion.a>
        </motion.div>

        {/* Scroll indicator - Optimized animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;