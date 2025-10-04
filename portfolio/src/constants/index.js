// index.js
export const servicesData = [
  {
    title: "Full-Stack Development",
    description:
      "I deliver secure, high-performance full-stack applications with smooth user experiences—engineered for growth, not headaches.",
    items: [
      {
        title: "Backend Engineering",
        description: "(Node.js, Express, REST APIs, Authentication)",
      },
      {
        title: "Frontend Excellence",
        description: "(React, Next.js, Tailwind, Interactive Interfaces)",
      },
      {
        title: "Database Architecture",
        description: "(MongoDB, Mongoose, Cloud Databases)",
      },
    ],
  },
  {
    title: "AI-Powered Solutions",
    description:
      "I integrate AI into products to unlock smarter user experiences—from automation to creative tools—helping brands stay ahead.",
    items: [
      {
        title: "AI Apps",
        description: "(Chatbots, Image Generators, AI-assisted Tools)",
      },
      {
        title: "API Integrations",
        description: "(OpenAI, Stability, Cloudinary, Payments, OAuth)",
      },
      {
        title: "Workflow Automation",
        description: "(Data Handling, Notifications, Custom Pipelines)",
      },
    ],
  },
  {
    title: "Performance & Security",
    description:
      "Fast, reliable, and safe apps earn trust. I optimize for speed and harden security so your product runs flawlessly at scale.",
    items: [
      {
        title: "Optimization",
        description: "(Caching, Lighthouse 90+ Scores, Smooth UX)",
      },
      {
        title: "Security",
        description: "(JWT/Auth, Input Validation, Vulnerability Checks)",
      },
      {
        title: "Code Quality",
        description: "(Refactoring, Debugging, Clean Architecture)",
      },
    ],
  },
  {
    title: "Deployment & Cloud",
    description:
      "I handle end-to-end deployment with modern cloud platforms, ensuring your product is always available, secure, and scalable.",
    items: [
      {
        title: "Cloud Hosting",
        description: "(Vercel, Render, Supabase, Netlify)",
      },
      {
        title: "CI/CD Workflows",
        description: "(GitHub Actions, Automated Deployments)",
      },
      {
        title: "Database Hosting",
        description: "(MongoDB Atlas, Supabase, Scalable Structures)",
      },
    ],
  },
  {
    title: "UI/UX & Product Design",
    description:
      "A product isn’t just about code—it’s about experience. I create clean, responsive, and user-focused designs that feel as good as they function.",
    items: [
      {
        title: "User-Centered Design",
        description: "(Wireframes, Flows, Minimal UI)",
      },
      {
        title: "Responsive Interfaces",
        description: "(Cross-device, Pixel Perfect, Modern Aesthetics)",
      },
      {
        title: "Product Thinking",
        description: "(Balancing usability, functionality, and growth)",
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Zarqais E-commerce",
    description:
      "A fragrance store offering a curated collection of men’s, women’s, and unisex perfumes with a smooth shopping experience.",
    href: "https://zarqais.com",
    image: "/assets/projects/zarqais.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "NYM Chat App",
    description:
      "A next-gen chat platform where users can connect with friends, chat anonymously with people worldwide, or even talk to AI assistants.",
    href: "",
    image: "/assets/projects/nym (1).png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Express" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Socket.IO" },
    ],
  },
  {
    id: 3,
    name: "Softec Management System",
    description:
      "A complete event management system with hierarchical roles (President → AP → AVP → Head → Volunteer) and a customer portal for ticket purchases.",
    href: "",
    image: "/assets/projects/softec (1).png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Spring Boot" },
      { id: 4, name: "MariaDB" },
    ],
  },
  {
    id: 4,
    name: "GameStore",
    description:
      "A gaming platform where users can browse games, watch trailers, read reviews, and build their wishlist.",
    href: "",
    image: "/assets/projects/gameexplorer (1).png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Express" },
      { id: 3, name: "MSSQL" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 5,
    name: "3D T-Shirt Customizer",
    description:
      "An interactive 3D shirt customizer where users can apply textures, logos, or even generate designs with AI.",
    href: "",
    image: "/assets/projects/shirt (1).png",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Express" },
      { id: 3, name: "Three.js" },
      { id: 4, name: "GSAP" },
    ],
  },
  {
    id: 6,
    name: "Smart Data Wiz",
    description:
      "A data-driven app where users can upload datasets, clean them, generate insights, visualize trends, and ask AI questions about their data.",
    href: "",
    image: "/assets/projects/smart-data-viz.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Python" },
      { id: 3, name: "FastAPI" },
      { id: 4, name: "Pandas" },
      { id: 5, name: "Plotly" },
    ],
  },
  {
    id: 7,
    name: "AI Code Linter",
    description:
      "An LLM-powered linting tool that analyzes code, detects bugs, and suggests fixes—bringing AI into the developer workflow.",
    href: "",
    image: "/assets/projects/ai-linter.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "PyTorch" },
      { id: 3, name: "Machine Learning" },
    ],
  },
  {
    id: 8,
    name: "PR Insight Bot",
    description:
      "A GitHub Action bot that reviews pull requests, provides insights, and recommends improvements automatically.",
    href: "",
    image: "/assets/projects/pr-insight-bot.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "YAML" },
      { id: 3, name: "GitHub Actions" },
    ],
  },
  {
    id: 9,
    name: "Voltmaster",
    description:
      "A desktop app that helps users schedule appliance usage, optimize electricity consumption, and reduce costs.",
    href: "",
    image: "/assets/projects/voltmaster (1).png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "C++" },
      { id: 2, name: "MySQL" },
      { id: 3, name: "Desktop Development" },
    ],
  },
  {
    id: 10,
    name: "Realm of Enigmas",
    description:
      "A 2D story-driven platformer where players complete mini-games, interact with NPCs, and unravel a mysterious narrative.",
    href: "",
    image: "/assets/projects/insignia (1).png",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "C++" },
      { id: 2, name: "SFML" },
      { id: 3, name: "Game Development" },
    ],
  },
];

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amar-waqar-6a1665225" },
  { name: "GitHub", href: "https://github.com/AmarWaqar-TSKLI" },
  { name: "Instagram", href: "https://www.instagram.com/amar._.waqar" }
];

