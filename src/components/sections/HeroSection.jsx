"use client";
import React from 'react';
import { Mail, Download, Zap, Rocket } from 'lucide-react';
import { InteractiveTerminal } from '../ui/InteractiveTerminal';
import { PixelatedProfileImage } from '../ui/PixelatedProfileImage';
import { SocialLinks } from '../shared/SocialLinks';
import { AnimatedBackground } from '../shared/AnimatedBackground';
import { CONTACT_INFO } from '../../utils/constant';

export const HeroSection = ({ mousePosition, scrollToSection, handleResumeView, handleResumeDownload }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">
      {/* Animated Mesh Gradient Background */}
      <AnimatedBackground mousePosition={mousePosition} />

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
                href={`mailto:${CONTACT_INFO.email}`}
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
            <SocialLinks className="mt-8 text-reveal" style={{ animationDelay: '1.2s' }} />
          </div>

          {/* Right Column - Pixelated Image */}
          <div className="order-1 md:order-2 flex justify-center items-center text-reveal" style={{ animationDelay: '0.3s' }}>
            <PixelatedProfileImage src="/images/myimage.jpeg" />
          </div>
        </div>
      </div>
    </section>
  );
};