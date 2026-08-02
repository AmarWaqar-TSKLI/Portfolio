# Amar Waqar — Portfolio

Personal developer portfolio for **Amar Waqar**, Full-Stack & AI Engineer.

Live: [portfolio-six-ecru-43dtfnfl85.vercel.app](https://portfolio-six-ecru-43dtfnfl85.vercel.app)

## Tech Stack

| Technology       | Description                             |
| ---------------- | ---------------------------------------- |
| **React (Vite)** | Fast dev server and production bundling |
| **Tailwind CSS** | Utility-first styling for components    |
| **GSAP**         | Scroll-based animation and motion logic |
| **Three.js**     | 3D hero scene, powered by React Three Fiber |
| **Drei**         | Helpers for 3D rendering                |
| **Lenis**        | Smooth scrolling                        |

## Features

- 3D hero section with an animated planet and ring
- Scroll-triggered service summary with horizontal word motion
- Works section with hover previews and a detail modal per project
- About section with clip-path image reveal and typewriter text
- Courses section listing verified certifications
- Marquee-based contact summary and CTA
- Responsive across screen sizes

## Setup

```bash
git clone https://github.com/AmarWaqar-TSKLI/Portfolio.git
cd Portfolio/portfolio
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Project structure

- `src/constants/index.js` — services, projects, socials, courses data
- `src/sections/` — page sections (Hero, Works, About, Services, Contact, Courses, Navbar)
- `src/components/` — shared components (project modal, animated header, marquee, planet)
