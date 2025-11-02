"use client";
import React from 'react';
import { Award } from 'lucide-react';
import { AchievementCard } from '../ui/AchievementCard';
import { achievements } from '../../data/achievements';

export const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-32 px-6 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          <Award className="text-cyan-400" size={32} />
          <h2 className="text-5xl font-bold gradient-text">Achievements & Experience</h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />
          
          {achievements.map((achievement, i) => (
            <AchievementCard key={i} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};