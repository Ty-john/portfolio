import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Database, Workflow, Video, CheckCircle } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

const iconMap = {
  Code: Code2,
  Server: Database,
  Workflow: Workflow,
  Video: Video,
};

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#C9A227]/25 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-gold/15 border border-gold/40 text-[#8A6D12] text-xs font-normal uppercase tracking-[0.2em] mb-3">
            <span>03 // Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-navy tracking-tight">
            Tools I've Used
          </h2>
          <p className="text-navy/80 text-sm sm:text-base max-w-2xl mt-3 font-normal">
            Tools I've used in coursework and team projects, mostly with AI assistance.
          </p>
        </div>

        {/* 4 Categorical Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Code2;
            return (
              <motion.div
                key={cat.title}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#C9A227]/30 shadow-card hover:shadow-card-hover hover:border-gold flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
              >
                {/* Metallic Gold Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8D48A] via-[#C9A227] to-[#9A7B1C]" />

                <div>
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#E8D48A] via-[#C9A227] to-[#9A7B1C] text-[#0B1F3A] shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-normal text-gold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-normal text-navy mb-4">
                    {cat.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-normal px-2.5 py-1 rounded-md bg-[#0B1F3A]/5 border border-[#0B1F3A]/15 text-[#0B1F3A] group-hover:border-gold/40 group-hover:text-navy transition-all"
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
    </section>
  );
}

