import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Layers, Box, Cpu } from 'lucide-react';

const projects = [
    {
        title: 'Industrial Palletisation System',
        description: 'A robust system for industrial automation using React.js for UI and Flask for backend. Features real-time communication and efficiency tracking.',
        tags: ['React.js', 'Flask', 'Python', 'Automation'],
        github: 'https://github.com/harshshukla2016/Industrial-Palletisation-System',
        icon: <Box size={40} className="text-secondary" />,
        color: 'from-secondary/20 to-purple-900/20'
    },
    {
        title: 'Robotic Arm Jogging',
        description: 'Control interface for Elite Co-bot robotic arm using Python SDK. Supports 3D mouse, joystick, and keyboard inputs with 200ms latency.',
        tags: ['Python', 'Robotics', 'SDK', 'Hardware'],
        github: 'https://github.com/harshshukla2016/Palletizer-reach-checker', // Assuming related or just linking generally
        icon: <Cpu size={40} className="text-primary" />,
        color: 'from-primary/20 to-blue-900/20'
    },
    {
        title: 'Galactic Memory Odyssey',
        description: 'A 3D interactive memory game set in a futuristic city environment. Explores Three.js and game logic.',
        tags: ['Three.js', 'JavaScript', '3D', 'Game Dev'],
        github: 'https://github.com/harshshukla2016/Galactic-Memory-Odessy-3d-Love-City',
        icon: <Layers size={40} className="text-accent" />,
        color: 'from-accent/20 to-indigo-900/20'
    },
    {
        title: 'QR Code Generator',
        description: 'A simple and efficient tool to generate generic QR codes for various links and text inputs.',
        tags: ['JavaScript', 'HTML/CSS', 'Utility'],
        github: 'https://github.com/harshshukla2016/QR-code',
        icon: <Code size={40} className="text-green-400" />,
        color: 'from-green-500/20 to-emerald-900/20'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-background text-gray-100 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Featured Projects</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-1 rounded-2xl bg-gradient-to-br ${project.color} overflow-hidden group hover:neon-box-shadow transition-all duration-300`}
                        >
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
                            <div className="relative z-10 glass h-full p-8 rounded-xl flex flex-col items-start space-y-4 border border-white/10 group-hover:border-white/20 transition-colors">
                                <div className="flex justify-between w-full items-start">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
                                        {project.icon}
                                    </div>
                                    <div className="flex space-x-3">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            title="View Code"
                                        >
                                            <Github size={20} />
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            title="Live Demo"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold font-display text-white group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed text-sm flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-gray-300 border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://github.com/harshshukla2016"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-gray-700 hover:border-primary text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <Github size={20} />
                        <span>View More on GitHub</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
