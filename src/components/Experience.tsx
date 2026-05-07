import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Experience = () => {
    const { data } = usePortfolio();
    return (
        <section id="experience" className="py-20 bg-background text-gray-100 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Work Experience</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="relative border-l-2 border-gray-700 ml-4 md:ml-10 space-y-12">
                    {data.experience.map((exp: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-background border-2 border-primary neon-box-shadow"></div>

                            <div className="glass p-6 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-gray-800">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white font-display text-gradient">{exp.role}</h3>
                                        <h4 className="text-xl text-primary font-medium">{exp.company}</h4>
                                    </div>
                                    <div className="flex flex-col md:items-end mt-2 md:mt-0 text-gray-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>{exp.period}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <MapPin size={14} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className="list-disc list-outside ml-5 space-y-2 text-gray-300 font-light">
                                    {exp.description.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
