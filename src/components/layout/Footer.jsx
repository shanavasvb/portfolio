"use client";
import React from 'react';
import { Zap, Rocket } from 'lucide-react';
import { SocialLinks } from '../shared/SocialLinks';
import { NAV_ITEMS } from '../../utils/constant';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t-2 border-cyan-500/20 py-16 px-6 text-center">
      <div className="max-w-7xl mx-auto">
        {/* Social Links */}
        <SocialLinks className="justify-center mb-12" />
        
        {/* Copyright and Credits */}
        <div className="space-y-4 border-t border-gray-700 pt-8">
          <p className="text-gray-400 font-medium">
            © 2025 Shanavas V Basheer. All rights reserved.
          </p>
          
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Zap size={16} className="text-cyan-400" /> 
            Build. Break. Better. 
            <Rocket size={16} className="text-purple-400" />
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors uppercase font-semibold tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Tech Stack Credit */}
        <div className="mt-8 text-xs text-gray-600 space-y-1">
          <p>Built with React • Tailwind CSS • Lucide Icons</p>
          <p>Optimized for Performance & Accessibility</p>
        </div>
      </div>
    </footer>
  );
};