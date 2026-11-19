import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { personalInfo, isRealUrl, isRealEmail } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const hasRealEmail = isRealEmail(personalInfo.email);
  const hasRealGithub = isRealUrl(personalInfo.github);
  const hasRealLinkedin = isRealUrl(personalInfo.linkedin);

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.1 },
    }),
  };

  return (
    <section
      id="contact"
      data-nav-band="true"
      className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--band-border)] bg-[var(--band-bg)] text-[var(--band-text)] z-10 transition-colors duration-300"
    >
      {/* 1px Gold Gradient Hairline along top edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/60 dark:via-[#E8D48A]/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[var(--band-surface)] border border-[var(--band-border)] text-[var(--band-gold)] text-xs font-normal uppercase tracking-[0.2em] mb-3 shadow-sm">
            <span>05 // Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#E8D48A] tracking-tight">
            Get In Touch
          </h2>
          <p className="text-[var(--band-text)] text-sm sm:text-base max-w-xl mt-3 font-normal leading-relaxed">
            Feel free to reach out for projects, collaborations, or opportunities.
          </p>

          {/* Location badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--band-surface)] border border-[var(--band-border)] text-xs text-[var(--band-heading)] font-normal mt-5 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[var(--band-gold)]" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Three Contact Cards Grid: Email, GitHub, LinkedIn */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Email */}
          {hasRealEmail && (
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[var(--band-surface)] border border-[var(--band-border)] shadow-[0_4px_24px_-2px_rgba(0,0,0,0.35)] dark:shadow-[0_8px_24px_rgba(201,162,39,0.10)] hover:shadow-[0_12px_32px_-4px_rgba(201,162,39,0.25)] hover:border-gold flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
            >
              {/* Metallic Gold Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform mt-1">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-normal text-[var(--band-gold)] mb-1.5 group-hover:text-gold transition-colors">
                  Email
                </h3>
                <p className="text-xs text-[var(--band-text)] mb-4 leading-relaxed font-normal">
                  Direct inquiries, collaborations, or engineering discussions.
                </p>

                {/* Email address display & Copy Button */}
                <div className="p-3 rounded-lg bg-[var(--band-bg)] border border-[var(--band-border)] flex items-center justify-between text-xs font-normal text-[var(--band-heading)] mb-4">
                  <span className="truncate mr-2">{personalInfo.email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded hover:bg-gold/20 text-[var(--band-gold)] transition-colors flex items-center gap-1 text-[11px] font-normal flex-shrink-0"
                    title="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Compose Message Mailto Action */}
              <div className="pt-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-normal uppercase tracking-wider rounded-xl bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] hover:brightness-110 transition-all shadow-sm hover:shadow-gold-glow"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}

          {/* Card 2: GitHub */}
          {hasRealGithub && (
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[var(--band-surface)] border border-[var(--band-border)] shadow-[0_4px_24px_-2px_rgba(0,0,0,0.35)] dark:shadow-[0_8px_24px_rgba(201,162,39,0.10)] hover:shadow-[0_12px_32px_-4px_rgba(201,162,39,0.25)] hover:border-gold flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
            >
              {/* Metallic Gold Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform mt-1">
                  <GitHubIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-normal text-[var(--band-gold)] mb-1.5 group-hover:text-gold transition-colors">
                  GitHub
                </h3>
                <p className="text-xs text-[var(--band-text)] mb-4 leading-relaxed font-normal">
                  Open-source repositories, personal tools, and technical experiments.
                </p>

                {/* Handle display */}
                <div className="p-3 rounded-lg bg-[var(--band-bg)] border border-[var(--band-border)] text-xs font-normal text-[var(--band-heading)] mb-4">
                  <span className="text-[var(--band-gold)]">@Ty-john</span>
                </div>
              </div>

              {/* External Profile Link */}
              <div className="pt-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-normal uppercase tracking-wider rounded-xl bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] hover:brightness-110 transition-all shadow-sm hover:shadow-gold-glow"
                >
                  <span>View GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}

          {/* Card 3: LinkedIn */}
          {hasRealLinkedin && (
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[var(--band-surface)] border border-[var(--band-border)] shadow-[0_4px_24px_-2px_rgba(0,0,0,0.35)] dark:shadow-[0_8px_24px_rgba(201,162,39,0.10)] hover:shadow-[0_12px_32px_-4px_rgba(201,162,39,0.25)] hover:border-gold flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
            >
              {/* Metallic Gold Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform mt-1">
                  <LinkedInIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-normal text-[var(--band-gold)] mb-1.5 group-hover:text-gold transition-colors">
                  LinkedIn
                </h3>
                <p className="text-xs text-[var(--band-text)] mb-4 leading-relaxed font-normal">
                  Professional network, academic background, and technical discussions.
                </p>

                {/* Profile display */}
                <div className="p-3 rounded-lg bg-[var(--band-bg)] border border-[var(--band-border)] text-xs font-normal text-[var(--band-heading)] mb-4 truncate">
                  <span>Tyrone John Zapata</span>
                </div>
              </div>

              {/* External Profile Link */}
              <div className="pt-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-normal uppercase tracking-wider rounded-xl bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] hover:brightness-110 transition-all shadow-sm hover:shadow-gold-glow"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
