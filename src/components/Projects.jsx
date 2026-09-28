import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import { projectsData } from '../data/projectsData';

function Projects() {
    const { theme } = useContext(ThemeContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const featuredProjects = projectsData.filter(p => p.featured);
    const otherProjects = projectsData.filter(p => !p.featured);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Delay clearing selected project to allow exit animation
        setTimeout(() => setSelectedProject(null), 300);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.05
            }
        }
    };

    return (
        <section
            id="projects"
            className="py-24 px-6 relative overflow-hidden bg-transparent"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-xl md:blur-3xl opacity-10 ${
                        theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                    }`}
                />
                <div
                    className={`absolute bottom-40 left-20 w-80 h-80 rounded-full blur-xl md:blur-3xl opacity-10 ${
                        theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                    }`}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className={`text-5xl md:text-6xl font-bold mb-4 ${
                            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                        }`}
                    >
                        Selected Systems
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className={`w-24 h-1 mx-auto rounded-full mb-6 origin-center ${
                            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                        }`}
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className={`text-lg max-w-3xl mx-auto ${
                            theme === "dark" ? "text-[#aed9e0]" : "text-[#5e6472]"
                        } opacity-90`}
                    >
                        A curated selection of websites, web applications, and digital systems that demonstrate practical software engineering, interface architecture, structured content, and interactive application development.
                    </motion.p>
                </motion.div>

                {/* Featured Projects */}
                {featuredProjects.length > 0 && (
                    <div className="mb-16">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`text-2xl md:text-3xl font-bold mb-8 ${
                                theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                            }`}
                        >
                            Featured Projects
                        </motion.h3>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {featuredProjects.map((project, i) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project}
                                    onClick={() => handleProjectClick(project)}
                                    showGithub={false}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                    <div className="mb-16">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`text-2xl md:text-3xl font-bold mb-8 ${
                                theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
                            }`}
                        >
                            Other Projects
                        </motion.h3>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {otherProjects.map((project, i) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project}
                                    onClick={() => handleProjectClick(project)}
                                    isCompact={true}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}

            </div>

            {/* Project Modal */}
            <ProjectModal 
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
}

export default Projects;