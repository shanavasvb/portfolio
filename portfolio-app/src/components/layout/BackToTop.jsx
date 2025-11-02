"use client";
import React from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = ({ show, darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 p-4 rounded-full ${
        darkMode 
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600' 
          : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700'
      } text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2`}
      aria-label="Back to top"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <ArrowUp size={24} />
    </button>
  );
};