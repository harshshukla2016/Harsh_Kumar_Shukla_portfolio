import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Amit Patel',
        role: 'Senior Project Manager',
        content: 'Harsh exceptional problem-solving skills saved us weeks of development time on the Industrial Palletisation System. His code is clean, well-documented, and efficient.',
    },
    {
        id: 2,
        name: 'Dr. Sarah Mitchell',
        role: 'Professor, Amity University',
        content: 'One of the most dedicated students I have mentored. His "Galactic Memory Odyssey" project not only demonstrated technical prowess in Three.js but also a keen eye for user experience.',
    },
    {
        id: 3,
        name: 'Rahul Sharma',
        role: 'Tech Lead @ Cognizant',
        content: 'It is rare to find a fresher with such a strong grasp of SAP SD and modern web technologies. Harsh consistently delivers high-quality work and is a great team player.',
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="py-20 bg-background text-gray-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">What Others Say</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="glass p-8 md:p-12 rounded-2xl border border-gray-800 text-center relative"
                        >
                            <Quote size={40} className="text-primary/20 absolute top-6 left-6" />

                            <p className="text-lg md:text-xl text-gray-300 italic mb-8 relative z-10 font-light leading-relaxed">
                                "{testimonials[currentIndex].content}"
                            </p>

                            <div className="flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                                    <User size={30} className="text-secondary" />
                                </div>
                                <h4 className="text-xl font-bold font-display text-white">{testimonials[currentIndex].name}</h4>
                                <span className="text-sm text-primary font-mono">{testimonials[currentIndex].role}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
