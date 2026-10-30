// Site content. Text marked with **double asterisks** is shown bold,
// and *single asterisks* in the italic serif accent (see components/Rich.tsx).

import {
  // Tech
  android,
  aws,
  css,
  docker,
  expo,
  express,
  figma,
  firebase,
  git,
  html,
  java,
  javascript,
  mongodb,
  mssql,
  mui,
  mysql,
  nextjs,
  nodejs,
  postgresql,
  reactjs,
  reactnative,
  redux,
  spring,
  tailwind,
  typescript,
  vite,
  // Companies
  chaupal,
  cuemath,
  paulmerchants,
  retailScan,
  tcts,
  // Projects
  digiwallet,
  goldpe,
  medicarepro,
  reelsync,
  wheeldeal,
  // Testimonials
  user1,
  user2,
  user3,
  // Socials
  email,
  github,
  linkedin,
  twitter,
} from "../assets";

export const RESUME_URL = "/KuberJha-Resume.pdf";
export const EMAIL = "kuber98jha@gmail.com";

// Navbar Links (id = section id, label comes from locales: navbar.<key>)
export const NAV_LINKS = [
  { id: "about", key: "about" },
  { id: "work", key: "work" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "contact", key: "contact" },
] as const;

// Headline numbers (labels come from locales: about.stats.<key>)
export const STATS = [
  { key: "years", value: "5+" },
  { key: "users", value: "50,000+" },
  { key: "coldstart", value: "45%" },
  { key: "bundle", value: "50%" },
  { key: "auditors", value: "1,000+" },
  { key: "audits", value: "35%" },
] as const;

// Scrolling keyword strip
export const KEYWORDS = [
  "AI Strategy",
  "RAG Pipelines",
  "LLM Integration",
  "Conversational Assistants",
  "QA Automation",
  "Product Ownership",
  "React Native",
  "Next.js",
  "Spring Boot",
  "Node.js",
  "Fintech & UPI",
  "Geofencing",
  "AWS",
  "Technical Leadership",
] as const;

// Skills, grouped as in the CV. `icon` is optional.
type Skill = { name: string; icon?: string };
type SkillGroup = { key: string; title: string; featured?: boolean; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "ai",
    title: "AI / LLM",
    featured: true,
    skills: [
      { name: "OpenAI API" },
      { name: "Google Gemini" },
      { name: "Anthropic Claude" },
      { name: "RAG pipelines" },
      { name: "Chatbots & assistants" },
      { name: "AI customer support" },
      { name: "Automated E2E testing" },
      { name: "Auto-generated test reports" },
    ],
  },
  {
    key: "mobile",
    title: "Mobile",
    skills: [
      { name: "React Native", icon: reactnative },
      { name: "Expo / Expo Router", icon: expo },
      { name: "Native Android", icon: android },
      { name: "iOS" },
      { name: "Play Store & App Store releases" },
    ],
  },
  {
    key: "frontend",
    title: "Front-End",
    skills: [
      { name: "React.js", icon: reactjs },
      { name: "Next.js 14", icon: nextjs },
      { name: "TypeScript", icon: typescript },
      { name: "JavaScript", icon: javascript },
      { name: "Redux Toolkit", icon: redux },
      { name: "Tailwind CSS", icon: tailwind },
      { name: "Material UI", icon: mui },
      { name: "Vite", icon: vite },
      { name: "HTML5", icon: html },
      { name: "CSS3", icon: css },
    ],
  },
  {
    key: "backend",
    title: "Back-End & APIs",
    skills: [
      { name: "Java", icon: java },
      { name: "Spring Boot", icon: spring },
      { name: "Node.js", icon: nodejs },
      { name: "Express.js", icon: express },
      { name: ".NET / C#" },
      { name: "REST API design" },
      { name: "JWT auth" },
    ],
  },
  {
    key: "data",
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: mongodb },
      { name: "PostgreSQL", icon: postgresql },
      { name: "MySQL", icon: mysql },
      { name: "SQL Server", icon: mssql },
      { name: "SQLite" },
      { name: "Firebase", icon: firebase },
    ],
  },
  {
    key: "cloud",
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: aws },
      { name: "Docker", icon: docker },
      { name: "Git & GitHub", icon: git },
      { name: "Netlify" },
    ],
  },
  {
    key: "integrations",
    title: "Integrations & SDKs",
    skills: [
      { name: "UPI & payment gateways" },
      { name: "Geofencing & background location" },
      { name: "WebRTC" },
      { name: "EnableX video/audio" },
      { name: "Gamezop APIs" },
    ],
  },
  {
    key: "product",
    title: "Product & Delivery",
    skills: [
      { name: "Roadmapping" },
      { name: "Specifications" },
      { name: "Prioritisation" },
      { name: "Stakeholder reporting" },
      { name: "Jira" },
      { name: "Figma", icon: figma },
    ],
  },
];

