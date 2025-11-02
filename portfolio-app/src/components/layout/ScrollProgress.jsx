"use client";
import React from 'react';

export const ScrollProgress = ({ progress }) => {
  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-gray-800/50 z-50" 
      role="progressbar" 
      aria-valuenow={Math.round(progress)} 
      aria-valuemin="0" 
      aria-valuemax="100"
    >
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 shadow-lg shadow-cyan-500/50" 
        style={{ width: `${progress}%`, willChange: 'width' }} 
      />
    </div>
  );
};