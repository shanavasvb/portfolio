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

// Constants
const ANIMATION_DELAY_INCREMENT = 0.15;
const GALLERY_AUTO_ROTATE_INTERVAL = 5000;
const SCROLL_THRESHOLD = 150;
const MOUSE_PARALLAX_INTENSITY = 15;
const THROTTLE_DELAY = 16; // ~60fps

// Utility: Throttle function
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

// Interactive Terminal Component
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
        '─────────────────────────',
        'help              - Show this help message',
        'whoami            - Display your information',
        'skills            - Navigate to skills section',
        'projects          - Navigate to projects section',
        'achievements      - Navigate to achievements section',
        'contact           - Navigate to contact section',
        'resume view       - Open resume in new tab',
        'resume dl         - Download resume',
        'clear             - Clear terminal screen',
        '─────────────────────────',
        '💡 Tip: Use arrow keys to navigate command history'
      ]
    },
    whoami: {
      description: 'Display your information',
      execute: () => [
        '👤 Shanavas V Basheer',
        '─────────────────────────',
        '📍 Location: Kochi, Kerala, India',
        '🎓 Education: M.Voc in Software Application Development (CUSAT)',
        '💼 Role: Full-Stack Developer | Competitive Coder',
        '📧 Email: shanavasvbasheer@gmail.com',
        '📱 Phone: +91 85473 63158',
        '💻 GitHub: github.com/shanavasvbasheer',
        '🔗 LinkedIn: linkedin.com/in/shanavasvbasheer',
        '─────────────────────────',
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
    <div className="w-full rounded-xl overflow-hidden shadow-2xl border-2 border-blue-500/30 hover:border-blue-500/60 transition-all">
      {/* Traffic Light Buttons */}
      <div className="bg-gray-800 px-4 py-3 flex gap-3 items-center border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" title="Close" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors" title="Minimize" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors" title="Maximize" />
        </div>
        <div className="ml-4 text-gray-400 text-sm font-mono flex-1">Portfolio Terminal</div>
        <Terminal size={16} className="text-blue-400" />
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="bg-gray-900 p-6 font-mono text-sm h-96 overflow-y-auto scrollbar-hide text-gray-100"
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`${
              line.startsWith('$') ? 'text-blue-400 font-semibold' :
              line.startsWith('✅') ? 'text-green-400' :
              line.startsWith('❌') ? 'text-red-400' :
              line.startsWith('📋') || line.startsWith('👤') || line.startsWith('─') ? 'text-cyan-400' :
              'text-gray-100'
            }`}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 flex items-center gap-2">
        <span className="text-blue-400 font-mono font-semibold">svb@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          className="flex-1 bg-transparent outline-none text-white font-mono placeholder-gray-600 focus:placeholder-gray-500 transition-colors"
          autoFocus
        />
      </div>
    </div>
  );
};

