/**
 * Portfolio Content Data
 * Edit this file to update any text, links, projects, skills, or contact info.
 */

export const personalInfo = {
  name: "Tyrone John Zapata",
  initials: "TJ.",
  role: "IT Student & Technical Builder",
  tagline: "Bridging Practical Code, Automation & Visual Systems",
  bio: "Fourth-year BSIT student learning web and mobile development by building projects with classmates. I use AI tools to help me build, and I focus on fixing pages, improving interfaces, and understanding how each piece works.",
  location: "Metro Manila, Philippines",
  email: "ztyronejohn177@gmail.com",
  github: "https://github.com/Ty-john",
  linkedin: "https://www.linkedin.com/in/tyrone-john-zapata-79100b300",
  hasResume: false, // Set to true when public/resume.pdf is replaced with your real resume
  resumePath: "/resume.pdf",
  photo: "", // Optional photo path (e.g. "/me.jpg"). If empty, shows 3D scene.
};

/**
 * Large Editorial Statement Blocks for the About section.
 * Words enclosed in *asterisks* render in italic gold.
 */
export const aboutStatements = [
  {
    id: "statement-1",
    text: "I'm a fourth-year BSIT student who *learns by building*, mostly with teammates and always with a *real problem in mind*.",
  },
  {
    id: "statement-2",
    text: "I like turning *messy workflows* into something people can *actually use*.",
  },
];

/**
 * Optional Polaroid Frame snapshots for scroll-parallax editorial moments.
 * Provide an image path (e.g. certificate or project screenshot) or leave empty for neutral placeholder.
 */
export const frames = [
  {
    id: "frame-1",
    title: "Transit Assistant",
    caption: "SimbAI Architecture",
    image: "", // Optional path (e.g. "/projects/simbai.png")
    rotation: -3,
    tape: true,
  },
  {
    id: "frame-2",
    certId: "cert-intro-python",
    title: "Introduction to Python",
    caption: "DataCamp",
    image: "/certificates/cert-intro-python.png",
    rotation: -3.5,
    tape: true,
  },
  {
    id: "frame-3",
    certId: "cert-intro-power-bi",
    title: "Introduction to Power BI",
    caption: "DataCamp",
    image: "/certificates/cert-intro-power-bi.png",
    rotation: 3.2,
    tape: true,
  },
  {
    id: "frame-4",
    certId: "cert-intermediate-python",
    title: "Intermediate Python",
    caption: "DataCamp",
    image: "/certificates/cert-intermediate-python.png",
    rotation: -2.8,
    tape: true,
  },
];

export const aboutPillars = [
  {
    title: "Interactive Frontends & Mobile",
    description: "Fixing and editing web pages and interface elements in team projects.",
    icon: "Layout",
    skills: ["Flutter/Dart", "React", "Tailwind CSS", "Responsive UI"]
  },
  {
    title: "Databases & Clean Backends",
    description: "Exposure to PostgreSQL, MySQL, Flask and PHP through course and team projects.",
    icon: "Database",
    skills: ["PostgreSQL", "MySQL", "Python (Flask)", "PHP"]
  },
  {
    title: "Automation & Systems Architecture",
    description: "Introductory experience with Make scenarios and Linux.",
    icon: "Cpu",
    skills: ["Make (Integromat)", "REST Webhooks", "Linux (Fedora/Ubuntu)", "Git"]
  }
];

