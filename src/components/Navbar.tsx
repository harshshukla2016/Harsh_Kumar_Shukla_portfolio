import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';

import profileImg from '../assets/profile_transparent.png'; // Import profile image

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', to: 'hero' },
        { name: 'About', to: 'about' },
        { name: 'Experience', to: 'experience' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Education', to: 'education' },
        { name: 'Referrals', to: 'referrals' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center h-16">
                {/* Desktop Logo - Hidden on mobile */}
                <Link to="hero" smooth={true} duration={500} className="font-display text-2xl font-bold cursor-pointer text-gradient hidden lg:block">
                    H.S.
                </Link>

                {/* Mobile Animated Logo (Profile Pic) */}
                <motion.div
                    className="lg:hidden fixed z-50 rounded-full overflow-hidden border-2 border-primary shadow-neon-cyan cursor-pointer"
                    initial={{ top: '12%', left: '50%', x: '-50%', width: '120px', height: '120px' }}
                    animate={scrolled ?
                        { top: '15px', left: '24px', x: '0%', width: '45px', height: '45px' } :
                        { top: '12%', left: '50%', x: '-50%', width: '120px', height: '120px' }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => {
                        const hero = document.getElementById('hero');
                        if (hero) hero.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <img src={profileImg} alt="Logo" className="w-full h-full object-cover" />
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="text-gray-300 hover:text-primary transition-colors cursor-pointer text-sm tracking-widest uppercase hover:scale-105 transform inline-block"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-4 pl-4 border-l border-gray-700">
                        <a href="https://github.com/harshshukla2016" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/harsh-kumar-shukla-a42aa4138" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button - Show on LG and below, aligned right */}
                <div className="lg:hidden flex items-center ml-auto">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none hover:text-primary transition-colors p-2 z-50 relative">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full glass-nav border-t border-gray-800"
                    >
                        <div className="flex flex-col items-center py-6 space-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-primary text-sm tracking-widest uppercase cursor-pointer"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex space-x-4 mt-4">
                                <a href="https://github.com/harshshukla2016" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com/in/harsh-kumar-shukla-a42aa4138" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
