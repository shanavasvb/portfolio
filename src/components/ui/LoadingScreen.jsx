"use client";
import React, { useEffect, useState } from 'react';
import { Code, Terminal, Sparkles } from 'lucide-react';

export const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-black transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated Icon Container */}
        <div className="relative">
          {/* Rotating Border Ring */}
          <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-transparent border-t-cyan-500 border-r-purple-500 border-b-pink-500 animate-spin" />
          
          {/* Inner Glow Ring */}
          <div className="absolute inset-2 w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />
          
          {/* Icon Container */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="relative">
              {/* Animated Icons */}
              <Code 
                size={48} 
                className="text-cyan-400 absolute inset-0 transition-all duration-700"
                style={{
                  opacity: progress < 33 ? 1 : 0,
                  transform: progress < 33 ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(180deg)'
                }}
              />
              <Terminal 
                size={48} 
                className="text-purple-400 absolute inset-0 transition-all duration-700"
                style={{
                  opacity: progress >= 33 && progress < 66 ? 1 : 0,
                  transform: progress >= 33 && progress < 66 ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(180deg)'
                }}
              />
              <Sparkles 
                size={48} 
                className="text-pink-400 absolute inset-0 transition-all duration-700"
                style={{
                  opacity: progress >= 66 ? 1 : 0,
                  transform: progress >= 66 ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(180deg)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Name/Brand */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Loading Myself
          </h1>
          <p className="text-gray-400 text-sm font-mono">
            {progress < 33 ? 'Initializing portfolio...' : 
             progress < 66 ? 'Loading projects...' : 
             progress < 100 ? 'Almost ready...' : 'Complete!'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-md">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          
          {/* Progress Percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500 font-mono">Loading...</span>
            <span className="text-xs text-cyan-400 font-mono font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Tech Stack Indicators */}
        <div className="flex gap-2 text-xs text-gray-500 font-mono">
          <span className={`transition-colors duration-300 ${progress > 20 ? 'text-cyan-400' : ''}`}>React</span>
          <span>•</span>
          <span className={`transition-colors duration-300 ${progress > 40 ? 'text-purple-400' : ''}`}>Next.js</span>
          <span>•</span>
          <span className={`transition-colors duration-300 ${progress > 60 ? 'text-pink-400' : ''}`}>Tailwind</span>
          <span>•</span>
          <span className={`transition-colors duration-300 ${progress > 80 ? 'text-emerald-400' : ''}`}>TypeScript</span>
        </div>
      </div>

      {/* Particles Effect (Optional) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};