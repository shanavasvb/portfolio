"use client";
import React from 'react';

export const CarouselNav = ({ galleryImages, activeCard, setActiveCard }) => (
  <div className="flex justify-center gap-3 mt-12">
    {galleryImages.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setActiveCard(idx)}
        className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          idx === activeCard
            ? 'w-12 h-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 shadow-lg shadow-cyan-500/60'
            : 'w-3 h-3 bg-gray-600 hover:bg-gray-500 hover:scale-150'
        }`}
        aria-label={`Go to slide ${idx + 1}`}
      />
    ))}
  </div>
);