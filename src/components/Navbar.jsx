import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { personalInfo, certificates } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

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
  const { isDark } = useTheme();
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // 1. Scrolled state toggled directly on DOM via ref (zero React re-renders)
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (header.dataset.scrolled !== String(isScrolled)) {
        header.dataset.scrolled = String(isScrolled);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // 2. IntersectionObserver detecting when Contact or Footer bands overlap the navbar
    const bandElements = document.querySelectorAll('[data-nav-band="true"]');
    let observer = null;

    if (bandElements.length > 0 && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        () => {
          let overlaps = false;
          for (let i = 0; i < bandElements.length; i++) {
            const rect = bandElements[i].getBoundingClientRect();
            if (rect.top <= 64 && rect.bottom >= 0) {
              overlaps = true;
              break;
            }
          }
          if (overlaps) {
            header.setAttribute('data-band-dark', 'true');
          } else {
            header.removeAttribute('data-band-dark');
          }
        },
        {
          rootMargin: '0px 0px -90% 0px',
          threshold: [0, 0.05, 0.1, 0.2, 0.5, 1.0],
        }
      );

      bandElements.forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? 'data-[scrolled=true]:bg-[rgba(11,31,58,0.92)] data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:border-b data-[scrolled=true]:border-[rgba(232,212,138,0.20)] data-[scrolled=true]:shadow-md data-[scrolled=true]:py-3.5 py-5 bg-transparent'
          : 'data-[band-dark=true]:bg-[rgba(11,31,58,0.92)] data-[band-dark=true]:backdrop-blur-md data-[band-dark=true]:border-b data-[band-dark=true]:border-[#C9A227]/20 data-[band-dark=true]:shadow-md data-[band-dark=true]:py-3.5 data-[scrolled=true]:bg-[#FBF8F1]/92 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:border-b data-[scrolled=true]:border-[#C9A227]/25 data-[scrolled=true]:shadow-sm data-[scrolled=true]:py-3.5 py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className={`nav-logo group flex items-center space-x-1.5 text-xl font-normal tracking-tight transition-colors duration-300 ${
              isDark
                ? 'text-[#F6F1E3] hover:text-[#E8D48A]'
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
                className={`nav-link text-sm font-normal tracking-wide transition-colors duration-300 ${
                  isDark
                    ? 'text-[#F6F1E3]/85 hover:text-[#E8D48A]'
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
                className={`header-resume-btn inline-flex items-center gap-2 px-4 py-2 text-xs font-normal uppercase tracking-wider rounded-lg border-2 transition-all duration-200 ${
                  isDark
                    ? 'border-[#E8D48A] text-[#E8D48A] hover:bg-[#E8D48A] hover:text-[#0B1F3A]'
                    : 'border-navy text-navy hover:bg-navy hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            )}

            {/* Theme Toggle Button next to 'Get in Touch' */}
            <ThemeToggle />

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-normal uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] hover:brightness-105 transition-all duration-200 shadow-sm hover:shadow-gold-glow"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + CV + Menu Button */}
          <div className="flex md:hidden items-center space-x-2.5">
            <ThemeToggle className="scale-90" />

            {personalInfo.hasResume && (
              <a
                href={personalInfo.resumePath}
                download="Tyrone_John_Zapata_Resume.pdf"
                className={`p-2 rounded-lg border-2 text-xs flex items-center gap-1.5 transition-colors duration-300 ${
                  isDark
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
              className={`header-mobile-btn p-2 rounded-lg border focus:outline-none shadow-sm transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isDark
                  ? 'bg-[#12294A] border-[#C9A227]/30 text-[#F6F1E3] hover:text-[#E8D48A]'
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
              isDark
                ? 'bg-[#0B1F3A] border-[#C9A227]/25 text-[#F6F1E3]'
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
                    isDark
                      ? 'text-[#F6F1E3]/85 hover:text-[#E8D48A]'
                      : 'text-navy hover:text-gold-deep'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Theme toggle in mobile menu */}
              <div className="pt-3 pb-1 border-t border-[#C9A227]/20 flex items-center justify-between">
                <span className={`text-xs uppercase tracking-wider font-normal ${isDark ? 'text-[#F6F1E3]/70' : 'text-navy/70'}`}>
                  Theme Mode
                </span>
                <ThemeToggle />
              </div>

              <div className="pt-2 border-t border-[#C9A227]/20 flex flex-col gap-3">
                {personalInfo.hasResume && (
                  <a
                    href={personalInfo.resumePath}
                    download="Tyrone_John_Zapata_Resume.pdf"
                    onClick={() => setIsOpen(false)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-normal uppercase tracking-wider rounded-lg border-2 transition-all ${
                      isDark
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
