"use client";
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SlidingCard } from '../ui/SlidingCard';
import { CarouselNav } from '../ui/CarouselNav';
import { useGalleryAutoRotate } from '../../hooks/useGalleryAutoRotate';
import { galleryImages } from '../../data/gallery';

export const GallerySection = () => {
  const { activeCard, nextCard, prevCard, setActiveCard } = useGalleryAutoRotate(galleryImages.length);

  return (
    <section id="gallery" className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-4">Moments in Action</h2>
          <p className="text-gray-400 text-lg">Celebrating achievements and milestones</p>
        </div>

        <div className="relative h-96">
          {galleryImages.map((image, i) => (
            <SlidingCard key={i} image={image} isActive={i === activeCard} />
          ))}
          
          <button 
            onClick={prevCard}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-cyan-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          
          <button 
            onClick={nextCard}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-cyan-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>

        <CarouselNav galleryImages={galleryImages} activeCard={activeCard} setActiveCard={setActiveCard} />
      </div>
    </section>
  );
};