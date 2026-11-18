import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { personalInfo, certificates } from '../data/portfolioData';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  ...(certificates && certificates.length > 0
    ? [{ label: 'Certificates', href: '#certificates' }]
    : []),
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const headerRef = useRef(null);
  const isDarkRef = useRef(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let rafId = null;

    const checkNavTheme = () => {
      const navHeight = headerRef.current ? headerRef.current.offsetHeight : 64;
      const navCenter = navHeight / 2;

      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }

      const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
      let overlapsDark = false;

      for (let i = 0; i < darkSections.length; i++) {
        const rect = darkSections[i].getBoundingClientRect();
        if (rect.top <= navCenter && rect.bottom >= navCenter) {
          overlapsDark = true;
          break;
        }
      }

      if (overlapsDark !== isDarkRef.current) {
        isDarkRef.current = overlapsDark;
        setIsDarkTheme(overlapsDark);
      }
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        checkNavTheme();
        rafId = null;
      });
    };

    // Initial check on mount
    checkNavTheme();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkTheme
          ? 'bg-[rgba(11,31,58,0.92)] backdrop-blur-md border-b border-[#C9A227]/20 shadow-md py-3.5'
          : scrolled
          ? 'bg-[#FBF8F1]/92 backdrop-blur-md border-b border-[#C9A227]/25 shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className={`group flex items-center space-x-1.5 text-xl font-normal tracking-tight transition-colors duration-300 ${
              isDarkTheme
                ? 'text-[#FBF8F1] hover:text-[#E8D48A]'
                : 'text-navy hover:text-gold-deep'
            }`}
          >
            <span>Tyrone</span>
            <span className="text-gold group-hover:scale-125 transition-transform inline-block">.</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-normal tracking-wide transition-colors duration-300 ${
                  isDarkTheme
                    ? 'text-[#FBF8F1]/85 hover:text-[#E8D48A]'
                    : 'text-navy/80 hover:text-gold-deep'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {personalInfo.hasResume && (
              <a
                href={personalInfo.resumePath}
                download="Tyrone_John_Zapata_Resume.pdf"
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-normal uppercase tracking-wider rounded-lg border-2 transition-all duration-200 ${
                  isDarkTheme
                    ? 'border-[#E8D48A] text-[#E8D48A] hover:bg-[#E8D48A] hover:text-[#0B1F3A]'
                    : 'border-navy text-navy hover:bg-navy hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-normal uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] hover:brightness-105 transition-all duration-200 shadow-sm hover:shadow-gold-glow"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            {personalInfo.hasResume && (
              <a
                href={personalInfo.resumePath}
                download="Tyrone_John_Zapata_Resume.pdf"
                className={`p-2 rounded-lg border-2 text-xs flex items-center gap-1.5 transition-colors duration-300 ${
                  isDarkTheme
                    ? 'text-[#E8D48A] border-[#E8D48A] hover:bg-[#E8D48A] hover:text-[#0B1F3A]'
                    : 'text-navy border-navy hover:bg-navy hover:text-white'
                }`}
                title="Download Resume"
              >
                <Download className="w-4 h-4" />
                <span className="text-[11px] font-normal">CV</span>
              </a>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg border focus:outline-none shadow-sm transition-colors duration-300 ${
                isDarkTheme
                  ? 'bg-[#12294A] border-[#C9A227]/30 text-[#FBF8F1] hover:text-[#E8D48A]'
                  : 'bg-white border-[#C9A227]/40 text-navy hover:text-gold'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-b px-6 py-6 shadow-xl transition-colors duration-300 ${
              isDarkTheme
                ? 'bg-[#0B1F3A] border-[#C9A227]/25 text-[#FBF8F1]'
                : 'bg-[#FBF8F1] border-[#C9A227]/30 text-navy'
            }`}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-normal transition-colors duration-300 py-1 ${
                    isDarkTheme
                      ? 'text-[#FBF8F1]/85 hover:text-[#E8D48A]'
                      : 'text-navy hover:text-gold-deep'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[#C9A227]/20 flex flex-col gap-3">
                {personalInfo.hasResume && (
                  <a
                    href={personalInfo.resumePath}
                    download="Tyrone_John_Zapata_Resume.pdf"
                    onClick={() => setIsOpen(false)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-normal uppercase tracking-wider rounded-lg border-2 transition-all ${
                      isDarkTheme
                        ? 'border-[#E8D48A] text-[#E8D48A] hover:bg-[#E8D48A] hover:text-[#0B1F3A]'
                        : 'border-navy text-navy hover:bg-navy hover:text-white'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume (PDF)</span>
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-normal uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A]"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
