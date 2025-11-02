"use client";
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ANIMATION_DELAY_INCREMENT } from '../../utils/constant';

export const ProjectCard = ({ project, index }) => {
  return (
    <div
      className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-cyan-500/20 rounded-2xl p-8 hover-lift group hover:border-cyan-500/70 transition-all ${
        index % 2 === 0 ? 'md:mt-8' : ''
      }`}
      style={{
        animation: `slideUp 0.6s ease-out forwards`,
        animationDelay: `${index * ANIMATION_DELAY_INCREMENT}s`,
        opacity: 0,
        contain: 'layout style paint'
      }}
    >
      <h3 className="text-2xl font-bold mb-4 text-cyan-400 group-hover:text-purple-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, j) => (
          <span 
            key={j} 
            className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm hover:bg-cyan-500/30 transition-colors font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 italic mb-4">{project.features}</p>

      <div className="flex gap-3 items-center">
        <a 
          href={project.repo} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-purple-500 font-medium transition-colors group"
        >
          <Github size={18} /> View Code
        </a>
        {project.live && (
          <a 
            href={project.live} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-purple-500 hover:text-pink-500 font-medium transition-colors"
          >
            <ExternalLink size={18} /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
};