// Experience (newest first)
export type Experience = {
  title: string;
  company: string;
  location?: string;
  date: string;
  logo?: string;
  // true when the logo is a full-bleed square (fills the tile edge to edge)
  logoFill?: boolean;
  monogram: string;
  current?: boolean;
  promoted?: string;
  summary: string;
  points: string[];
  tech: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    title: "AI & Tech Assistant Manager",
    company: "Chaupal",
    location: "Regional OTT platform",
    date: "May 2026 — Present",
    logo: chaupal,
    logoFill: true,
    monogram: "C",
    current: true,
    summary:
      "A hybrid mandate uniting hands-on engineering with ownership of AI, product and software development.",
    points: [
      "Own **three functions at once** (AI, product and software development) as the single accountable lead from idea and spec through build, release and measurement.",
      "Architected and shipped **chatbot and RAG features** on the Chaupal platform using Gemini and OpenAI models, from technical design to production.",
      "**Automated customer support with AI**, cutting the manual support load, and built an **AI personal assistant** that takes over routine operational tasks.",
      "Introduced **fully automated QA**: websites and apps are tested without manual effort and test reports are generated automatically, replacing manual regression checks.",
      "Define the product roadmap, write specifications, decide implementation approaches and report progress to leadership while staying hands-on in the codebase.",
      "Own and extend the MERN product website, partner portal and referral system (delivered as a client engagement since March 2024), now with AI-assisted features.",
      "Build and maintain the **Chaupal Shop** storefront and its Next.js admin console.",
      "Manage AWS infrastructure and build, back-end and deploy new websites and apps end to end, with **no hand-off to a separate DevOps team**.",
    ],
    tech: ["Gemini API", "OpenAI API", "RAG", "Automated testing", "AWS", "React.js", "Next.js", "Node.js", "MongoDB", "Spring Boot", "SQL Server"],
  },
  {
    title: "AI & Tech Lead",
    company: "Paul Merchants Limited",
    location: "Chandigarh, India",
    date: "Mar 2024 — May 2026",
    logo: paulmerchants,
    monogram: "P",
    promoted: "Promoted from Full-Stack & React Native Developer",
    summary:
      "Financial-services group spanning forex, remittances, digital gold and prepaid instruments. Owned the mobile client and several full-stack products end to end.",
    points: [
      "Led the migration of **Mayaa Money** from Expo to React Native CLI, adding code splitting and lazy loading that cut **cold-start time by 45%** (measured in Firebase).",
      "Cut production **bundle size by 50%** on both platforms (iOS 100 MB → 50 MB, Android 60 MB → 30 MB) with tree-shaking, image optimisation and dynamic imports.",
      "Architected and shipped **Paul Gold**: B2C app plus B2B admin and partner portals for digital gold, silver and platinum trading, serving **50,000+ active users**.",
      "Built the MERN product website, partner portal and referral system for **Chaupal OTT** as a client engagement that led to a **direct full-time offer**.",
      "Integrated fintech modules: prepaid cards, **UPI via PaulPay** and Gamezop gamification APIs, with detailed transaction and engagement analytics.",
      "Built a travel-compliance monitoring system with EnableX video/audio for remote audit verification, cutting **audit discrepancies by 35%**.",
      "Owned .NET/C# back-end maintenance for the RADS project (client: **Bell Canada**) and acted as interim client contact during a PM staffing gap.",
      "Managed AWS servers and independently built, back-ended and deployed new websites and apps to production.",
      "Mentored **two interns** in React Native architecture and release workflows; both became full-time hires.",
    ],
    tech: ["React Native", "React.js", "Node.js", "Spring Boot", ".NET / C#", "SQL Server", "MongoDB", "Firebase", "AWS", "EnableX", "UPI"],
  },
  {
    title: "Frontend & Android Developer",
    company: "Retail Scan Management Services",
    location: "Mumbai, India",
    date: "2023 — 2024",
    logo: retailScan,
    monogram: "R",
    summary: "Retail-audit and merchandising-intelligence company serving consumer-goods brands.",
    points: [
      "Built the **RetailScan B2B portal** (React.js) with role-based dashboards, cutting **audit turnaround by 30%** by replacing spreadsheet reporting with live dashboards.",
      "Built **MyTrack**, an offline-first native Android auditing app with local storage and automatic sync, enabling audits in low-connectivity areas.",
      "Migrated the **EzeePay** Android app to React Native within a two-month deadline.",
      "Designed the auditor payment and reward-tracking system.",
    ],
    tech: ["React.js", "Native Android", "React Native", "SQLite", "REST APIs"],
  },
  {
    title: "Software & Applications Development Engineer",
    company: "Tata Communications",
    location: "Mumbai, India",
    date: "Aug 2021 — Jul 2023",
    logo: tcts,
    monogram: "T",
    promoted: "Promoted within six months",
    summary: "Global digital-infrastructure provider. Enterprise field-operations and workforce-management tooling.",
    points: [
      "Designed and led the **geofencing-based field-auditing system** for the SRMS project (real-time tracking, background speed monitoring, remote-location alerts) used by **1,000+ field auditors**.",
      "Built the **WFM workforce-management app** end to end: Spring Boot back-end, React.js web front-end and React Native mobile client.",
      "Ran Play Store and App Store release cycles for the WFM app independently.",
      "Earned a **promotion within six months** for delivery speed and technical ownership.",
    ],
    tech: ["React Native", "React.js", "Spring Boot", "Geofencing", "Background location", "Store releases"],
  },
  {
    title: "Java Spring Boot Intern",
    company: "Cuemath",
    location: "Bangalore, India",
    date: "Jan 2021 — Aug 2021",
    logo: cuemath,
    monogram: "C",
    summary: "Ed-tech company.",
    points: [
      "Developed back-end services in Java Spring Boot, contributing to production API endpoints and performance work under senior-engineer review.",
    ],
    tech: ["Java", "Spring Boot"],
  },
];

