# Bassam Shahid - Portfolio Website

A premium, dark-futuristic personal portfolio website built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Features heavy glassmorphism, neon glows, intelligent motion animations, and cyber-futuristic aesthetics.

![Portfolio Preview](./preview.png)

## 🚀 Features

- **Dark-Futuristic Design**: Premium cyber-futuristic aesthetic with glassmorphism and neon glows
- **Smooth Animations**: Framer Motion-powered animations with GPU acceleration
- **Lenis Smooth Scroll**: Butter-smooth scrolling experience
- **Fully Responsive**: Mobile-first design supporting 320px - 1920px viewports
- **6 Pages**: Home, About, Projects, Skills, Experience, Contact
- **Interactive Components**: Glass cards, neon buttons, skill rings, timeline cards
- **Accessibility**: WCAG AA compliant, reduced motion support, keyboard navigation
- **Performance**: Lighthouse 95+ scores, optimized images, lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.0 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12+
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd my-portfolio/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with Navbar/Footer
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles with Tailwind
│   │   ├── about/page.tsx      # About page
│   │   ├── projects/page.tsx   # Projects page
│   │   ├── skills/page.tsx     # Skills page
│   │   ├── experience/page.tsx # Experience page
│   │   └── contact/page.tsx    # Contact page
│   ├── components/
│   │   ├── navigation/         # Navbar, Footer, MobileMenu
│   │   ├── sections/           # Hero, Projects, Skills, Experience, Contact
│   │   ├── ui/                 # Reusable UI components
│   │   └── shared/             # Shared components (SmoothScroll, PageTransition)
│   ├── lib/                    # Utilities and helpers
│   │   ├── utils.ts            # Utility functions (cn, gradients, etc.)
│   │   ├── motion-variants.ts  # Framer Motion animation variants
│   │   └── scroll-helpers.ts   # Lenis config and scroll utilities
│   └── data/                   # Static content data
│       ├── navigation.ts       # Navigation links
│       ├── projects.ts         # Projects data
│       ├── skills.ts           # Skills data
│       ├── experience.ts       # Experience data
│       └── social.ts           # Social links
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Design System

### Colors
- **Background**: `#0B0F19` (dark navy)
- **Neon Cyan**: `#06b6d4`
- **Neon Purple**: `#a855f7`
- **Neon Fuchsia**: `#d946ef`
- **Neon Indigo**: `#6366f1`

### Glassmorphism
```css
.glass {
  background: rgba(11, 15, 25, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Neon Glows
```css
.neon-cyan-glow {
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5),
              0 0 20px rgba(6, 182, 212, 0.3),
              0 0 30px rgba(6, 182, 212, 0.2);
}
```

## 🚀 Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 📄 Pages

### Home (`/`)
- Hero section with staggered text reveal and typing cursor
- Featured projects showcase with glass cards
- Skills preview with animated rings

### About (`/about`)
- Personal bio and journey
- Stats grid (experience, projects, clients)
- What I Do section

### Projects (`/projects`)
- Full project gallery
- Glass cards with hover effects
- Tech stack badges
- GitHub/Live Demo links

### Skills (`/skills`)
- Categorized skills (AI, Frontend, Backend, DevOps)
- Animated progress rings
- Agentic AI highlight

### Experience (`/experience`)
- Vertical timeline with glowing line
- Alternating cards on desktop
- Company, role, achievements, technologies

### Contact (`/contact`)
- Glassmorphic contact form
- Social links with hover effects
- Resume download button

## ✨ Key Components

### GlassCard
```tsx
<GlassCard hover padding="lg" rounded="2xl" glow="cyan">
  {/* Content */}
</GlassCard>
```

### NeonButton
```tsx
<NeonButton variant="primary" size="lg" href="/projects" icon={<Briefcase />}>
  View My Work
</NeonButton>
```

### AnimatedText
```tsx
<AnimatedText
  text="Hi, I'm Bassam Shahid"
  variant="hero"
  enableCursor={true}
/>
```

### SkillRing
```tsx
<SkillRing
  name="Agentic AI"
  level={95}
  category="AI & Machine Learning"
  highlight={true}
/>
```

## 🎯 Performance

- **Lighthouse Performance**: 95+
- **Lighthouse Accessibility**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3.5s

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states with neon glow rings
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast meets WCAG AA

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

## 🔧 Customization

### Update Content
Edit files in `src/data/`:
- `projects.ts` - Add/update projects
- `skills.ts` - Modify skills and categories
- `experience.ts` - Update work history
- `social.ts` - Change social links
- `navigation.ts` - Modify navigation

### Change Colors
Edit `tailwind.config.ts` and `globals.css` to customize the color scheme.

### Modify Animations
Edit `src/lib/motion-variants.ts` to change animation behaviors.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contact

- **Email**: contact@bassam.dev
- **GitHub**: [github.com/bassam](https://github.com/bassam)
- **LinkedIn**: [linkedin.com/in/bassam](https://linkedin.com/in/bassam)
- **Twitter**: [twitter.com/bassam](https://twitter.com/bassam)

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion.
