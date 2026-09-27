import { motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa'; 
import { useContext } from 'react';
import { ThemeContext } from '../App';

function ProjectCard({ project, onClick, isCompact = false, showGithub = true }) {
    const { theme } = useContext(ThemeContext);

    const {
        title,
        shortDescription,
        tags,
        live,
        github,
        featured
    } = project;

    // Truncate description for compact cards (much shorter)
    const displayDescription = isCompact && shortDescription.length > 120
        ? shortDescription.substring(0, 120) + '...'
        : shortDescription;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: isCompact ? -3 : -8 }}
            className="group relative h-full cursor-pointer"
            onClick={onClick}
        >
            {/* Card container - Adaptive padding and border */}
            <div className={`h-full rounded-3xl backdrop-blur-sm transition-all duration-500 relative overflow-hidden ${
                isCompact 
                    ? 'p-5 border' 
                    : 'p-8 border-2'
            } ${
                theme === "dark" 
                    ? isCompact
                        ? "bg-[#5e6472]/20 border-[#b8f2e6]/15 hover:border-[#b8f2e6]/30 hover:bg-[#5e6472]/30"
                        : "bg-[#5e6472]/30 border-[#b8f2e6]/20 hover:border-[#b8f2e6]/50 hover:bg-[#5e6472]/50"
                    : isCompact
                        ? "bg-white/60 border-[#aed9e0]/20 hover:border-[#aed9e0]/40 hover:bg-white/80"
                        : "bg-white/80 border-[#aed9e0]/30 hover:border-[#aed9e0]/60 hover:bg-white"
            }`}>
                {/* Animated gradient overlay */}
                <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        theme === "dark"
                            ? "bg-gradient-to-br from-[#b8f2e6]/10 via-transparent to-[#aed9e0]/10"
                            : "bg-gradient-to-br from-[#aed9e0]/20 via-transparent to-[#b8f2e6]/20"
                    }`}
                />

                {/* Decorative corner accent - Only for featured */}
                {!isCompact && (
                    <motion.div
                        className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 ${
                            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                        }`}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}

                <div className="relative z-10 flex flex-col h-full">
                    {/* Title - Adaptive sizing */}
                    <motion.h3
                        className={`font-bold ${
                            isCompact 
                                ? 'text-lg md:text-xl mb-2' 
                                : 'text-2xl md:text-3xl mb-4'
                        } ${
                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                        }`}
                        whileHover={{ scale: isCompact ? 1.01 : 1.02 }}
                    >
                        {title}
                    </motion.h3>

                    {/* Description - Adaptive spacing and line clamp */}
                    <p className={`leading-relaxed flex-grow ${
                        isCompact 
                            ? 'mb-3 text-xs md:text-sm line-clamp-2 opacity-75' 
                            : 'mb-6 opacity-90'
                    } ${
                        theme === "dark" ? "text-[#aed9e0]" : "text-[#5e6472]"
                    }`}>
                        {displayDescription}
                    </p>

                    {/* Tags - Adaptive sizing */}
                    <div className={`flex flex-wrap gap-1.5 ${isCompact ? 'mb-3' : 'gap-2 mb-6'}`}>
                        {tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: isCompact ? 1.05 : 1.1 }}
                                className={`rounded-full font-semibold transition-all ${
                                    isCompact 
                                        ? 'px-2.5 py-1 text-xs' 
                                        : 'px-3 py-1.5 text-sm'
                                } ${
                                    theme === "dark"
                                        ? "bg-[#b8f2e6]/20 text-[#b8f2e6] hover:bg-[#b8f2e6]/30"
                                        : "bg-[#aed9e0]/40 text-[#5e6472] hover:bg-[#aed9e0]/60"
                                }`}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* Links - Adaptive spacing */}
                    <div className={`flex gap-4 items-center border-t-2 border-opacity-20 border-current ${
                        isCompact ? 'pt-3' : 'pt-4'
                    }`}>
                        {live && (
                            <motion.a
                                href={live}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 font-semibold transition-colors group/link ${
                                    isCompact ? 'text-sm' : ''
                                } ${
                                    theme === "dark" 
                                        ? "text-[#b8f2e6] hover:text-[#aed9e0]" 
                                        : "text-[#5e6472] hover:text-[#aed9e0]"
                                }`}
                            >
                                <span>View Live</span>
                                <svg 
                                    className={`transition-transform group-hover/link:translate-x-1 ${
                                        isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'
                                    }`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.a>
                        )}
                        {showGithub && github && (
                            <motion.a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.15, rotate: isCompact ? 180 : 360 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className={`p-2 rounded-lg transition-all ${
                                    theme === "dark" 
                                        ? "text-[#b8f2e6] hover:bg-[#b8f2e6]/20" 
                                        : "text-[#5e6472] hover:bg-[#aed9e0]/30"
                                }`}
                                aria-label="View GitHub repository"
                            >
                                <FaGithub size={isCompact ? 20 : 24} />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Hover shine effect - Slightly toned down for compact */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: theme === "dark"
                            ? `linear-gradient(135deg, transparent 0%, rgba(184, 242, 230, ${isCompact ? '0.05' : '0.1'}) 50%, transparent 100%)`
                            : `linear-gradient(135deg, transparent 0%, rgba(174, 217, 224, ${isCompact ? '0.08' : '0.15'}) 50%, transparent 100%)`
                    }}
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: isCompact ? 2.5 : 2,
                        repeat: Infinity,
                        repeatDelay: isCompact ? 1.5 : 1,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
}

export default ProjectCard;