"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, Copy, Check } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constant';
import { copyToClipboard } from '../../utils/helper';

export const ContactSection = ({ handleResumeDownload }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(CONTACT_INFO.email);
    if (success) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
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
            onClick={handleCopyEmail}
            className="bg-gray-800/80 border-2 border-cyan-500/20 px-8 py-8 rounded-2xl hover-lift flex items-center gap-4 group hover:border-cyan-500/70 text-left relative overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <div className="p-4 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
              <Mail className="text-cyan-400 group-hover:scale-125 transition-transform" size={28} />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1 font-semibold">Email</div>
              <div className="font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                {CONTACT_INFO.email}
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
            href={`tel:${CONTACT_INFO.phone}`}
            className="bg-gray-800/80 border-2 border-cyan-500/20 px-8 py-8 rounded-2xl hover-lift flex items-center gap-4 group hover:border-cyan-500/70 text-left transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <div className="p-4 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
              <Phone className="text-purple-400 group-hover:scale-125 transition-transform" size={28} />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 font-semibold">Phone</div>
              <div className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                {CONTACT_INFO.phone}
              </div>
            </div>
          </a>
        </div>

        {/* Location & Availability Card */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border-2 border-cyan-500/20 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={20} className="text-cyan-400" />
            <p className="text-gray-300 text-lg font-semibold">Based in {CONTACT_INFO.location}</p>
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
  );
};