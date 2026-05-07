import React, { useState, useEffect } from 'react';
import { 
    Settings, Save, Smartphone, Type, Briefcase, User, GraduationCap, 
    Code, Link as LinkIcon, Lock, LayoutDashboard, Globe, FolderPlus, 
    Trash2, Plus, LogOut, Menu, X, Users, Activity, BarChart3, CheckCircle2,
    Building, Calendar, MapPin, DollarSign, Mail, Sparkles, Linkedin
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const AdminPanel = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const { data, updateData } = usePortfolio();
    
    const recoverArray = (arr: any) => {
        if (!arr) return [];
        if (Array.isArray(arr)) return arr;
        return Object.values(arr);
    };

    const [localHero, setLocalHero] = useState(data.hero || {});
    const [localAbout, setLocalAbout] = useState(data.about || {});
    const [localGlobal, setLocalGlobal] = useState(data.global || {});
    const [localSkills, setLocalSkills] = useState(data.skills || {});
    const [localExperience, setLocalExperience] = useState(recoverArray(data.experience));
    const [localEducation, setLocalEducation] = useState(recoverArray(data.education));
    const [localCustomProjects, setLocalCustomProjects] = useState(recoverArray(data.customProjects));
    const [localJobs, setLocalJobs] = useState(recoverArray(data.jobs));
    const [localAI, setLocalAI] = useState(data.ai || { personality: 'Professional', voice: 'Enabled', knowledge: '' });
    const [localReferrals, setLocalReferrals] = useState(recoverArray(data.referrals) || []);

    const handlePublish = () => {
        updateData('hero', localHero);
        updateData('about', localAbout);
        updateData('global', localGlobal);
        updateData('skills', localSkills);
        updateData('experience', localExperience);
        updateData('education', localEducation);
        updateData('customProjects', localCustomProjects);
        updateData('jobs', localJobs);
        updateData('ai', localAI);
        updateData('referrals', localReferrals);
        alert('Transmission Successful! Your changes have been deployed to the public nebula.');
    };
    
    useEffect(() => {
        if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (password === 'Harsh@2003') {
            setIsAuthenticated(true);
            sessionStorage.setItem('isAdminLoggedIn', 'true');
        }
    }, [password]);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
        sessionStorage.removeItem('isAdminLoggedIn');
    };

    const tabs = [
        { id: 'dashboard', name: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'hero', name: 'Hero Section', icon: Type },
        { id: 'about', name: 'About Me', icon: User },
        { id: 'experience', name: 'Experience', icon: Briefcase },
        { id: 'education', name: 'Education', icon: GraduationCap },
        { id: 'skills', name: 'Skills & Tech', icon: Code },
        { id: 'jobs', name: 'Job Postings', icon: Users },
        { id: 'projects', name: 'Custom Projects', icon: FolderPlus },
        { id: 'global', name: 'Global Settings', icon: Globe },
    ];

    const handleAIGenerate = (index: number) => {
        const job = localJobs[index];
        if (!job.title || !job.company) {
            alert('Please enter a Job Title and Company name first so the AI has context!');
            return;
        }

        const newJobs = [...localJobs];
        
        // Simulated AI Generation based on keywords
        const titleLower = job.title.toLowerCase();
        let desc = `We are looking for an innovative and driven ${job.title} to join our team at ${job.company}. You will be responsible for designing and developing high-quality solutions, collaborating with cross-functional teams, and driving impactful results. If you are passionate about technology and thrive in a fast-paced environment, we want to hear from you!`;
        let reqs = ['3+ years of relevant experience', 'Strong communication skills', 'Ability to work independently', 'Problem-solving mindset'];
        
        if (titleLower.includes('frontend') || titleLower.includes('react')) {
            desc = `Join ${job.company} as a ${job.title}! You will be architecting beautiful, highly responsive user interfaces using modern web technologies. Your focus will be on delivering seamless user experiences and optimizing frontend performance.`;
            reqs = ['Proficient in React & TypeScript', 'Experience with TailwindCSS', 'Understanding of RESTful APIs', 'Strong UI/UX sensibilities'];
        } else if (titleLower.includes('backend') || titleLower.includes('node')) {
            desc = `${job.company} is seeking a robust ${job.title} to scale our infrastructure. You will design secure, scalable server-side applications, manage databases, and ensure high availability of our core services.`;
            reqs = ['Strong Node.js or Python experience', 'Database design (SQL/NoSQL)', 'Experience with AWS/GCP', 'API design best practices'];
        } else if (titleLower.includes('sap')) {
            desc = `We are hiring an expert ${job.title} at ${job.company} to lead our enterprise resource planning initiatives. You will configure modules, ensure seamless integration across business processes, and provide critical technical support.`;
            reqs = ['Deep expertise in SAP SD/MM', 'ABAP debugging knowledge', 'End-to-end implementation experience', 'Strong stakeholder management'];
        }

        newJobs[index].description = desc;
        newJobs[index].requirements = reqs;
        setLocalJobs(newJobs);
    };

    const shareToLinkedIn = (job: any) => {
        if (!job.title || !job.company) {
            alert('Please fill out the Job Title and Company before sharing!');
            return;
        }
        
        const portfolioUrl = "https://" + (localGlobal.github ? `${localGlobal.github}.github.io/portfolio` : "your-portfolio.com");
        const text = `🚀 We are hiring!\n\nI'm looking for a *${job.title}* to join the team at *${job.company}*.\n\n📍 Location: ${job.location || 'Flexible'}\n💼 Type: ${job.type || 'Full-time'}\n\nCheck out the full job description and apply on my portfolio board:\n${portfolioUrl}\n\n#hiring #jobopening #${job.title.replace(/\s+/g, '')}`;
        
        const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
        window.open(linkedinUrl, '_blank');
    };

    const renderSkillPills = (skillString: string) => {
        if (!skillString) return null;
        return skillString.split(',').map((s, i) => (
            <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold border border-indigo-200">
                {s.trim()}
            </span>
        ));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center selection:bg-primary selection:text-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black pointer-events-none"></div>
                <div className="w-full max-w-sm relative z-10 bg-surface/50 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl shadow-primary/10">
                    <Lock className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
                    <h1 className="text-2xl font-display font-bold text-white mb-2 tracking-widest uppercase">Admin Terminal</h1>
                    <p className="text-white/40 text-xs font-mono mb-8 uppercase tracking-widest">Administrative Override Required</p>
                    
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-center text-white font-mono tracking-[0.5em] placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        autoFocus
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans selection:bg-primary selection:text-black overflow-hidden">
            
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    <span className="font-display font-bold tracking-wider text-sm uppercase">Harsh OS v3.0</span>
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/70">
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-white/5 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
                <div className="p-6 hidden md:flex items-center gap-3 border-b border-white/5">
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                        <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-display font-bold tracking-widest text-sm text-white">COMMAND CENTER</h2>
                        <p className="text-[10px] text-primary/60 font-mono uppercase font-bold">Harsh Portfolio OS</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest pl-3 mb-4 font-bold">System Modules</p>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold ${isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'}`}
                            >
                                <Icon size={18} className={isActive ? 'text-primary' : 'text-white/40'} />
                                {tab.name}
                            </button>
                        );
                    })}
                    
                    {/* New Tabs Placeholder */}
                    <button
                        onClick={() => setActiveTab('aibrain')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold ${activeTab === 'aibrain' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'}`}
                    >
                        <Sparkles size={18} className={activeTab === 'aibrain' ? 'text-primary' : 'text-white/40'} />
                        AI Navigator Brain
                    </button>
                    <button
                        onClick={() => setActiveTab('referralhub')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold ${activeTab === 'referralhub' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'}`}
                    >
                        <Users size={18} className={activeTab === 'referralhub' ? 'text-primary' : 'text-white/40'} />
                        Referral Hub
                    </button>
                </div>

                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-bold tracking-wide uppercase">
                        <LogOut size={16} /> Disconnect Uplink
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-screen overflow-y-auto bg-black relative">
                <div className="max-w-4xl mx-auto p-6 md:p-10 pb-32">
                    
                    {/* Dynamic Header */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 flex items-center gap-3 uppercase tracking-wider">
                                {tabs.find(t => t.id === activeTab)?.name || (activeTab === 'aibrain' ? 'AI Navigator Brain' : 'Referral Hub')} 
                            </h1>
                            <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Override public portfolio data</p>
                        </div>
                        <button onClick={handlePublish} className="bg-primary text-black px-8 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)] shrink-0">
                            <Save className="w-4 h-4" /> Commit Changes
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
                        
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8">
                                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                                    <div className="absolute -right-10 -top-10 opacity-20 transform rotate-12">
                                        <Activity size={200} />
                                    </div>
                                    <div className="relative z-10">
                                        <h2 className="text-3xl font-display font-bold mb-2">Welcome back, {localHero.mainHeadline?.split(' ')[0] || 'Admin'}</h2>
                                        <p className="text-indigo-100 mb-6">Your portfolio systems are operating at peak efficiency.</p>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                                                <CheckCircle2 size={16} /> Data Synced
                                            </div>
                                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                                                <Activity size={16} /> Live Traffic
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><BarChart3 size={20} className="text-indigo-600" /> System Analytics</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                            <Briefcase size={28} className="text-indigo-600 mb-3" />
                                            <span className="text-3xl font-display font-bold text-slate-900">{localExperience.length}</span>
                                            <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-bold">Experiences</span>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                            <FolderPlus size={28} className="text-blue-500 mb-3" />
                                            <span className="text-3xl font-display font-bold text-slate-900">{localCustomProjects.length}</span>
                                            <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-bold">Projects</span>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                            <Users size={28} className="text-green-500 mb-3" />
                                            <span className="text-3xl font-display font-bold text-slate-900">{localJobs.length}</span>
                                            <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-bold">Total Jobs</span>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                            <GraduationCap size={28} className="text-orange-500 mb-3" />
                                            <span className="text-3xl font-display font-bold text-slate-900">{localEducation.length}</span>
                                            <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-bold">Degrees</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
                                        <h4 className="font-bold text-indigo-900 mb-2">Quick Action: New Job</h4>
                                        <p className="text-sm text-indigo-700 mb-4">Quickly post a new hiring requirement to your public board.</p>
                                        <button onClick={() => setActiveTab('jobs')} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors w-full">POST JOB</button>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                                        <h4 className="font-bold text-slate-900 mb-2">Profile Health</h4>
                                        <p className="text-sm text-slate-700 font-semibold mb-4">Resume Link: {localGlobal.resumeUrl ? 'Active' : 'Missing'}</p>
                                        <button onClick={() => setActiveTab('global')} className="bg-white border border-slate-300 text-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-100 transition-colors w-full">UPDATE SETTINGS</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hero' && (
                            <div className="space-y-6">
                                {/* Graphical Live Preview */}
                                <div className="p-8 rounded-2xl border border-slate-200 mb-6 flex flex-col items-center justify-center text-center shadow-inner" style={{ backgroundColor: '#111' }}>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{localHero.mainHeadline}</h2>
                                    <p className="text-lg text-slate-300 font-mono uppercase tracking-widest">{localHero.subHeadline}</p>
                                    <div className="mt-8 px-6 py-2 rounded-full text-xs font-bold tracking-widest" style={{ backgroundColor: `${localHero.color}20`, color: localHero.color, border: `1px solid ${localHero.color}50` }}>
                                        3D THEME ACCENT COLOR PREVIEW
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Main Headline Name</label>
                                        <div className="relative">
                                            <Type size={18} className="absolute left-4 top-3.5 text-slate-400" />
                                            <input type="text" value={localHero.mainHeadline} onChange={e => setLocalHero({...localHero, mainHeadline: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Sub Headline Roles</label>
                                        <div className="relative">
                                            <Briefcase size={18} className="absolute left-4 top-3.5 text-slate-400" />
                                            <input type="text" value={localHero.subHeadline} onChange={e => setLocalHero({...localHero, subHeadline: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">3D Model Color (Hex)</label>
                                        <div className="flex gap-3">
                                            <div className="w-12 h-12 rounded-xl shrink-0 border border-slate-300 shadow-sm" style={{ backgroundColor: localHero.color }}></div>
                                            <input type="text" value={localHero.color} onChange={e => setLocalHero({...localHero, color: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-mono font-bold" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-6">
                                {/* Graphical Preview */}
                                <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-8">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{localAbout.title}</h3>
                                        <p className="text-sm text-slate-500 truncate">{localAbout.p1}</p>
                                    </div>
                                    <div className="flex gap-4 border-l border-slate-300 pl-6">
                                        <div className="text-center">
                                            <p className="text-3xl font-display font-bold text-indigo-600">{localAbout.exp}+</p>
                                            <p className="text-[10px] uppercase font-bold text-slate-500">Years Exp</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-3xl font-display font-bold text-indigo-600">{localAbout.projects}+</p>
                                            <p className="text-[10px] uppercase font-bold text-slate-500">Projects</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Section Title</label>
                                    <input type="text" value={localAbout.title} onChange={e => setLocalAbout({...localAbout, title: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Biography Paragraph 1</label>
                                    <textarea rows={4} value={localAbout.p1} onChange={e => setLocalAbout({...localAbout, p1: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none transition-all"></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Biography Paragraph 2</label>
                                    <textarea rows={4} value={localAbout.p2} onChange={e => setLocalAbout({...localAbout, p2: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none transition-all"></textarea>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-2"><Briefcase size={14}/> Years of Experience</label>
                                        <input type="number" value={localAbout.exp} onChange={e => setLocalAbout({...localAbout, exp: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-2"><FolderPlus size={14}/> Projects Completed</label>
                                        <input type="number" value={localAbout.projects} onChange={e => setLocalAbout({...localAbout, projects: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all font-bold" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div className="space-y-6">
                                {localExperience.map((exp: any, i: number) => (
                                    <div key={i} className="p-6 border border-slate-200 border-l-4 border-l-indigo-500 rounded-2xl bg-slate-50 space-y-4 relative group shadow-sm hover:shadow-md transition-all">
                                        <button onClick={() => {
                                            const newExp = [...localExperience];
                                            newExp.splice(i, 1);
                                            setLocalExperience(newExp);
                                        }} className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
                                            <Trash2 size={16} />
                                        </button>
                                        
                                        {/* Visual Header */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                                <Building size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{exp.role || 'New Role'}</h4>
                                                <p className="text-xs text-slate-500 font-bold">{exp.company || 'Company Name'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Job Title</label>
                                                <input type="text" value={exp.role || ''} onChange={e => {
                                                    const newExp = [...localExperience];
                                                    newExp[i].role = e.target.value;
                                                    setLocalExperience(newExp);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-bold" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Company Name</label>
                                                <input type="text" value={exp.company || ''} onChange={e => {
                                                    const newExp = [...localExperience];
                                                    newExp[i].company = e.target.value;
                                                    setLocalExperience(newExp);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-bold" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Calendar size={12}/> Duration / Period</label>
                                                <input type="text" value={exp.period || ''} onChange={e => {
                                                    const newExp = [...localExperience];
                                                    newExp[i].period = e.target.value;
                                                    setLocalExperience(newExp);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><MapPin size={12}/> Location</label>
                                                <input type="text" value={exp.location || ''} onChange={e => {
                                                    const newExp = [...localExperience];
                                                    newExp[i].location = e.target.value;
                                                    setLocalExperience(newExp);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Description Bullets (Comma separated)</label>
                                                <textarea rows={2} value={exp.description ? (Array.isArray(exp.description) ? exp.description.join(', ') : exp.description) : ''} onChange={e => {
                                                    const newExp = [...localExperience];
                                                    newExp[i].description = e.target.value.split(',').map((s: string) => s.trim());
                                                    setLocalExperience(newExp);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => setLocalExperience([{role:'', company:'', period:'', location:'', description:[]}, ...localExperience])} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-sm font-bold tracking-widest text-slate-500 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-center items-center gap-2">
                                    <Plus size={18} /> ADD NEW ROLE
                                </button>
                            </div>
                        )}

                        {activeTab === 'education' && (
                            <div className="space-y-6">
                                {localEducation.map((edu: any, i: number) => (
                                    <div key={i} className="p-6 border border-slate-200 border-l-4 border-l-orange-500 rounded-2xl bg-slate-50 space-y-4 relative group shadow-sm hover:shadow-md transition-all">
                                        <button onClick={() => {
                                            const newEdu = [...localEducation];
                                            newEdu.splice(i, 1);
                                            setLocalEducation(newEdu);
                                        }} className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
                                            <Trash2 size={16} />
                                        </button>

                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                                <GraduationCap size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{edu.institution || 'Institution Name'}</h4>
                                                <p className="text-xs text-slate-500 font-bold">{edu.degree || 'Degree'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Institution Name</label>
                                                <input type="text" value={edu.institution || ''} onChange={e => {
                                                    const newEdu = [...localEducation];
                                                    newEdu[i].institution = e.target.value;
                                                    setLocalEducation(newEdu);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-bold" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Degree</label>
                                                <input type="text" value={edu.degree || ''} onChange={e => {
                                                    const newEdu = [...localEducation];
                                                    newEdu[i].degree = e.target.value;
                                                    setLocalEducation(newEdu);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-bold" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Specialization</label>
                                                <input type="text" value={edu.specialization || ''} onChange={e => {
                                                    const newEdu = [...localEducation];
                                                    newEdu[i].specialization = e.target.value;
                                                    setLocalEducation(newEdu);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Calendar size={12}/> Timeline</label>
                                                <input type="text" value={edu.period || ''} onChange={e => {
                                                    const newEdu = [...localEducation];
                                                    newEdu[i].period = e.target.value;
                                                    setLocalEducation(newEdu);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Grade / Percentage</label>
                                                <input type="text" value={edu.grade || ''} onChange={e => {
                                                    const newEdu = [...localEducation];
                                                    newEdu[i].grade = e.target.value;
                                                    setLocalEducation(newEdu);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Description</label>
                                                <textarea rows={2} value={edu.description || ''} onChange={e => {
                                                    const newEdu = [...localEducation];
                                                    newEdu[i].description = e.target.value;
                                                    setLocalEducation(newEdu);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => setLocalEducation([{institution:'', degree:'', specialization:'', period:'', description:'', grade:''}, ...localEducation])} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-sm font-bold tracking-widest text-slate-500 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-center items-center gap-2">
                                    <Plus size={18} /> ADD EDUCATION
                                </button>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="space-y-6">
                                <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 transition-all">
                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Frontend Skills (Comma separated)</label>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {renderSkillPills(localSkills.frontend)}
                                    </div>
                                    <textarea rows={2} value={localSkills.frontend || ''} onChange={e => setLocalSkills({...localSkills, frontend: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:border-indigo-600 text-sm resize-none font-mono"></textarea>
                                </div>
                                <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 transition-all">
                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Backend & Tools (Comma separated)</label>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {renderSkillPills(localSkills.backend)}
                                    </div>
                                    <textarea rows={2} value={localSkills.backend || ''} onChange={e => setLocalSkills({...localSkills, backend: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:border-indigo-600 text-sm resize-none font-mono"></textarea>
                                </div>
                                <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 transition-all">
                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">SAP Modules (Comma separated)</label>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {renderSkillPills(localSkills.sap)}
                                    </div>
                                    <textarea rows={2} value={localSkills.sap || ''} onChange={e => setLocalSkills({...localSkills, sap: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:border-indigo-600 text-sm resize-none font-mono"></textarea>
                                </div>
                            </div>
                        )}

                        {activeTab === 'projects' && (
                            <div className="space-y-6">
                                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-6 shadow-sm flex items-start gap-4">
                                    <FolderPlus size={24} className="text-indigo-600 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-sm font-bold text-indigo-900 mb-1">Custom Repositories Engine</h3>
                                        <p className="text-xs text-indigo-700">These projects will be visually pinned to the top of the Projects grid, superseding your automated GitHub sync.</p>
                                    </div>
                                </div>
                                
                                {localCustomProjects.map((proj: any, i: number) => (
                                    <div key={i} className="p-6 border border-slate-200 border-l-4 border-l-blue-500 rounded-2xl bg-slate-50 space-y-4 relative group shadow-sm hover:shadow-md transition-all">
                                        <button onClick={() => {
                                            const newProj = [...localCustomProjects];
                                            newProj.splice(i, 1);
                                            setLocalCustomProjects(newProj);
                                        }} className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Project Name</label>
                                                <input type="text" value={proj.name || ''} onChange={e => {
                                                    const newProj = [...localCustomProjects];
                                                    newProj[i].name = e.target.value;
                                                    setLocalCustomProjects(newProj);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-bold text-blue-600" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Code size={12}/> Source Code URL (GitHub)</label>
                                                <input type="text" value={proj.html_url || ''} onChange={e => {
                                                    const newProj = [...localCustomProjects];
                                                    newProj[i].html_url = e.target.value;
                                                    setLocalCustomProjects(newProj);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" placeholder="https://github.com/..." />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Globe size={12}/> Live Demo URL</label>
                                                <input type="text" value={proj.homepage || ''} onChange={e => {
                                                    const newProj = [...localCustomProjects];
                                                    newProj[i].homepage = e.target.value;
                                                    setLocalCustomProjects(newProj);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" placeholder="https://..." />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Topics / Tech Stack (Comma separated)</label>
                                                <input type="text" value={proj.topics ? (Array.isArray(proj.topics) ? proj.topics.join(', ') : proj.topics) : ''} onChange={e => {
                                                    const newProj = [...localCustomProjects];
                                                    newProj[i].topics = e.target.value.split(',').map((s: string) => s.trim());
                                                    setLocalCustomProjects(newProj);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Description</label>
                                                <textarea rows={3} value={proj.description || ''} onChange={e => {
                                                    const newProj = [...localCustomProjects];
                                                    newProj[i].description = e.target.value;
                                                    setLocalCustomProjects(newProj);
                                                }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => setLocalCustomProjects([{id: Date.now().toString(), name:'New Project', description:'', html_url:'', homepage:'', topics:[], updated_at: new Date().toISOString(), isCustom: true}, ...localCustomProjects])} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-sm font-bold tracking-widest text-slate-500 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-center items-center gap-2">
                                    <Plus size={18} /> ADD CUSTOM PROJECT
                                </button>
                            </div>
                        )}

                        {activeTab === 'jobs' && (
                            <div className="space-y-6">
                                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-6 shadow-sm flex items-start gap-4">
                                    <Users size={24} className="text-indigo-600 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-sm font-bold text-indigo-900 mb-1">Job Postings Engine</h3>
                                        <p className="text-xs text-indigo-700">Create job listings or freelance requirements. Jobs automatically hide from the public site after their Expiry Date, but remain here to edit or reuse.</p>
                                    </div>
                                </div>
                                
                                {localJobs.map((job: any, i: number) => {
                                    const isExpired = job.expiryDate && new Date(job.expiryDate) < new Date();
                                    return (
                                        <div key={i} className={`p-6 border border-l-4 ${isExpired ? 'border-red-200 border-l-red-500 bg-red-50' : 'border-slate-200 border-l-green-500 bg-slate-50'} rounded-2xl space-y-4 relative group shadow-sm hover:shadow-md transition-all`}>
                                            {isExpired && <div className="absolute top-4 left-4 px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded shadow-sm">EXPIRED</div>}
                                            <button onClick={() => {
                                                const newJobs = [...localJobs];
                                                newJobs.splice(i, 1);
                                                setLocalJobs(newJobs);
                                            }} className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
                                                <Trash2 size={16} />
                                            </button>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Job Title</label>
                                                    <input type="text" value={job.title || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].title = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-bold text-green-700" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Building size={12}/> Company / Client</label>
                                                    <input type="text" value={job.company || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].company = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-bold" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><MapPin size={12}/> Location</label>
                                                    <input type="text" value={job.location || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].location = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" placeholder="Remote, New York, etc." />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Briefcase size={12}/> Job Type</label>
                                                    <input type="text" value={job.type || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].type = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" placeholder="Full-time, Contract" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><DollarSign size={12}/> Salary Range</label>
                                                    <input type="text" value={job.salary || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].salary = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" placeholder="$50k - $80k" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Calendar size={12}/> Expiry Date (YYYY-MM-DD)</label>
                                                    <input type="date" value={job.expiryDate || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].expiryDate = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2 flex items-center gap-1"><Mail size={12}/> Apply Link or Email</label>
                                                    <input type="text" value={job.applyLink || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].applyLink = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" placeholder="https://... or hr@company.com" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <div className="flex justify-between items-end mb-2">
                                                        <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold">Job Description</label>
                                                        <button onClick={() => handleAIGenerate(i)} className="flex items-center gap-1 text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors font-bold uppercase tracking-wider">
                                                            <Sparkles size={12} /> Auto-Generate AI
                                                        </button>
                                                    </div>
                                                    <textarea rows={3} value={job.description || ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].description = e.target.value;
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-[10px] uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Requirements (Comma separated)</label>
                                                    <textarea rows={2} value={job.requirements ? (Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements) : ''} onChange={e => {
                                                        const newJobs = [...localJobs];
                                                        newJobs[i].requirements = e.target.value.split(',').map((s: string) => s.trim());
                                                        setLocalJobs(newJobs);
                                                    }} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
                                                </div>
                                                <div className="md:col-span-2 pt-2 border-t border-slate-200 mt-2">
                                                    <button onClick={() => shareToLinkedIn(job)} className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-3 rounded-xl hover:bg-[#004182] transition-colors text-sm font-bold shadow-sm">
                                                        <Linkedin size={18} /> POST TO LINKEDIN
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <button onClick={() => setLocalJobs([{title:'New Job', company:'', location:'', type:'Full-time', salary:'', expiryDate:'', applyLink:'', description:'', requirements:[]}, ...localJobs])} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-sm font-bold tracking-widest text-slate-500 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-center items-center gap-2">
                                    <Plus size={18} /> POST NEW JOB
                                </button>
                            </div>
                        )}

                        {activeTab === 'aibrain' && (
                            <div className="space-y-8">
                                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4 shadow-[0_0_15px_rgba(0,243,255,0.05)]">
                                    <Sparkles size={24} className="text-primary mt-1" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 tracking-wide">Neural Core Configuration</h3>
                                        <p className="text-sm text-white/50 leading-relaxed font-light">Fine-tune your AI Assistant's persona. These settings influence how the Navigator interacts with visitors and recruiters.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                        <label className="block text-[10px] uppercase tracking-widest font-mono text-primary font-bold mb-4">Core Personality</label>
                                        <select 
                                            value={localAI.personality} 
                                            onChange={e => setLocalAI({...localAI, personality: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-sm font-mono"
                                        >
                                            <option value="Professional">Professional & Technical</option>
                                            <option value="Futuristic">Futuristic & Sci-Fi</option>
                                            <option value="Casual">Casual & Friendly</option>
                                            <option value="Minimalist">Minimalist & Direct</option>
                                        </select>
                                    </div>
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                        <label className="block text-[10px] uppercase tracking-widest font-mono text-primary font-bold mb-4">AI Voice Synthesis</label>
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={() => setLocalAI({...localAI, voice: localAI.voice === 'Enabled' ? 'Disabled' : 'Enabled'})}
                                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${localAI.voice === 'Enabled' ? 'bg-primary text-black' : 'bg-white/5 text-white/40 border border-white/10'}`}
                                            >
                                                {localAI.voice === 'Enabled' ? 'ON' : 'OFF'}
                                            </button>
                                            <p className="text-[10px] text-white/30 font-mono w-24">Toggle audio feedback</p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                        <label className="block text-[10px] uppercase tracking-widest font-mono text-primary font-bold mb-4">Extended Knowledge Base</label>
                                        <textarea 
                                            rows={6} 
                                            value={localAI.knowledge} 
                                            onChange={e => setLocalAI({...localAI, knowledge: e.target.value})}
                                            placeholder="Add specific facts about your projects, current learning, or career goals that the AI should know..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary text-sm font-mono resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'referralhub' && (
                            <div className="space-y-8">
                                <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 flex items-start gap-4">
                                    <Users size={24} className="text-secondary mt-1" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 tracking-wide">Network Opportunity Mesh</h3>
                                        <p className="text-sm text-white/50 leading-relaxed font-light">Manage roles you are willing to refer individuals for. This builds your reputation as a professional bridge.</p>
                                    </div>
                                </div>

                                {localReferrals.map((ref: any, i: number) => (
                                    <div key={i} className="p-6 bg-white/5 border border-white/10 border-l-4 border-l-secondary rounded-2xl space-y-4 relative group shadow-sm hover:shadow-md transition-all">
                                        <button onClick={() => {
                                            const newRefs = [...localReferrals];
                                            newRefs.splice(i, 1);
                                            setLocalReferrals(newRefs);
                                        }} className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={16} />
                                        </button>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-secondary font-bold mb-2">Role Title</label>
                                                <input type="text" value={ref.title || ''} onChange={e => {
                                                    const newRefs = [...localReferrals];
                                                    newRefs[i].title = e.target.value;
                                                    setLocalReferrals(newRefs);
                                                }} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary text-sm font-bold" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-white/40 font-bold mb-2">Company / Group</label>
                                                <input type="text" value={ref.company || ''} onChange={e => {
                                                    const newRefs = [...localReferrals];
                                                    newRefs[i].company = e.target.value;
                                                    setLocalReferrals(newRefs);
                                                }} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary text-sm font-bold" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-white/40 font-bold mb-2">Network ID</label>
                                                <input type="text" value={ref.id || ''} onChange={e => {
                                                    const newRefs = [...localReferrals];
                                                    newRefs[i].id = e.target.value;
                                                    setLocalReferrals(newRefs);
                                                }} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary text-sm font-mono" placeholder="REF-XXXX" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] uppercase tracking-widest font-mono text-white/40 font-bold mb-2">Description / Context</label>
                                                <textarea rows={2} value={ref.description || ''} onChange={e => {
                                                    const newRefs = [...localReferrals];
                                                    newRefs[i].description = e.target.value;
                                                    setLocalReferrals(newRefs);
                                                }} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary text-sm resize-none"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button onClick={() => setLocalReferrals([{id: `REF-${Math.floor(Math.random()*9000)+1000}`, title:'', company:'', description:''}, ...localReferrals])} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-sm font-bold tracking-widest text-white/40 hover:text-secondary hover:border-secondary/50 hover:bg-secondary/5 transition-all flex justify-center items-center gap-2 uppercase">
                                    <Plus size={18} /> Establish New Referral Link
                                </button>
                            </div>
                        )}

                        {activeTab === 'global' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Resume PDF Link</label>
                                        <input type="text" value={localGlobal.resumeUrl || ''} onChange={e => setLocalGlobal({...localGlobal, resumeUrl: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all" placeholder="URL or path to PDF" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">Email Address</label>
                                        <input type="email" value={localGlobal.email || ''} onChange={e => setLocalGlobal({...localGlobal, email: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">LinkedIn URL</label>
                                        <input type="text" value={localGlobal.linkedin || ''} onChange={e => setLocalGlobal({...localGlobal, linkedin: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">GitHub Username</label>
                                        <input type="text" value={localGlobal.github || ''} onChange={e => setLocalGlobal({...localGlobal, github: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm transition-all font-bold text-indigo-600" />
                                        <p className="text-[10px] text-slate-500 mt-2">Changing this modifies where your auto-synced projects are pulled from.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
