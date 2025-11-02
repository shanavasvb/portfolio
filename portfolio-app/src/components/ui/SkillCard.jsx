"use client";
import React, { useState } from 'react';

export const SkillCard = ({ skill, imageErrors, handleImageError, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-cyan-500/20 hover:border-cyan-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 cursor-pointer"
      style={{
        animation: `slideUp 0.6s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        contain: 'layout style paint'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Content */}
      <div className="relative z-10">
        {/* Icon Container with Advanced Animation */}
        <div
          className="mb-6 flex justify-center"
          style={{
            transform: isHovered ? 'scale(1.15) translateY(-8px)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            willChange: 'transform'
          }}
        >
          {!imageErrors[`skill-${index}`] ? (
            <img
              src={skill.iconSrc}
              alt={skill.name}
              className="w-16 h-16 object-contain drop-shadow-lg filter hover:brightness-125 transition-all"
              loading="lazy"
              onError={() => handleImageError(`skill-${index}`)}
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center text-4xl bg-cyan-500/10 rounded-lg">
              {skill.fallback}
            </div>
          )}
        </div>

        {/* Skill Name */}
        <h3 className="text-xl font-bold text-center mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
          {skill.name}
        </h3>

        {/* Proficiency Percentage */}
        <div className="text-center mb-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {skill.level}%
          </span>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden mb-3 border border-gray-600/30">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
            style={{
              width: isHovered ? `${skill.level}%` : '0%',
              boxShadow: isHovered ? `0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)` : 'none',
              willChange: 'width'
            }}
          />
        </div>

        {/* Proficiency Badge */}
        <p className={`text-xs text-center font-semibold transition-all duration-300 ${
          skill.level >= 90 ? 'text-emerald-400' :
          skill.level >= 75 ? 'text-cyan-400' :
          'text-purple-400'
        }`}>
          {skill.level >= 90 ? '🔥 Expert' : skill.level >= 75 ? '⭐ Proficient' : '📚 Learning'}
        </p>
      </div>

      {/* Border Glow Effect on Hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
        style={{
          borderRadius: '1rem',
          background: isHovered
            ? `linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))`
            : 'none',
          boxShadow: isHovered ? 'inset 0 0 30px rgba(6, 182, 212, 0.1)' : 'none'
        }}
      />
    </div>
  );
};