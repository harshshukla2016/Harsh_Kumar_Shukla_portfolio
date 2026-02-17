import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, message } = formData;

        // Construct mailto link
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        window.location.href = `mailto:harshshukla2016@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (
        <section id="contact" className="py-20 bg-background text-gray-100 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Get In Touch</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl font-display font-bold text-white">Let's Connect</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            I'm currently looking for new opportunities as a Software Engineer or SAP SD Consultant.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:harshshukla2016@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
                                <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors">
                                    <Mail size={24} />
                                </div>
                                <span className="text-lg">harshshukla2016@gmail.com</span>
                            </a>
                            <a href="tel:+919569808478" className="flex items-center gap-4 text-gray-300 hover:text-secondary transition-colors group">
                                <div className="p-3 bg-white/5 rounded-full group-hover:bg-secondary/20 transition-colors">
                                    <Phone size={24} />
                                </div>
                                <span className="text-lg">+91 9569808478</span>
                            </a>
                            <a href="https://linkedin.com/in/harsh-kumar-shukla-a42aa4138" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-blue-500 transition-colors group">
                                <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/20 transition-colors">
                                    <Linkedin size={24} />
                                </div>
                                <span className="text-lg">LinkedIn Profile</span>
                            </a>
                            <a href="https://github.com/harshshukla2016" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/20 transition-colors">
                                    <Github size={24} />
                                </div>
                                <span className="text-lg">GitHub Profile</span>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass p-8 rounded-2xl border border-gray-800 relative"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Your message..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="mt-20 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Harsh Kumar Shukla. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
