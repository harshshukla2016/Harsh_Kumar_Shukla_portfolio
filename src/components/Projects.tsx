import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Loader2, X, ExternalLink, Globe } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { usePortfolio } from '../context/PortfolioContext';

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    topics: string[];
    updated_at: string;
    isCustom?: boolean;
}

const Projects = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null);
    const { data } = usePortfolio();

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedProject]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                // Prevent browser caching using a timestamp query parameter to avoid CORS preflight issues
                const timestamp = new Date().getTime();
                const response = await fetch(`https://api.github.com/users/harshshukla2016/repos?sort=updated&per_page=100&t=${timestamp}`);
                
                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error('GitHub API rate limit exceeded. Please wait a bit.');
                    }
                    throw new Error('Failed to fetch projects');
                }
                
                const dataAPI = await response.json();
                
                const filteredRepos = dataAPI
                    .filter((repo: any) => !repo.fork)
                    .sort((a: any, b: any) => {
                        if (a.homepage && !b.homepage) return -1;
                        if (!a.homepage && b.homepage) return 1;
                        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                    });

                const finalRepos = [...(data?.customProjects || []), ...filteredRepos.slice(0, 9)];
                setRepos(finalRepos);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching repos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [data?.customProjects]);

    return (
        <section id="projects" className="py-28 bg-background text-secondary relative overflow-hidden">
            {/* Spatial Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="font-accent text-[12vw] leading-none text-white/[0.015] tracking-[0.3em] whitespace-nowrap">
                    PROJECTS
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-xs font-mono tracking-[0.4em] uppercase text-primary/60 mb-4">The Simulation Room</p>
                    <h2 className="text-display-md font-display font-bold text-canvas">Stellar Creations</h2>
                    <p className="text-secondary/40 max-w-xl mx-auto mt-4 text-sm font-light leading-relaxed">
                        A dynamic collection synced from the GitHub nebula. Click a card to expand into mission control.
                    </p>
                    
                    {/* System Status Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 p-4 glass rounded-xl border border-white/10 max-w-4xl mx-auto">
                        <div className="text-center p-3 border-r border-white/5">
                            <span className="block text-[8px] text-primary/60 uppercase tracking-widest font-mono mb-1">Status</span>
                            <span className="text-lg font-display font-bold text-white flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                ONLINE
                            </span>
                        </div>
                        <div className="text-center p-3 border-r border-white/5">
                            <span className="block text-[8px] text-primary/60 uppercase tracking-widest font-mono mb-1">Sync</span>
                            <span className="text-lg font-display font-bold text-white uppercase">{repos.length > 0 ? 'Linked' : 'Pending'}</span>
                        </div>
                        <div className="text-center p-3 border-r border-white/5">
                            <span className="block text-[8px] text-primary/60 uppercase tracking-widest font-mono mb-1">Core</span>
                            <span className="text-lg font-display font-bold text-white uppercase">React v19</span>
                        </div>
                        <div className="text-center p-3">
                            <span className="block text-[8px] text-primary/60 uppercase tracking-widest font-mono mb-1">Liaison</span>
                            <span className="text-lg font-display font-bold text-primary uppercase">Gemini AI</span>
                        </div>
                    </div>

                    <div className="section-divider mt-12"></div>
                </motion.div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="text-muted text-xs font-mono tracking-widest">Synchronizing with GitHub...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-400/60 font-mono text-sm">Transmission Failed: {error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-white/[0.03] border border-white/5 rounded-full hover:border-primary/20 text-muted text-xs font-mono transition-all duration-500"
                        >
                            Retry Uplink
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, index) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                            >
                                <ProjectCard 
                                    project={repo} 
                                    onClick={() => setSelectedProject(repo)} 
                                />
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={`https://github/${data?.global?.github || 'harshshukla2016'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/5 hover:border-primary/20 text-muted hover:text-primary transition-all duration-500 text-xs font-mono tracking-wider"
                    >
                        <Github size={16} />
                        <span>Explore Full Repository</span>
                    </motion.a>
                </motion.div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl h-[90vh] bg-surface border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-primary/20"
                        >
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Header details */}
                            <div className="p-6 md:p-8 bg-black/40 border-b border-white/5 shrink-0 relative z-10">
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{selectedProject.name}</h2>
                                <p className="text-secondary/70 text-sm md:text-base max-w-3xl leading-relaxed">{selectedProject.description}</p>
                                
                                <div className="flex flex-wrap items-center gap-4 mt-6">
                                    {selectedProject.html_url && (
                                        <a href={selectedProject.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-mono text-white transition-colors">
                                            <Github size={18} /> Source Code
                                        </a>
                                    )}
                                    {selectedProject.homepage && selectedProject.homepage.startsWith('http') && (
                                        <a href={selectedProject.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-full text-sm font-mono text-primary transition-colors">
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                    <div className="flex-grow"></div>
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedProject.topics?.map(t => (
                                            <span key={t} className="px-3 py-1.5 bg-white/5 rounded text-xs font-mono text-secondary/60">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Live Preview / Iframe */}
                            <div className="flex-grow bg-[#0a0a0a] relative overflow-hidden">
                                {selectedProject.homepage && selectedProject.homepage.startsWith('http') ? (
                                    <iframe 
                                        src={selectedProject.homepage} 
                                        title={`${selectedProject.name} Live Preview`}
                                        className="w-full h-full border-none bg-white"
                                        sandbox="allow-scripts allow-same-origin allow-forms"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-secondary/30">
                                        <Globe size={64} className="mb-4 opacity-20" />
                                        <p className="font-mono text-sm tracking-widest uppercase">No live preview available</p>
                                        <p className="text-xs mt-2 font-light">Only GitHub repository exists for this project.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
