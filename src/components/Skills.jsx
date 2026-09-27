import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { Code2, Cpu, Wrench, Monitor, Server,Database, BarChart3, Shield } from 'lucide-react';

function Skills() {
    const { theme } = useContext(ThemeContext);
        const skillCategories = [
    {
        title: 'Frontend',
        icon: Monitor,
        skills: [
            'React',
            'Next.js',
            'Astro',
            'Tailwind CSS',
            'DaisyUI',
            'Framer Motion',
            'shadcn/ui'
        ]
    },
    {
        title: 'Backend',
        icon: Server,
        skills: [
            'Node.js',
            'Express.js',
            'REST APIs',
            'Prisma',
            'Clerk',
            'JWT'
        ]
    },
    {
        title: 'Programming Languages',
        icon: Cpu,
        skills: [
            'C',
            'C++',
            'Java',
            'Python',
            'JavaScript',
            'TypeScript',
            'SQL'
        ]
    },
    {
        title: 'Databases',
        icon: Database,
        skills: [
            'PostgreSQL',
            'MySQL',
            'MongoDB',
            'NeonDB'
        ]
    },
    {
        title: 'Tools & Platforms',
        icon: Wrench,
        skills: [
            'Git',
            'GitHub',
            'Linux',
            'Postman',
            'Vercel',
            'Supabase',
            'Appwrite'
        ]
    },
    {
        title: 'Libraries & Visualization',
        icon: BarChart3,
        skills: [
            'Leaflet.js',
            'Recharts',
            'Chart.js'
        ]
    }
];   
const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const categoryVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.5
            }
        }
    };

    const skillItemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    return (
        <section
            id="skills"
            className="py-20 px-6 relative overflow-hidden bg-transparent"
        >


            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        className={`text-5xl md:text-6xl font-bold mb-4 ${
                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                        }`}
                    >
                        Skills
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-1 mx-auto rounded-full ${
                            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                        }`}
                    />
                </motion.div>

                {/* Compact Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            variants={categoryVariants}
                            whileHover={{ 
                                y: -6,
                                transition: { duration: 0.3 }
                            }}
                            className="group/category relative"
                        >
                            {/* Compact Category Card */}
                            <div className={`
                                relative p-5 rounded-2xl backdrop-blur-sm border
                                transition-all duration-500 overflow-hidden h-full
                                ${theme === "dark" 
                                    ? "bg-[#5e6472]/20 border-[#b8f2e6]/20 hover:bg-[#5e6472]/30 hover:border-[#b8f2e6]/40" 
                                    : "bg-white/40 border-[#aed9e0]/30 hover:bg-white/60 hover:border-[#aed9e0]/50"
                                }
                                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                                hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]
                            `}>
                                {/* Animated gradient overlay */}
                                <motion.div
                                    className={`absolute inset-0 opacity-0 group-hover/category:opacity-100 transition-opacity duration-700 pointer-events-none ${
                                        theme === "dark"
                                            ? "bg-gradient-to-br from-[#b8f2e6]/10 via-transparent to-transparent"
                                            : "bg-gradient-to-br from-[#aed9e0]/15 via-transparent to-transparent"
                                    }`}
                                />

                                {/* Corner glow */}
                                <div className={`
                                    absolute top-0 right-0 w-32 h-32 
                                    opacity-0 group-hover/category:opacity-100
                                    transition-opacity duration-700
                                    ${theme === "dark"
                                        ? "bg-gradient-to-bl from-[#b8f2e6]/8 to-transparent"
                                        : "bg-gradient-to-bl from-[#aed9e0]/12 to-transparent"
                                    }
                                    blur-2xl pointer-events-none
                                `} />

                                <div className="relative z-10">
                                    {/* Compact Header */}
                                    <motion.div 
                                        className="flex items-start gap-2.5 mb-4"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + categoryIndex * 0.05 }}
                                    >
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 180, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className={`
                                                p-2 rounded-lg backdrop-blur-sm border flex-shrink-0
                                                ${theme === "dark"
                                                    ? "bg-[#b8f2e6]/10 border-[#b8f2e6]/30 text-[#b8f2e6]"
                                                    : "bg-[#aed9e0]/20 border-[#aed9e0]/40 text-[#5e6472]"
                                                }
                                            `}
                                        >
                                            <category.icon size={18} strokeWidth={2} />
                                        </motion.div>

                                        {/* Title - Multi-line Support */}
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <h3 className={`
                                                text-base md:text-lg font-bold leading-tight
                                                ${theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"}
                                            `}>
                                                {category.title}
                                            </h3>
                                        </div>

                                        {/* Count Badge */}
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ 
                                                type: "spring",
                                                stiffness: 200,
                                                delay: 0.25 + categoryIndex * 0.05
                                            }}
                                            className={`
                                                px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 mt-0.5
                                                ${theme === "dark"
                                                    ? "bg-[#b8f2e6]/15 text-[#b8f2e6]"
                                                    : "bg-[#aed9e0]/25 text-[#5e6472]"
                                                }
                                            `}
                                        >
                                            {category.skills.length}
                                        </motion.span>
                                    </motion.div>

                                    {/* Compact Divider */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 0.3 + categoryIndex * 0.05,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className={`
                                            h-px mb-4 origin-left
                                            ${theme === "dark" 
                                                ? "bg-gradient-to-r from-[#b8f2e6]/30 via-[#b8f2e6]/10 to-transparent" 
                                                : "bg-gradient-to-r from-[#aed9e0]/40 via-[#aed9e0]/10 to-transparent"
                                            }
                                        `}
                                    />

                                    {/* Skill Pills - Centered & Balanced */}
                                    <motion.div
                                        variants={containerVariants}
                                        className="flex flex-wrap justify-center gap-2"
                                    >
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skillIndex}
                                                variants={skillItemVariants}
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    y: -2,
                                                    transition: { 
                                                        type: "spring", 
                                                        stiffness: 400, 
                                                        damping: 10 
                                                    }
                                                }}
                                                className="group/skill relative"
                                            >
                                                <div className={`
                                                    relative px-3 py-1.5 rounded-lg backdrop-blur-sm border 
                                                    transition-all duration-300 cursor-default
                                                    ${theme === "dark" 
                                                        ? "bg-[#b8f2e6]/5 border-[#b8f2e6]/15 hover:bg-[#b8f2e6]/15 hover:border-[#b8f2e6]/30" 
                                                        : "bg-[#aed9e0]/15 border-[#aed9e0]/25 hover:bg-[#aed9e0]/35 hover:border-[#aed9e0]/45"
                                                    }
                                                `}>
                                                    {/* Shine effect */}
                                                    <motion.div
                                                        className="absolute inset-0 rounded-lg opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                                                        style={{
                                                            background: theme === "dark"
                                                                ? "linear-gradient(135deg, transparent 0%, rgba(184, 242, 230, 0.1) 50%, transparent 100%)"
                                                                : "linear-gradient(135deg, transparent 0%, rgba(174, 217, 224, 0.2) 50%, transparent 100%)"
                                                        }}
                                                    />
                                                    
                                                    <span className={`
                                                        relative text-xs md:text-sm font-medium whitespace-nowrap
                                                        ${theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"}
                                                    `}>
                                                        {skill}
                                                    </span>

                                                    {/* Floating dot */}
                                                    <motion.div
                                                        className={`
                                                            absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full 
                                                            opacity-0 group-hover/skill:opacity-100
                                                            ${theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#5e6472]"}
                                                        `}
                                                        animate={{
                                                            scale: [1, 1.5, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Shine sweep */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover/category:opacity-100 pointer-events-none rounded-2xl"
                                    style={{
                                        background: theme === "dark"
                                            ? "linear-gradient(135deg, transparent 0%, rgba(184, 242, 230, 0.08) 50%, transparent 100%)"
                                            : "linear-gradient(135deg, transparent 0%, rgba(174, 217, 224, 0.12) 50%, transparent 100%)"
                                    }}
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        repeatDelay: 1.5,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>

                            {/* Bottom glow */}
                            <div className={`
                                absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-6
                                opacity-0 group-hover/category:opacity-100
                                transition-opacity duration-700
                                ${theme === "dark"
                                    ? "bg-[#b8f2e6]/10"
                                    : "bg-[#aed9e0]/20"
                                }
                                blur-xl pointer-events-none
                            `} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;