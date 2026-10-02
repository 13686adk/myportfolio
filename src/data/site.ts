/**
 * Single source of truth for all portfolio content.
 *
 * Everything here is plain data — edit this file to update the site.
 * Values wrapped in TODO markers are placeholders awaiting real details.
 */

export const site = {
  name: "Abdulkadir Mustapha",
  firstName: "Abdulkadir",
  initials: "AM",
  role: "Front-End Developer",
  roles: [
    "Front-End Developer",
    "React & Next.js Specialist",
    "Mobile Developer (React Native / Flutter)",
    "UI Engineer",
  ],
  location: "Lagos, Nigeria",
  email: "abdulkadir13686@gmail.com",
  availability: "Open to remote & relocation",
  tagline:
    "I build production-ready web and mobile interfaces — from VTU payment rails to role-based logistics dashboards.",
  bio: [
    "I'm a front-end developer with 4+ years shipping responsive web and mobile products across React, Next.js, React Native and Flutter. I work from the design system down to the API boundary — building interfaces that stay fast, accessible and maintainable well after launch.",
    "My background spans a fintech startup building a mobile banking app and web admin interfaces, plus independent client work across fintech, logistics and developer tooling. I turn Figma handoffs into pixel-accurate builds, integrate third-party REST APIs, and run projects end to end from wireframe to production deployment.",
  ],
  languages: ["English (fluent)", "Hausa (native)"],
  socials: {
    github: "https://github.com/13686adk",
    linkedin: "https://linkedin.com/in/abdulkadirmustapha",
    x: "",
    whatsapp: "https://wa.me/2348175652611",
    mailto: "mailto:abdulkadir13686@gmail.com",
  },
  phones: [
    {
      display: "08175652611",
      tel: "tel:+2348175652611",
      whatsapp: "https://wa.me/2348175652611",
    },
    {
      display: "07048132549",
      tel: "tel:+2347048132549",
      whatsapp: "https://wa.me/2347048132549",
    },
  ],
  resumeUrl: "/resume.pdf",
  stats: [
    { label: "Public repositories", value: "46" },
    { label: "Years building", value: "4+" },
    { label: "Certifications", value: "4" },
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  category: "Dashboard" | "Mobile" | "Fintech" | "Web" | "Experimental";
  year: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "smart-waste-management",
    title: "Smart Waste Management System",
    blurb:
      "Role-based waste collection platform for residents, agents and administrators.",
    description:
      "A full logistics platform for municipal waste collection. Residents request pickups and track them on a map, agents claim assignments and submit collection proof, and admins monitor throughput, revenue and complaints from an analytics dashboard. Built on a Zustand store layer with TanStack Query for server state and role-based route guards across three distinct surfaces.",
    category: "Dashboard",
    year: "2026",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
      "Recharts",
      "Leaflet",
      "Zod",
    ],
    highlights: [
      "Three-role architecture (resident / agent / admin) with guarded routes",
      "Live pickup tracking on Leaflet maps with collection-proof capture",
      "Revenue, recycling-rate and complaint-trend analytics",
      "Payments, rewards ledger and notification system",
    ],
    repo: "https://github.com/13686adk/system",
    featured: true,
  },
  {
    slug: "swaptop",
    title: "SwapTop",
    blurb:
      "Wholesale-to-retail VTU platform for airtime, data, TV, power and exam pins.",
    description:
      "A cross-platform VTU reseller app that buys airtime, data, cable TV, electricity tokens, exam pins and betting wallet funding, then resells them at retail. Ships in mock mode so the demo OPay code shows without exposing live upstream secrets, and flips to real provider calls through a single environment variable. Built on a mock wallet balance, PIN authorisation and full transaction history.",
    category: "Mobile",
    year: "2026",
    stack: [
      "React Native",
      "Expo SDK 57",
      "expo-router",
      "TypeScript",
      "NativeWind",
      "Zustand",
      "AsyncStorage",
      "Expo Haptics",
    ],
    highlights: [
      "Three upstream provider adapters (vtu.ng, paigate, Payflex) behind one interface",
      "Biometric app lock plus 4-digit PIN authorisation with biometric fallback",
      "100+ airtime and data bundles, IUC and meter verification, token payout",
      "Failed-payment status filters and history-driven reconciliation",
      "45 FPS UI animations, persisted state and full profile settings",
    ],
    repo: "https://github.com/13686adk/FinTech-",
    featured: true,
  },
  {
    slug: "opayui",
    title: "OpayUI",
    blurb:
      "Cross-platform Flutter fintech app — cards, transfers, rewards and finance.",
    description:
      "A Flutter rebuild of a modern fintech wallet experience, targeting Android, iOS, web, Windows, macOS and Linux from one codebase. Covers the full consumer surface: fingerprint login, balance dashboard, card management with live card previews, transfers, transaction history and a rewards centre with redeemable vouchers.",
    category: "Mobile",
    year: "2026",
    stack: ["Flutter", "Dart", "Custom theming", "Cross-platform"],
    highlights: [
      "One codebase shipping to six desktop and mobile platforms",
      "Fingerprint authentication and biometric-gated transactions",
      "Rewards centre with voucher claiming and bonus offers",
      "Centralised theme, spacing and responsive design tokens",
    ],
    repo: "https://github.com/13686adk/opayui",
    demo: "https://opayui.vercel.app",
    featured: true,
  },
  {
    slug: "nigerian-expertise",
    title: "Nigerian Expertise",
    blurb:
      "Onboarding and discovery platform for Nigeria's developer community.",
    description:
      "A Next.js platform that helps developers in Nigeria find their footing: a marketing landing page, authentication flow and a structured get-started path that walks new members from signup to their first contribution.",
    category: "Web",
    year: "2025",
    stack: ["Next.js", "TypeScript", "React", "App Router"],
    highlights: [
      "App Router architecture with server-rendered landing pages",
      "Authentication and multi-step onboarding flow",
      "Custom illustration and brand asset pipeline",
    ],
    repo: "https://github.com/13686adk/Nigerian-expertise-",
    demo: "https://nigerian-expertise.vercel.app",
  },
  {
    slug: "tradepeep",
    title: "TradePeep",
    blurb: "Fintech landing experience iterated through twelve shipped builds.",
    description:
      "A fintech product landing page taken from concept to production across twelve deployed revisions. Each pass tightened hierarchy, spacing rhythm and conversion flow, moving from static HTML toward componentised markup with a real design system underneath.",
    category: "Fintech",
    year: "2025",
    stack: ["HTML", "CSS", "JavaScript", "Responsive design"],
    highlights: [
      "Twelve production deployments refined into one design language",
      "Fully responsive from 320px up",
      "Progressive-revealed product walkthrough",
    ],
    repo: "https://github.com/13686adk/tradepeep-page-01",
  },
  {
    slug: "admin-portal",
    title: "AdminPortal",
    blurb: "Operations admin portal with dense data tables and reporting.",
    description:
      "An internal operations portal for teams that need to see and edit a lot of records quickly — filterable tables, status workflows and reporting views built to stay fast as the dataset grows.",
    category: "Dashboard",
    year: "2025",
    stack: ["HTML", "CSS", "JavaScript", "Responsive design"],
    highlights: [
      "Dense, scannable data tables with filtering and sorting",
      "Status workflow views for operational triage",
      "Responsive layouts down to tablet widths",
    ],
    repo: "https://github.com/13686adk/Adminportal",
  },
  {
    slug: "hint",
    title: "Hint",
    blurb: "Social discovery UI — profiles, campaigns, chat and library.",
    description:
      "A social platform interface spanning the full engagement loop: onboarding and sign-in, user profiles, campaign pages, a library view and real-time-feeling chat with message threads.",
    category: "Web",
    year: "2026",
    stack: ["HTML", "CSS", "JavaScript", "Custom icons", "Web fonts"],
    highlights: [
      "Nine-page product surface from auth through to chat",
      "Custom icon and illustration set",
      "Scroll-driven reveal animations and sticky navigation",
    ],
    repo: "https://github.com/13686adk/hint",
    demo: "https://hint-two.vercel.app",
  },
  {
    slug: "fusion",
    title: "FUSION",
    blurb: "Interactive WebGL and canvas experiments.",
    description:
      "An experimental playground for real-time graphics on the web — geometry, motion and shaders explored outside the constraints of a client project.",
    category: "Experimental",
    year: "2025",
    stack: ["WebGL", "JavaScript", "Shader programming"],
    highlights: [
      "Real-time polygon rendering",
      "Interactive shaders",
      "Low-level graphics work",
    ],
    repo: "https://github.com/13686adk/FUSION",
  },
];

