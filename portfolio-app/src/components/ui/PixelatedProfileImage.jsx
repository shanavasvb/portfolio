"use client";
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { PixelatedCanvas } from './pixelated-canvas';

export const PixelatedProfileImage = ({ src }) => {
  const [imageError, setImageError] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Animate from pixelated to original over 10 seconds
  useEffect(() => {
    const duration = 10000; // 10 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1 over 10 seconds
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  // Calculate dynamic values based on animation progress
  const currentCellSize = 8 - (animationProgress * 6); // 8 → 2
  const currentDropout = 0.6 - (animationProgress * 0.55); // 0.6 → 0.05
  const currentJitterStrength = 6 - (animationProgress * 5.5); // 6 → 0.5
  const currentJitterSpeed = 3 - (animationProgress * 2.7); // 3 → 0.3
  const currentDistortionStrength = 4 - (animationProgress * 3.5); // 4 → 0.5
  const currentTintStrength = 0.3 - (animationProgress * 0.25); // 0.3 → 0.05
  
  return (
    <div className="relative w-full max-w-md pixelated-canvas-container">
      {!imageError ? (
        <>
          {/* Pixelated Canvas Layer */}
          <div 
            className="relative transition-opacity duration-1000"
            style={{ 
              opacity: 1 - (animationProgress * 0.3) // Stays mostly visible but fades slightly
            }}
          >
            <PixelatedCanvas
              src={src}
              width={400}
              height={500}
              cellSize={currentCellSize}
              dotScale={0.9 + (animationProgress * 0.08)} // 0.9 → 0.98
              shape="square"
              backgroundColor="#0A0F1E"
              dropoutStrength={currentDropout}
              interactive
              distortionStrength={currentDistortionStrength}
              distortionRadius={80 + (animationProgress * 20)} // 80 → 100
              distortionMode="swirl"
              followSpeed={0.15 - (animationProgress * 0.08)} // 0.15 → 0.07
              jitterStrength={currentJitterStrength}
              jitterSpeed={currentJitterSpeed}
              sampleAverage
              tintColor="#06B6D4"
              tintStrength={currentTintStrength}
              className="rounded-xl border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 hover:border-cyan-500/80 hover:shadow-cyan-500/40 transition-all duration-300"
              onError={() => setImageError(true)}
            />
          </div>
          
          {/* Original Image Layer - Fades In */}
          <img
            src={src}
            alt="Profile"
            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000"
            style={{
              opacity: animationProgress > 0.7 ? (animationProgress - 0.7) / 0.3 : 0, // Fades in during last 3 seconds
              pointerEvents: 'none'
            }}
            onError={() => setImageError(true)}
          />
          
          {/* Decorative Glow Effect */}
          <div 
            className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl -z-10 transition-opacity duration-1000" 
            style={{
              opacity: 0.5 + (animationProgress * 0.3) // Gets slightly brighter
            }}
          />
          
          {/* Progress Indicator */}
          {animationProgress < 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-cyan-400 font-semibold">
              Loading ... {Math.round(animationProgress * 100)}%
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900/50 to-purple-900/50 rounded-xl border-2 border-cyan-500/40">
          <Sparkles size={64} className="text-cyan-400 opacity-50 mb-4" />
          <p className="text-red-400 text-sm">Failed to load image</p>
        </div>
      )}
    </div>
  );
};