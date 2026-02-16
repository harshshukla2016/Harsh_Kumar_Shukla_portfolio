import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, PenTool, Users, Clock, Terminal, Cpu } from 'lucide-react';

const skills = [
    {
        category: 'Programming & Tech',
        icon: <Code className="w-8 h-8 text-primary" />,
        items: ['Python', 'React.js', 'JavaScript', 'SQL', 'C++', 'Java', 'HTML/CSS', 'SAP SD'],
    },
    {
        category: 'Tools & Platforms',
        icon: <Terminal className="w-8 h-8 text-secondary" />,
        items: ['Linux (Red Hat)', 'AWS', 'Arduino', 'IoT Cloud', 'WordPress', 'Oracle DB', 'Git', 'VS Code'],
    },
    {
        category: 'Design & Office',
        icon: <PenTool className="w-8 h-8 text-accent" />,
        items: ['Canva', 'CorelDraw', 'PowerPoint', 'Excel', 'Google Sheets', 'Microsoft Office'],
    },
    {
        category: 'Soft Skills',
        icon: <Users className="w-8 h-8 text-green-400" />,
        items: ['Leadership', 'Time Management', 'Problem Solving', 'Teamwork', 'Documentation', 'Communication'],
    },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-surface text-gray-100 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Technical Arsenal</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-gray-800 flex flex-col items-center text-center group hover:neon-border-cyan"
                        >
                            <div className="mb-4 p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10">
                                {skillGroup.icon}
                            </div>
                            <h3 className="text-xl font-bold font-display mb-4 text-white group-hover:text-primary transition-colors">{skillGroup.category}</h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {skillGroup.items.map((item, i) => (
                                    <span
                                        key={i}
                                        className="bg-white/5 text-gray-300 text-xs font-mono px-3 py-1 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
