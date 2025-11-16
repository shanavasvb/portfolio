// Animation & Performance Constants
export const ANIMATION_DELAY_INCREMENT = 0.15;
export const GALLERY_AUTO_ROTATE_INTERVAL = 5000;
export const SCROLL_THRESHOLD = 150;
export const MOUSE_PARALLAX_INTENSITY = 15;
export const THROTTLE_DELAY = 16; // ~60fps

// Resume Configuration
export const RESUME_FILE_ID = "1cb09ib9y-J_S5h6rmALXIbVDyv9A1bdQ";
export const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing`;
export const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

// Modern Color Palette - Cyan, Purple, Pink
export const COLOR_THEME = {
  bg: {
    primary: '#0A0F1E',      // Deep space blue
    secondary: '#141B2D',    // Rich navy
    card: '#1A2332',         // Card background
    hover: '#202A3F'         // Hover state
  },
  accent: {
    cyan: '#06B6D4',         // Vibrant cyan
    purple: '#8B5CF6',       // Rich purple
    pink: '#EC4899',         // Hot pink
    emerald: '#10B981'       // Success green
  },
  text: {
    primary: '#F1F5F9',      // Off-white
    secondary: '#94A3B8',    // Muted gray
    muted: '#64748B'         // Very muted
  }
};

// Navigation Items
export const NAV_ITEMS = ['projects', 'achievements', 'gallery', 'skills', 'contact'];

// Contact Information
export const CONTACT_INFO = {
  email: 'shanavasvbasheer@gmail.com',
  phone: '+91 85473 63158',
  location: 'Kochi, Kerala, India',
  github: 'https://github.com/shanavasv',
  linkedin: 'https://linkedin.com/in/shanavasvbasheer'
};