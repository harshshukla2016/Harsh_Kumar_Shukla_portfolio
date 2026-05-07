import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Github, ExternalLink, Globe } from 'lucide-react';

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    topics: string[];
    updated_at: string;
    stargazers_count: number;
    forks_count: number;
}

interface ProjectCardProps {
    project: GitHubRepo;
    onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    // Basic validation to check if homepage is a valid URL and not empty
    const hasValidHomepage = project.homepage && project.homepage.startsWith('http');

    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="group relative flex flex-col h-[24rem] rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>

            {/* Thumbnail Section (Top) */}
            <div className="relative w-full h-40 shrink-0 bg-black/40 overflow-hidden border-b border-white/5">
                {hasValidHomepage ? (
                    <div className="w-[400%] h-[400%] origin-top-left scale-25 transition-transform duration-700 group-hover:scale-[0.27] opacity-80 group-hover:opacity-100">
                        <iframe 
                            src={project.homepage} 
                            title={`${project.name} preview`}
                            className="w-full h-full border-none pointer-events-none"
                            tabIndex={-1}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/20 bg-[#0a0a0a]">
                        <Folder size={48} strokeWidth={1} />
                    </div>
                )}
                {/* Floating links on top of thumbnail */}
                <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.html_url && (
                        <a 
                            href={project.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all"
                        >
                            <Github size={16} />
                        </a>
                    )}
                    {hasValidHomepage && (
                        <a 
                            href={project.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-primary/20 backdrop-blur-md rounded-full text-primary hover:bg-primary/40 transition-all"
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Section (Bottom) */}
            <div className="relative z-10 p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
                <div className="flex-grow">
                    <h3 className="text-xl font-display font-bold text-canvas mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.name}
                    </h3>
                    
                    <p className="text-sm text-secondary/60 line-clamp-2 mb-4 font-light leading-relaxed">
                        {project.description || 'No description provided.'}
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {project.topics && project.topics.slice(0, 3).map(topic => (
                            <span key={topic} className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.03] border border-white/10 text-secondary/70">
                                {topic}
                            </span>
                        ))}
                        {project.topics && project.topics.length > 3 && (
                            <span className="text-[10px] font-mono px-2 py-1 rounded bg-transparent text-secondary/40">
                                +{project.topics.length - 3}
                            </span>
                        )}
                    </div>
                    {project.language && (
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-secondary/50">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(0,243,255,0.6)]"></span>
                                {project.language}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-mono text-secondary/40">
                                <span className="flex items-center gap-1"><Github size={10} /> {project.stargazers_count}</span>
                                <span className="flex items-center gap-1"><ExternalLink size={10} /> {project.forks_count}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Mission Control Footer */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all"></div>
        </motion.div>
    );
};

export default ProjectCard;
