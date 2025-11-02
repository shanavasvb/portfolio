import { useState, useEffect, useCallback } from 'react';
import { throttle } from '../utils/helper';
import { THROTTLE_DELAY, SCROLL_THRESHOLD } from '../utils/constant';

/**
 * Track scroll progress and active section
 */
export const useScrollTracking = (sections) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(
    throttle(() => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);

      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= SCROLL_THRESHOLD && rect.bottom >= SCROLL_THRESHOLD;
        }
        return false;
      });
      if (current) setActiveSection(current);
    }, THROTTLE_DELAY),
    [sections]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { scrollProgress, activeSection, showBackToTop };
};