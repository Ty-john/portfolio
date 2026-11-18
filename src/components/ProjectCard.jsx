import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Image as ImageIcon, Lock, Users } from 'lucide-react';
import { isRealUrl, isRealText } from '../data/portfolioData';

// Neutral screenshot slot supporting an optional image path or fallback placeholder
function ProjectScreenshot({ image, title }) {
  if (image && typeof image === 'string' && image.trim() !== '') {
    return (
      <img
        src={image}
        alt={`${title} screenshot`}
        className="w-full h-full object-cover object-top"
        loading="lazy"
      />
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] via-[#12294A] to-[#071527] flex flex-col items-center justify-center gap-2.5 p-4 text-center">
      <div className="w-9 h-9 rounded-xl bg-[#071527] border border-gold/40 flex items-center justify-center text-gold shadow-sm">
        <ImageIcon className="w-4 h-4 text-gold-light" />
      </div>
      <span className="text-xs text-[#FBF8F1]/80 tracking-wide font-normal">
        Screenshot coming soon
      </span>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  if (project.hidden) {
    return null;
  }

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const hasRealLink = isRealUrl(project.link);
  const hasRealLiveLink = isRealUrl(project.liveLink);
  const hasTeamNote = isRealText(project.teamNote);
  const hasContribution = isRealText(project.contribution);
  const hasImage = isRealText(project.image);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative rounded-2xl bg-white/75 backdrop-blur-sm border border-[#C9A227]/30 shadow-card hover:shadow-card-hover hover:border-gold flex flex-col overflow-hidden group h-full transition-all duration-300"
    >
      {/* Metallic Gold Top Accent Stripe */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

      {/* Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(201, 162, 39, ${glarePos.opacity}), transparent 60%)`,
        }}
      />

      {/* Top Image / Screenshot Slot - Only rendered if a real image is provided */}
      {hasImage && (
        <div className="relative w-full h-48 sm:h-52 bg-[#0B1F3A] border-b border-[#C9A227]/25 overflow-hidden">
          {/* Mock Window Header */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#071527]/95 px-3 flex items-center justify-between border-b border-[#C9A227]/20 z-10">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400/80" />
              <span className="w-2 h-2 rounded-full bg-amber-400/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] text-[#E8D48A]/90 truncate max-w-[160px] font-normal">
              {project.id}.preview
            </span>
            <span className="text-[9px] text-[#FBF8F1]/60 font-normal uppercase tracking-wider">PREVIEW</span>
          </div>

          {/* Screenshot */}
          <div className="pt-6 w-full h-full">
            <ProjectScreenshot image={project.image} title={project.title} />
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header Row: Category / Navy Team Badge & Large Gold Index */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {hasTeamNote ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full bg-navy text-white font-normal shadow-sm">
                <Users className="w-3 h-3 text-gold-light" />
                <span>{project.teamNote}</span>
              </span>
            ) : project.category ? (
              <span className="text-xs uppercase tracking-wider text-[#8A6D12] font-normal">
                {project.category}
              </span>
            ) : (
              <span />
            )}
            <span className="text-xs font-normal text-gold">
              0{index + 1}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg sm:text-xl font-normal text-navy group-hover:text-gold-deep transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-navy/85 mt-2.5 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Optional Contribution Line (Hidden when empty or bracketed) */}
          {hasContribution && (
            <div className="mt-3.5 p-3 rounded-lg bg-[#FBF8F1] border border-[#C9A227]/25 text-xs text-navy leading-relaxed font-normal">
              <span className="text-[#8A6D12] italic block mb-0.5 font-normal">My contribution:</span>
              <span>{project.contribution}</span>
            </div>
          )}
        </div>

        <div>
          {/* Tech Stack Chips (Navy Chips) */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#C9A227]/20">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-normal px-2.5 py-1 rounded-md bg-[#0B1F3A]/5 border border-[#0B1F3A]/15 text-[#0B1F3A] group-hover:border-gold/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Link Footer: Primary Gold fill with Navy text, Secondary Navy outline */}
          {project.isPrivate ? (
            <div className="mt-5 pt-3 flex items-center gap-1.5 text-xs text-navy/60 font-normal">
              <Lock className="w-3.5 h-3.5 text-navy/60" />
              <span>Private repository</span>
            </div>
          ) : (hasRealLink || hasRealLiveLink) ? (
            <div className="mt-5 pt-3 flex flex-wrap gap-2.5">
              {hasRealLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-normal uppercase tracking-wider rounded-lg border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all duration-200"
                >
                  <span>Code</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {hasRealLiveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-normal uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] hover:brightness-105 transition-all duration-200 shadow-sm hover:shadow-gold-glow"
                >
                  <span>Live site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ) : (
            <div className="mt-5 pt-3 flex items-center justify-between text-xs text-navy/60 font-normal">
              <span className="italic">Repository / Demo upon request</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
