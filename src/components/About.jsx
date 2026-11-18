import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layout, Database, Cpu, GraduationCap, MapPin } from 'lucide-react';
import {
  personalInfo,
  aboutPillars,
  aboutStatements,
  frames,
  certificates,
  isRealText,
} from '../data/portfolioData';
import PolaroidFrame from './PolaroidFrame';

const iconMap = {
  Layout: Layout,
  Database: Database,
  Cpu: Cpu,
};

/**
 * Parses statement text, turning words enclosed in *asterisks* into gold italic typography.
 * Uses high-contrast gold gradient starting from #C9A227 down to #9A7B1C (never lighter than #C9A227).
 */
function StatementText({ text }) {
  if (!text) return null;

  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <span
              key={i}
              className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#9A7B1C]"
            >
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const statementRef1 = useRef(null);
  const statementRef2 = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const statement1 = aboutStatements?.[0];
  const statement2 = aboutStatements?.[1];

  // Derive polaroids with real images only, dynamically reading title and subtitle from certificates data
  const resolvedFrames = (frames || [])
    .filter((f) => isRealText(f?.image))
    .map((frame) => {
      const cert = certificates?.find(
        (c) =>
          c.image === frame.image ||
          c.id === frame.id ||
          (frame.certId && c.id === frame.certId)
      );

      if (cert) {
        return {
          ...frame,
          title: cert.title,
          caption: 'DataCamp',
        };
      }

      return {
        ...frame,
        caption: 'DataCamp',
      };
    });

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#C9A227]/25 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-gold/15 border border-gold/40 text-[#8A6D12] text-xs font-normal uppercase tracking-[0.2em] mb-3">
            <span>01 // Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-navy tracking-tight">
            About My Work
          </h2>
        </div>

        {/* 12-Column Editorial Statement Block 1 with Outer-Gutter Scroll-Parallax Polaroids */}
        {statement1 && (
          <div ref={statementRef1} className="relative py-2 sm:py-3 my-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center">
              {/* Outer Left Gutter (Columns 1-2): Desktop Parallax Frame 1 (aligned closer to statement) */}
              <div className="hidden lg:flex lg:col-span-2 justify-end pr-1 xl:pr-2">
                {resolvedFrames[0] && (
                  <PolaroidFrame
                    frame={resolvedFrames[0]}
                    targetRef={statementRef1}
                    travel={[-25, 30]}
                    rotateDelta={2.0}
                    initialRotate={resolvedFrames[0].rotation || -3.5}
                    className="w-40 xl:w-44"
                  />
                )}
              </div>

              {/* Center Statement Text (Columns 3-10, max-width ~900px, 2-3 lines) */}
              <div className="col-span-1 lg:col-span-8 max-w-[900px] mx-auto text-center px-2 sm:px-4">
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-serif font-normal text-navy text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2rem] leading-[1.42] tracking-tight">
                    <StatementText text={statement1.text} />
                  </p>
                </motion.div>
              </div>

              {/* Outer Right Gutter (Columns 11-12): Desktop Parallax Frame 2 (aligned closer to statement) */}
              <div className="hidden lg:flex lg:col-span-2 justify-start pl-1 xl:pl-2">
                {resolvedFrames[1] && (
                  <PolaroidFrame
                    frame={resolvedFrames[1]}
                    targetRef={statementRef1}
                    travel={[30, -25]}
                    rotateDelta={2.0}
                    initialRotate={resolvedFrames[1].rotation || 3.2}
                    className="w-40 xl:w-44"
                  />
                )}
              </div>
            </div>

            {/* Below 1024px: Single column, smaller polaroid stacked cleanly below text, aligned left (reduced gap) */}
            {resolvedFrames[0] && (
              <div className="block lg:hidden mt-4 ml-4 sm:ml-8 w-36 sm:w-40 relative z-10">
                <PolaroidFrame
                  frame={resolvedFrames[0]}
                  targetRef={statementRef1}
                  travel={[-10, 12]}
                  rotateDelta={1.2}
                  initialRotate={resolvedFrames[0].rotation || -3.5}
                />
              </div>
            )}
          </div>
        )}

        {/* Two Column Grid: Core Bio Card & Focus Points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Core Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-2xl bg-white/75 backdrop-blur-sm border border-[#C9A227]/30 shadow-card relative overflow-hidden group">
              {/* Metallic Gold Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

              <div className="flex items-center gap-3 text-gold-deep mb-4 pt-1">
                <GraduationCap className="w-6 h-6 text-gold" />
                <span className="text-xs uppercase tracking-widest font-normal text-[#8A6D12]">
                  Education & Focus
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-normal text-navy mb-4">
                Fourth-Year BSIT Student & Technical Builder
              </h3>

              <p className="text-navy/85 leading-relaxed text-sm sm:text-base font-normal">
                {personalInfo.bio}
              </p>

              <div className="mt-8 pt-6 border-t border-[#C9A227]/20 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-navy/60 uppercase tracking-wider block font-normal">
                    Discipline
                  </span>
                  <span className="text-sm font-normal text-navy mt-1 block">
                    Full-Stack & Systems
                  </span>
                </div>
                <div>
                  <span className="text-xs text-navy/60 uppercase tracking-wider block font-normal">
                    Based In
                  </span>
                  <span className="text-sm font-normal text-navy mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    Metro Manila, Philippines
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Three Architectural Pillars */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-1 gap-5"
          >
            {aboutPillars.map((pillar, idx) => {
              const IconComponent = iconMap[pillar.icon] || Layout;
              return (
                <motion.div
                  key={pillar.title}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-white/75 backdrop-blur-sm border border-[#C9A227]/30 shadow-card hover:shadow-card-hover hover:border-gold transition-all duration-300 flex flex-col sm:flex-row items-start gap-5 relative group overflow-hidden"
                >
                  {/* Top Gold Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

                  {/* Icon Box with Gold Gradient */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform mt-1">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-normal text-gold">
                        0{idx + 1}.
                      </span>
                      <h4 className="text-lg font-normal text-navy">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-sm text-navy/80 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pillar.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-normal px-2.5 py-0.5 rounded-md bg-[#0B1F3A]/5 border border-[#0B1F3A]/15 text-[#0B1F3A]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* 12-Column Editorial Statement Block 2 with Outer-Gutter Scroll-Parallax Polaroids */}
        {statement2 && (
          <div ref={statementRef2} className="relative py-2 sm:py-3 my-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center">
              {/* Outer Left Gutter (Columns 1-2): Desktop Parallax Frame 3 (closer to statement) */}
              <div className="hidden lg:flex lg:col-span-2 justify-end pr-1 xl:pr-2">
                {resolvedFrames[2] && (
                  <PolaroidFrame
                    frame={resolvedFrames[2]}
                    targetRef={statementRef2}
                    travel={[-25, 30]}
                    rotateDelta={2.0}
                    initialRotate={resolvedFrames[2].rotation || -2.8}
                    className="w-40 xl:w-44"
                  />
                )}
              </div>

              {/* Center Statement Text (Columns 3-10, max-width ~900px, 2-3 lines) */}
              <div className="col-span-1 lg:col-span-8 max-w-[900px] mx-auto text-center px-2 sm:px-4">
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-serif font-normal text-navy text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2rem] leading-[1.42] tracking-tight">
                    <StatementText text={statement2.text} />
                  </p>
                </motion.div>
              </div>

              {/* Outer Right Gutter (Columns 11-12): Desktop Parallax Frame 4 (if available) */}
              <div className="hidden lg:flex lg:col-span-2 justify-start pl-1 xl:pl-2">
                {resolvedFrames[3] && (
                  <PolaroidFrame
                    frame={resolvedFrames[3]}
                    targetRef={statementRef2}
                    travel={[30, -25]}
                    rotateDelta={2.0}
                    initialRotate={resolvedFrames[3].rotation || 3.0}
                    className="w-40 xl:w-44"
                  />
                )}
              </div>
            </div>

            {/* Below 1024px: Single column, smaller polaroid stacked cleanly below text, aligned right (reduced gap) */}
            {resolvedFrames[2] && (
              <div className="block lg:hidden mt-4 ml-auto mr-4 sm:mr-8 w-36 sm:w-40 relative z-10">
                <PolaroidFrame
                  frame={resolvedFrames[2]}
                  targetRef={statementRef2}
                  travel={[-10, 12]}
                  rotateDelta={1.2}
                  initialRotate={resolvedFrames[2].rotation || -2.8}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
