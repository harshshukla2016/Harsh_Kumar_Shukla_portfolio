import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Referrals from './components/Referrals';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import SEO from './components/SEO';
import Terminal from './components/Terminal';
import Support from './components/Support';

function App() {
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
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Referrals />
      <Testimonials />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 pointer-events-none"> {/* Pointer events none to allow clicks through container, re-enable on children if needed */}
        <div className="pointer-events-auto"><Support /></div>
        <div className="pointer-events-auto"><Terminal /></div>
      </div>
      <Contact />
    </div>
  );
}

export default App;
