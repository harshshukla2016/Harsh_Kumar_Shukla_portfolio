import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, Clock, TrendingUp, Tag, ChevronRight, Loader2, 
    BookOpen, Calendar, ArrowUpRight, X, AlertCircle, RefreshCw,
    Brain, Code, Server, Cloud, Briefcase, GraduationCap
} from 'lucide-react';
import type { BlogTopic, BlogPost as BlogPostType } from '../services/geminiService';
import {
    fetchTrendingTopics, generateFullBlog, 
    getStoredTopics, getStoredPosts, shouldRefreshTopics, isApiKeyConfigured,
} from '../services/geminiService';

const categoryIcons: Record<string, React.ReactNode> = {
    'AI & ML': <Brain size={16} />,
    'Web Development': <Code size={16} />,
    'SAP & ERP': <Server size={16} />,
    'Cloud & DevOps': <Cloud size={16} />,
    'Career & Tech': <Briefcase size={16} />,
    'Tutorial': <GraduationCap size={16} />,
};

const categoryColors: Record<string, string> = {
    'AI & ML': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    'Web Development': 'text-primary bg-primary/10 border-primary/20',
    'SAP & ERP': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    'Cloud & DevOps': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'Career & Tech': 'text-green-400 bg-green-400/10 border-green-400/20',
    'Tutorial': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
};

