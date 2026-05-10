import React, { useEffect, useState, Component, type ErrorInfo, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Opportunities from './components/Opportunities';
import Projects from './components/Projects';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
const Blog = lazy(() => import('./components/Blog'));
import Contact from './components/Contact';
import SEO from './components/SEO';
import Terminal from './components/Terminal';
import Support from './components/Support';
import MusicPlayer from './components/MusicPlayer';
import ChatBot from './components/ChatBot';
import AdminPanel from './components/AdminPanel';
import { PortfolioProvider } from './context/PortfolioContext';

// Global error boundary — prevents any component crash from taking down the whole app
class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Component crashed:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="py-20 text-center border border-red-500/20 bg-red-500/5 rounded-3xl m-6">
          <p className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2">Neural_Link_Error</p>
          <p className="text-white/40 text-[10px] font-mono">Module failed to initialize. Recovery mode active.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

import { usePortfolio } from './context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette } from 'lucide-react';
import CodeRain from './components/CodeRain';
import SAPExplorer from './components/SAPExplorer';

function PortfolioContent() {
  const [loading, setLoading] = useState(true);
  const { theme } = usePortfolio();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    const timer = setTimeout(() => setLoading(false), 1500); // Slightly longer for smoother loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-primary">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`bg-black min-h-screen text-white overflow-x-hidden selection:bg-primary selection:text-black transition-colors duration-1000 theme-${theme}`}>
      <CodeRain />
      <SEO />
      <Navbar />
      <ErrorBoundary><Hero /></ErrorBoundary>
      <ErrorBoundary><About /></ErrorBoundary>
      <ErrorBoundary><Experience /></ErrorBoundary>
      <ErrorBoundary><SAPExplorer /></ErrorBoundary>
      <ErrorBoundary><Skills /></ErrorBoundary>
      <ErrorBoundary><Opportunities /></ErrorBoundary>
      <ErrorBoundary><Projects /></ErrorBoundary>
      <ErrorBoundary><Education /></ErrorBoundary>
      <ErrorBoundary><Testimonials /></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={null}><Blog /></Suspense></ErrorBoundary>

      {/* Fixed Widgets */}
      <MusicPlayer />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:gap-3 pointer-events-none">
        <div className="pointer-events-auto scale-90 md:scale-100 origin-bottom-right"><ChatBot /></div>
        <div className="pointer-events-auto scale-90 md:scale-100 origin-bottom-right"><Support /></div>
        <div className="pointer-events-auto hidden md:block"><Terminal /></div>
      </div>

      <AmbianceController />
      <Contact />
    </div>
  );
}

const AmbianceController = () => {
  const { theme, setTheme } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'cyan', color: '#00f3ff', name: 'Cyber' },
    { id: 'emerald', color: '#10b981', name: 'Matrix' },
    { id: 'amber', color: '#f59e0b', name: 'Solar' },
    { id: 'ruby', color: '#ef4444', name: 'Ruby' },
  ];

  return (
    <div className="fixed bottom-24 left-6 z-[100]">
      <motion.div 
        animate={{ width: isOpen ? '160px' : '48px', height: isOpen ? 'auto' : '48px' }}
        className="bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center text-primary hover:text-white transition-colors"
        >
          {isOpen ? <X size={20} /> : <Palette size={20} className="animate-pulse" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 pt-0 space-y-3"
            >
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] text-center border-t border-white/5 pt-3">Aura Sync</p>
              <div className="flex flex-col gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${theme === t.id ? 'bg-white/10 text-white border border-white/10' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color, boxShadow: `0 0 10px ${t.color}` }}></div>
                    <span className="text-[11px] font-mono font-bold tracking-tight">{t.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<PortfolioContent />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
