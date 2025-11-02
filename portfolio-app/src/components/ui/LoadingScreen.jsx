"use client";
import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

export const LoadingScreen = ({ onLoadingComplete }) => {
  const [lines, setLines] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines = [
    { text: '$ Initializing portfolio...', delay: 0 },
    { text: '✓ Loading React components', delay: 400 },
    { text: '✓ Fetching project data', delay: 800 },
    { text: '✓ Compiling skills matrix', delay: 1200 },
    { text: '✓ Loading achievements', delay: 1600 },
    { text: '✓ Rendering gallery', delay: 2000 },
    { text: '✓ Portfolio ready!', delay: 2400 },
    { text: '$ Welcome, visitor', delay: 2800 },
  ];

  useEffect(() => {
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
        
        if (index === terminalLines.length - 1) {
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete?.();
            }, 500);
          }, 500);
        }
      }, line.delay);
    });
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-2xl mx-4">
        {/* Terminal Window */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-cyan-500/40">
          {/* Terminal Header */}
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm font-mono">
              portfolio@shanavas:~
            </div>
            <Terminal size={16} className="text-cyan-400" />
          </div>

          {/* Terminal Content */}
          <div className="p-6 h-80 overflow-hidden font-mono text-sm">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  line.startsWith('$') ? 'text-cyan-400' :
                  line.startsWith('✓') ? 'text-emerald-400' :
                  'text-gray-300'
                } animate-fadeIn`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {line}
              </div>
            ))}
            <div className="flex items-center mt-2">
              <span className="text-cyan-400 mr-2">$</span>
              <span className="animate-pulse bg-cyan-400 w-2 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};