// Skill Card Component
const SkillCard = ({ skill, imageErrors, handleImageError, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
      style={{
        animation: `slideUp 0.6s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
        opacity: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon Container */}
        <div
          className="mb-6 flex justify-center"
          style={{
            transform: isHovered ? 'scale(1.15) translateY(-8px)' : 'scale(1)',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {!imageErrors[`skill-${index}`] ? (
            <img
              src={skill.iconSrc}
              alt={skill.name}
              className="w-16 h-16 object-contain drop-shadow-lg"
              onError={() => handleImageError(`skill-${index}`)}
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center text-4xl">
              {skill.fallback}
            </div>
          )}
        </div>

        {/* Skill Name */}
        <h3
          className="text-xl font-bold text-center mb-3 text-white group-hover:text-blue-400 transition-colors duration-300"
        >
          {skill.name}
        </h3>

        {/* Proficiency Percentage */}
        <div className="text-center mb-4">
          <span
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {skill.level}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg transition-all duration-1000 ease-out`}
            style={{
              width: isHovered ? `${skill.level}%` : '0%',
              boxShadow: isHovered ? `0 0 20px rgba(59, 130, 246, 0.6)` : 'none'
            }}
          />
        </div>

        {/* Proficiency Label */}
        <p
          className={`text-xs text-center font-semibold transition-all duration-300 ${
            skill.level >= 90 ? 'text-green-400' :
            skill.level >= 75 ? 'text-blue-400' :
            'text-purple-400'
          }`}
        >
          {skill.level >= 90 ? '🔥 Expert' : skill.level >= 75 ? '⭐ Proficient' : '📚 Learning'}
        </p>
      </div>

      {/* Border gradient on hover */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
        style={{
          borderRadius: '0.75rem',
          background: isHovered
            ? `linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))`
            : 'none'
        }}
      />
    </div>
  );
};

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
    return window.matchMedia('(max-width: 768px)').matches;
  }, []);

  // Throttled mouse parallax effect
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (!isMobile) {
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

  // Scroll progress and active section detection
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

  // Gallery images
  const galleryImages = useMemo(() => [
    {
      url: "/images/takshak.jpeg",
      caption: "Web designing at MA College of Engineering, Kothamangalam in Takshak 2025",
      award: "1st Place",
      description: "Won first place in regional coding competition with optimal algorithmic solutions and efficient problem-solving approaches"
    },
    {
      url: "/images/kmm1.jpeg",
      caption: "Coding Competition in KMM College Thrikakara",
      award: "First Prize",
      description: " Recieved first prize in inter-college coding competition  conducted at KMM College of Arts & Science "
    },
    {
      url: "/images/rajagiri.jpeg",
      caption: "Coding Competition Conducted at Rajagiri College in Inceptra 2024",
      award: "First Prize",
      description: "Recieved first prize in inter-college coding competition  "
    }
  ], []);

  // Auto-rotate gallery cards
  useEffect(() => {
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

  const skills = useMemo(() => [
    {
      name: "C++",
      level: 95,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "💻"
    },
    {
      name: "JavaScript",
      level: 95,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "⚡"
    },
    {
      name: "React",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "⚛️"
    },
    {
      name: "Node.js",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "🟢"
    },
    {
      name: "MongoDB",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "🍃"
    },
    {
      name: "Python",
      level: 85,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "🐍"
    },
    {
      name: "Swift",
      level: 75,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "🍎"
    },
    {
      name: "Kotlin",
      level: 75,
      iconSrc: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg",
      color: "from-blue-500 via-purple-500 to-pink-500",
      fallback: "🤖"
    }
  ], []);

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

  const SlidingCard = React.memo(({ image, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
      <div
        className={`absolute inset-0 h-96 w-full max-w-2xl mx-auto overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
          isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: 'opacity 700ms ease-in-out, z-index 0ms linear'
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden bg-gray-800"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s ease-out'
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
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
              <Award size={64} className="text-blue-400 opacity-50" />
            </div>
          )}
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
          style={{
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.4s ease-out'
          }}
        />

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: isHovered ? '2px solid rgba(59, 130, 246, 0.6)' : '2px solid rgba(59, 130, 246, 0.2)',
            boxShadow: isHovered ? '0 0 40px rgba(59, 130, 246, 0.4), inset 0 0 40px rgba(59, 130, 246, 0.1)' : 'none',
            transition: 'all 0.4s ease-out'
          }}
        />

        <div
          className="absolute inset-0 flex flex-col justify-end p-8"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
            opacity: isHovered ? 1 : 0.9,
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div
            className="mb-4"
            style={{
              transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.9)',
              opacity: isHovered ? 1 : 0.7,
              transition: 'all 0.5s ease-out'
            }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-sm rounded-full text-xs font-bold text-white inline-flex items-center gap-2 shadow-lg">
              <Sparkles size={14} />
              {image.award}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">{image.caption}</h3>

          <p
            className="text-gray-100 text-base mb-4 max-w-lg drop-shadow-md"
            style={{
              transform: isHovered ? 'translateX(0)' : 'translateX(-15px)',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.5s ease-out 0.1s'
            }}
          >
            {image.description}
          </p>

          <div
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg"
            style={{
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          />
        </div>

        <div
          className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl"
          style={{
            transform: isHovered ? 'scale(1.1) rotate(0deg)' : 'scale(0.9) rotate(-90deg)',
            opacity: isHovered ? 1 : 0.6,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <Play size={20} className="text-white fill-white ml-1" />
        </div>
      </div>
    );
  });

  SlidingCard.displayName = 'SlidingCard';

  const CarouselNav = () => (
    <div className="flex justify-center gap-3 mt-10">
      {galleryImages.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setActiveCard(idx)}
          className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            idx === activeCard
              ? 'w-12 h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg shadow-blue-500/50'
              : 'w-3 h-3 bg-gray-600 hover:bg-gray-500 hover:scale-125'
          }`}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(59,130,246,0.5); } 50% { box-shadow: 0 0 40px rgba(59,130,246,0.8), 0 0 60px rgba(59,130,246,0.4); } }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.05);opacity:0.8;} }
        @keyframes shimmer { 0%{background-position:-1000px 0;}100%{background-position:1000px 0;} }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        * { scroll-behavior: smooth; }
        
        .hover-lift{ 
          transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s, border-color .4s; 
        }
        .hover-lift:hover{ 
          transform: translateY(-12px) scale(1.02); 
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3); 
        }
        .hover-lift:focus-within {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 4px;
        }
        
        .nav-link{ 
          position: relative; 
          transition: color 0.3s;
        }
        .nav-link::after{ 
          content:''; 
          position:absolute; 
          bottom:-2px; 
          left:0; 
          width:0; 
          height:2px; 
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899); 
          transition: width .3s; 
        }
        .nav-link:hover::after, 
        .nav-link.active::after { 
          width:100%; 
        }
        .nav-link:focus {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 4px;
          border-radius: 4px;
        }
        
        .gradient-text { 
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899); 
          background-size:200% 200%; 
          animation: shimmer 3s linear infinite; 
          -webkit-background-clip:text; 
          -webkit-text-fill-color:transparent; 
          background-clip:text; 
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
        
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        .scrollbar-hide { 
          -ms-overflow-style:none; 
          scrollbar-width:none; 
        }
        
        .tools-row img { 
          width: 44px; 
          height: 44px; 
          object-fit: contain; 
          transition: transform .3s ease, filter .3s ease; 
        }
        .tools-row a { 
          display:inline-flex; 
          align-items:center; 
          justify-content:center; 
          width:56px; 
          height:56px; 
          border-radius:12px; 
          transition: all .3s ease;
        }
        .tools-row a:hover { 
          background: rgba(59, 130, 246, 0.1);
        }
        .tools-row a:hover img { 
          transform: translateY(-4px) scale(1.1); 
        }
        .tools-row a:focus {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }
        
        .skill-icon { 
          width: 32px; 
          height: 32px; 
          object-fit: contain; 
          margin-right: 12px;
          transition: transform 0.3s ease;
        }
        
        .skill-bar {
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: width;
        }
        
        button:focus,
        a:focus {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50" role="progressbar" aria-valuenow={scrollProgress} aria-valuemin="0" aria-valuemax="100">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollProgress > 5 ? (darkMode ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-gray-50/95 backdrop-blur-lg shadow-lg') : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Shanavas</div>
          <div className="flex gap-6 items-center">
            {['projects','achievements','gallery','skills','contact'].map(item => (
              <a 
                key={item} 
                href={`#${item}`} 
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === item ? 'active text-blue-400' : darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                aria-current={activeSection === item ? 'page' : undefined}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-blue-500/20 transition-all hover:scale-110"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-400" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-40 p-4 rounded-full ${
            darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          } text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
          aria-label="Back to top"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div 
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl floating" 
            style={{ 
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              willChange: 'transform'
            }} 
          />
          <div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl floating" 
            style={{ 
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              willChange: 'transform'
            }} 
          />
          <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl floating" 
            style={{ 
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              willChange: 'transform'
            }} 
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10" id="main-content">
          {/* Interactive Terminal */}
          <div className="mb-12">
            <InteractiveTerminal 
              onNavigate={scrollToSection}
              handleResumeView={handleResumeView}
              handleResumeDownload={handleResumeDownload}
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-center">
            <span className="gradient-text">Shanavas V Basheer</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed text-center">
            Experienced Full-Stack Developer specializing in backend architecture, cloud solutions, and enterprise-grade applications.
            Passionate about building scalable systems, automating workflows, and solving complex technical challenges.
          </p>

          <p className="text-blue-400 text-lg md:text-xl mb-12 font-semibold flex items-center justify-center gap-2">
            <Zap size={24} className="pulsing" /> Build. Break. Better. <Rocket size={24} className="pulsing" style={{ animationDelay: '0.5s' }} />
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <a 
              href="mailto:shanavasvbasheer@gmail.com" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Mail size={20} /> Get In Touch
            </a>
            <button 
              onClick={handleResumeView}
              className="px-8 py-4 border-2 border-blue-500 rounded-lg font-semibold hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
            >
              <Download size={20} className="group-hover:animate-bounce" /> View Resume
            </button>
          </div>

          <div className="flex gap-6 justify-center mt-12">
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
                className="p-3 rounded-full hover:bg-blue-500/20 transition-all hover:scale-125 hover:rotate-12"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Code className="text-blue-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">Featured Projects</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`bg-gray-800 border-2 border-blue-500/20 rounded-xl p-8 hover-lift group hover:border-blue-500/60`}
                style={{
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${i * ANIMATION_DELAY_INCREMENT}s`,
                  opacity: 0
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-400 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span 
                      key={j} 
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm hover:bg-blue-500/30 transition-colors"
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
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-purple-500 font-medium transition-colors"
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

      {/* Achievements Section */}
      <section id="achievements" className="py-32 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Award className="text-blue-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">Achievements & Experience</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            
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
                  className="absolute left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg" 
                  style={{ animation: 'glow 2s ease-in-out infinite', animationDelay: `${i * 0.3}s` }}
                >
                  <div className="w-3 h-3 bg-white rounded-full pulsing" />
                </div>

                <div className="bg-gray-800 border-2 border-blue-500/20 rounded-lg p-6 hover-lift group hover:border-blue-500/60">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-blue-400 font-semibold text-sm mb-1 flex items-center gap-2">
                        <Calendar size={14} />
                        {achievement.year}
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                        {achievement.title}
                      </h3>
                    </div>
                    <ChevronRight className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
                  </div>
                  <div className="text-purple-400 mb-2 font-medium">{achievement.org}</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-4">Moments in Action</h2>
            <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
              <Sparkles size={20} className="text-blue-400" /> 
              Hover to explore • Navigate with arrows or dots
              <Sparkles size={20} className="text-purple-400" />
            </p>
          </div>

          <div className="relative h-96">
            {galleryImages.map((image, i) => (
              <SlidingCard key={i} image={image} isActive={i === activeCard} />
            ))}
            
            <button 
              onClick={() => setActiveCard(prev => (prev - 1 + galleryImages.length) % galleryImages.length)} 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-blue-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            
            <button 
              onClick={() => setActiveCard(prev => (prev + 1) % galleryImages.length)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-blue-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>

          <CarouselNav />

         
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="text-blue-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">Technical Arsenal</h2>
          </div>

          <p className="text-gray-400 text-lg mb-12 text-center">
            Technologies and tools I work with to build exceptional software
          </p>

          {/* Tools/Technologies Icons */}
          <div className="tools-row flex flex-wrap gap-4 items-center justify-center mb-16">
            {toolIcons.map((t, i) => (
              <a 
                key={i} 
                href={t.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={t.alt} 
                className="p-1"
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
                />
              </a>
            ))}
          </div>

          {/* Skill Cards Grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Open to new opportunities, collaborations, and interesting conversations about technology.
            Let's connect and create something exceptional together.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <button 
              onClick={() => copyToClipboard('shanavasvbasheer@gmail.com')}
              className="bg-gray-800 border-2 border-blue-500/20 px-8 py-6 rounded-lg hover-lift flex items-center gap-4 group hover:border-blue-500/60 text-left relative overflow-hidden"
            >
              <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <Mail className="text-blue-400 group-hover:scale-125 transition-transform" size={24} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="font-semibold group-hover:text-blue-400 transition-colors">
                  shanavasvbasheer@gmail.com
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedEmail ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="text-gray-400" />}
              </div>
            </button>

            <a 
              href="tel:+918547363158" 
              className="bg-gray-800 border-2 border-blue-500/20 px-8 py-6 rounded-lg hover-lift flex items-center gap-4 border group hover:border-blue-500/60 text-left"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <Phone className="text-purple-400 group-hover:scale-125 transition-transform" size={24} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Phone</div>
                <div className="font-semibold group-hover:text-purple-400 transition-colors">
                  +91 85473 63158
                </div>
              </div>
            </a>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-8 border-2 border-blue-500/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin size={20} className="text-blue-400" />
              <p className="text-gray-400">Based in Kochi, Kerala, India</p>
            </div>
            <p className="text-gray-500 text-sm mb-2">
              Currently pursuing M.Voc in Software Application Development at CUSAT
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400 text-sm font-medium">Available for opportunities</span>
            </div>
          </div>

          <div className="mt-12">
            <button 
              onClick={handleResumeDownload}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer mx-auto group"
            >
              <Download size={20} className="group-hover:animate-bounce" /> Download Resume
            </button>
          </div>
        </div>
      </section>

   {/* Footer */}
      <footer className="bg-gray-800 border-t-2 border-blue-500/20 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-8">
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
                className="p-3 rounded-full hover:bg-blue-500/20 transition-all hover:scale-125 hover:rotate-12"
                aria-label={label}
              >
                <Icon size={24} className="text-gray-400 hover:text-blue-400 transition-colors" />
              </a>
            ))}
          </div>
          
          {/* Copyright and Credits */}
          <div className="space-y-3 border-t border-gray-700 pt-8">
            <p className="text-gray-400 mb-3 font-medium">
              © 2025 Shanavas V Basheer. All rights reserved.
            </p>
            
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2 mb-4">
              <Zap size={16} className="text-blue-400" /> 
              Build. Break. Better. 
              <Rocket size={16} className="text-purple-400" />
            </p>
            
            <div className="text-xs text-gray-600 space-y-1">
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['projects', 'achievements', 'gallery', 'skills', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-xs text-gray-500 hover:text-blue-400 transition-colors uppercase font-semibold tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;