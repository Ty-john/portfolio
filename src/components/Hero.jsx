import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowDown, Download, ArrowUpRight, GraduationCap, FolderGit2, Award, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { personalInfo, projects, certificates, isRealUrl, isRealEmail } from '../data/portfolioData';

// Lazy-load the 3D Hero Scene and Foreground Cube
const HeroScene = lazy(() => import('./3d/HeroScene'));
const HeroForegroundCube = lazy(() =>
  import('./3d/HeroScene').then((m) => ({ default: m.HeroForegroundCube }))
);

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, isTouch: false });

  // Subtle counter-cursor spring parallax for editorial elegance (moves less than 3D scene)
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

      // Text parallax moves gently (-10px to +10px), far less than the 3D scene
      textX.set(normX * -10);
      textY.set(normY * -8);
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
      {/* Layer 0: Full-Hero 3D Scene Background Layer (absolute, inset-0, z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Suspense fallback={null}>
          <HeroScene mouseRef={mouseRef} />
        </Suspense>
      </div>

      {/* Layer 1: Soft Ivory Radial Gradient Mask for guaranteed WCAG AAA text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden"
      >
        {/* Mobile (<768px): stronger aura concentrated behind top third */}
        <div className="block md:hidden w-full h-full bg-[radial-gradient(ellipse_95%_75%_at_50%_28%,_rgba(251,248,241,0.98)_0%,_rgba(251,248,241,0.88)_55%,_rgba(251,248,241,0)_85%)]" />
        {/* Desktop (>=768px): wide central aura behind name and tagline */}
        <div className="hidden md:block w-full max-w-5xl h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(251,248,241,0.95)_0%,_rgba(251,248,241,0.82)_45%,_rgba(251,248,241,0)_75%)]" />
      </div>

      {/* Layer 10: Centered Content Stack (max-width ~900px, text-align: center) */}
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
            <span className="inline-block text-[#8A6D12] text-xs sm:text-sm font-normal uppercase tracking-[0.25em]">
              {personalInfo.role}
            </span>
          </motion.div>

          {/* 2. Big Name with 3D Depth Effect (Foreground Gold Cube at z-20 slightly overlapping corner) */}
          <motion.div variants={itemVariants} className="relative inline-block max-w-full">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-normal tracking-tight text-navy leading-[1.12]">
              {firstName}{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#8A6D12]">
                {lastName}
              </span>
            </h1>

            {/* Depth effect: ONE small gold element of the scene (a cube) in a foreground layer (z-20) */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -right-2 sm:-top-5 sm:-right-6 w-11 h-11 sm:w-14 sm:h-14 z-20 pointer-events-none select-none"
            >
              <Suspense fallback={null}>
                <HeroForegroundCube mouseRef={mouseRef} reducedMotion={shouldReduceMotion} />
              </Suspense>
            </div>
          </motion.div>

          {/* 3. Tagline as Muted Navy Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-navy/80 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* 4. The Two Buttons (Stack vertically on mobile <768px, row on desktop) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-1 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-navy hover:bg-navy-light text-white font-normal text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            </a>

            {personalInfo.hasResume ? (
              <a
                href={personalInfo.resumePath}
                download="Tyrone_John_Zapata_Resume.pdf"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-gold/15 text-navy border-2 border-gold font-normal text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
              >
                <Download className="w-4 h-4 text-gold-deep group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </a>
            ) : (
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-gold/15 text-navy border-2 border-gold font-normal text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-gold-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </motion.div>

          {/* 5. Social Icon Row */}
          {hasAnySocial && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 pt-1 text-navy"
            >
              {hasGithub && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-[#C9A227]/40 text-navy hover:bg-[#F4EBCF] hover:border-gold hover:text-navy transition-all duration-200 shadow-sm"
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
                  className="p-2.5 rounded-xl bg-white border border-[#C9A227]/40 text-navy hover:bg-[#F4EBCF] hover:border-gold hover:text-navy transition-all duration-200 shadow-sm"
                  title="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
              {hasEmail && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-white border border-[#C9A227]/40 text-navy hover:bg-[#F4EBCF] hover:border-gold hover:text-navy transition-all duration-200 shadow-sm"
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
              className="pt-6 sm:pt-8 border-t border-[#C9A227]/25 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-8"
            >
              {facts.map((fact, idx) => {
                const Icon = fact.icon;
                return (
                  <React.Fragment key={fact.id}>
                    {idx > 0 && (
                      <div className="hidden sm:block w-[1px] h-7 bg-[#C9A227]/30" />
                    )}
                    <div className="flex items-center gap-2.5 sm:gap-3 text-left">
                      <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-deep flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#8A6D12]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-navy/60 font-normal">
                          {fact.label}
                        </span>
                        <span className="block text-xs sm:text-sm text-navy font-normal">
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 text-xs text-navy/50 pointer-events-none">
        <span className="uppercase tracking-widest text-[9px] font-normal">Scroll</span>
        <div className="w-4 h-7 rounded-full border-2 border-navy/30 flex justify-center p-1 bg-white/40">
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

