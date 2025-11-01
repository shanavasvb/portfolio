"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Award,
  Code,
  Terminal,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
  Play,
  Sparkles,
  Zap,
  Rocket,
  ArrowUp,
  Phone,
  MapPin,
  Calendar,
  ChevronLeft,
  Copy,
  Check
} from 'lucide-react';
import { PixelatedCanvas } from "./ui/pixelated-canvas";
// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const ANIMATION_DELAY_INCREMENT = 0.15;
const GALLERY_AUTO_ROTATE_INTERVAL = 5000;
const SCROLL_THRESHOLD = 150;
const MOUSE_PARALLAX_INTENSITY = 15;
const THROTTLE_DELAY = 16; // ~60fps

// Modern Color Palette - Cyan, Purple, Pink
const COLOR_THEME = {
  bg: {
    primary: '#0A0F1E',      // Deep space blue
    secondary: '#141B2D',    // Rich navy
    card: '#1A2332',         // Card background
    hover: '#202A3F'         // Hover state
  },
  accent: {
    cyan: '#06B6D4',         // Vibrant cyan
    purple: '#8B5CF6',       // Rich purple
    pink: '#EC4899',         // Hot pink
    emerald: '#10B981'       // Success green
  },
  text: {
    primary: '#F1F5F9',      // Off-white
    secondary: '#94A3B8',    // Muted gray
    muted: '#64748B'         // Very muted
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Throttle function to limit function calls
 */
const throttle = (func, delay) => {
  let timeoutId;
  let lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Date.now() - lastRan >= delay) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
};

/**
 * Custom hook for magnetic button effect
 */
const useMagneticEffect = () => {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    
    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return buttonRef;
};

/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ============================================================================
// INTERACTIVE TERMINAL COMPONENT
// ============================================================================

const InteractiveTerminal = ({ onNavigate, handleResumeView, handleResumeDownload }) => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState(['Type "help" to see available commands']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: {
      description: 'Show all available commands',
      execute: () => [
        '📋 Available Commands:',
        '─────────────────────────────────────',
        'whoami            - Display your information',
        'skills            - Navigate to skills section',
        'projects          - Navigate to projects section',
        'achievements      - Navigate to achievements section',
        'gallery           - Navigate to gallery section',
        'contact           - Navigate to contact section',
        'resume view       - Open resume in new tab',
        'resume dl         - Download resume',
        'clear             - Clear terminal screen',
        '─────────────────────────────────────',
        '💡 Tip: Use arrow keys to navigate command history'
      ]
    },
    whoami: {
      description: 'Display your information',
      execute: () => [
        '👤 Shanavas V Basheer',
        '─────────────────────────────────────',
        '📍 Location: Kochi, Kerala, India',
        '🎓 Education: M.Voc in Software Application Development (CUSAT)',
        '💼 Role: Full-Stack Developer | Competitive Coder',
        '📧 Email: shanavasvbasheer@gmail.com',
        '📱 Phone: +91 85473 63158',
        '💻 GitHub: github.com/shanavasvbasheer',
        '🔗 LinkedIn: linkedin.com/in/shanavasvbasheer',
        '─────────────────────────────────────',
        '✨ Status: Available for opportunities'
      ]
    },
    skills: {
      description: 'Navigate to skills section',
      execute: () => {
        onNavigate('skills');
        return ['✅ Navigating to Skills section...'];
      }
    },
    projects: {
      description: 'Navigate to projects section',
      execute: () => {
        onNavigate('projects');
        return ['✅ Navigating to Projects section...'];
      }
    },
    achievements: {
      description: 'Navigate to achievements section',
      execute: () => {
        onNavigate('achievements');
        return ['✅ Navigating to Achievements section...'];
      }
    },
    gallery: {
      description: 'Navigate to gallery section',
      execute: () => {
        onNavigate('gallery');
        return ['✅ Navigating to Gallery section...'];
      }
    },
    contact: {
      description: 'Navigate to contact section',
      execute: () => {
        onNavigate('contact');
        return ['✅ Navigating to Contact section...'];
      }
    },
    'resume view': {
      description: 'Open resume in new tab',
      execute: () => {
        handleResumeView();
        return ['✅ Opening resume in new tab...'];
      }
    },
    'resume dl': {
      description: 'Download resume',
      execute: () => {
        handleResumeDownload();
        return ['✅ Downloading resume...'];
      }
    },
    clear: {
      description: 'Clear terminal screen',
      execute: () => null
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') {
      return;
    }

    setCommandHistory([...commandHistory, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    const command = commands[trimmedCmd];
    
    let output;
    if (command) {
      output = command.execute();
    } else {
      output = [`❌ Command not found: "${trimmedCmd}". Type "help" for available commands.`];
    }

    if (output) {
      setHistory([...history, `$ ${cmd}`, ...output, '']);
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/40 hover:border-cyan-500/80 transition-all duration-300 hover:shadow-cyan-500/30 hover:shadow-2xl bg-gray-900 group">
      {/* Terminal Header with Traffic Lights */}
      <div className="bg-gray-800 px-4 py-3 flex gap-3 items-center border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" title="Close" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors" title="Minimize" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer transition-colors" title="Maximize" />
        </div>
        <div className="ml-4 text-gray-400 text-sm font-mono flex-1">Portfolio Terminal</div>
        <Terminal size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
      </div>

      {/* Terminal Content Area */}
      <div
        ref={terminalRef}
        className="bg-gray-900 p-6 font-mono text-sm h-64 overflow-y-auto scrollbar-hide text-gray-100"
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`transition-colors duration-300 ${
              line.startsWith('$') ? 'text-cyan-400 font-semibold' :
              line.startsWith('✅') ? 'text-emerald-400' :
              line.startsWith('❌') ? 'text-red-400' :
              line.startsWith('📋') || line.startsWith('👤') || line.startsWith('─') ? 'text-cyan-300' :
              'text-gray-100'
            }`}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Input Line */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 flex items-center gap-2">
        <span className="text-cyan-400 font-mono font-semibold">svb@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          className="flex-1 bg-transparent outline-none text-white font-mono placeholder-gray-600 focus:placeholder-gray-500 transition-colors caret-cyan-400"
          autoFocus
        />
      </div>
    </div>
  );
};

// ============================================================================
// PIXELATED PROFILE IMAGE COMPONENT
// ============================================================================

const PixelatedProfileImage = ({ src }) => {
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
          
          {/* Progress Indicator (Optional - Remove if you don't want it) */}
          {animationProgress < 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-cyan-400 font-semibold">
              Revealing... {Math.round(animationProgress * 100)}%
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

// ============================================================================
// ENHANCED SKILL CARD COMPONENT
// ============================================================================

const SkillCard = ({ skill, imageErrors, handleImageError, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-cyan-500/20 hover:border-cyan-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 cursor-pointer"
      style={{
        animation: `slideUp 0.6s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        contain: 'layout style paint'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Card Content */}
      <div className="relative z-10">
        {/* Icon Container with Advanced Animation */}
        <div
          className="mb-6 flex justify-center"
          style={{
            transform: isHovered ? 'scale(1.15) translateY(-8px)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            willChange: 'transform'
          }}
        >
          {!imageErrors[`skill-${index}`] ? (
            <img
              src={skill.iconSrc}
              alt={skill.name}
              className="w-16 h-16 object-contain drop-shadow-lg filter hover:brightness-125 transition-all"
              loading="lazy"
              onError={() => handleImageError(`skill-${index}`)}
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center text-4xl bg-cyan-500/10 rounded-lg">
              {skill.fallback}
            </div>
          )}
        </div>

        {/* Skill Name */}
        <h3
          className="text-xl font-bold text-center mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300"
        >
          {skill.name}
        </h3>

        {/* Proficiency Percentage */}
        <div className="text-center mb-4">
          <span
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {skill.level}%
          </span>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden mb-3 border border-gray-600/30">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
            style={{
              width: isHovered ? `${skill.level}%` : '0%',
              boxShadow: isHovered ? `0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)` : 'none',
              willChange: 'width'
            }}
          />
        </div>

        {/* Proficiency Badge */}
        <p
          className={`text-xs text-center font-semibold transition-all duration-300 ${
            skill.level >= 90 ? 'text-emerald-400' :
            skill.level >= 75 ? 'text-cyan-400' :
            'text-purple-400'
          }`}
        >
          {skill.level >= 90 ? '🔥 Expert' : skill.level >= 75 ? '⭐ Proficient' : '📚 Learning'}
        </p>
      </div>

      {/* Border Glow Effect on Hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
        style={{
          borderRadius: '1rem',
          background: isHovered
            ? `linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))`
            : 'none',
          boxShadow: isHovered ? 'inset 0 0 30px rgba(6, 182, 212, 0.1)' : 'none'
        }}
      />
    </div>
  );
};

// ============================================================================
// SLIDING GALLERY CARD COMPONENT
// ============================================================================

const SlidingCard = React.memo(({ image, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`absolute inset-0 h-96 w-full max-w-2xl mx-auto overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'opacity 700ms ease-in-out, z-index 0ms linear'
      }}
    >
      {/* Image Container with Scale Effect */}
      <div
        className="absolute inset-0 overflow-hidden bg-gray-800"
        style={{
          transform: isHovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {!imgError ? (
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900/50 to-purple-900/50">
            <Award size={64} className="text-cyan-400 opacity-50" />
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        style={{
          opacity: isHovered ? 1 : 0.75,
          transition: 'opacity 0.4s ease-out'
        }}
      />

      {/* Border Glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: isHovered ? '2px solid rgba(6, 182, 212, 0.8)' : '2px solid rgba(6, 182, 212, 0.25)',
          boxShadow: isHovered 
            ? '0 0 50px rgba(6, 182, 212, 0.5), inset 0 0 50px rgba(6, 182, 212, 0.1)' 
            : '0 0 20px rgba(6, 182, 212, 0.1)',
          transition: 'all 0.5s ease-out'
        }}
      />

      {/* Content Area */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-8"
        style={{
          transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
          opacity: isHovered ? 1 : 0.85,
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Award Badge */}
        <div
          style={{
            transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.85)',
            opacity: isHovered ? 1 : 0.6,
            transition: 'all 0.6s ease-out'
          }}
          className="mb-6"
        >
          <span className="px-5 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 backdrop-blur-lg rounded-full text-xs font-bold text-white inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles size={16} />
            {image.award}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg leading-tight">
          {image.caption}
        </h3>

        {/* Description */}
        <p
          className="text-gray-100 text-lg mb-5 max-w-lg drop-shadow-md leading-relaxed"
          style={{
            transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.6s ease-out 0.1s'
          }}
        >
          {image.description}
        </p>

        {/* Accent Line */}
        <div
          className="h-1.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full shadow-lg"
          style={{
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
          }}
        />
      </div>

      {/* Play Button Indicator */}
      <div
        className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl"
        style={{
          transform: isHovered ? 'scale(1.15) rotate(0deg)' : 'scale(0.8) rotate(-90deg)',
          opacity: isHovered ? 1 : 0.5,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <Play size={24} className="text-white fill-white ml-1" />
      </div>
    </div>
  );
});

SlidingCard.displayName = 'SlidingCard';

// ============================================================================
// CAROUSEL NAVIGATION COMPONENT
// ============================================================================

const CarouselNav = ({ galleryImages, activeCard, setActiveCard }) => (
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

// ============================================================================
// MAIN PORTFOLIO COMPONENT
// ============================================================================

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  const RESUME_FILE_ID = "1cb09ib9y-J_S5h6rmALXIbVDyv9A1bdQ";
  const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing`;
  const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  }, []);

  // Parallax mouse effect
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (!isMobile && !prefersReducedMotion()) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * MOUSE_PARALLAX_INTENSITY,
          y: (e.clientY / window.innerHeight - 0.5) * MOUSE_PARALLAX_INTENSITY
        });
      }
    }, THROTTLE_DELAY),
    [isMobile]
  );

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove, isMobile]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = throttle(() => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);

      const sections = ['hero', 'projects', 'achievements', 'gallery', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= SCROLL_THRESHOLD && rect.bottom >= SCROLL_THRESHOLD;
        }
        return false;
      });
      if (current) setActiveSection(current);
    }, THROTTLE_DELAY);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gallery data
  const galleryImages = useMemo(() => [
    {
      url: "/images/takshak.jpeg",
      caption: "Web Design Competition - Takshak 2025",
      award: "1st Place",
      description: "Won first place in regional coding competition with optimal algorithmic solutions and efficient problem-solving approaches"
    },
    {
      url: "/images/kmm1.jpeg",
      caption: "Inter-College Coding Challenge",
      award: "First Prize",
      description: "Received first prize in inter-college coding competition conducted at KMM College of Arts & Science"
    },
    {
      url: "/images/rajagiri.jpeg",
      caption: "Inceptra 2024 Coding Competition",
      award: "First Prize",
      description: "Achieved first prize in competitive coding at Rajagiri College's annual tech festival"
    }
  ], []);

  // Auto-rotate gallery
  useEffect(() => {
    if (prefersReducedMotion()) return;
    
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % galleryImages.length);
    }, GALLERY_AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const handleImageError = useCallback((key) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeView = () => {
    window.open(RESUME_VIEW_URL, '_blank', 'noopener,noreferrer');
  };

  const handleResumeDownload = () => {
    window.open(RESUME_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Projects data
  const projects = useMemo(() => [
    {
      title: "HomeServer Frontend",
      description: "Enterprise-grade personal cloud storage system with secure file management, real-time synchronization, and JWT-based authentication",
      tech: ["React", "JWT", "REST API", "WebSockets"],
      features: "End-to-end encryption • Cross-device sync • Responsive UI",
      repo: "https://github.com/shanavasvb/Home-Server",
      live: null
    },
    {
      title: "Barcode Product Processor",
      description: "Intelligent data extraction pipeline processing 10,000+ products with OpenFoodFacts, Google APIs, and DigiTeyes integration",
      tech: ["Python", "Gemini AI", "MongoDB", "Excel"],
      features: "AI categorization • Offline caching • Batch processing",
      repo: "https://github.com/shanavasvb/product-details-project-script",
      live: null
    },
    {
      title: "Family Directory",
      description: "Modern Android app for family management with member profiles, event scheduling, and comprehensive admin dashboard",
      tech: ["Kotlin", "Jetpack Compose", "Firebase", "Material Design"],
      features: "Bilingual support • Real-time sync • Offline mode",
      repo: "https://github.com/shanavasvb/familydirectory",
      live: null
    }
  ], []);

  // Achievements data
  const achievements = useMemo(() => [
    {
      year: "2025",
      title: "Software Development Intern",
      org: "Datcarts Private Limited",
      description: "Architected and deployed supermarket product management system processing 10,000+ entries with 40% efficiency improvement through automation"
    },
    {
      year: "2024",
      title: "Technical Workshop Facilitator",
      org: "UC College TechFest",
      description: "Conducted comprehensive workshop on modern web development, REST APIs, and cloud deployment for 100+ participants"
    },
    {
      year: "2024",
      title: "Multi-Domain Competition Winner",
      org: "Kerala State Colleges",
      description: "Secured first place in coding challenges, typing competitions, web design contests, and debugging marathons"
    },
    {
      year: "2023",
      title: "KKEM Software Bootcamp",
      org: "Kerala Knowledge Economy Mission",
      description: "Completed intensive software development bootcamp focusing on full-stack technologies and industry best practices"
    }
  ], []);

  // Skills data with updated colors
  const skills = useMemo(() => [
    {
      name: "C++",
      level: 95,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "💻"
    },
    {
      name: "JavaScript",
      level: 95,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "⚡"
    },
    {
      name: "React",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "⚛️"
    },
    {
      name: "Node.js",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "🟢"
    },
    {
      name: "MongoDB",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "🍃"
    },
    {
      name: "Python",
      level: 85,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "🐍"
    },
    {
      name: "Swift",
      level: 75,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "🍎"
    },
    {
      name: "Kotlin",
      level: 75,
      iconSrc: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg",
      color: "from-cyan-500 via-purple-500 to-pink-500",
      fallback: "🤖"
    }
  ], []);

  // Tools and technologies
  const toolIcons = useMemo(() => [
    { href: "https://flutter.dev", src: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg", alt: "Flutter" },
    { href: "https://developer.apple.com/swift/", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg", alt: "Swift" },
    { href: "https://kotlinlang.org", src: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg", alt: "Kotlin" },
    { href: "https://developer.android.com", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original-wordmark.svg", alt: "Android" },
    { href: "https://reactjs.org/", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg", alt: "React" },
    { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { href: "https://www.w3schools.com/cpp/", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg", alt: "C++" },
    { href: "https://spring.io/", src: "https://www.vectorlogo.zone/logos/springio/springio-icon.svg", alt: "Spring" },
    { href: "https://firebase.google.com/", src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg", alt: "Firebase" },
    { href: "https://aws.amazon.com", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" },
    { href: "https://www.mongodb.com/", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg", alt: "MongoDB" },
    { href: "https://www.mysql.com/", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg", alt: "MySQL" },
    { href: "https://www.linux.org/", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", alt: "Linux" }
  ], []);

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <style>{`
        /* ============== KEYFRAME ANIMATIONS ============== */
        
        @keyframes slideUp { 
          from { 
            opacity: 0; 
            transform: translateY(40px); 
            filter: blur(8px);
          } 
          to { 
            opacity: 1; 
            transform: translateY(0); 
            filter: blur(0);
          } 
        }
        
        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        @keyframes float { 
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.5;
          } 
          50% { 
            transform: translateY(-25px) scale(1.05); 
            opacity: 0.8;
          } 
        }
        
        @keyframes glow { 
          0%, 100% { 
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
          } 
          50% { 
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 60px rgba(139, 92, 246, 0.4);
          } 
        }
        
        @keyframes pulse { 
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.7;
          } 
        }
        
        @keyframes shimmer { 
          0% { 
            background-position: -1000px 0;
          }
          100% { 
            background-position: 1000px 0;
          } 
        }
        
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        
        @keyframes meshMove {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1) translateY(0); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.1) translateY(-10px);
          }
        }
        
        @keyframes shimmerEffect {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        /* ============== UTILITY CLASSES ============== */
        
        * { 
          scroll-behavior: smooth; 
        }
        
        .hover-lift { 
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      box-shadow 0.4s, 
                      border-color 0.4s; 
        }
        
        .hover-lift:hover { 
          transform: translateY(-12px) scale(1.02); 
          box-shadow: 0 25px 50px rgba(6, 182, 212, 0.3); 
        }
        
        .hover-lift:focus-within {
          outline: 2px solid rgba(6, 182, 212, 0.5);
          outline-offset: 4px;
        }
        
        .nav-link { 
          position: relative; 
          transition: color 0.3s ease;
        }
        
        .nav-link::after { 
          content: ''; 
          position: absolute; 
          bottom: -2px; 
          left: 0; 
          width: 0; 
          height: 2px; 
          background: linear-gradient(90deg, #06B6D4, #8B5CF6, #EC4899); 
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after, 
        .nav-link.active::after { 
          width: 100%; 
        }
        
        .nav-link:focus {
          outline: 2px solid rgba(6, 182, 212, 0.5);
          outline-offset: 4px;
          border-radius: 4px;
        }
        
        .gradient-text { 
          background: linear-gradient(90deg, #06B6D4, #8B5CF6, #EC4899); 
          background-size: 200% 200%; 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text; 
        }
        
        .floating { 
          animation: float 6s ease-in-out infinite; 
        }
        
        .pulsing { 
          animation: pulse 2s ease-in-out infinite; 
        }
        
        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .text-reveal {
          animation: textReveal 0.8s ease-out forwards;
        }
        
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        
        .scrollbar-hide { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        
        .tools-row img { 
          width: 48px; 
          height: 48px; 
          object-fit: contain; 
          transition: transform 0.3s ease, filter 0.3s ease; 
        }
        
        .tools-row a { 
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          width: 60px; 
          height: 60px; 
          border-radius: 14px; 
          transition: all 0.3s ease;
        }
        
        .tools-row a:hover { 
          background: rgba(6, 182, 212, 0.15);
          transform: translateY(-4px);
        }
        
        .tools-row a:hover img { 
          transform: translateY(-6px) scale(1.15); 
          filter: brightness(1.2);
        }
        
        .tools-row a:focus {
          outline: 2px solid rgba(6, 182, 212, 0.5);
          outline-offset: 2px;
        }
        
        button:focus,
        a:focus {
          outline: 2px solid rgba(6, 182, 212, 0.5);
          outline-offset: 2px;
        }
        
        /* ============== REDUCED MOTION ============== */
        
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ============== MOBILE RESPONSIVE ============== */
        
        @media (max-width: 768px) {
          .skill-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .terminal-section {
            display: none;
          }
          
          .floating {
            animation: none;
          }
          
          .pixelated-canvas-container {
            max-width: 300px;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .pixelated-canvas-container canvas {
            max-width: 100%;
            height: auto;
          }
        }

        /* ============== ACCESSIBILITY ============== */
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .focus:not-sr-only {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>

      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Top Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gray-800/50 z-50" 
        role="progressbar" 
        aria-valuenow={Math.round(scrollProgress)} 
        aria-valuemin="0" 
        aria-valuemax="100"
      >
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 shadow-lg shadow-cyan-500/50" 
          style={{ width: `${scrollProgress}%`, willChange: 'width' }} 
        />
      </div>

      {/* Navigation Bar */}
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
            {['projects', 'achievements', 'gallery', 'skills', 'contact'].map(item => (
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

      {/* Back to Top Button */}
      {showBackToTop && (
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
      )}

      {/* ========================================================================
          HERO SECTION WITH PIXELATED IMAGE
          ======================================================================== */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div 
            className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl floating" 
            style={{ 
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              willChange: 'transform',
              animation: !prefersReducedMotion() ? 'meshMove 20s ease-in-out infinite' : 'none'
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

        <div className="max-w-7xl mx-auto relative z-10 w-full" id="main-content">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="order-2 md:order-1">
              {/* Interactive Terminal - Hidden on Mobile */}
              <div className="mb-12 terminal-section hidden lg:block">
                <InteractiveTerminal 
                  onNavigate={scrollToSection}
                  handleResumeView={handleResumeView}
                  handleResumeDownload={handleResumeDownload}
                />
              </div>

              {/* Hero Title with Text Reveal Animation */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight hero-title text-reveal" style={{ animationDelay: '0.2s' }}>
                <span className="gradient-text">Shanavas V Basheer</span>
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-cyan-400 text-lg md:text-xl mb-6 font-semibold text-reveal" style={{ animationDelay: '0.4s' }}>
                Full-Stack Developer | Problem Solver | Tech Enthusiast
              </p>

              {/* Main Description */}
              <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed text-reveal" style={{ animationDelay: '0.6s' }}>
                Experienced Full-Stack Developer specializing in backend architecture, cloud solutions, and enterprise-grade applications.
                Passionate about building scalable systems, automating workflows, and solving complex technical challenges.
              </p>

              {/* CTA Tagline */}
              <p className="text-cyan-400 text-lg md:text-xl mb-8 font-semibold flex items-center gap-2 text-reveal" style={{ animationDelay: '0.8s' }}>
                <Zap size={24} className="pulsing" /> Build. Break. Better. <Rocket size={24} className="pulsing" style={{ animationDelay: '0.5s' }} />
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 flex-wrap mb-8 text-reveal" style={{ animationDelay: '1s' }}>
                <a 
                  href="mailto:shanavasvbasheer@gmail.com" 
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                >
                  <Mail size={20} /> Get In Touch
                </a>
                <button 
                  onClick={handleResumeView}
                  className="px-6 py-3 border-2 border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                >
                  <Download size={20} className="group-hover:animate-bounce" /> View Resume
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 mt-8 text-reveal" style={{ animationDelay: '1.2s' }}>
                {[
                  { icon: Github, href: "https://github.com/shanavasvbasheer", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/shanavasvbasheer", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:shanavasvbasheer@gmail.com", label: "Email" }
                ].map(({ icon: Icon, href, label }, i) => (
                  <a 
                    key={i} 
                    href={href} 
                    target={href.includes('http') ? "_blank" : undefined} 
                    rel={href.includes('http') ? "noopener noreferrer" : undefined}
                    className="p-3 rounded-full hover:bg-cyan-500/20 transition-all hover:scale-125 hover:rotate-12 group"
                    aria-label={label}
                  >
                    <Icon size={24} className="group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Pixelated Image */}
            <div className="order-1 md:order-2 flex justify-center items-center text-reveal" style={{ animationDelay: '0.3s' }}>
<PixelatedProfileImage src="/images/myimage.jpeg" />            </div>
          </div>
        </div>
      </section>

    {/* ========================================================================
    PROJECTS SECTION
    ======================================================================== */}
<section id="projects" className="py-32 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center gap-3 mb-16">
      <Code className="text-cyan-400" size={32} />
      <h2 className="text-5xl font-bold gradient-text">Featured Projects</h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {projects.map((project, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-cyan-500/20 rounded-2xl p-8 hover-lift group hover:border-cyan-500/70 transition-all ${
            i % 2 === 0 ? 'md:mt-8' : ''
          }`}
          style={{
            animation: `slideUp 0.6s ease-out forwards`,
            animationDelay: `${i * ANIMATION_DELAY_INCREMENT}s`,
            opacity: 0,
            contain: 'layout style paint'
          }}
        >
          <h3 className="text-2xl font-bold mb-4 text-cyan-400 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, j) => (
              <span 
                key={j} 
                className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm hover:bg-cyan-500/30 transition-colors font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 italic mb-4">{project.features}</p>

          <div className="flex gap-3 items-center">
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-cyan-500 hover:text-purple-500 font-medium transition-colors group"
            >
              <Github size={18} /> View Code
            </a>
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-purple-500 hover:text-pink-500 font-medium transition-colors"
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* ========================================================================
          ACHIEVEMENTS SECTION
          ======================================================================== */}
      <section id="achievements" className="py-32 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Award className="text-cyan-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">Achievements & Experience</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />
            
            {achievements.map((achievement, i) => (
              <div 
                key={i} 
                className="relative pl-24 pb-16 last:pb-0" 
                style={{
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${i * ANIMATION_DELAY_INCREMENT}s`,
                  opacity: 0
                }}
              >
                <div 
                  className="absolute left-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg" 
                  style={{ 
                    animation: !prefersReducedMotion() ? 'glow 2s ease-in-out infinite' : 'none', 
                    animationDelay: `${i * 0.3}s` 
                  }}
                >
                  <div className="w-3 h-3 bg-white rounded-full pulsing" />
                </div>

                <div className="bg-gray-800/80 border-2 border-cyan-500/20 rounded-2xl p-6 hover-lift group hover:border-cyan-500/70 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-cyan-400 font-semibold text-sm mb-1 flex items-center gap-2">
                        <Calendar size={14} />
                        {achievement.year}
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                        {achievement.title}
                      </h3>
                    </div>
                    <ChevronRight className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all" />
                  </div>
                  <div className="text-purple-400 mb-3 font-medium text-lg">{achievement.org}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          GALLERY SECTION
          ======================================================================== */}
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
              onClick={() => setActiveCard(prev => (prev - 1 + galleryImages.length) % galleryImages.length)} 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-cyan-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            
            <button 
              onClick={() => setActiveCard(prev => (prev + 1) % galleryImages.length)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-cyan-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>

          <CarouselNav galleryImages={galleryImages} activeCard={activeCard} setActiveCard={setActiveCard} />
        </div>
      </section>

      {/* ========================================================================
          SKILLS SECTION
          ======================================================================== */}
      <section id="skills" className="py-32 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="text-cyan-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">Technical Arsenal</h2>
          </div>

          <p className="text-gray-400 text-lg mb-16 text-center max-w-3xl mx-auto">
            Technologies and tools I work with to build exceptional software solutions
          </p>

          {/* Tools/Technologies Icons Grid */}
          <div className="tools-row flex flex-wrap gap-4 items-center justify-center mb-20 px-4">
            {toolIcons.map((t, i) => (
              <a 
                key={i} 
                href={t.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={t.alt} 
                className="p-1 group"
                aria-label={`Visit ${t.alt} website`}
              >
                <img 
                  src={t.src} 
                  alt={t.alt}
                  onError={(e) => {
                    if (!imageErrors[`tool-${i}`]) {
                      handleImageError(`tool-${i}`);
                      e.target.style.display = 'none';
                    }
                  }}
                  className="transition-transform duration-300"
                />
              </a>
            ))}
          </div>

          {/* Skill Cards Grid - 3 Columns Optimized Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 skill-grid max-w-6xl mx-auto">
            {skills.map((skill, i) => (
              <SkillCard 
                key={i}
                skill={skill}
                imageErrors={imageErrors}
                handleImageError={handleImageError}
                index={i}
              />
            ))}
          </div>

          {/* Additional Note */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              Always learning and exploring new technologies • Proficiency levels based on professional experience
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================
          CONTACT SECTION
          ======================================================================== */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-400 mb-16 leading-relaxed">
            Open to new opportunities, collaborations, and interesting conversations about technology.
            Let's connect and create something exceptional together.
          </p>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Card with Copy Functionality */}
            <button 
              onClick={() => copyToClipboard('shanavasvbasheer@gmail.com')}
              className="bg-gray-800/80 border-2 border-cyan-500/20 px-8 py-8 rounded-2xl hover-lift flex items-center gap-4 group hover:border-cyan-500/70 text-left relative overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <div className="p-4 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                <Mail className="text-cyan-400 group-hover:scale-125 transition-transform" size={28} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1 font-semibold">Email</div>
                <div className="font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                  shanavasvbasheer@gmail.com
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {copiedEmail ? (
                  <Check size={20} className="text-emerald-400 animate-pulse" />
                ) : (
                  <Copy size={20} className="text-gray-400" />
                )}
              </div>
            </button>

            {/* Phone Card */}
            <a 
              href="tel:+918547363158" 
              className="bg-gray-800/80 border-2 border-cyan-500/20 px-8 py-8 rounded-2xl hover-lift flex items-center gap-4 group hover:border-cyan-500/70 text-left transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <div className="p-4 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <Phone className="text-purple-400 group-hover:scale-125 transition-transform" size={28} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 font-semibold">Phone</div>
                <div className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                  +91 85473 63158
                </div>
              </div>
            </a>
          </div>

          {/* Location & Availability Card */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border-2 border-cyan-500/20 mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin size={20} className="text-cyan-400" />
              <p className="text-gray-300 text-lg font-semibold">Based in Kochi, Kerala, India</p>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Currently pursuing M.Voc in Software Application Development at CUSAT
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-semibold">Available for opportunities</span>
            </div>
          </div>

          {/* Resume Download Button */}
          <div className="mt-16">
            <button 
              onClick={handleResumeDownload}
              className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer mx-auto group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Download size={20} className="group-hover:animate-bounce" /> Download Full Resume
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================
          FOOTER
          ======================================================================== */}
      <footer className="bg-gray-800 border-t-2 border-cyan-500/20 py-16 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-12">
            {[
              { icon: Github, href: "https://github.com/shanavasvb", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/shanavasvbasheer", label: "LinkedIn" },
              { icon: Mail, href: "mailto:shanavasvbasheer@gmail.com", label: "Email" }
            ].map(({ icon: Icon, href, label }, i) => (
              <a 
                key={i} 
                href={href} 
                target={href.includes('http') ? "_blank" : undefined} 
                rel={href.includes('http') ? "noopener noreferrer" : undefined}
                className="p-3 rounded-full hover:bg-cyan-500/20 transition-all hover:scale-125 hover:rotate-12 group focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label={label}
              >
                <Icon size={24} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
          
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
            {['projects', 'achievements', 'gallery', 'skills', 'contact'].map((item) => (
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
    </div>
  );
};


export default Portfolio;