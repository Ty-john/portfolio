import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ExternalLink, FileText, CheckCircle2, Calendar } from 'lucide-react';
import { certificates, isRealText, isRealUrl } from '../data/portfolioData';

// Image component with fixed aspect ratio, lazy loading, and neutral fallback on error/missing
function CertificateThumbnail({ image, title, issuer }) {
  const [hasError, setHasError] = useState(false);
  const isValidImage = isRealText(image);

  if (!isValidImage || hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#FBF8F1] via-[#F4EBCF]/60 to-[#FFFFFF] flex flex-col items-center justify-center gap-2 p-4 text-center border-b border-[#C9A227]/20">
        <div className="w-10 h-10 rounded-xl bg-white border border-gold/40 flex items-center justify-center text-gold shadow-sm">
          <Award className="w-5 h-5 text-gold-deep" />
        </div>
        <span className="text-xs font-normal text-navy/70">
          {issuer ? `${issuer} Certificate` : 'Certificate Preview'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${title} statement of accomplishment from ${issuer || 'DataCamp'}`}
      loading="lazy"
      onError={() => setHasError(true)}
      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
    />
  );
}

export default function Certificates() {
  const shouldReduceMotion = useReducedMotion();

  // Hide the entire section if the certificates array is empty
  if (!certificates || certificates.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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

  return (
    <section id="certificates" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#C9A227]/25 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-white/90 border border-gold/40 text-[#8A6D12] text-xs font-normal uppercase tracking-[0.2em] mb-3 shadow-sm">
            <span>04 // Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-navy tracking-tight">
            Certificates & Accomplishments
          </h2>
          <p className="text-navy/80 text-sm sm:text-base max-w-2xl mt-3 font-normal">
            Verified course completions and technical statements of accomplishment.
          </p>
        </div>

        {/* Certificates Grid: 1 col (<768px), 2 cols (768-1279px), 3 cols (>=1280px) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch"
        >
          {certificates.map((cert) => {
            const hasVerifyUrl = isRealUrl(cert.verifyUrl);
            const hasPdf = isRealText(cert.pdf);
            const hasDate = isRealText(cert.date);
            const hasType = isRealText(cert.type);
            const hasIssuer = isRealText(cert.issuer);

            // Construct "type · issuer" string if values exist
            const typeIssuer = [hasType ? cert.type : null, hasIssuer ? cert.issuer : null]
              .filter(Boolean)
              .join(' · ');

            return (
              <motion.div
                key={cert.id || cert.title}
                variants={itemVariants}
                className="rounded-2xl bg-white/75 backdrop-blur-sm border border-[#C9A227]/30 shadow-card hover:shadow-card-hover hover:border-gold flex flex-col overflow-hidden group h-full justify-between transition-all duration-300"
              >
                <div>
                  {/* Metallic Gold Top Accent Stripe */}
                  <div className="w-full h-1.5 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

                  {/* Fixed Aspect Ratio Thumbnail matching certificate dimensions (16:9) */}
                  <div className="relative w-full aspect-[16/9] bg-[#FBF8F1] overflow-hidden border-b border-[#C9A227]/20">
                    <CertificateThumbnail
                      image={cert.image}
                      title={cert.title}
                      issuer={cert.issuer}
                    />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-3">
                    {/* Type · Issuer Line */}
                    {typeIssuer && (
                      <div className="flex items-center gap-1.5 text-xs font-normal text-[#8A6D12]">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-gold" />
                        <span className="truncate">{typeIssuer}</span>
                      </div>
                    )}

                    {/* Certificate Title */}
                    <h3 className="text-lg font-normal text-navy group-hover:text-gold-deep transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Date (Only shown when not empty and not bracketed) */}
                    {hasDate && (
                      <div className="flex items-center gap-1.5 text-xs text-navy/70 font-normal pt-1">
                        <Calendar className="w-3.5 h-3.5 text-navy/50" />
                        <span>{cert.date}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#C9A227]/20 flex flex-wrap gap-2.5">
                    {hasVerifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-normal uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] hover:brightness-105 transition-all shadow-sm hover:shadow-gold-glow"
                      >
                        <span>Verify on {cert.issuer || 'DataCamp'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {hasPdf && (
                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-normal uppercase tracking-wider rounded-lg border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

