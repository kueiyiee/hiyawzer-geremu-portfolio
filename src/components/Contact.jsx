import { motion as Motion } from 'motion/react';
import { useContext } from 'react';
import ReactGA from 'react-ga4';
import { ThemeContext } from '../App';
import ContactForm from './ContactForm.jsx';
import { Phone } from 'lucide-react';

function Contact() {
  const { theme = 'light' } = useContext(ThemeContext);

  const handleContactSuccess = (email) => {
    if (ReactGA.isInitialized) {
      ReactGA.event({
        category: 'Contact Form',
        action: 'Submit',
        label: email,
      });
    }
  };

  return (
    <section
      id="contact"
      className={`py-24 px-6 relative overflow-hidden bg-transparent`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-xl md:blur-3xl opacity-10 ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-xl md:blur-3xl opacity-10 ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Motion.h2
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
            }`}
          >
            Get In Touch
          </Motion.h2>
          <Motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className={`w-24 h-1 mx-auto rounded-full origin-center ${
              theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
            }`}
          />
        </Motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <Motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${
                theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
              }`}>
                Let's Connect
              </h3>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
              } opacity-90`}>
                Have a project in mind or just want to chat? Feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20'
                    : 'bg-[#aed9e0]/20 border-[#aed9e0]/40 hover:bg-[#aed9e0]/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-[#b8f2e6]/20' : 'bg-[#aed9e0]/50'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" strokeWidth={2} />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm opacity-75 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>Location</p>
                    <p className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`}>Dilla, Ethiopia</p>
                  </div>
                </div>
              </Motion.div>

              <Motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20'
                    : 'bg-[#aed9e0]/20 border-[#aed9e0]/40 hover:bg-[#aed9e0]/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-[#b8f2e6]/20' : 'bg-[#aed9e0]/50'
                  }`}>
                    <Phone
                      className={`w-6 h-6 ${
                        theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className={`text-sm opacity-75 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>Phone</p>
                    <a
                      href="tel:+251916788638"
                      className={`text-lg font-semibold hover:underline ${
                        theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                      }`}
                    >
                      +251 916 788 638
                    </a>
                  </div>
                </div>
              </Motion.div>

              <Motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6]/10 border-[#b8f2e6]/20 hover:bg-[#b8f2e6]/20'
                    : 'bg-[#aed9e0]/20 border-[#aed9e0]/40 hover:bg-[#aed9e0]/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-[#b8f2e6]/20' : 'bg-[#aed9e0]/50'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm opacity-75 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>Email</p>
                    <a
                      href="mailto:bioticrace@gmail.com"
                      className={`text-lg font-semibold break-all hover:underline ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`}
                    >bioticrace@gmail.com</a>
                  </div>
                </div>
              </Motion.div>
            </div>

            {/* Social Links */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6"
            >
              <p className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
              } opacity-75`}>
                Connect with me
              </p>
              <div className="flex flex-wrap gap-3">
                <Motion.a
                  href="https://t.me/hiyawzergeremu"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all flex flex-col ${
                    theme === 'dark'
                      ? 'bg-[#b8f2e6]/10 hover:bg-[#b8f2e6]/20 text-[#b8f2e6]'
                      : 'bg-[#aed9e0]/20 hover:bg-[#aed9e0]/40 text-[#5e6472]'
                  }`}
                  aria-label="Telegram: @hiyawzergeremu"
                >
                  <span className="text-xs opacity-75">Telegram</span>
                  <span className="font-semibold">@hiyawzergeremu</span>
                </Motion.a>
                <Motion.a
                  href="https://x.com/HiyawZer35036"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all flex flex-col ${
                    theme === 'dark'
                      ? 'bg-[#b8f2e6]/10 hover:bg-[#b8f2e6]/20 text-[#b8f2e6]'
                      : 'bg-[#aed9e0]/20 hover:bg-[#aed9e0]/40 text-[#5e6472]'
                  }`}
                  aria-label="X: @HiyawZer35036"
                >
                  <span className="text-xs opacity-75">X</span>
                  <span className="font-semibold">@HiyawZer35036</span>
                </Motion.a>
              </div>
            </Motion.div>
          </Motion.div>

          {/* Contact Form */}
          <Motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ContactForm theme={theme} onSuccess={handleContactSuccess} />
          </Motion.div>
        </div>
      </div>

    </section>
  );
}

export default Contact;