// Projects
export type ProjectKind = "Production" | "Client" | "Open source" | "Independent";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  kind: ProjectKind;
  context: string;
  description: string;
  stack: string[];
  image?: string;
  github?: string;
  live?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "paul-gold",
    title: "Paul Gold",
    tagline: "Digital gold, silver & platinum trading",
    kind: "Production",
    context: "Paul Merchants · 50,000+ active users",
    description:
      "Flagship fintech platform for buying and selling digital precious metals at live market prices: a React Native CLI app, a React.js admin dashboard and Node.js services, with KYC and compliance workflows, multi-gateway payment routing and automated reconciliation.",
    stack: ["React Native CLI", "Expo", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS", "Juspay", "PayU", "Stripe"],
    image: goldpe,
    github: "https://github.com/kuberjha25/paulgoldweb",
  },
  {
    id: "digiwallet",
    title: "DigiWallet",
    tagline: "Enterprise wallet management system",
    kind: "Production",
    context: "Employer project",
    description:
      "Admin portal for users, transactions and settlements plus a customer app with multi-gateway top-ups, QR peer-to-peer payments, transfers and history. Spring Boot REST services with JWT over SQL Server, a React + Vite portal and a React Native client on AWS ECS.",
    stack: ["Java", "Spring Boot", "SQL Server", "React.js", "Vite", "React Native", "JWT", "Redis", "Kafka", "Docker", "AWS ECS"],
    image: digiwallet,
    github: "https://github.com/kuberjha25/wallet",
    live: "https://kuberjha.com:8598",
  },
  {
    id: "valuefin",
    title: "Valuefin Desk",
    tagline: "NBFC lending-operations system",
    kind: "Client",
    context: "Client project",
    description:
      "Lending operations for a non-banking finance company: borrowers, drawdowns and payments in; ledger, MIS, ageing and IRR analytics out. Director-level document approvals, role-based access, bcrypt-hashed credentials and an append-only audit trail.",
    stack: ["React 18", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MySQL"],
  },
  {
    id: "meraqui",
    title: "Meraqui",
    tagline: "Channel-partner & sales CRM app",
    kind: "Client",
    context: "Gilco Group · client project",
    description:
      "Cross-platform CRM for Gilco Group's Meraqui brand, built from a 16-module spec and a 37-screen design set. One Expo Router codebase for iOS, Android and web, with OTP login and brand-book theming.",
    stack: ["React Native", "Expo", "Expo Router", "TypeScript"],
  },
  {
    id: "camera-core",
    title: "react-native-camera-core",
    tagline: "Open-source camera library",
    kind: "Open source",
    context: "MIT licence",
    description:
      "A React Native library that brings camera features together behind a single native module for iOS and Android, scaffolded with create-react-native-library (Builder Bob).",
    stack: ["React Native", "Native modules", "iOS", "Android", "TypeScript"],
  },
  {
    id: "wheeldeal",
    title: "WheelDeal",
    tagline: "B2B car-rental marketplace",
    kind: "Independent",
    context: "Independent project",
    description:
      "MERN marketplace connecting fleet owners with renters through admin, business and customer portals, with a real-time availability calendar, demand-based pricing, Stripe payments, Google Maps search and Socket.io notifications.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Material UI", "Stripe", "Google Maps", "Socket.io", "Redis"],
    image: wheeldeal,
    github: "https://github.com/kuberjha25/carrental",
  },
  {
    id: "medicare",
    title: "MediCare Pro",
    tagline: "Clinic appointments & records",
    kind: "Independent",
    context: "Independent project",
    description:
      "White-label healthcare product: a React Native patient app and a React.js clinic dashboard with multi-role access, scheduling, digital prescriptions with e-signature, video consultations, reminders and billing.",
    stack: ["React Native", "React.js", "Node.js", "MongoDB", "Tailwind CSS", "Socket.io", "Agora", "Twilio"],
    image: medicarepro,
    github: "https://github.com/kuberjha25/doctor",
  },
  {
    id: "reelsync",
    title: "ReelSync",
    tagline: "Short-form video app",
    kind: "Independent",
    context: "Exploratory project",
    description:
      "An exploration of native video in React Native: custom Java, Kotlin and Swift modules for compression, trimming and hardware-accelerated playback, an HLS infinite-scroll feed and resumable background uploads.",
    stack: ["React Native CLI", "Java", "Kotlin", "Swift", "Redux Toolkit", "FFmpeg", "Firebase"],
    image: reelsync,
    github: "https://github.com/kuberjha25/reelsync",
  },
];

