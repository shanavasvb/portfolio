"use client";
import React from 'react';
import { prefersReducedMotion } from '../../utils/helper';

export const AnimatedBackground = ({ mousePosition }) => {
  const noMotion = prefersReducedMotion();

  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div 
        className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl floating" 
        style={{ 
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          willChange: 'transform',
          animation: !noMotion ? 'meshMove 20s ease-in-out infinite' : 'none'
        }} 
      />
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl floating" 
        style={{ 
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          willChange: 'transform',
          animationDelay: '2s'
        }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl floating" 
        style={{ 
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          willChange: 'transform',
          animationDelay: '4s'
        }} 
      />
    </div>
  );
};