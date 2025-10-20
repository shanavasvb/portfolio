import React, { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, Download, Award, Code, Terminal, Sun, Moon, ExternalLink, ChevronRight } from 'lucide-react';
import '../Portfolio.css';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Resume configurations
  const RESUME_FILE_ID = "1cb09ib9y-J_S5h6rmALXIbVDyv9A1bdQ";
  const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;
  const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing`;

  const fullText = "shanavas@portfolio:~$ whoami";

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
  }, []);

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

  // Function to handle resume view
  const handleResumeClick = () => {
    window.open(RESUME_VIEW_URL, '_blank');
  };

  // Function to download resume
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = RESUME_DOWNLOAD_URL;
    link.download = 'Shanavas_V_Basheer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = useMemo(() => [
    {
      title: "HomeServer Frontend",
      description: "Secure personal cloud storage system with JWT authentication and responsive UI",
      tech: ["React", "JWT", "REST API"],
      features: "Modern UI/UX with cross-device compatibility"
    },
    {
      title: "Barcode Product Processor",
      description: "Automated barcode data extraction with AI-powered categorization",
      tech: ["Python", "Gemini AI", "OpenFoodFacts"],
      features: "Offline caching & batch processing for large datasets"
    },
    {
      title: "Family Directory",
      description: "Web-based family app with profiles, events, and messaging",
      tech: ["React", "Node.js", "MongoDB"],
      features: "Privacy-focused with responsive design"
    }
  ], []);

  const achievements = useMemo(() => [
    { year: "2025", title: "Software Development Intern", org: "Datcarts", description: "Built scalable product management system for 6 supermarket chains" },
    { year: "2024", title: "Technical Workshop", org: "UC College TechFest", description: "Conducted modern web development workshop" },
    { year: "2024", title: "Competition Winner", org: "Kerala Colleges", description: "Won coding, web design, and debugging competitions" },
    { year: "2023", title: "KKEM Bootcamp", org: "Kerala Knowledge Economy Mission", description: "Completed software development bootcamp" }
  ], []);

  const skills = useMemo(() => [
    { name: "C++", level: 95, icon: "💻" },
    { name: "JavaScript", level: 95, icon: "🚀" },
    { name: "React", level: 90, icon: "⚛️" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "MongoDB", level: 90, icon: "🍃" },
    { name: "Python", level: 85, icon: "🐍" },
    { name: "Swift", level: 70, icon: "🍎" },
    { name: "AWS", level: 75, icon: "☁️" }
  ], []);

  // Gallery images - Replace with your local images
  // To use local images, change to: require('../images/image1.jpg')
  // Make sure you have an 'images' folder in src/
  const galleryImages = useMemo(() => [
    { 
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=800&fit=crop", 
      caption: "Coding Competition 2024", 
      award: "1st Place",
      localPath: "/images/competition1.jpg" // Update when you add local images
    },
    { 
      url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=800&fit=crop", 
      caption: "Web Design Contest", 
      award: "Winner",
      localPath: "/images/design-contest.jpg"
    },
    { 
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop", 
      caption: "Workshop at TechFest", 
      award: "Speaker",
      localPath: "/images/workshop.jpg"
    },
    { 
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=800&fit=crop", 
      caption: "Debugging Championship", 
      award: "Champion",
      localPath: "/images/debugging.jpg"
    },
    { 
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop", 
      caption: "Team Collaboration", 
      award: "Project Lead",
      localPath: "/images/team.jpg"
    }
  ], []);

  // Enhanced Zoom & Tilt Card Animation
  const GalleryCard = React.memo(({ image, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      setMousePosition({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    return (
      <div 
        className="gallery-card relative h-96 w-72 overflow-hidden rounded-xl cursor-pointer group flex-shrink-0"
        data-index={index}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${mousePosition.rotateX}deg) rotateY(${mousePosition.rotateY}deg) scale(1.05)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Image Container */}
        <div 
          className="absolute inset-0 overflow-hidden rounded-xl"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.4s ease-out'
          }}
        >
          <img 
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Overlay Gradient */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-all duration-300 rounded-xl ${
            isHovered ? 'opacity-100' : 'opacity-70'
          }`}
        />

        {/* Shine Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease-in-out'
          }}
        />

        {/* Content */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            opacity: isHovered ? 1 : 0.9
          }}
        >
          <div className="text-emerald-400 text-sm font-bold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            {image.award}
          </div>
          <h3 className="text-white font-bold text-lg">{image.caption}</h3>
          <div 
            className="mt-3 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
            style={{
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.3s ease-out'
            }}
          />
        </div>

        {/* Badge Animation */}
        <div 
          className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white"
          style={{
            transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.8)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s ease-out'
          }}
        >
          Featured
        </div>
      </div>
    );
  });

  GalleryCard.displayName = 'GalleryCard';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrollProgress > 5 ? (darkMode ? 'bg-gray-900/95 backdrop-blur-lg' : 'bg-gray-50/95 backdrop-blur-lg') : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            SVB
          </div>
          <div className="flex gap-6 items-center">
            {['projects', 'achievements', 'gallery', 'skills'].map(item => (
              <a
                key={item}
                href={`#${item}`}
                className={`nav-link text-sm font-medium ${activeSection === item ? 'active text-emerald-400' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-emerald-500/20 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }} />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '1s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 mb-8 inline-block font-mono text-left shadow-lg border border-emerald-500/30`}>
            <div className="text-emerald-400 mb-2">
              {terminalText}
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▋</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">→</span> Full-Stack Developer | Competitive Coder | Builder
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Shanavas V Basheer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed">
            Experienced Full-Stack Developer specializing in backend architecture and enterprise-grade solutions.
            Building scalable systems, automating workflows, and solving complex problems.
          </p>

          <p className="text-emerald-400 text-lg md:text-xl mb-12 font-semibold">
            Build. Break. Better.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <a
              href="mailto:shanavasvbasheer@gmail.com"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Mail size={20} />
              Get In Touch
            </a>
            <button
              onClick={handleResumeClick}
              className="px-8 py-4 border-2 border-emerald-500 rounded-lg font-semibold hover:bg-emerald-500/10 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              View Resume
            </button>
          </div>

          <div className="flex gap-6 justify-center mt-12">
            <a href="https://github.com/shanavasvbasheer" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-emerald-500/20 transition-all hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/shanavasvbasheer" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-emerald-500/20 transition-all hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:shanavasvbasheer@gmail.com" className="p-3 rounded-full hover:bg-emerald-500/20 transition-all hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Code className="text-emerald-400" size={32} />
            <h2 className="text-5xl font-bold">What I've Built</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 hover-lift border`}
                style={{ 
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-emerald-400">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 italic">{project.features}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className={`py-32 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Award className="text-emerald-400" size={32} />
            <h2 className="text-5xl font-bold">What I've Won</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-cyan-500" />
            
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className="relative pl-24 pb-16 last:pb-0"
                style={{ 
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0
                }}
              >
                <div className="absolute left-4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg" style={{ animation: 'glow 2s ease-in-out infinite' }}>
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 hover-lift border`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-emerald-400 font-semibold text-sm mb-1">{achievement.year}</div>
                      <h3 className="text-xl font-bold">{achievement.title}</h3>
                    </div>
                    <ChevronRight className="text-gray-500" />
                  </div>
                  <div className="text-gray-400 mb-2">{achievement.org}</div>
                  <p className="text-gray-500 text-sm">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - New Animation */}
      <section id="gallery" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">In Action</h2>
            <p className="text-gray-400 text-lg">Moments from competitions, workshops, and achievements</p>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide justify-center md:justify-start px-4">
            {galleryImages.map((image, i) => (
              <GalleryCard key={`gallery-${i}`} image={image} index={i} />
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8 italic">
            Hover over images for 3D tilt & zoom effect • Add your images to src/images folder
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Terminal className="text-emerald-400" size={32} />
            <h2 className="text-5xl font-bold">What I Use</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <div
                key={i}
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}
                style={{ 
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{skill.icon}</span>
                    <span className="font-semibold text-lg">{skill.name}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Also Experienced With</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Express.js", "REST APIs", "Git", "Firebase", "EC2", "S3", "SwiftUI", "Kotlin"].map((tech, i) => (
                <span key={i} className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-lg text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Let's Build Something</h2>
          <p className="text-xl text-gray-400 mb-12">
            Open to opportunities, collaborations, and interesting conversations.
          </p>

          <div className="flex gap-6 justify-center flex-wrap mb-12">
            <a
              href="mailto:shanavasvbasheer@gmail.com"
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} px-8 py-4 rounded-lg hover-lift flex items-center gap-3 border`}
            >
              <Mail className="text-emerald-400" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Email</div>
                <div className="font-semibold">shanavasvbasheer@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+918547363158"
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} px-8 py-4 rounded-lg hover-lift flex items-center gap-3 border`}
            >
              <ExternalLink className="text-emerald-400" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Phone</div>
                <div className="font-semibold">+91 85473 63158</div>
              </div>
            </a>
          </div>

          <div className="text-gray-500 text-sm">
            <p>Currently pursuing M.Voc in Software Application Development at CUSAT</p>
            <p className="mt-2">Based in Kozhikode, Kerala, India</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'} py-8 px-6 text-center border-t`}>
        <p className="text-gray-500">
          © 2025 Shanavas V Basheer. Built with React & Love.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Build. Break. Better.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;