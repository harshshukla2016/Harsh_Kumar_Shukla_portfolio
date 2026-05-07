import React from 'react';
import { motion } from 'framer-motion';
import { School, GraduationCap, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Education = () => {
    const { data } = usePortfolio();
    return (
        <section id="education" className="py-20 bg-surface text-gray-100 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Education</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {data.education.map((edu: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass p-8 rounded-2xl border border-gray-800 hover:border-primary transition-all duration-300 relative group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <GraduationCap size={100} />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-primary transition-colors">
                                        {edu.institution}
                                    </h3>
                                    <p className="text-secondary font-medium text-lg mt-1">{edu.degree}</p>
                                    <p className="text-gray-400 text-sm mt-1">{edu.specialization}</p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 md:text-right bg-white/5 py-2 px-4 rounded-lg self-start md:self-center">
                                    <Calendar size={16} />
                                    <span>{edu.period}</span>
                                </div>
                            </div>

                            <p className="mt-4 text-gray-400 leading-relaxed max-w-2xl relative z-10">
                                {edu.description}
                            </p>
                            {edu.grade && (
                                <div className="mt-4 inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-mono border border-green-500/30">
                                    Grade: {edu.grade}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
