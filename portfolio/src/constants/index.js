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
    repoUrl: "https://github.com/your-org/zarqais", // replace when ready
    liveUrl: "https://zarqais.com",
    features: [
      "Catalog browsing and search",
      "Cart and checkout flow",
      "Responsive design with Tailwind CSS",
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
    repoUrl: "https://github.com/your-org/nym-chat", // replace when ready
    features: [
      "Realtime chat with Socket.IO",
      "Anonymous + friends modes",
      "AI assistants integration",
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
    repoUrl: "https://github.com/your-org/softec", // replace when ready
    features: [
      "Role-based access control",
      "Ticket sales customer portal",
      "Hierarchical admin dashboard",
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
    repoUrl: "https://github.com/your-org/gamestore", // replace when ready
    liveUrl: "https://gamestore.example.com", // replace when live
    features: [
      "Trailers, reviews, and wishlists",
      "Genre filters and search",
      "Modern UI and smooth interactions",
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
    repoUrl: "https://github.com/your-org/3d-shirt-customizer", // replace when ready
    features: [
      "Texture and logo application",
      "AI-generated designs",
      "3D interactions with Three.js",
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
    repoUrl: "https://github.com/your-org/smart-data-wiz", // replace when ready
    features: [
      "Dataset upload and cleaning",
      "Interactive charts",
      "AI Q&A on data",
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
    repoUrl: "https://github.com/your-org/ai-code-linter", // replace when ready
    features: [
      "Bug detection with LLMs",
      "Actionable fix suggestions",
      "Developer workflow integration",
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
    repoUrl: "https://github.com/your-org/pr-insight-bot", // replace when ready
    features: [
      "Automated PR reviews",
      "Insights and recommendations",
      "Seamless CI integration",
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
    repoUrl: "https://github.com/your-org/voltmaster", // replace when ready
    features: [
      "Usage scheduling",
      "Electricity optimization",
      "Cost reduction analytics",
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
    repoUrl: "https://github.com/your-org/realm-of-enigmas", // replace when ready
    features: [
      "Story-driven gameplay",
      "NPC interactions",
      "Mini-games and puzzles",
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
    id: "fe-meta",
    title: "Frontend Development",
    description: "Meta Front-End Developer · Coursera",
    courses: [
      {
        id: "fe-1",
        title: "Programming with JavaScript",
        provider: "Meta · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/K8FVSPQ6RETF",
        image: "/assets/certs/Coursera K8FVSPQ6RETF-1.png",
      },
      {
        id: "fe-2",
        title: "React Basics",
        provider: "Meta · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/2KGZBC8J78IE",
        image: "/assets/certs/Coursera 2KGZBC8J78IE-1.png",
      },
      {
        id: "fe-3",
        title: "Advanced React",
        provider: "Meta · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/4EQOY0YK6LGQ",
        image: "/assets/certs/Coursera 4EQOY0YK6LGQ-1.png",
      },
      {
        id: "fe-4",
        title: "HTML and CSS in Depth",
        provider: "Meta · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/Z0U5ZQ0PVMSV",
        image: "/assets/certs/Coursera Z0U5ZQ0PVMSV-1.png",
      },
      {
        id: "fe-5",
        title: "Version Control",
        provider: "Meta · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/CW4LFWCM8VEI",
        image: "/assets/certs/Coursera CW4LFWCM8VEI-1.png",
      },
      {
        id: "fe-6",
        title: "Principles of UI/UX Design",
        provider: "Meta · Coursera",
        completed: false,
      },
    ],
  },
  {
    id: "py4e",
    title: "Python for Everybody",
    description: "University of Michigan · Coursera",
    courses: [
      {
        id: "py4e-1",
        title: "Programming for Everybody (Getting Started with Python)",
        provider: "University of Michigan · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/MS1C6OOFEK93",
        image: "/assets/certs/Coursera MS1C6OOFEK93-1.png",
      },
      {
        id: "py4e-2",
        title: "Python Data Structures",
        provider: "University of Michigan · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/MMU210FA3S9P",
        image: "/assets/certs/Coursera MMU210FA3S9P-1.png",
      },
      {
        id: "py4e-3",
        title: "Using Python to Access Web Data",
        provider: "University of Michigan · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/FQOH6FL1Q2JX",
        image: "/assets/certs/Coursera FQOH6FL1Q2JX-1.png",
      },
      {
        id: "py4e-4",
        title: "Using Databases with Python",
        provider: "University of Michigan · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/RKB08GBCMJBL",
        image: "/assets/certs/Coursera RKB08GBCMJBL-1.png",
      },
      {
        id: "py4e-5",
        title:
          "Retrieving, Processing, and Visualizing Data with Python",
        provider: "University of Michigan · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/MAMFYUUS453D",
        image: "/assets/certs/Coursera MAMFYUUS453D-1.png",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps Foundations",
    description: "AWS Cloud Technical Essentials · Coursera",
    courses: [
      {
        id: "cloud-1",
        title: "AWS Cloud Technical Essentials",
        provider: "AWS · Coursera",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/GZ4B10P1ZGP6",
        image: "/assets/certs/Coursera GZ4B10P1ZGP6-1.png",
      },
    ],
  },
  {
    id: "genai",
    title: "Generative AI Foundations",
    description: "Google · DeepLearning.AI",
    courses: [
      {
        id: "genai-1",
        title: "Introduction to Generative AI",
        provider: "Google",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/WIWQWPY5B6PA",
        image: "/assets/certs/Coursera WIWQWPY5B6PA-1.png",
      },
      {
        id: "genai-2",
        title: "Introduction to Large Language Models",
        provider: "Google",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/R0HYCTWIA3AB",
        image: "/assets/certs/Coursera R0HYCTWIA3AB-1.png",
      },
      {
        id: "genai-3",
        title: "Introduction to Responsible AI",
        provider: "Google",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/UB4FW11JBCTI",
        image: "/assets/certs/Coursera UB4FW11JBCTI-1.png",
      },
      {
        id: "genai-4",
        title: "Generative AI with LLMs",
        provider: "DeepLearning.AI",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/0REIT0AD4BMS",
        image: "/assets/certs/Coursera 0REIT0AD4BMS-1.png",
      },
      {
        id: "genai-5",
        title: "Responsible AI: Applying AI Principles with Google Cloud",
        provider: "DeepLearning.AI",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/DP28UDA5CDO2",
        image: "/assets/certs/Coursera DP28UDA5CDO2-1.png",

      },
      {
        id: "genai-6",
        title: "AI for Everyone",
        provider: "DeepLearning.AI",
        completed: true,
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/GPI92KZAWCD0",
        image: "/assets/certs/Coursera GPI92KZAWCD0-1.png",

      }
    ],
  },
  {
    id: "ml-spec",
    title: "Machine Learning Specialization",
    description: "DeepLearning.AI · Coursera",
    courses: [
      {
        id: "ml-1",
        title: "Supervised Machine Learning: Regression and Classification",
        provider: "DeepLearning.AI · Coursera",
        completed: false,
      },
      {
        id: "ml-2",
        title: "Advanced Learning Algorithms",
        provider: "DeepLearning.AI · Coursera",
        completed: false,
      },
      {
        id: "ml-3",
        title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
        provider: "DeepLearning.AI · Coursera",
        completed: false,
      },
    ],
  },
];
