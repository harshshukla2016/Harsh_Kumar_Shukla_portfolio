import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database, Globe } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-surface text-gray-100 overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">About Me</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg text-gray-300 leading-relaxed font-light"
                    >
                        <p>
                            I am a passionate <span className="text-primary font-semibold">Software Engineer</span> and <span className="text-secondary font-semibold">SAP SD Consultant</span> with a strong foundation in Compute Applications.
                            Currently pursuing my <span className="text-white font-medium">Master of Computer Applications (MCA)</span> in Artificial Intelligence and Machine Learning from Amity University while working at <span className="text-white font-medium">Cognizant</span>.
                        </p>

                        {/* GitHub Stats */}
                        <div className="py-4">
                            <img
                                src="https://github-readme-stats.vercel.app/api?username=harshshukla2016&show_icons=true&theme=dark&bg_color=00000000&hide_border=true&title_color=00f3ff&text_color=9ca3af&icon_color=d946ef"
                                alt="GitHub Stats"
                                className="w-full max-w-md"
                            />
                        </div>

                        <p>
                            My journey began with a BCA from Dr. Virendra Swaroop Institute, where I developed robust analytical skills. I have hands-on experience in full-stack development, database management, and industrial automation systems.
                        </p>
                        <p>
                            I thrive on solving complex problems, whether it's optimizing enterprise ERP systems or coding robotic arms for precise manipulation. My goal is to leverage technology to create efficient, scalable, and innovative solutions.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 glass rounded-lg border-l-4 border-primary">
                                <h4 className="font-display font-bold text-xl text-white">02+</h4>
                                <p className="text-sm text-gray-400">Years Experience</p>
                            </div>
                            <div className="p-4 glass rounded-lg border-l-4 border-secondary">
                                <h4 className="font-display font-bold text-xl text-white">10+</h4>
                                <p className="text-sm text-gray-400">Projects Completed</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="p-6 glass rounded-xl flex flex-col items-center justify-center space-y-4 hover:neon-border-cyan transition-all duration-300 group">
                            <Brain className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                            <span className="font-display text-lg font-semibold">AI & ML</span>
                        </div>
                        <div className="p-6 glass rounded-xl flex flex-col items-center justify-center space-y-4 hover:neon-border-cyan transition-all duration-300 group mt-8">
                            <Code className="w-12 h-12 text-secondary group-hover:scale-110 transition-transform" />
                            <span className="font-display text-lg font-semibold">Development</span>
                        </div>
                        <div className="p-6 glass rounded-xl flex flex-col items-center justify-center space-y-4 hover:neon-border-cyan transition-all duration-300 group -mt-8">
                            <Database className="w-12 h-12 text-accent group-hover:scale-110 transition-transform" />
                            <span className="font-display text-lg font-semibold">SAP SD</span>
                        </div>
                        <div className="p-6 glass rounded-xl flex flex-col items-center justify-center space-y-4 hover:neon-border-cyan transition-all duration-300 group">
                            <Globe className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform" />
                            <span className="font-display text-lg font-semibold">Web Tech</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Abstract Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
        </section>
    );
};

export default About;
