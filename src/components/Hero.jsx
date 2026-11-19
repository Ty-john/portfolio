import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowDown, Download, ArrowUpRight, GraduationCap, FolderGit2, Award, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { personalInfo, projects, certificates, isRealUrl, isRealEmail } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

// Lazy-load the 3D Hero Scene
const HeroScene = lazy(() => import('./3d/HeroScene'));

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, isTouch: false });
  const { theme, isDark } = useTheme();

  // Subtle counter-cursor spring parallax for editorial elegance
  const springConfig = { stiffness: 90, damping: 22 };
  const textX = useSpring(0, springConfig);
  const textY = useSpring(0, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.x = normX;
      mouseRef.current.y = normY;
      mouseRef.current.isTouch = false;

      textX.set(normX * -8);
      textY.set(normY * -6);
    };

    const handleTouchStart = () => {
      mouseRef.current.isTouch = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [shouldReduceMotion, textX, textY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Split name for editorial typography: first names in Roman navy, last name in Italic gold
  const nameParts = (personalInfo.name || '').trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');

  // Compute live accurate statistics from the data
  const educationFact = '4th-Year BSIT';
  const visibleProjectsCount = projects ? projects.filter((p) => !p.hidden).length : 0;
  const certsCount = certificates ? certificates.length : 0;

  // Filter out any fact whose numeric count is 0
  const facts = [
    {
      id: 'education',
      icon: GraduationCap,
      label: 'Discipline',
      value: educationFact,
      show: Boolean(educationFact),
    },
    {
      id: 'projects',
      icon: FolderGit2,
      label: 'Portfolio',
      value: `${visibleProjectsCount} Projects`,
      show: visibleProjectsCount > 0,
    },
    {
      id: 'certificates',
      icon: Award,
      label: 'Credentials',
      value: `${certsCount} Certificates`,
      show: certsCount > 0,
    },
  ].filter((f) => f.show);

  const hasGithub = isRealUrl(personalInfo.github);
  const hasLinkedin = isRealUrl(personalInfo.linkedin);
  const hasEmail = isRealEmail(personalInfo.email);
  const hasAnySocial = hasGithub || hasLinkedin || hasEmail;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Layer 0: 3D Scene Canvas Layer */}
      <div className="absolute top-[72px] bottom-[56px] inset-x-0 z-0 pointer-events-none overflow-hidden">
        <Suspense fallback={null}>
          <HeroScene mouseRef={mouseRef} theme={theme} />
        </Suspense>
      </div>

      {/* Layer 1: Radial Gradient Mask for guaranteed WCAG AAA text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden"
      >
        {/* Mobile (<768px): stronger aura concentrated behind top third */}
        <div
          className={`block md:hidden w-full h-full transition-opacity duration-300 ${
            isDark
              ? 'bg-[radial-gradient(ellipse_95%_75%_at_50%_28%,_rgba(11,31,58,0.95)_0%,_rgba(11,31,58,0.85)_55%,_rgba(11,31,58,0)_85%)]'
              : 'bg-[radial-gradient(ellipse_95%_75%_at_50%_28%,_rgba(251,248,241,0.98)_0%,_rgba(251,248,241,0.88)_55%,_rgba(251,248,241,0)_85%)]'
          }`}
        />
        {/* Desktop (>=768px): wide central aura behind name and tagline */}
        <div
          className={`hidden md:block w-full max-w-5xl h-[650px] transition-opacity duration-300 ${
            isDark
              ? 'bg-[radial-gradient(ellipse_at_center,_rgba(11,31,58,0.92)_0%,_rgba(11,31,58,0.72)_45%,_rgba(11,31,58,0)_75%)]'
              : 'bg-[radial-gradient(ellipse_at_center,_rgba(251,248,241,0.92)_0%,_rgba(251,248,241,0.72)_45%,_rgba(251,248,241,0)_75%)]'
          }`}
        />
      </div>

      {/* Layer 10: Centered Content Stack */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : textX, y: shouldReduceMotion ? 0 : textY }}
        className="relative z-10 max-w-[900px] w-full mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-7"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-6 sm:space-y-7 w-full"
        >
          {/* 1. Eyebrow Label: personalInfo.role */}
          <motion.div variants={itemVariants}>
            <span className="inline-block text-[#8A6D12] dark:text-[var(--gold-text)] text-xs sm:text-sm font-normal uppercase tracking-[0.25em]">
              {personalInfo.role}
            </span>
          </motion.div>

          {/* 2. Big Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-normal tracking-tight text-[var(--heading)] leading-[1.12]"
          >
            {firstName}{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] dark:from-[#E8D48A] dark:to-[#C9A227]">
              {lastName}
            </span>
          </motion.h1>

          {/* 3. Tagline as Muted Navy / Ivory Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed max-w-2xl mx-auto"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* 4. The Two Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-1 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-navy hover:bg-navy-light text-white dark:bg-gradient-to-r dark:from-[#E8D48A] dark:via-[#C9A227] dark:to-[#9A7B1C] dark:text-[#0B1F3A] dark:hover:brightness-105 font-normal text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 text-white dark:text-[#0B1F3A] group-hover:translate-y-0.5 transition-transform" />
            </a>

            {personalInfo.hasResume ? (
              <a
                href={personalInfo.resumePath}
                download="Tyrone_John_Zapata_Resume.pdf"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-gold/15 text-[var(--btn-outline-text)] border-2 border-gold dark:border-[var(--btn-outline-border)] font-normal text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
              >
                <Download className="w-4 h-4 text-gold-deep dark:text-[var(--gold-text)] group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </a>
            ) : (
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-gold/15 text-[var(--btn-outline-text)] border-2 border-gold dark:border-[var(--btn-outline-border)] font-normal text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-gold-deep dark:text-[var(--gold-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </motion.div>

          {/* 5. Social Icon Row */}
          {hasAnySocial && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 pt-1 text-navy dark:text-[#E8D48A]"
            >
              {hasGithub && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-[#C9A227]/40 text-navy hover:bg-[#F4EBCF] hover:border-gold hover:text-navy dark:bg-[var(--surface)] dark:border-[var(--border)] dark:text-[var(--gold-text)] dark:hover:bg-[#1A3860] transition-all duration-200 shadow-sm"
                  title="GitHub Profile"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
              {hasLinkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-[#C9A227]/40 text-navy hover:bg-[#F4EBCF] hover:border-gold hover:text-navy dark:bg-[var(--surface)] dark:border-[var(--border)] dark:text-[var(--gold-text)] dark:hover:bg-[#1A3860] transition-all duration-200 shadow-sm"
                  title="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
              {hasEmail && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-white border border-[#C9A227]/40 text-navy hover:bg-[#F4EBCF] hover:border-gold hover:text-navy dark:bg-[var(--surface)] dark:border-[var(--border)] dark:text-[var(--gold-text)] dark:hover:bg-[#1A3860] transition-all duration-200 shadow-sm"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          )}

          {/* 6. Facts Row with Thin Gold Dividers */}
          {facts.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="pt-6 sm:pt-8 border-t border-[#C9A227]/25 dark:border-[var(--border)] w-full flex flex-wrap items-center justify-center gap-4 sm:gap-8"
            >
              {facts.map((fact, idx) => {
                const Icon = fact.icon;
                return (
                  <React.Fragment key={fact.id}>
                    {idx > 0 && (
                      <div className="hidden sm:block w-[1px] h-7 bg-[#C9A227]/30 dark:bg-[var(--border)]" />
                    )}
                    <div className="flex items-center gap-2.5 sm:gap-3 text-left">
                      <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 dark:border-[var(--border)] flex items-center justify-center text-gold-deep dark:text-[var(--gold-text)] flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#8A6D12] dark:text-[#E8D48A]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-normal">
                          {fact.label}
                        </span>
                        <span className="block text-xs sm:text-sm text-[var(--heading)] font-normal">
                          {fact.value}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Floating scroll indicator at the bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 text-xs text-navy/50 dark:text-[var(--text-muted)] pointer-events-none">
        <span className="uppercase tracking-widest text-[9px] font-normal">Scroll</span>
        <div className="w-4 h-7 rounded-full border-2 border-navy/30 dark:border-[var(--border)] flex justify-center p-1 bg-white/40 dark:bg-[var(--surface)]/50">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
