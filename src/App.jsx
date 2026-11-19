import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import DoodleBackground from './components/DoodleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent text-[var(--text)] flex flex-col selection:bg-gold/30 selection:text-navy relative">
        {/* Fixed iOS-safe tiling doodle background */}
        <DoodleBackground />
        
        <Navbar />
        <main className="flex-grow relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
