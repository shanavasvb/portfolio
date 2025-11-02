<div align="center">

# 🚀 Shanavas V Basheer - Portfolio

### Full-Stack Developer | Problem Solver | Tech Enthusiast

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](https://shanavasvb.dev) • [Report Bug](https://github.com/shanavasvb/portfolio/issues) • [Request Feature](https://github.com/shanavasvb/portfolio/issues)

![Portfolio Preview](./public/images/portfolio-preview.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)
- [Customization Guide](#-customization-guide)
- [Performance](#-performance)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

A modern, responsive, and highly interactive portfolio website built with **Next.js 14**, **React 18**, and **Tailwind CSS**. Features a unique pixelated canvas effect, interactive terminal, smooth animations, and comprehensive sections showcasing projects, skills, achievements, and contact information.

### ✨ Highlights

- 🎨 **Modern Design**: Cyan-purple-pink gradient theme with dark mode
- 🖼️ **Pixelated Canvas**: Unique animated profile image that morphs from pixelated to clear
- 💻 **Interactive Terminal**: Functional command-line interface for navigation
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ⚡ **Performance**: Lighthouse score 95+ across all metrics
- ♿ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- 🎭 **Smooth Animations**: 60fps animations with reduced motion support

---

## 🌟 Features

### Core Features
- ✅ **Hero Section** with animated pixelated profile image
- ✅ **Interactive Terminal** with working commands
- ✅ **Projects Showcase** with tech stack tags and live links
- ✅ **Achievement Timeline** with animated milestones
- ✅ **Image Gallery** with auto-rotating carousel
- ✅ **Skills Grid** with proficiency levels and animated progress bars
- ✅ **Contact Section** with copy-to-clipboard functionality
- ✅ **Professional Loading Screen** with progress indicator
- ✅ **Smooth Scroll** navigation with active section tracking
- ✅ **Back to Top** button with fade-in animation

### Technical Features
- 🔥 **Server-Side Rendering** (SSR) with Next.js 14
- 🎨 **Tailwind CSS** for utility-first styling
- 📦 **Modular Architecture** with reusable components
- 🪝 **Custom React Hooks** for state management
- 🎭 **CSS Animations** with keyframes and transitions
- 📱 **Mobile-First** responsive design
- ♿ **ARIA Labels** for screen reader support
- 🎯 **SEO Optimized** with meta tags and structured data

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with SSR
- **UI Library**: [React 18](https://reactjs.org/) - Component-based UI library
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Animations**: Custom CSS keyframes + React animations

### Tools & Development
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm / yarn / pnpm
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git + GitHub
- **Deployment**: Vercel / Netlify

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── images/                    # Static images
│       ├── myimage.jpeg
│       ├── takshak.jpeg
│       ├── kmm1.jpeg
│       └── rajagiri.jpeg
├── src/
│   ├── app/
│   │   ├── layout.jsx             # Root layout with metadata
│   │   └── page.jsx               # Main portfolio page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.jsx     # Top navigation bar
│   │   │   ├── Footer.jsx         # Footer section
│   │   │   ├── ScrollProgress.jsx # Progress bar
│   │   │   └── BackToTop.jsx      # Back to top button
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx           # Hero with profile
│   │   │   ├── ProjectsSection.jsx       # Projects showcase
│   │   │   ├── AchievementsSection.jsx   # Timeline
│   │   │   ├── GallerySection.jsx        # Image carousel
│   │   │   ├── SkillsSection.jsx         # Skills grid
│   │   │   └── ContactSection.jsx        # Contact info
│   │   ├── ui/
│   │   │   ├── LoadingScreen.jsx         # Loading animation
│   │   │   ├── PixelatedProfileImage.jsx # Canvas effect
│   │   │   ├── InteractiveTerminal.jsx   # Terminal UI
│   │   │   ├── SkillCard.jsx             # Skill card
│   │   │   ├── ProjectCard.jsx           # Project card
│   │   │   ├── AchievementCard.jsx       # Achievement card
│   │   │   ├── SlidingCard.jsx           # Gallery card
│   │   │   ├── CarouselNav.jsx           # Carousel controls
│   │   │   └── pixelated-canvas.jsx      # Canvas component
│   │   └── shared/
│   │       ├── AnimatedBackground.jsx    # Gradient blobs
│   │       └── SocialLinks.jsx           # Social icons
│   ├── hooks/
│   │   ├── useMagneticEffect.js          # Button magnetic effect
│   │   ├── useScrollTracking.js          # Scroll tracking
│   │   └── useGalleryAutoRotate.js       # Gallery auto-rotate
│   ├── utils/
│   │   ├── constants.js                  # Configuration
│   │   └── helpers.js                    # Utility functions
│   ├── data/
│   │   ├── projects.js                   # Projects data
│   │   ├── achievements.js               # Achievements data
│   │   ├── skills.js                     # Skills data
│   │   ├── gallery.js                    # Gallery images
│   │   └── tools.js                      # Tech icons
│   └── styles/
│       ├── globals.css                   # Global styles
│       └── animations.css                # CSS animations
├── .gitignore
├── jsconfig.json                         # Path aliases
├── next.config.js                        # Next.js config
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0+ / **yarn** 1.22+ / **pnpm** 8.0+
- **Git** ([Download](https://git-scm.com/))

### System Requirements

- **OS**: Windows 10+, macOS 10.15+, Linux (Ubuntu 20.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB for dependencies

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shanavasvb/portfolio.git
cd portfolio
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Set Up Environment (Optional)

Create a `.env.local` file in the root directory:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

---

## ⚙️ Configuration

### Update Personal Information

#### 1. Edit Contact Info (`src/utils/constants.js`)

```javascript
export const CONTACT_INFO = {
  email: 'your-email@example.com',
  phone: '+91 XXXXX XXXXX',
  location: 'Your City, State, Country',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername'
};
```

#### 2. Update Resume Links

```javascript
export const RESUME_FILE_ID = "your-google-drive-file-id";
```

#### 3. Replace Profile Image

Replace `/public/images/myimage.jpeg` with your profile photo.

#### 4. Update Projects (`src/data/projects.js`)

```javascript
export const projects = [
  {
    title: "Your Project Name",
    description: "Project description...",
    tech: ["React", "Node.js", "MongoDB"],
    features: "Key features...",
    repo: "https://github.com/username/repo",
    live: "https://yourdemo.com"
  },
  // Add more projects...
];
```

#### 5. Update Skills (`src/data/skills.js`)

```javascript
export const skills = [
  {
    name: "JavaScript",
    level: 95,
    iconSrc: "icon-url",
    color: "from-cyan-500 via-purple-500 to-pink-500",
    fallback: "⚡"
  },
  // Add more skills...
];
```

---

## 💻 Development

### Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

### Hot Module Replacement (HMR)

The development server supports HMR. Changes to files will automatically reflect in the browser without full page reloads.

---

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Test Production Build Locally

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shanavasvb/portfolio)

1. Push your code to GitHub
2. Import your repo to Vercel
3. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

```bash
npm run build

# Deploy .next folder to Netlify
```

Add `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Deploy to Other Platforms

- **GitHub Pages**: Use `next export` for static export
- **AWS Amplify**: Connect GitHub repo
- **Railway**: One-click deploy
- **DigitalOcean App Platform**: Import from GitHub

---

## 🎨 Customization Guide

### Change Color Theme

Edit `src/utils/constants.js`:

```javascript
export const COLOR_THEME = {
  accent: {
    cyan: '#06B6D4',     // Change primary color
    purple: '#8B5CF6',   // Change secondary color
    pink: '#EC4899',     // Change tertiary color
  }
};
```

### Modify Animations

Edit `src/styles/animations.css` to customize animations:

```css
@keyframes yourAnimation {
  from { /* start state */ }
  to { /* end state */ }
}
```

### Add New Sections

1. Create component in `src/components/sections/`
2. Import in `src/app/page.jsx`
3. Add navigation link in `src/utils/constants.js`

### Change Fonts

Update `src/app/layout.jsx`:

```javascript
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

---

## ⚡ Performance

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimization Techniques

- ✅ Code splitting with dynamic imports
- ✅ Image optimization with Next.js Image
- ✅ Lazy loading for images and components
- ✅ Minified CSS and JavaScript
- ✅ Gzip/Brotli compression
- ✅ Prefetching for navigation links
- ✅ Reduced motion support for accessibility

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Last 2 versions |
| Firefox | Last 2 versions |
| Safari  | Last 2 versions |
| Edge    | Last 2 versions |
| Opera   | Last 2 versions |

### Mobile Support

- ✅ iOS Safari 12+
- ✅ Chrome for Android
- ✅ Samsung Internet

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style

- Use **ESLint** for linting
- Use **Prettier** for formatting
- Follow **React best practices**
- Write **meaningful commit messages**

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Shanavas V Basheer**

- 📧 Email: [shanavasvbasheer@gmail.com](mailto:shanavasvbasheer@gmail.com)
- 📱 Phone: +91 85473 63158
- 💼 LinkedIn: [linkedin.com/in/shanavasvbasheer](https://linkedin.com/in/shanavasvbasheer)
- 🐙 GitHub: [@shanavasvb](https://github.com/shanavasvb)
- 🌐 Website: [shanavasvb.dev](https://shanavasvb.dev)
- 📍 Location: Kochi, Kerala, India

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Tailwind Labs** - Beautiful utility-first CSS
- **Lucide Icons** - Clean and consistent icons
- **Vercel** - Hosting and deployment platform
- **Open Source Community** - For inspiration and tools

---

## 🗺️ Roadmap

- [x] Initial release with core features
- [x] Responsive design implementation
- [x] Loading screen animation
- [ ] Blog section with MDX support
- [ ] Dark/Light theme toggle persistence
- [ ] Multi-language support (i18n)
- [ ] Analytics dashboard
- [ ] Contact form with email integration
- [ ] Testimonials section
- [ ] Project filtering by technology

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by [Shanavas V Basheer](https://github.com/shanavasvb)

**Build. Break. Better.** 🚀

</div>

---

## 📊 GitHub Stats

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/shanavasvb/portfolio?style=social)
![GitHub Forks](https://img.shields.io/github/forks/shanavasvb/portfolio?style=social)
![GitHub Issues](https://img.shields.io/github/issues/shanavasvb/portfolio)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/shanavasvb/portfolio)

</div>