"use client";
import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { ANIMATION_DELAY_INCREMENT } from '../../utils/constant';
import { prefersReducedMotion } from '../../utils/helper';

export const AchievementCard = ({ achievement, index }) => {
  return (
    <div 
      className="relative pl-24 pb-16 last:pb-0" 
      style={{
        animation: `slideUp 0.6s ease-out forwards`,
        animationDelay: `${index * ANIMATION_DELAY_INCREMENT}s`,
        opacity: 0
      }}
    >
      <div 
        className="absolute left-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg" 
        style={{ 
          animation: !prefersReducedMotion() ? 'glow 2s ease-in-out infinite' : 'none', 
          animationDelay: `${index * 0.3}s` 
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full pulsing" />
      </div>

      <div className="bg-gray-800/80 border-2 border-cyan-500/20 rounded-2xl p-6 hover-lift group hover:border-cyan-500/70 transition-all">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-cyan-400 font-semibold text-sm mb-1 flex items-center gap-2">
              <Calendar size={14} />
              {achievement.year}
            </div>
            <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">
              {achievement.title}
            </h3>
          </div>
          <ChevronRight className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all" />
        </div>
        <div className="text-purple-400 mb-3 font-medium text-lg">{achievement.org}</div>
        <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
      </div>
    </div>
  );
};