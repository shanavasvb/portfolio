"use client";
import React, { useState } from 'react';
import { Award, Play, Sparkles } from 'lucide-react';

export const SlidingCard = React.memo(({ image, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`absolute inset-0 h-96 w-full max-w-2xl mx-auto overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'opacity 700ms ease-in-out, z-index 0ms linear'
      }}
    >
      {/* Image Container with Scale Effect */}
      <div
        className="absolute inset-0 overflow-hidden bg-gray-800"
        style={{
          transform: isHovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {!imgError ? (
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900/50 to-purple-900/50">
            <Award size={64} className="text-cyan-400 opacity-50" />
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        style={{
          opacity: isHovered ? 1 : 0.75,
          transition: 'opacity 0.4s ease-out'
        }}
      />

      {/* Border Glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: isHovered ? '2px solid rgba(6, 182, 212, 0.8)' : '2px solid rgba(6, 182, 212, 0.25)',
          boxShadow: isHovered 
            ? '0 0 50px rgba(6, 182, 212, 0.5), inset 0 0 50px rgba(6, 182, 212, 0.1)' 
            : '0 0 20px rgba(6, 182, 212, 0.1)',
          transition: 'all 0.5s ease-out'
        }}
      />

      {/* Content Area */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-8"
        style={{
          transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
          opacity: isHovered ? 1 : 0.85,
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Award Badge */}
        <div
          style={{
            transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.85)',
            opacity: isHovered ? 1 : 0.6,
            transition: 'all 0.6s ease-out'
          }}
          className="mb-6"
        >
          <span className="px-5 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 backdrop-blur-lg rounded-full text-xs font-bold text-white inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles size={16} />
            {image.award}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg leading-tight">
          {image.caption}
        </h3>

        {/* Description */}
        <p
          className="text-gray-100 text-lg mb-5 max-w-lg drop-shadow-md leading-relaxed"
          style={{
            transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.6s ease-out 0.1s'
          }}
        >
          {image.description}
        </p>

        {/* Accent Line */}
        <div
          className="h-1.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full shadow-lg"
          style={{
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
          }}
        />
      </div>

      {/* Play Button Indicator */}
      <div
        className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl"
        style={{
          transform: isHovered ? 'scale(1.15) rotate(0deg)' : 'scale(0.8) rotate(-90deg)',
          opacity: isHovered ? 1 : 0.5,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <Play size={24} className="text-white fill-white ml-1" />
      </div>
    </div>
  );
});

SlidingCard.displayName = 'SlidingCard';