export const allProjects = [
  {
    id: "simbai",
    title: "SimbAI — Commuter Transit App",
    teamNote: "Team project",
    description: "A cross-platform public transit assistant tailored for Philippine commuters. Features crowdsourced route discovery, offline caching, and terminal hub selection to streamline daily travel navigation.",
    techStack: ["Flutter", "Dart", "Python (Flask)", "Supabase", "PostgreSQL"],
    link: "", // Private repository
    isPrivate: true,
    contribution: "Fixed pages and made UI changes (buttons, navbar and other interface edits).",
    image: "", // Optional screenshot path (e.g. "/projects/simbai.png")
  },
  {
    id: "yankicks",
    title: "YanKicks — E-Commerce Platform",
    teamNote: "Team project (3 members)",
    description: "Sneaker e-commerce site with a customer storefront and admin panel, built with PHP and MySQL.",
    techStack: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    link: "https://github.com/allenpasion05-droid/YankicksWeb_Dashboard",
    contribution: "Fixed pages, edited UI elements, and added a page.",
    image: "", // Optional screenshot path (e.g. "/projects/yankicks.png")
  },
  {
    id: "paw-patrol",
    title: "Paw Patrol — Pet Adoption Website",
    teamNote: "Team project (3 members)",
    description: "Course project website for a fictional pet-care initiative: adoption pages and forms, pet listings from JSON data, and interactive pages.",
    techStack: ["HTML", "CSS", "JavaScript", "JSON", "GitHub Pages"],
    link: "https://github.com/Group7-Webdev-Project/paw-patrol",
    liveLink: "https://group7-webdev-project.github.io/paw-patrol",
    contribution: "Fixed pages and made UI edits.",
    image: "", // Optional screenshot path (e.g. "/projects/paw-patrol.png")
  },
  {
    id: "fres-bakes",
    title: "Fres Bakes — Small Enterprise Costing Engine",
    subtitle: "Micro-Bakery Profit Projections & Recipe Modeling",
    description: "A custom-engineered financial dashboard designed for micro-bakeries to calculate precise batch yields, recipe ingredient costing, margin breakdowns, and profit projections.",
    techStack: ["Google Sheets Engine", "Advanced Formulas", "Data Modeling", "UI/UX Layout Design"],
    link: "https://raket.ph",
    category: "Costing & Analytics",
    image: "",
    hidden: true,
  },
  {
    id: "workflow-automation",
    title: "Automated Workflow & Systems Pipeline",
    subtitle: "Multi-Service Webhook Integration & Operations",
    description: "Visual scenario automations connecting data endpoints, webhook triggers, and automated notification services to eliminate manual administrative overhead for digital workspaces.",
    techStack: ["Make (Integromat)", "REST APIs", "Webhooks", "JSON"],
    link: "https://github.com/your-username/automation-demos",
    category: "Automation & Systems",
    image: "",
    hidden: true,
  }
];

// Active visible projects
export const projects = allProjects.filter((p) => !p.hidden);

export const certificates = [
  {
    id: "cert-intro-python",
    title: "Introduction to Python",
    issuer: "DataCamp",
    type: "Statement of Accomplishment",
    date: "Dec 2024",
    image: "/certificates/cert-intro-python.png",
    pdf: "/certificates/cert-intro-python.pdf",
    verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/2575e0f51b854fa2b338e609dd530ec5cbf5497f",
  },
  {
    id: "cert-intermediate-python",
    title: "Intermediate Python",
    issuer: "DataCamp",
    type: "Statement of Accomplishment",
    date: "Feb 2026",
    image: "/certificates/cert-intermediate-python.png",
    pdf: "/certificates/cert-intermediate-python.pdf",
    verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/a1558e434fe93b3882973a877de0e847c0dc2e60",
  },
  {
    id: "cert-intro-power-bi",
    title: "Introduction to Power BI",
    issuer: "DataCamp",
    type: "Statement of Accomplishment",
    date: "Feb 2026",
    image: "/certificates/cert-intro-power-bi.png",
    pdf: "/certificates/cert-intro-power-bi.pdf",
    verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/daa5d1c6162862c41d660f0269163af8c152c32b",
  },
];

export const skillCategories = [
  {
    title: "Frontend & Design",
    icon: "Code",
    skills: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "Flutter/Dart", "Responsive Layouts"]
  },
  {
    title: "Backend & Databases",
    icon: "Server",
    skills: ["Python", "Flask", "PHP", "MySQL", "PostgreSQL", "REST APIs"]
  },
  {
    title: "Automation & Systems",
    icon: "Workflow",
    skills: ["Make (Integromat)", "Git", "Linux (Fedora/Ubuntu)"]
  },
  {
    title: "Visual & Content Tools",
    icon: "Video",
    skills: ["CapCut Desktop", "OBS Studio", "Markdown"]
  }
];

/**
 * Validates whether a given URL is a real public link or an unfilled placeholder
 */
export const isRealUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed === '#' || trimmed === '') return false;
  if (trimmed.includes('your-username') || trimmed.includes('example.com') || trimmed.includes('your-repo')) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validates whether an email is real or an unfilled placeholder
 */
export const isRealEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed === '' || trimmed.includes('example.com') || trimmed.includes('your.email')) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

/**
 * Validates whether a text field contains real content rather than empty space or placeholder brackets
 */
export const isRealText = (text) => {
  if (!text || typeof text !== 'string') return false;
  const trimmed = text.trim();
  if (trimmed === '' || (trimmed.startsWith('[') && trimmed.endsWith(']'))) return false;
  return true;
};
