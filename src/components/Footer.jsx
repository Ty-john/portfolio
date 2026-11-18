import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer data-nav-theme="dark" className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#C9A227]/25 bg-[#0B1F3A] text-[#FBF8F1] text-xs relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-normal text-[#E8D48A] text-sm">
            {personalInfo.name}
          </span>
          <span className="hidden sm:inline text-gold">•</span>
          <span className="font-normal text-[#FBF8F1]/70">© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Built With Notice & Scroll to top */}
        <div className="flex items-center gap-6">
          <span className="text-[#E8D48A] font-normal text-[11px]">
            Vite + React + Three.js
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#12294A] border border-[#C9A227]/40 hover:border-gold text-[#E8D48A] hover:bg-gold hover:text-[#0B1F3A] transition-all flex items-center gap-1.5 shadow-sm"
            title="Scroll to top"
          >
            <span className="text-[11px] font-normal tracking-wider">TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

