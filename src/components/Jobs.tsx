import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Jobs = () => {
    const { data } = usePortfolio();

    const jobs = data.jobs || [];

    // Filter out expired jobs
    const activeJobs = jobs.filter((job: any) => {
        if (!job.expiryDate) return true; // If no expiry date, assume active forever
        const expiry = new Date(job.expiryDate);
        const now = new Date();
        // Set both to midnight for fair comparison
        expiry.setHours(23, 59, 59, 999);
        return now <= expiry;
    });

    if (activeJobs.length === 0) {
        return null; // Don't render the section if there are no active jobs
    }

    return (
        <section id="jobs" className="py-20 bg-surface text-gray-100 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Open Positions</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-400 font-mono text-sm max-w-2xl mx-auto">
                        Currently hiring or collaborating. Apply before the positions close.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid gap-6">
                    {activeJobs.map((job: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-primary/50 transition-all duration-300 relative group"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>
                                    <h4 className="text-lg text-secondary font-medium">{job.company}</h4>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
                                        <MapPin size={14} className="text-primary" /> {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
                                        <Clock size={14} className="text-secondary" /> {job.type}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
                                        <DollarSign size={14} className="text-green-400" /> {job.salary}
                                    </div>
                                    {job.expiryDate && (
                                        <div className="flex items-center gap-2 text-xs font-mono bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full text-red-400">
                                            <Calendar size={14} /> Exp: {new Date(job.expiryDate).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                                <p className="mb-4">{job.description}</p>
                                {job.requirements && job.requirements.length > 0 && (
                                    <>
                                        <h5 className="text-white font-semibold mb-2 font-display">Requirements:</h5>
                                        <ul className="list-disc list-outside ml-5 space-y-1">
                                            {job.requirements.map((req: string, i: number) => (
                                                <li key={i}>{req}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                                <a
                                    href={job.applyLink.includes('@') && !job.applyLink.startsWith('http') ? `mailto:${job.applyLink}` : job.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-xl font-bold tracking-wide hover:bg-white transition-colors"
                                >
                                    APPLY NOW <ExternalLink size={18} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Jobs;
