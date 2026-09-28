import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ThemeContext } from './../App';
import { useContext, useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navigationItems = [
  { label: 'Home', target: 'home' },
  { label: 'Experience', target: 'experience' },
  { label: 'Projects', target: 'projects' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Contact', target: 'contact' },
];

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    const hashTarget = window.location.hash.slice(1);
    return navigationItems.some((item) => item.target === hashTarget)
      ? hashTarget
      : 'home';
  });
  const prefersReducedMotion = useReducedMotion();
  const mobileMenuButtonRef = useRef(null);
  const navbarBarRef = useRef(null);
  const scrollFrame = useRef(null);
  const previousScrolled = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current !== null) return;

      scrollFrame.current = window.requestAnimationFrame(() => {
        scrollFrame.current = null;
        const nextScrolled = window.scrollY > 20;

        if (nextScrolled !== previousScrolled.current) {
          previousScrolled.current = nextScrolled;
          setScrolled(nextScrolled);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.target))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const nearestSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - 72) -
              Math.abs(second.boundingClientRect.top - 72)
          )[0];

        if (nearestSection) {
          setActiveSection(nearestSection.target.id);
        }
      },
      { rootMargin: '-72px 0px -65% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    document.querySelector('#mobile-navigation a')?.focus({ preventScroll: true });

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus({ preventScroll: true });
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const handleNavigation = (event, target) => {
    const section = document.getElementById(target);

    if (!section) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    window.history.pushState(null, '', `#${target}`);
    setActiveSection(target);

    const navbarHeight = navbarBarRef.current?.getBoundingClientRect().height ?? 64;
    const targetTop = Math.max(
      0,
      window.scrollY + section.getBoundingClientRect().top - navbarHeight - 8
    );

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    if (isMobileMenuOpen) {
      mobileMenuButtonRef.current?.focus({ preventScroll: true });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${
        scrolled 
          ? theme === 'dark' 
            ? 'bg-[#1c1c1c]/95 backdrop-blur-md shadow-lg shadow-[#b8f2e6]/5'
            : 'bg-white/95 backdrop-blur-md shadow-lg shadow-[#aed9e0]/10'
          : theme === 'dark'
            ? 'bg-[#1c1c1c]/80 backdrop-blur-md'
            : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={navbarBarRef}
          className="flex min-w-0 items-center justify-between h-16"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group min-w-0 shrink"
          >
            <motion.div
              className={`whitespace-nowrap text-[0.875rem] min-[360px]:text-[0.9375rem] sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
              }`}
            >
              Hiyawzer Geremu
            </motion.div>
            <motion.div
              className={`absolute -bottom-1 left-0 h-0.5 ${
                theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
              }`}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex shrink-0 items-center space-x-8">
            {navigationItems.map((item, idx) => {
              const isActive = activeSection === item.target;

              return (
                <motion.a
                  key={item.target}
                  href={`#${item.target}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={(event) => handleNavigation(event, item.target)}
                  aria-current={isActive ? 'location' : undefined}
                  className="relative group"
                >
                  <span className={`text-base font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                  }`}>
                    {item.label}
                  </span>
                  <div
                    className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left transition-transform duration-200 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    } ${
                      theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
                    }`}
                  />
                </motion.a>
              );
            })}
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#b8f2e6]/10 text-[#b8f2e6] hover:bg-[#b8f2e6]/20' 
                  : 'bg-[#aed9e0]/20 text-[#5e6472] hover:bg-[#aed9e0]/30'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#b8f2e6]/10 text-[#b8f2e6]' 
                  : 'bg-[#aed9e0]/20 text-[#5e6472]'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <motion.button
              ref={mobileMenuButtonRef}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#b8f2e6]/10 text-[#b8f2e6]' 
                  : 'bg-[#aed9e0]/20 text-[#5e6472]'
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          id="mobile-navigation"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
          className="md:hidden overflow-hidden"
        >
              <div className="flex flex-col space-y-2 py-4">
                {navigationItems.map((item, idx) => {
                  const isActive = activeSection === item.target;

                  return (
                    <motion.a
                      key={item.target}
                      href={`#${item.target}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(event) => handleNavigation(event, item.target)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                        theme === 'dark'
                          ? isActive
                            ? 'text-[#b8f2e6] bg-[#b8f2e6]/10'
                            : 'text-[#b8f2e6] hover:bg-[#b8f2e6]/10'
                          : isActive
                            ? 'text-[#5e6472] bg-[#aed9e0]/20'
                            : 'text-[#5e6472] hover:bg-[#aed9e0]/20'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;