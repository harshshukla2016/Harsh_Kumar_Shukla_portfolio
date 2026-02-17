import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, Users, ChevronRight } from 'lucide-react';

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
}

const jobs: Job[] = [
    {
        id: 'SAP-SD-001',
        title: 'SAP SD Associate Consultant',
        company: 'Cognizant (Referral)',
        location: 'Pune/Bangalore/Hybrid',
        type: 'Full-time',
        description: 'Looking for a skilled SAP SD Consultant with 2+ years of experience in OTC cycle, pricing, and master data.',
        requirements: ['2+ years in SAP SD', 'Experience with S/4HANA is a plus', 'Strong communication skills']
    },
    {
        id: 'SWE-002',
        title: 'Frontend Developer (React)',
        company: 'Tech Partner (Referral)',
        location: 'Remote',
        type: 'Contract/Full-time',
        description: 'Seeking a frontend developer proficient in React, Tailwind CSS, and TypeScript for building modern web applications.',
        requirements: ['Strong React & TypeScript skills', 'Experience with Tailwind CSS', 'Portfolio required']
    }
];

const Referrals = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showAll, setShowAll] = useState(false);

    const handleApply = (job: Job) => {
        const subject = `Referral Request: ${job.title} (${job.id})`;
        const body = `Hi Harsh,%0D%0A%0D%0AI am interested in the ${job.title} role at ${job.company}.%0D%0A%0D%0AMy LinkedIn Profile: [Insert Link]%0D%0AMy Portfolio/Resume Link: [Insert Link]%0D%0A%0D%0APlease let me know if you need any other details to process the referral.%0D%0A%0D%0AThanks,`;
        window.location.href = `mailto:harshshukla2016@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    const handleGeneralReferral = () => {
        const subject = `General Referral Request`;
        const body = `Hi Harsh,%0D%0A%0D%0AI saw your portfolio and would like to connect for potential referral opportunities.%0D%0A%0D%0AMy Skills: [List Skills]%0D%0AMy LinkedIn: [Insert Link]%0D%0A%0D%0AThanks,`;
        window.location.href = `mailto:harshshukla2016@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    const visibleJobs = showAll ? jobs : jobs.slice(0, 2); // Show 2 jobs initially

    return (
        <section id="referrals" className="py-20 bg-background text-gray-100 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Job Referrals</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Looking for opportunities? I can refer you for roles at my organization or through my network.
                        Check out the open positions below or request a general referral.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Job Cards */}
                    {visibleJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-xl border border-gray-800 hover:border-primary transition-all duration-300 group flex flex-col"
                        >
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{job.title}</h3>
                                    <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-mono">{job.type}</span>
                                </div>
                                <div className="flex items-center text-gray-400 text-sm mb-4">
                                    <Briefcase size={14} className="mr-2" />
                                    <span>{job.company}</span>
                                    <span className="mx-2">•</span>
                                    <span>{job.location}</span>
                                </div>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{job.description}</p>
                                <div className="space-y-1 mb-6">
                                    {job.requirements.slice(0, 2).map((req, i) => (
                                        <div key={i} className="flex items-center text-gray-500 text-xs">
                                            <ChevronRight size={12} className="text-secondary mr-1" />
                                            {req}
                                        </div>
                                    ))}
                                    {job.requirements.length > 2 && (
                                        <div className="text-gray-500 text-xs pl-4">+ more</div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button
                                    onClick={() => handleApply(job)}
                                    className="w-full py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Send size={16} />
                                    Ask for Referral
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {/* General Referral Card - Always Visible or conditional? Let's keep it visible at the end of the loaded checks, or always present? 
                        Let's keep it always visible as the last element if we show all, OR just append it to the visible list.
                        Actually, requirement implies hiding jobs. Let's append General Referral to the end of the LIST, so it's hidden too? 
                        No, "General Referral" is distinct. Let's keep it as a separate card that is ALWAYS visible or part of the flow.
                        Better UX: Show 'General Inquiry' card ALWAYS at the end of the grid.
                    */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass p-6 rounded-xl border border-gray-800 hover:border-secondary transition-all duration-300 group flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="mb-4 relative z-10">
                            <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors mb-2">General Inquiry</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Don't see a matching role? I'm always open to connecting with talented individuals.
                                Send me your resume and I'll keep you in mind for future openings.
                            </p>
                            <div className="flex justify-center py-4">
                                <Users size={48} className="text-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <button
                                onClick={handleGeneralReferral}
                                className="w-full py-3 rounded-lg border border-secondary text-secondary font-bold hover:bg-secondary hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Send size={16} />
                                Connect Network
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* View More Button */}
                {jobs.length > 2 && (
                    <div className="text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                        >
                            {showAll ? 'Show Less' : 'View More Jobs'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Referrals;