export const coursesData = [
  {
    id: "fs",
    title: "Full-Stack Engineering",
    description: "Foundations to deployment across the stack.",
    courses: [
      {
        id: "fs-1",
        title: "React - The Complete Guide",
        provider: "Udemy",
        completed: true,
        verifyUrl: "https://ude.my/certificate/react-complete-guide",
        image: "/assets/projects/ai-linter.png",
      },
      {
        id: "fs-2",
        title: "Node & Express Bootcamp",
        provider: "Udemy",
        completed: true,
        verifyUrl: "https://ude.my/certificate/node-express-bootcamp",
        image: "/assets/projects/smart-data-viz.png",
      },
      {
        id: "fs-3",
        title: "MongoDB Essentials",
        provider: "MongoDB University",
        completed: false,
        verifyUrl: "https://university.mongodb.com/verify/essentials",
        image: "/assets/projects/pr-insight-bot.png",
      },
    ],
  },
  {
    id: "ai",
    title: "AI & Applied Machine Learning",
    description: "LLMs, APIs, and practical AI integrations.",
    courses: [
      {
        id: "ai-1",
        title: "Practical Deep Learning",
        provider: "fast.ai",
        completed: false,
        verifyUrl: "https://course.fast.ai/verify/deep-learning",
        image: "/assets/projects/ai-linter.png",
      },
      {
        id: "ai-2",
        title: "OpenAI API for Developers",
        provider: "OpenAI",
        completed: true,
        verifyUrl: "https://platform.openai.com/verify/dev-course",
        image: "/assets/projects/pr-insight-bot.png",
      },
      {
        id: "ai-3",
        title: "Data Visualization with Python",
        provider: "Coursera",
        completed: true,
        verifyUrl: "https://coursera.org/verify/dataviz-python",
        image: "/assets/projects/smart-data-viz.png",
      },
    ],
  },
  {
    id: "sec",
    title: "Performance & Security",
    description: "Speed, hardening, and secure practices.",
    courses: [
      {
        id: "sec-1",
        title: "Web Performance Optimization",
        provider: "Google",
        completed: true,
        verifyUrl: "https://web.dev/verify/perf-optimization",
        image: "/assets/projects/voltmaster (1).png",
      },
      {
        id: "sec-2",
        title: "OWASP Top 10",
        provider: "Coursera",
        completed: false,
        verifyUrl: "https://coursera.org/verify/owasp-top10",
        image: "/assets/projects/insignia (1).png",
      },
    ],
  },
];