export const PROJECT_KINDS: ProjectKind[] = ["Production", "Client", "Open source", "Independent"];

// Testimonials (not shown on the site at the moment)
export const TESTIMONIALS = [
  {
    testimonial:
      "Kuber's expertise in full-stack development transformed our product. His attention to detail and innovative approach was exactly what we needed. Highly recommended!",
    name: "Rajesh Kumar",
    designation: "CEO",
    company: "Infotech Solutions",
    image: user2,
  },
  {
    testimonial:
      "Working with Kuber on our React Native project was fantastic. His technical knowledge and problem-solving skills are exceptional. True professional!",
    name: "Katherine",
    designation: "Product Manager",
    company: "Vincit",
    image: user1,
  },
  {
    testimonial:
      "Kuber delivered our mobile app 2 weeks ahead of schedule with exceptional quality. His code is clean, efficient, and scalable. Worth every penny!",
    name: "Amrita Patel",
    designation: "CTO",
    company: "Tech Innovations Ltd",
    image: user3,
  },
] as const;

export const SOCIALS = [
  { name: "LinkedIn", icon: linkedin, link: "https://linkedin.com/in/kuberjha25" },
  { name: "GitHub", icon: github, link: "https://github.com/kuberjha25" },
  { name: "Twitter", icon: twitter, link: "https://twitter.com/kuberjha" },
  { name: "Email", icon: email, link: `mailto:${EMAIL}` },
] as const;
