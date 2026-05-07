import React, { useEffect, useState, Component, type ErrorInfo, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Jobs from './components/Jobs';
import Projects from './components/Projects';
import Education from './components/Education';
import Referrals from './components/Referrals';
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
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

function PortfolioContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-primary">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <SEO />
      <Navbar />
      <ErrorBoundary><Hero /></ErrorBoundary>
      <ErrorBoundary><About /></ErrorBoundary>
      <ErrorBoundary><Experience /></ErrorBoundary>
      <ErrorBoundary><Skills /></ErrorBoundary>
      <ErrorBoundary><Jobs /></ErrorBoundary>
      <ErrorBoundary><Projects /></ErrorBoundary>
      <ErrorBoundary><Education /></ErrorBoundary>
      <ErrorBoundary><Referrals /></ErrorBoundary>
      <ErrorBoundary><Testimonials /></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={null}><Blog /></Suspense></ErrorBoundary>

      {/* Fixed Widgets */}
      <MusicPlayer />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:gap-3 pointer-events-none">
        <div className="pointer-events-auto scale-90 md:scale-100 origin-bottom-right"><ChatBot /></div>
        <div className="pointer-events-auto scale-90 md:scale-100 origin-bottom-right"><Support /></div>
        <div className="pointer-events-auto hidden md:block"><Terminal /></div>
      </div>

      <Contact />
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
