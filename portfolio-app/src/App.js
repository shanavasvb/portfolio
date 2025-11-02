"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/layout/Navigation';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { GallerySection } from './components/sections/GallerySection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';
import { useScrollTracking } from './hooks/useScrollTracking';
import { throttle, isMobileDevice, prefersReducedMotion, scrollToSection } from './utils/helper';
import { NAV_ITEMS, THROTTLE_DELAY, MOUSE_PARALLAX_INTENSITY, RESUME_VIEW_URL, RESUME_DOWNLOAD_URL } from './utils/constant';
import './styles/animations.css';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollProgress, activeSection, showBackToTop } = useScrollTracking(['hero', ...NAV_ITEMS]);

  const isMobile = isMobileDevice();

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

  const handleResumeView = () => {
    window.open(RESUME_VIEW_URL, '_blank', 'noopener,noreferrer');
  };

  const handleResumeDownload = () => {
    window.open(RESUME_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Top Progress Bar */}
      <ScrollProgress progress={scrollProgress} />

      {/* Navigation Bar */}
      <Navigation 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        scrollProgress={scrollProgress} 
        activeSection={activeSection} 
      />

      {/* Back to Top Button */}
      <BackToTop show={showBackToTop} darkMode={darkMode} />

      {/* Hero Section */}
      <HeroSection 
        mousePosition={mousePosition} 
        scrollToSection={scrollToSection}
        handleResumeView={handleResumeView}
        handleResumeDownload={handleResumeDownload}
      />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactSection handleResumeDownload={handleResumeDownload} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;