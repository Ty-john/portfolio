import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#C9A227]/25 dark:border-[var(--border)] bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-navy text-[#E8D48A] border border-gold/40 dark:bg-[#112A4D] dark:border-[var(--border)] dark:text-[#E8D48A] text-xs font-normal uppercase tracking-[0.2em] mb-3 shadow-sm">
              <span>02 // Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--heading)] tracking-tight">
              Selected Projects
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-navy via-[#1E3A5F] to-transparent dark:from-[var(--gold-text)] dark:via-gold/50 rounded-full mt-3" />
          </div>
          <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-md font-normal">
            Team projects in transit, e-commerce, and web development.
          </p>
        </div>

        {/* Responsive Grid of Project Cards: 1 col (<768px), 2 cols (768-1279px), 3 cols (>=1280px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
