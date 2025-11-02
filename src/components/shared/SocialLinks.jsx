"use client";
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constant';

export const SocialLinks = ({ size = 24, className = "" }) => {
  const socialLinks = [
    { icon: Github, href: CONTACT_INFO.github, label: "GitHub" },
    { icon: Linkedin, href: CONTACT_INFO.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${CONTACT_INFO.email}`, label: "Email" }
  ];

  return (
    <div className={`flex gap-6 ${className}`}>
      {socialLinks.map(({ icon: Icon, href, label }, i) => (
        <a 
          key={i} 
          href={href} 
          target={href.includes('http') ? "_blank" : undefined} 
          rel={href.includes('http') ? "noopener noreferrer" : undefined}
          className="p-3 rounded-full hover:bg-cyan-500/20 transition-all hover:scale-125 hover:rotate-12 group"
          aria-label={label}
        >
          <Icon size={size} className="group-hover:text-cyan-400 transition-colors" />
        </a>
      ))}
    </div>
  );
};