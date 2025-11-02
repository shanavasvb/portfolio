"use client";
import React, { useState, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import { SkillCard } from '../ui/SkillCard';
import { skills } from '../../data/skills';
import { toolIcons } from '../../data/tools';

export const SkillsSection = () => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = useCallback((key) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  }, []);

  return (
    <section id="skills" className="py-32 px-6 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Terminal className="text-cyan-400" size={32} />
          <h2 className="text-5xl font-bold gradient-text">Technical Arsenal</h2>
        </div>

        <p className="text-gray-400 text-lg mb-16 text-center max-w-3xl mx-auto">
          Technologies and tools I work with to build exceptional software solutions
        </p>

        {/* Tools/Technologies Icons Grid */}
        <div className="tools-row flex flex-wrap gap-4 items-center justify-center mb-20 px-4">
          {toolIcons.map((t, i) => (
            <a 
              key={i} 
              href={t.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              title={t.alt} 
              className="p-1 group"
              aria-label={`Visit ${t.alt} website`}
            >
              <img 
                src={t.src} 
                alt={t.alt}
                onError={(e) => {
                  if (!imageErrors[`tool-${i}`]) {
                    handleImageError(`tool-${i}`);
                    e.target.style.display = 'none';
                  }
                }}
                className="transition-transform duration-300"
              />
            </a>
          ))}
        </div>

        {/* Skill Cards Grid - 4 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 skill-grid max-w-6xl mx-auto">
          {skills.map((skill, i) => (
            <SkillCard 
              key={i}
              skill={skill}
              imageErrors={imageErrors}
              handleImageError={handleImageError}
              index={i}
            />
          ))}
        </div>

        {/* Additional Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Always learning and exploring new technologies • Proficiency levels based on professional experience
          </p>
        </div>
      </div>
    </section>
  );
};