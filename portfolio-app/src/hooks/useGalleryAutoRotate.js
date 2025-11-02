import { useState, useEffect } from 'react';
import { prefersReducedMotion } from '../utils/helper';
import { GALLERY_AUTO_ROTATE_INTERVAL } from '../utils/constant';

/**
 * Auto-rotate gallery images
 */
export const useGalleryAutoRotate = (totalImages) => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % totalImages);
    }, GALLERY_AUTO_ROTATE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [totalImages]);

  const nextCard = () => setActiveCard(prev => (prev + 1) % totalImages);
  const prevCard = () => setActiveCard(prev => (prev - 1 + totalImages) % totalImages);
  const goToCard = (index) => setActiveCard(index);

  return { activeCard, nextCard, prevCard, goToCard, setActiveCard };
};