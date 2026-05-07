import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Send, Users, ChevronRight, Star, ExternalLink, MapPin, Clock, DollarSign } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Opportunities = () => {
    const { data } = usePortfolio();
    const [activeTab, setActiveTab] = useState<'hiring' | 'referrals'>('hiring');

    const hiringJobs = data.jobs || [];
    const referralJobs = [
        {
            id: 'SAP-SD-001',
            title: 'SAP SD Associate Consultant',
            company: 'Cognizant (Referral)',
            location: 'Pune/Bangalore/Hybrid',
            type: 'Full-time',
            description: 'Looking for a skilled SAP SD Consultant with 2+ years of experience in OTC cycle, pricing, and master data.',
            requirements: ['2+ years in SAP SD', 'Experience with S/4HANA is a plus', 'Strong communication skills'],
            expiresAt: '2026-12-31'
        },
        {
            id: 'SWE-002',
            title: 'Frontend Developer (React)',
            company: 'Tech Partner (Referral)',
            location: 'Remote',
            type: 'Contract/Full-time',
            description: 'Seeking a frontend developer proficient in React, Tailwind CSS, and TypeScript for building modern web applications.',
            requirements: ['Strong React & TypeScript skills', 'Experience with Tailwind CSS', 'Portfolio required'],
            expiresAt: '2026-11-30'
        }
    ];

    const handleApply = (job: any, isReferral: boolean) => {
        const subject = isReferral ? `Referral Request: ${job.title} (${job.id})` : `Application: ${job.title}`;
        const body = `Hi Harsh,%0D%0A%0D%0AI am interested in the ${job.title} role at ${job.company}.%0D%0A%0D%0APlease let me know the next steps.%0D%0A%0D%0AThanks,`;
        window.location.href = `mailto:harshshukla2016@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    return (
        <section id="opportunities" className="py-20 bg-background text-gray-100 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Career Hub</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
                    
                    {/* Tab Switcher */}
                    <div className="flex justify-center gap-4 mb-12">
                        <button 
                            onClick={() => setActiveTab('hiring')}
                            className={`px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all ${activeTab === 'hiring' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,243,255,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Active Openings
                        </button>
                        <button 
                            onClick={() => setActiveTab('referrals')}
                            className={`px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all ${activeTab === 'referrals' ? 'bg-secondary text-black shadow-[0_0_20px_rgba(255,0,255,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Referral Network
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {activeTab === 'hiring' ? (
                        <motion.div
                            key="hiring"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6 max-w-5xl mx-auto"
                        >
                            {hiringJobs.length > 0 ? (
                                hiringJobs.map((job: any, index: number) => (
                                    <div key={index} className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden">
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                                                <p className="text-secondary font-medium mb-4">{job.company}</p>
                                                <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> {job.location}</span>
                                                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-secondary" /> {job.type}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <a 
                                                    href={job.applyLink} 
                                                    target="_blank" 
                                                    className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:scale-105 transition-all flex items-center gap-2"
                                                >
                                                    Apply Now <ExternalLink size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 glass rounded-2xl border border-white/5">
                                    <Briefcase size={48} className="text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 font-mono uppercase tracking-widest text-sm">No direct openings at this moment.</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="referrals"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                        >
                            {referralJobs.map((job, index) => (
                                <div key={job.id} className="glass p-6 rounded-2xl border border-white/5 hover:border-secondary/30 transition-all flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                                        <Star size={18} className="text-secondary fill-secondary/20" />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6 flex-1">{job.description}</p>
                                    <button 
                                        onClick={() => handleApply(job, true)}
                                        className="w-full py-3 border border-secondary/50 text-secondary font-bold rounded-xl hover:bg-secondary hover:text-black transition-all flex items-center justify-center gap-2"
                                    >
                                        Request Referral <Send size={16} />
                                    </button>
                                </div>
                            ))}
                            <div className="glass p-6 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                                <Users size={40} className="text-gray-500" />
                                <div>
                                    <h4 className="text-white font-bold mb-1 text-lg">General Inquiry</h4>
                                    <p className="text-xs text-gray-400">Not finding a role? Send your resume for future opportunities.</p>
                                </div>
                                <button 
                                    onClick={() => window.location.href = 'mailto:harshshukla2016@gmail.com?subject=General Referral Inquiry'}
                                    className="px-6 py-2 bg-white/5 text-white text-xs font-bold rounded-lg hover:bg-white/10 transition-all"
                                >
                                    Join Network
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Opportunities;
