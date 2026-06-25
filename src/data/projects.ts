export type Project = {
  slug: string;
  n: string;
  title: string;
  kind: string;
  category: "web" | "business" | "education" | "healthcare" | "design";
  year: string;
  blurb: string;
  longDescription: string[];
  tags: string[];
  features: string[];
  stack: { label: string; items: string[] }[];
  metrics: { label: string; value: string }[];
  live: string;
  code: string;
  cover: string;
  color: string;
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "sanket-musics",
    n: "01",
    title: "Sanket Musics",
    kind: "Progressive Web App",
    category: "web",
    year: "2024",
    blurb:
      "An ad-free PWA for discovering, streaming and managing music. Google auth, unlimited playlists, smooth UI.",
    longDescription: [
      "Sanket Musics is a front-end focused progressive web app for discovering and streaming music — completely ad-free. The brief was simple: make finding music feel instant and listening feel calm.",
      "Authentication is one-tap via Google, playlists are unlimited, and the player itself is built around quick keyboard shortcuts and subtle motion that reinforces what's happening without ever getting in the way.",
      "The result is a lightweight, install-anywhere experience that loads quickly on poor networks and behaves like a native app once added to the home screen.",
    ],
    tags: ["React", "Tailwind", "PWA", "Firebase", "JavaScript"],
    features: [
      "Ad-free streaming with a focused player UI",
      "Instant Google authentication, no manual sign-up",
      "Unlimited playlists, likes and recently played",
      "Fast fuzzy search across trending and popular tracks",
      "Installable PWA with offline shell",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Tailwind", "Framer Motion"] },
      { label: "Backend", items: ["Firebase Auth", "Firestore"] },
      { label: "Tooling", items: ["Vite", "Workbox PWA"] },
    ],
    metrics: [
      { label: "Lighthouse PWA", value: "100" },
      { label: "First paint", value: "< 1.1s" },
      { label: "Active features", value: "12" },
    ],
    live: "https://dsmusics.netlify.app/",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-ember/30 to-clay/20",
    accent: "#c2410c",
  },
  {
    slug: "kodjobs",
    n: "02",
    title: "KodJobs — Job Portal",
    kind: "Full-stack platform",
    category: "business",
    year: "2024",
    blurb:
      "Job marketplace with employer dashboards, candidate resumes, JWT auth and filtered search.",
    longDescription: [
      "KodJobs is an end-to-end job portal — employers can post openings, candidates can apply, and an admin keeps the whole platform healthy.",
      "I designed the role-based dashboards, set up secure JWT auth and built clean REST endpoints in Spring Boot. Filtering and pagination were tuned so the listing page stays fast even with thousands of jobs.",
    ],
    tags: ["Spring Boot", "React", "MySQL", "JWT"],
    features: [
      "Employer & candidate authentication with JWT",
      "Job posting, application and status tracking",
      "Resume upload, filtering and download",
      "Admin dashboard for monitoring activity",
      "Search with category, location and tag filters",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Tailwind", "Redux Toolkit"] },
      { label: "Backend", items: ["Spring Boot", "Spring Security", "JWT"] },
      { label: "Database", items: ["MySQL"] },
    ],
    metrics: [
      { label: "Roles", value: "3" },
      { label: "API endpoints", value: "40+" },
      { label: "Avg response", value: "~120ms" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-cobalt/25 to-moss/20",
    accent: "#1e40af",
  },
  {
    slug: "learnsphere",
    n: "03",
    title: "LearnSphere",
    kind: "Online learning",
    category: "education",
    year: "2024",
    blurb:
      "LMS with role-based access for admins, instructors and students. Video lessons, quizzes and certificates.",
    longDescription: [
      "LearnSphere is an interactive learning management platform — instructors can create courses, students can enrol, and progress is tracked all the way through to a downloadable certificate.",
      "Video lessons stream smoothly, quizzes are auto-graded, and the dashboard summarises what each student should do next.",
    ],
    tags: ["Spring Boot", "React", "WebRTC", "MySQL"],
    features: [
      "Role-based access (admin, instructor, student)",
      "Course creation, enrolment and progress tracking",
      "Video lessons, quizzes and certificates",
      "Live class rooms via WebRTC",
      "Notifications and progress reports",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Tailwind", "TanStack Query"] },
      { label: "Backend", items: ["Spring Boot", "WebRTC"] },
      { label: "Database", items: ["MySQL"] },
    ],
    metrics: [
      { label: "User roles", value: "3" },
      { label: "Course modules", value: "Unlimited" },
      { label: "Auto-graded quizzes", value: "Yes" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-moss/30 to-ember-soft/40",
    accent: "#15803d",
  },
  {
    slug: "fintrack",
    n: "04",
    title: "FinTrack",
    kind: "Personal finance",
    category: "business",
    year: "2023",
    blurb:
      "Track expenses, plan budgets, generate reports. Interactive charts, exportable PDF/Excel.",
    longDescription: [
      "FinTrack helps people understand where their money actually goes. Add an expense, tag it, and the dashboard updates with clear charts and a monthly summary.",
      "Reports export cleanly to PDF and Excel, and a monthly planner nudges you when you're drifting away from the budget you set.",
    ],
    tags: ["Spring Boot", "React", "Chart.js"],
    features: [
      "Income & expense tracking with tags",
      "Monthly budget planner with nudges",
      "Interactive charts and reports",
      "Export to PDF / Excel",
      "Multi-account support",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Chart.js", "Tailwind"] },
      { label: "Backend", items: ["Spring Boot"] },
      { label: "Database", items: ["MySQL"] },
    ],
    metrics: [
      { label: "Categories", value: "20+" },
      { label: "Chart types", value: "6" },
      { label: "Exports", value: "PDF & XLSX" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-clay/40 to-paper-deep",
    accent: "#a16207",
  },
  {
    slug: "mealmate",
    n: "05",
    title: "MealMate",
    kind: "Food delivery",
    category: "business",
    year: "2023",
    blurb:
      "Order, cart and real-time delivery tracking with an admin dashboard for restaurants.",
    longDescription: [
      "MealMate is a food delivery platform with browsing, cart, checkout and real-time tracking. Restaurants get a clean admin dashboard to manage menus and incoming orders.",
    ],
    tags: ["Python", "JavaScript", "REST"],
    features: [
      "Browse restaurants and menus",
      "Cart and order management",
      "Real-time delivery updates",
      "Order history and re-order",
      "Restaurant admin dashboard",
    ],
    stack: [
      { label: "Frontend", items: ["JavaScript", "HTML", "CSS"] },
      { label: "Backend", items: ["Python", "Flask"] },
      { label: "Database", items: ["MySQL"] },
    ],
    metrics: [
      { label: "User flows", value: "5" },
      { label: "Roles", value: "3" },
      { label: "Live tracking", value: "Yes" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-ember/40 to-ember-soft/30",
    accent: "#dc2626",
  },
  {
    slug: "pneumonia-detection",
    n: "06",
    title: "Pneumonia Detection",
    kind: "Deep learning",
    category: "healthcare",
    year: "2023",
    blurb:
      "CNN X-ray classifier with transfer learning, augmentation and ROC-AUC evaluation.",
    longDescription: [
      "An image classification model that detects pneumonia from chest X-rays using convolutional neural networks. I trained the model with data augmentation, dropout regularisation and transfer learning from a pre-trained backbone.",
      "Evaluation included a confusion matrix and ROC-AUC analysis so the model could be inspected, not just trusted.",
    ],
    tags: ["Python", "TensorFlow", "Keras"],
    features: [
      "Deep CNN trained on chest X-ray dataset",
      "Data augmentation & dropout regularisation",
      "Transfer learning from pre-trained models",
      "Confusion matrix & ROC-AUC evaluation",
      "Reproducible training notebook",
    ],
    stack: [
      { label: "Modelling", items: ["TensorFlow", "Keras"] },
      { label: "Tooling", items: ["NumPy", "Pandas", "Matplotlib"] },
    ],
    metrics: [
      { label: "ROC-AUC", value: "0.96" },
      { label: "Val accuracy", value: "94%" },
      { label: "Epochs", value: "30" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-cobalt/20 to-paper-deep",
    accent: "#0e7490",
  },
  {
    slug: "hospital-management",
    n: "07",
    title: "Hospital Management System",
    kind: "Healthcare platform",
    category: "healthcare",
    year: "2023",
    blurb:
      "Manage patients, appointments, staff and records with role-based access.",
    longDescription: [
      "A full-stack web app that handles the day-to-day of a hospital — patient registration, appointment scheduling, staff & doctor management and medical records, all behind role-based access control.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Python"],
    features: [
      "Patient registration and medical records",
      "Appointment scheduling system",
      "Role-based access (doctors, receptionists, admins)",
      "Secure CRUD operations",
      "Doctor & staff management",
    ],
    stack: [
      { label: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
      { label: "Backend", items: ["Python", "Django"] },
      { label: "Database", items: ["MySQL"] },
    ],
    metrics: [
      { label: "Roles", value: "3" },
      { label: "Modules", value: "6" },
      { label: "Records", value: "Unlimited" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-moss/20 to-paper-deep",
    accent: "#0f766e",
  },
  {
    slug: "kodbook",
    n: "08",
    title: "KodBook — Social Network",
    kind: "Social platform",
    category: "web",
    year: "2023",
    blurb:
      "Social networking app with profiles, posts, likes, comments and multimedia sharing.",
    longDescription: [
      "KodBook is a responsive social networking app where users create profiles, post content, interact through likes & comments and share images and video. I built it with a modular front-end and a clean REST API on the back-end.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "SQL"],
    features: [
      "User authentication and profile pages",
      "Posts with likes and threaded comments",
      "Image and video uploads",
      "Friend / follow relationships",
      "Notification feed",
    ],
    stack: [
      { label: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
      { label: "Backend", items: ["Node.js", "Express"] },
      { label: "Database", items: ["SQL"] },
    ],
    metrics: [
      { label: "Core models", value: "5" },
      { label: "Media types", value: "Image · Video" },
      { label: "API endpoints", value: "25+" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-cobalt/30 to-ember-soft/20",
    accent: "#7c3aed",
  },
  {
    slug: "ecommerce",
    n: "09",
    title: "E-commerce Platform",
    kind: "Online store",
    category: "business",
    year: "2024",
    blurb:
      "Complete store with catalog, cart, order history, secure payments and admin analytics.",
    longDescription: [
      "A full e-commerce platform — product catalog, cart, checkout, order history and secure payments. The admin panel handles inventory, orders and basic analytics.",
    ],
    tags: ["Spring Boot", "React", "Redux", "MySQL"],
    features: [
      "Product browsing with filters & sorting",
      "Cart and secure checkout",
      "Order history and user accounts",
      "Admin inventory and order management",
      "Basic analytics dashboard",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Redux", "Tailwind"] },
      { label: "Backend", items: ["Spring Boot"] },
      { label: "Database", items: ["MySQL"] },
    ],
    metrics: [
      { label: "Catalog filters", value: "8" },
      { label: "Roles", value: "Admin · Customer" },
      { label: "Payments", value: "Stripe-ready" },
    ],
    live: "#",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-clay/30 to-ember/20",
    accent: "#b45309",
  },
  {
    slug: "portfolio-v1",
    n: "10",
    title: "Portfolio v1",
    kind: "Personal site",
    category: "design",
    year: "2024",
    blurb:
      "First portfolio site — projects, skills, certifications and resume, deployed on Netlify.",
    longDescription: [
      "The first version of my portfolio — a clean, responsive site to showcase projects, skills, certifications and my resume. Animations are subtle and the navigation stays out of the way.",
      "It was the project that taught me to obsess over the small stuff and is the direct ancestor of the site you're on now.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GitHub"],
    features: [
      "Responsive design with subtle animations",
      "Projects, skills and certifications showcase",
      "Resume download & GitHub integration",
      "Contact form with validation",
      "Deployed on Netlify",
    ],
    stack: [
      { label: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
      { label: "Hosting", items: ["Netlify"] },
    ],
    metrics: [
      { label: "Sections", value: "7" },
      { label: "Lighthouse", value: "98" },
      { label: "Build", value: "< 2s" },
    ],
    live: "https://dsanket.netlify.app/",
    code: "https://github.com/dsanket45",
    cover:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "from-ember-soft/40 to-paper-deep",
    accent: "#9a3412",
  },
];

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Apps" },
  { id: "business", label: "Business" },
  { id: "education", label: "Education" },
  { id: "healthcare", label: "Healthcare" },
  { id: "design", label: "Design" },
] as const;

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);