export const projectFilters = [
  "All",
  "Dashboard",
  "Mobile",
  "Fintech",
  "Web",
  "Experimental",
] as const;

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frameworks",
    items: ["React", "Next.js", "React Native", "Expo", "Flutter", "Vue"],
  },
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Dart", "SQL", "PHP"],
  },
  {
    title: "Styling & UI",
    items: ["Tailwind CSS", "NativeWind", "shadcn/ui", "CSS Architecture", "Responsive Design", "Framer Motion"],
  },
  {
    title: "State & Data",
    items: ["Zustand", "TanStack Query", "React Router", "AsyncStorage", "REST APIs"],
  },
  {
    title: "Tooling",
    items: ["Vite", "Expo SDK", "Git & GitHub", "Vercel", "ESLint", "PostCSS"],
  },
  {
    title: "Practices",
    items: ["Component Architecture", "Responsive Design", "Accessibility", "Performance Tuning", "Testing", "Figma"],
  },
];

/** Fast-moving word list for the hero typing effect. */
export const rotatingWords = [
  "React & Next.js",
  "React Native",
  "Flutter",
  "TypeScript",
  "Tailwind CSS",
  "design systems",
  "payment flows",
];

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "education";
  points: string[];
  current?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Jan 2023 — Present",
    title: "Front-End Developer & Project Lead",
    org: "Freelance — Remote",
    kind: "work",
    current: true,
    points: [
      "Designed, built and shipped client web applications end to end, from wireframe to production deployment.",
      "Delivered 5+ responsive web applications with React and Next.js, improving page load performance by up to 30% through code-splitting, lazy loading and image optimisation.",
      "Built reusable component libraries that cut feature development time by roughly 25% across projects.",
      "Migrated 3 legacy static sites to modern React architectures, improving maintainability, SEO and mobile responsiveness.",
      "Ran timelines and deliverables with Agile sprints and task boards, working directly from Figma handoffs.",
    ],
  },
  {
    period: "Mar 2021 — Dec 2022",
    title: "Frontend & Mobile Developer",
    org: "Fintech Startup",
    kind: "work",
    points: [
      "Built a mobile banking application and the accompanying web admin interfaces.",
      "Owned feature delivery across both mobile and web surfaces.",
    ],
  },
  {
    period: "Jun 2020 — Feb 2021",
    title: "Frontend Developer",
    org: "Agency / Freelance",
    kind: "work",
    points: [
      "Delivered multiple client web and mobile applications.",
      "Worked from design handoff through to launch and handover.",
    ],
  },
  {
    period: "2023 — Present",
    title: "B.Tech, Project Management Technology",
    org: "Federal University of Technology, Minna, Nigeria",
    kind: "education",
    current: true,
    points: [
      "Final year of study.",
      "Coursework across project management, statistics, information systems and management.",
    ],
  },
];

export const certifications = [
  {
    title: "AI Interview Certification — Front-End Developer & Project Lead",
    issuer: "micro1",
    year: "May 2026",
  },
  {
    title: "Front-End Developer Professional Certificate",
    issuer: "Meta",
    year: "2024",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2023",
  },
  {
    title: "JavaScript for Beginners",
    issuer: "Coursera",
    year: "2023",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;