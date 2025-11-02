"use client";
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constant';

export const Navigation = ({ darkMode, setDarkMode, scrollProgress, activeSection }) => {
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrollProgress > 5 
          ? (darkMode ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg' : 'bg-gray-50/95 backdrop-blur-xl shadow-lg') 
          : ''
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold gradient-text">
          Shanavas
        </div>
        
        <div className="flex gap-8 items-center">
          {NAV_ITEMS.map(item => (
            <a 
              key={item} 
              href={`#${item}`} 
              className={`nav-link text-sm font-medium transition-colors ${
                activeSection === item 
                  ? 'active text-cyan-400' 
                  : darkMode ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-600 hover:text-cyan-600'
              }`}
              aria-current={activeSection === item ? 'page' : undefined}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full hover:bg-cyan-500/20 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-indigo-400" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};