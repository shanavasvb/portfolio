"use client";
import React from 'react';
import { Code } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          <Code className="text-cyan-400" size={32} />
          <h2 className="text-5xl font-bold gradient-text">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};