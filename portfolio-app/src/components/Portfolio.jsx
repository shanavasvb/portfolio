import React, { useState, useEffect, useMemo } from 'react';
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
  Rocket
} from 'lucide-react';

/**
 * Portfolio.jsx
 * - Replaced emoji skill icons with official SVG/logo URLs for each technology.
 * - The "tools" row already used svg/logo URLs; skills now also use svg URLs (same sources used in your README).
 *
 * Notes:
 * - You can keep using remote SVG URLs (as below) or copy those SVGs into your repo (public/images or src/assets)
 *   and change the src to local paths (e.g. "/images/swift.svg") for faster, reliable loading.
 * - This file only updates how icons are rendered for the skills/tools; other behavior is unchanged.
 */

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const RESUME_FILE_ID = "1cb09ib9y-J_S5h6rmALXIbVDyv9A1bdQ";
  const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing`;

  const fullText = "shanavas@portfolio:~$ whoami";

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);

    const cursor = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => {
      clearInterval(typing);
      clearInterval(cursor);
    };
  }, [fullText]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      const sections = ['hero', 'projects', 'achievements', 'gallery', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gallery images
  const galleryImages = useMemo(() => [
    {
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      caption: "Coding Competition 2024",
      award: "1st Place",
      description: "Won first place in regional coding competition with optimal solutions"
    },
    {
      url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop",
      caption: "Project Showcase",
      award: "Featured",
      description: "Showcasing innovative full-stack development projects"
    }
  ], []);

  // Auto-rotate gallery cards (depends on galleryImages.length)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const handleResumeClick = () => {
    window.open(RESUME_VIEW_URL, '_blank');
  };

  const projects = useMemo(() => [
    {
      title: "HomeServer Frontend",
      description: "Secure personal cloud storage system with file upload/download and JWT-based authentication",
      tech: ["React", "JWT", "REST API"],
      features: "Responsive UI with cross-device compatibility",
      icon: "🏠",
      repo: "https://github.com/shanavasvb/Home-Server"
    },
    {
      title: "Barcode Product Processor",
      description: "Automated barcode data extraction from Excel with OpenFoodFacts, Google APIs, and DigiTeyes integration",
      tech: ["Python", "Gemini AI", "MongoDB"],
      features: "AI-based categorization with offline caching & batch processing",
      icon: "📦",
      repo: "https://github.com/shanavasvb/product-details-project-script"
    },
    {
      title: "Family Directory",
      description: "Android-based family directory app with member profiles, event scheduling, and admin panel",
      tech: ["Kotlin", "Jetpack Compose", "Firebase"],
      features: "Bilingual UI (Malayalam/English) with real-time data sync",
      icon: "👨‍👩‍👧‍👦",
      repo: "https://github.com/shanavasvb/familydirectory"
    }
  ], []);

  const achievements = useMemo(() => [
    { year: "2025", title: "Software Development Intern", org: "Datcarts", description: "Built supermarket product management system processing 10,000+ entries with 40% efficiency improvement" },
    { year: "2024", title: "Technical Workshop", org: "UC College TechFest", description: "Conducted workshop on modern web development" },
    { year: "2024", title: "Competition Winner", org: "Kerala Colleges", description: "Won coding, typing, web design, and debugging competitions" },
    { year: "2023", title: "KKEM Bootcamp", org: "Kerala Knowledge Economy Mission", description: "Completed software development bootcamp" }
  ], []);

  /**
   * SKILLS: use official SVG/logo URLs (instead of emoji)
   * - These URLs match the logos you used in your README.
   * - If you'd prefer local files, copy the SVGs into /public/images and change iconSrc accordingly.
   */
  const skills = useMemo(() => [
    {
      name: "C++",
      level: 95,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "JavaScript",
      level: 95,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "React",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      name: "Node.js",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      color: "from-green-500 to-green-600"
    },
    {
      name: "MongoDB",
      level: 90,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "Python",
      level: 85,
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      color: "from-blue-400 to-blue-500"
    },
    {
      name: "Swift",
      level: 75,
      // Official Swift logo (SVG) — replaces the apple emoji
      iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Kotlin",
      level: 75,
      iconSrc: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg",
      color: "from-purple-500 to-purple-600"
    }
  ], []);

  // tools row (same as README logos)
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
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s ease-out'
          }}
        >
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
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
            border: isHovered ? '2px solid rgba(16, 185, 129, 0.6)' : '2px solid rgba(16, 185, 129, 0.2)',
            boxShadow: isHovered ? '0 0 40px rgba(16, 185, 129, 0.4), inset 0 0 40px rgba(16, 185, 129, 0.1)' : 'none',
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
            <span className="px-4 py-2 bg-emerald-500 backdrop-blur-sm rounded-full text-xs font-bold text-white inline-flex items-center gap-2 shadow-lg">
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
            className="h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full shadow-lg"
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
          className={`transition-all duration-500 rounded-full ${
            idx === activeCard
              ? 'w-12 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/50'
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
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(16,185,129,0.5); } 50% { box-shadow: 0 0 40px rgba(16,185,129,0.8), 0 0 60px rgba(16,185,129,0.4); } }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.05);opacity:0.8;} }
        @keyframes shimmer { 0%{background-position:-1000px 0;}100%{background-position:1000px 0;} }
        .hover-lift{ transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s; }
        .hover-lift:hover{ transform: translateY(-12px) scale(1.02); box-shadow: 0 25px 50px rgba(16,185,129,0.3); }
        .nav-link{ position: relative; }
        .nav-link::after{ content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background: linear-gradient(90deg,#10b981,#06b6d4); transition: width .3s; }
        .nav-link:hover::after, .nav-link.active::after { width:100%; }
        .gradient-text { background: linear-gradient(90deg,#10b981,#06b6d4,#3b82f6); background-size:200% 200%; animation: shimmer 3s linear infinite; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .floating { animation: float 6s ease-in-out infinite; }
        .pulsing { animation: pulse 2s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
        .tools-row img { width: 44px; height: 44px; object-fit: contain; filter: none; transition: transform .2s ease; }
        .tools-row a { display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:8px; }
        .tools-row a:hover img { transform: translateY(-4px) scale(1.08); }
        .skill-icon { width: 28px; height: 28px; object-fit: contain; margin-right: 8px; }
      `}</style>

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrollProgress > 5 ? (darkMode ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-gray-50/95 backdrop-blur-lg shadow-lg') : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">SVB</div>
          <div className="flex gap-6 items-center">
            {['projects','achievements','gallery','skills'].map(item => (
              <a key={item} href={`#${item}`} className={`nav-link text-sm font-medium transition-colors ${activeSection === item ? 'active text-emerald-400' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-emerald-500/20 transition-all hover:scale-110">
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-400" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl floating" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }} />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl floating" style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl floating" style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 mb-8 inline-block font-mono text-left shadow-2xl border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all hover:scale-105`}>
            <div className="text-emerald-400 mb-2">{terminalText}<span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▋</span></div>
            <div className="text-sm"><span className="text-gray-500">→</span> Full-Stack Developer | Competitive Coder | Builder</div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight"><span className="gradient-text">Shanavas V Basheer</span></h1>

          <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed">
            Experienced Full-Stack Developer specializing in backend architecture and enterprise-grade solutions.
            Building scalable systems, automating workflows, and solving complex problems.
          </p>

          <p className="text-emerald-400 text-lg md:text-xl mb-12 font-semibold flex items-center justify-center gap-2">
            <Zap size={24} className="pulsing" /> Build. Break. Better. <Rocket size={24} className="pulsing" style={{ animationDelay: '0.5s' }} />
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <a href="mailto:shanavasvbasheer@gmail.com" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <Mail size={20} /> Get In Touch
            </a>
            <button onClick={handleResumeClick} className="px-8 py-4 border-2 border-emerald-500 rounded-lg font-semibold hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer group">
              <Download size={20} className="group-hover:animate-bounce" /> View Resume
            </button>
          </div>

          <div className="flex gap-6 justify-center mt-12">
            {[
              { icon: Github, href: "https://github.com/shanavasvbasheer" },
              { icon: Linkedin, href: "https://linkedin.com/in/shanavasvbasheer" },
              { icon: Mail, href: "mailto:shanavasvbasheer@gmail.com" }
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target={href.includes('http') ? "_blank" : undefined} rel={href.includes('http') ? "noopener noreferrer" : undefined} className="p-3 rounded-full hover:bg-emerald-500/20 transition-all hover:scale-125 hover:rotate-12">
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Code className="text-emerald-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">What I've Built</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 hover-lift border-2 group`}
                style={{
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-emerald-400 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm hover:bg-emerald-500/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 italic">{project.features}</p>

                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-emerald-500 hover:text-cyan-500 font-medium">
                  <Github size={18} /> View GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className={`py-32 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Award className="text-emerald-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">What I've Won</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-blue-500" />
            {achievements.map((achievement, i) => (
              <div key={i} className="relative pl-24 pb-16 last:pb-0" style={{
                animation: `slideUp 0.6s ease-out forwards`,
                animationDelay: `${i * 0.15}s`,
                opacity: 0
              }}>
                <div className="absolute left-4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg" style={{ animation: 'glow 2s ease-in-out infinite' }}>
                  <div className="w-3 h-3 bg-white rounded-full pulsing" />
                </div>

                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 hover-lift border-2 group`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-emerald-400 font-semibold text-sm mb-1">{achievement.year}</div>
                      <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">{achievement.title}</h3>
                    </div>
                    <ChevronRight className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all" />
                  </div>
                  <div className="text-gray-400 mb-2">{achievement.org}</div>
                  <p className="text-gray-500 text-sm">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-4">In Action</h2>
            <p className="text-gray-400 text-lg flex items-center justify-center gap-2"><Sparkles size={20} className="text-emerald-400" /> Hover over to see sliding animation <Sparkles size={20} className="text-cyan-400" /></p>
          </div>

          <div className="relative h-96">
            {galleryImages.map((image, i) => (<SlidingCard key={i} image={image} isActive={i === activeCard} />))}
            <button onClick={() => setActiveCard(prev => (prev - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-emerald-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm">
              <ChevronRight size={24} className="rotate-180 text-white" />
            </button>
            <button onClick={() => setActiveCard(prev => (prev + 1) % galleryImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gray-800/80 hover:bg-emerald-500/80 transition-all z-20 hover:scale-110 backdrop-blur-sm">
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>

          <CarouselNav />

          <p className="text-center text-gray-500 text-sm mt-12 italic flex items-center justify-center gap-2">✨ Hover to reveal details • Use arrows or dots to navigate • Auto-rotates every 5 seconds ✨</p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={`py-32 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="text-emerald-400" size={32} />
            <h2 className="text-5xl font-bold gradient-text">What I Use</h2>
          </div>

          {/* Tools / Language symbols row (matches README) */}
          <div className="tools-row flex flex-wrap gap-4 items-center justify-center mb-8">
            {toolIcons.map((t, i) => (
              <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" title={t.alt} className="p-1">
                <img src={t.src} alt={t.alt} />
              </a>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <div
                key={i}
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border-2 hover-lift group`}
                style={{
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Use official SVG/logo for the skill */}
                    <img src={skill.iconSrc} alt={skill.name} className="skill-icon" />
                    <span className="font-semibold text-lg group-hover:text-emerald-400 transition-colors">{skill.name}</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-lg">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`skill-bar h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`} style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Let's Build Something</h2>
          <p className="text-xl text-gray-400 mb-12">Open to opportunities, collaborations, and interesting conversations.</p>

          <div className="flex gap-6 justify-center flex-wrap mb-12">
            <a href="mailto:shanavasvbasheer@gmail.com" className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} px-8 py-4 rounded-lg hover-lift flex items-center gap-3 border-2 group`}>
              <Mail className="text-emerald-400 group-hover:scale-125 transition-transform" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Email</div>
                <div className="font-semibold group-hover:text-emerald-400 transition-colors">shanavasvbasheer@gmail.com</div>
              </div>
            </a>

            <a href="tel:+918547363158" className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} px-8 py-4 rounded-lg hover-lift flex items-center gap-3 border-2 group`}>
              <ExternalLink className="text-emerald-400 group-hover:scale-125 transition-transform" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Phone</div>
                <div className="font-semibold group-hover:text-emerald-400 transition-colors">+91 85473 63158</div>
              </div>
            </a>
          </div>

          <div className="text-gray-500 text-sm">
            <p className="mb-2">Currently pursuing M.Voc in Software Application Development at CUSAT</p>
            <p className="flex items-center justify-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Based in Kochi, Kerala, India</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'} py-8 px-6 text-center border-t-2`}>
        <p className="text-gray-500 mb-2">© 2025 Shanavas V Basheer. Built with React & Love.</p>
        <p className="text-sm text-gray-600 flex items-center justify-center gap-2"><Zap size={16} className="text-emerald-400" /> Build. Break. Better. <Rocket size={16} className="text-cyan-400" /></p>
      </footer>
    </div>
  );
};

export default Portfolio;