// ─── Simple Markdown Renderer ────────────────────────────────
function renderMarkdown(md: string): string {
    let html = md
        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-black/50 border border-white/5 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code class="text-primary/80">$2</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="bg-white/5 text-primary px-1.5 py-0.5 rounded text-sm">$1</code>')
        // Headings
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-display font-bold text-white mt-8 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-display font-bold text-white mt-10 mb-4 pb-2 border-b border-white/5">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-display font-bold text-white mt-8 mb-4">$1</h1>')
        // Bold & italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="text-gray-300 italic">$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">$1</a>')
        // Unordered lists
        .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-primary mt-2 text-[6px]">●</span><span>$1</span></li>')
        // Ordered lists
        .replace(/^\d+\. (.+)$/gm, '<li class="text-gray-300 mb-1 ml-4 list-decimal">$1</li>')
        // Blockquotes
        .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary/30 pl-4 my-4 text-gray-400 italic">$1</blockquote>')
        // Horizontal rules
        .replace(/^---$/gm, '<hr class="border-white/5 my-8" />')
        // Paragraphs
        .replace(/^(?!<[hluobp]|<pre|<li|<hr|<block)(.+)$/gm, '<p class="text-gray-300 leading-relaxed mb-4">$1</p>');

    // Wrap consecutive list items
    html = html.replace(/(<li[\s\S]*?<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>');

    return html;
}

const Blog = () => {
    const [topics, setTopics] = useState<BlogTopic[]>([]);
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState<string | null>(null);
    const [expandedPost, setExpandedPost] = useState<BlogPostType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAllPosts, setShowAllPosts] = useState(false);

    const apiReady = isApiKeyConfigured();

    // Load stored data on mount
    useEffect(() => {
        setPosts(getStoredPosts());
        const storedTopics = getStoredTopics();
        if (storedTopics.length > 0) {
            setTopics(storedTopics);
        }
    }, []);

    // Auto-refresh topics daily if it's a new day
    useEffect(() => {
        if (apiReady && shouldRefreshTopics() && topics.length === 0) {
            loadTopics();
        }
    }, [apiReady, topics.length]);

    const loadTopics = async () => {
        setLoading(true);
        setError(null);
        try {
            const newTopics = await fetchTrendingTopics();
            setTopics(newTopics);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch topics');
            console.error('Topic fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateBlog = async (topic: BlogTopic) => {
        setGenerating(topic.id);
        setError(null);
        try {
            const post = await generateFullBlog(topic);
            setPosts(prev => [post, ...prev]);
            setExpandedPost(post);
            // Remove this topic from suggestions since it's now a post
            setTopics(prev => prev.filter(t => t.id !== topic.id));
        } catch (err: any) {
            setError(err.message || 'Failed to generate blog');
            console.error('Blog generation error:', err);
        } finally {
            setGenerating(null);
        }
    };

    const visiblePosts = showAllPosts ? posts : posts.slice(0, 3);

    return (
        <section id="blog" className="py-20 bg-surface text-gray-100 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles size={20} className="text-primary" />
                        <span className="text-xs font-mono tracking-[0.3em] uppercase text-primary/60">AI-Powered</span>
                    </div>
                    <h2 className="text-4xl font-display font-bold mb-4 text-gradient">Tech Insights</h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm">
                        Fresh, AI-curated tech articles generated daily using Google Gemini.
                        Click a topic to generate a detailed blog post with full SEO optimization.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
                </motion.div>

                {/* API Key Warning */}
                {!apiReady && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto mb-12 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3"
                    >
                        <AlertCircle size={20} className="text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-yellow-300 text-sm font-medium">Gemini API Quota or Configuration Issue</p>
                            <p className="text-yellow-400/60 text-xs mt-1">
                                Add <code className="bg-black/30 px-1.5 py-0.5 rounded">VITE_GEMINI_API_KEY</code> or a <code className="bg-black/30 px-1.5 py-0.5 rounded">VITE_GROQ_API_KEY</code> (Backup) to your <code className="bg-black/30 px-1.5 py-0.5 rounded">.env</code> file.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Error Display */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-2xl mx-auto mb-8 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                {/* ═══ TRENDING TOPICS ═══ */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <TrendingUp size={18} className="text-secondary" />
                            <h3 className="text-lg font-display font-bold text-white">Today's Trending Topics</h3>
                        </div>
                        <button
                            onClick={loadTopics}
                            disabled={loading || !apiReady}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider border border-white/10 rounded-full hover:border-primary/30 hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                            {loading ? 'Generating...' : 'Refresh'}
                        </button>
                    </div>

                    {loading && topics.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 space-y-4">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-gray-500 text-xs font-mono tracking-wider">Consulting Gemini for trending topics...</p>
                        </div>
                    ) : topics.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topics.map((topic, index) => (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="glass p-5 rounded-xl border border-white/5 hover:border-primary/20 transition-all duration-300 group cursor-pointer flex flex-col"
                                    onClick={() => !generating && handleGenerateBlog(topic)}
                                >
                                    {/* Category Badge */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border ${categoryColors[topic.category] || 'text-gray-400 bg-white/5 border-white/10'}`}>
                                            {categoryIcons[topic.category]}
                                            {topic.category}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                                            <Clock size={10} />
                                            {topic.estimatedReadTime}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                        {topic.title}
                                    </h4>

                                    {/* Summary */}
                                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                                        {topic.summary}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {topic.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-white/5 text-gray-500 rounded border border-white/5">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Generate CTA */}
                                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                                            <TrendingUp size={10} />
                                            SEO Score: {topic.seoScore}%
                                        </div>
                                        {generating === topic.id ? (
                                            <span className="text-primary text-[10px] font-mono flex items-center gap-1">
                                                <Loader2 size={12} className="animate-spin" />
                                                Writing...
                                            </span>
                                        ) : (
                                            <span className="text-primary text-[10px] font-mono flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Generate <ChevronRight size={12} />
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : !loading && apiReady && (
                        <div className="text-center py-12 text-gray-500">
                            <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-mono">No topics loaded yet.</p>
                            <button onClick={loadTopics} className="mt-3 text-primary text-xs hover:underline">
                                Fetch trending topics →
                            </button>
                        </div>
                    )}
                </div>

                {/* ═══ PUBLISHED BLOGS ═══ */}
                {posts.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen size={18} className="text-primary" />
                            <h3 className="text-lg font-display font-bold text-white">Published Articles</h3>
                            <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                                {posts.length} posts
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visiblePosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    onClick={() => setExpandedPost(post)}
                                    className="glass p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-all duration-300 cursor-pointer group"
                                >
                                    {/* Category */}
                                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border mb-4 ${categoryColors[post.category] || 'text-gray-400 bg-white/5 border-white/10'}`}>
                                        {categoryIcons[post.category]}
                                        {post.category}
                                    </span>

                                    <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                        {post.title}
                                    </h4>

                                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                                        {post.summary}
                                    </p>

                                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={10} />
                                                {new Date(post.publishedAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={10} />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <ArrowUpRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {posts.length > 3 && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setShowAllPosts(!showAllPosts)}
                                    className="px-6 py-2 text-xs font-mono tracking-wider border border-white/10 rounded-full hover:border-primary/30 hover:text-primary transition-all"
                                >
                                    {showAllPosts ? 'Show Less' : `View All ${posts.length} Posts`}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ EXPANDED BLOG MODAL ═══ */}
                <AnimatePresence>
                    {expandedPost && (
                        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setExpandedPost(null)}
                                className="fixed inset-0 bg-black/90 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                transition={{ type: 'spring', damping: 25 }}
                                className="relative w-full max-w-4xl my-8 mx-4 bg-surface border border-white/5 rounded-2xl overflow-hidden z-10"
                            >
                                {/* Modal Header */}
                                <div className="sticky top-0 bg-surface/95 backdrop-blur-md border-b border-white/5 p-6 flex items-start justify-between z-20">
                                    <div className="flex-1 pr-4">
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border mb-3 ${categoryColors[expandedPost.category] || 'text-gray-400 bg-white/5 border-white/10'}`}>
                                            {categoryIcons[expandedPost.category]}
                                            {expandedPost.category}
                                        </span>
                                        <h2 className="text-2xl font-display font-bold text-white leading-tight">
                                            {expandedPost.title}
                                        </h2>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-mono">
                                            <span>{expandedPost.author}</span>
                                            <span>•</span>
                                            <span>{new Date(expandedPost.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            <span>•</span>
                                            <span>{expandedPost.readTime}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setExpandedPost(null)}
                                        className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors shrink-0"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Blog Content */}
                                <div className="p-6 md:p-10">
                                    <div 
                                        className="prose prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: renderMarkdown(expandedPost.content) }}
                                    />

                                    {/* Tags */}
                                    <div className="mt-10 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Tag size={14} className="text-gray-500" />
                                            <span className="text-xs text-gray-500 font-mono">Tags</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {expandedPost.tags.map((tag, i) => (
                                                <span key={i} className="text-[10px] font-mono px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/5">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Related Topics */}
                                    {expandedPost.relatedTopics.length > 0 && (
                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <h4 className="text-sm font-display font-bold text-white mb-4">Related Topics</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {expandedPost.relatedTopics.map((topic, i) => (
                                                    <span key={i} className="text-xs font-mono px-3 py-1.5 bg-primary/5 text-primary/70 rounded-lg border border-primary/10 cursor-default">
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Portfolio Links */}
                                    {expandedPost.portfolioLinks.length > 0 && (
                                        <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                                            <p className="text-xs text-primary/70 font-mono mb-2">Referenced in this article:</p>
                                            <div className="flex flex-wrap gap-3">
                                                {expandedPost.portfolioLinks.map((link, i) => (
                                                    <a 
                                                        key={i} 
                                                        href={link.url} 
                                                        className="text-primary text-xs hover:underline flex items-center gap-1"
                                                    >
                                                        {link.text} <ArrowUpRight size={10} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Blog;
