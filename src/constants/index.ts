// src/constants/index.ts - CORRECTED & COMPLETE

import {
  // General
  mobile,
  backend,
  creator,
  web,
  // Tech
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  nextjs,
  express,
  java,
  spring,
  postgresql,
  mysql,
  mssql,
  firebase,
  reactnative,
  expo,
  android,
  aws,
  mui,
  vite,
  // Companies (NEW)
  paulmerchants,
  retailScan,
  tcts,
  cuemath,
  // Projects
  digiwallet,
  wheeldeal,
  medicarepro,
  reelsync,
  goldpe,
  // edulearn,
  // Testimonials
  user1,
  user2,
  user3,
  // Socials
  youtube,
  linkedin,
  twitter,
  github,
  email,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Work",
    link: null,
  },
  {
    id: "feedbacks",
    title: "Feedbacks",
    link: null,
  },
  {
    id: "skills",
    title: "Skills",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
  // {
  //   id: "source-code",
  //   title: "Source Code",
  //   link: "https://github.com/kuberjha25",
  // },
] as const;

// Services
export const SERVICES = [
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Engineer",
    icon: backend,
  },
  {
    title: "Cloud & DevOps",
    icon: creator,
  },
] as const;

// Technologies - Frontend
export const TECHNOLOGIES_FRONTEND = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Next.js 14", icon: nextjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Material UI", icon: mui },
  { name: "Vite.js", icon: vite },
] as const;

// Technologies - Backend
export const TECHNOLOGIES_BACKEND = [
  { name: "Java", icon: java },
  { name: "Spring Boot", icon: spring },
  { name: "Node.js", icon: nodejs },
  { name: "Express.js", icon: express },
  { name: "MongoDB", icon: mongodb },
  { name: "PostgreSQL", icon: postgresql },
  { name: "MySQL", icon: mysql },
  { name: "MS-SQL Server", icon: mssql },
  { name: "Firebase", icon: firebase },
] as const;

// Technologies - Mobile
export const TECHNOLOGIES_MOBILE = [
  { name: "React Native", icon: reactnative },
  { name: "Expo", icon: expo },
  { name: "Android Studio", icon: android },
] as const;

// Technologies - DevOps & Tools
export const TECHNOLOGIES_DEVOPS = [
  { name: "Docker", icon: docker },
  { name: "AWS", icon: aws },
  { name: "Git & GitHub", icon: git },
  { name: "Figma", icon: figma },
] as const;

// All Technologies combined for carousel
export const TECHNOLOGIES = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Next.js 14", icon: nextjs },
  { name: "React Native", icon: reactnative },
  { name: "Node.js", icon: nodejs },
  { name: "Express.js", icon: express },
  { name: "Java", icon: java },
  { name: "Spring Boot", icon: spring },
  { name: "MongoDB", icon: mongodb },
  { name: "PostgreSQL", icon: postgresql },
  { name: "MySQL", icon: mysql },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Docker", icon: docker },
  { name: "AWS", icon: aws },
  { name: "Git", icon: git },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "Full Stack Developer",
    company_name: "Paul Merchants Limited",
    icon: paulmerchants,
    iconBg: "#383E56",
    date: "Mar 2024 - Present",
    points: [
      "Developed and maintained scalable full-stack applications using React, Node.js, and Express.js",
      "Collaborated with cross-functional teams to design and implement innovative solutions",
      "Optimized application performance, improving load times by 40%",
      "Led code reviews and mentored junior developers on best practices",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Retail Scan Management Services",
    icon: retailScan,
    iconBg: "#E6DEDD",
    date: "2021 - 2023",
    points: [
      "Built cross-platform mobile applications reaching 50K+ downloads",
      "Implemented native modules for advanced features like video processing",
      "Reduced app bundle size by 30% through optimization",
      "Maintained 95%+ app store ratings with consistent quality releases",
    ],
  },
  {
    title: "Software & Applications Developement Engineer",
    company_name: "Tata Communication Transformation Services",
    icon: tcts,
    iconBg: "#383E56",
    date: "2020 - 2021",
    points: [
      "Developed RESTful APIs using Java Spring Boot and Node.js",
      "Designed and optimized database schemas for high-traffic applications",
      "Implemented security features and authentication mechanisms",
      "Collaborated on microservices architecture implementation",
    ],
  },
  {
    title: "Full Stack Intern",
    company_name: "Cuemath",
    icon: cuemath,
    iconBg: "#E6DEDD",
    date: "2019 - 2020",
    points: [
      "Developed full-stack web applications using MERN stack",
      "Contributed to codebase with clean, maintainable code",
      "Participated in agile development and sprint planning",
      "Learned and implemented modern web development practices",
    ],
  },
] as const;

// Testimonials
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

// Projects
export const PROJECTS = [
  {
    id: 1,
    title: "DigiWallet - Wallet Management System",
    name: "DigiWallet - Wallet Management System",
    shortDescription: "Enterprise digital wallet with multi-payment gateway integration serving 50K+ users",
    description: `A comprehensive wallet management solution built for my company with Java Spring Boot and MS-SQL backend. The system features an admin portal for managing users, transactions, and settlements. The customer mobile app allows users to load money into their wallet using multiple payment gateways, scan QR codes to pay other users, transfer money, and view transaction history.`,
    fullDescription: `This enterprise-grade wallet management system serves 50,000+ users with real-time transaction processing. The architecture includes Java Spring Boot microservices with REST APIs, JWT authentication, MS-SQL database, a React.js + Vite admin portal, a React Native customer app, payment integrations, Docker containers on AWS ECS, end-to-end encryption, fraud detection, and automated settlement reports.`,
    technologies: [
      "Java", "Spring Boot", "MS-SQL", "React.js", "React Native",
      "AWS ECS", "Docker", "Juspay", "Stripe", "PayU", "Yes Bank API",
      "HDFC API", "Redis", "Kafka", "JWT"
    ],
    category: "Fintech",
    features: [
      "Multi-payment gateway integration with intelligent routing",
      "QR code scanning for peer-to-peer payments",
      "Real-time transaction processing and notifications",
      "Admin dashboard with advanced analytics",
      "Push notifications for transactions",
      "Biometric authentication",
      "Automated settlement reports",
      "Fraud detection system"
    ],
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "Spring Boot", color: "green-text-gradient" },
      { name: "React.js", color: "pink-text-gradient" },
      { name: "MS-SQL", color: "orange-text-gradient" },
    ],
    image: digiwallet,
    source_code_link: "https://github.com/kuberjha25/wallet",
    live_site_link: "https://kuberjha.com:8598",
    github: "https://github.com/kuberjha25/wallet",
    link: "https://kuberjha.com:8598",
    liveUrl: "https://kuberjha.com:8598",
    company: "Built for existing company (Client Project)",
  },
  {
    id: 2,
    title: "WheelDeal - B2B Car Rental Marketplace",
    name: "WheelDeal - B2B Car Rental Marketplace",
    shortDescription: "MERN stack platform connecting car owners with renters, 100+ registered businesses",
    description: `A B2B car rental platform where businesses can list their fleet of vehicles for customers to rent. Built with MERN stack and Material UI for a polished interface. The platform includes separate portals for admin, car owners, and customers.`,
    fullDescription: `This comprehensive car rental marketplace connects vehicle owners with renters in a B2B2C model. It includes an admin portal for verification and analytics, business portal for fleet management and dynamic pricing, customer portal for location/date search and bookings, real-time availability calendar, secure payments, rating system, and automated notifications.`,
    technologies: [
      "MongoDB", "Express.js", "React.js", "Node.js", "Material UI",
      "JWT", "Stripe", "Google Maps API", "Socket.io", "Redis", "Nginx"
    ],
    category: "MERN Stack",
    features: [
      "Admin, business, and customer portals",
      "Real-time car availability calendar",
      "Dynamic pricing algorithm based on demand",
      "Secure payment processing with Stripe",
      "Rating and review system",
      "Automated email and SMS notifications",
      "Location-based search with Google Maps",
      "Insurance verification system"
    ],
    tags: [
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Express.js", color: "blue-text-gradient" },
      { name: "React.js", color: "pink-text-gradient" },
      { name: "Node.js", color: "orange-text-gradient" },
    ],
    image: wheeldeal,
    source_code_link: "https://github.com/kuberjha25/carrental",
    live_site_link: "https://wheeldeal.example.com",
    github: "https://github.com/kuberjha25/carrental",
    link: "https://wheeldeal.example.com",
    liveUrl: "https://wheeldeal.example.com",
  },
  {
    id: 3,
    title: "MediCare Pro - Doctor Appointment System",
    name: "MediCare Pro - Doctor Appointment System",
    shortDescription: "White-label healthcare platform used by 25+ clinics across India",
    description: `A complete healthcare solution with React Native mobile app for patients and React.js web dashboard for doctors and clinics. Built as a B2B product that clinics can purchase and customize. The system handles appointment booking, prescription management, and patient records with role-based access control.`,
    fullDescription: `This white-label healthcare platform helps clinics and hospitals manage doctors, appointments, patients, billing, digital prescriptions, video consultations, patient history, reminders, and custom branding. It is designed as a clinic-ready B2B product with secure medical record handling.`,
    technologies: [
      "MongoDB", "Express.js", "React.js", "React Native", "Node.js",
      "Tailwind CSS", "Socket.io", "JWT", "Agora SDK", "Twilio", "Redis"
    ],
    category: "Healthcare",
    features: [
      "Multi-role access for admin, doctor, patient, and receptionist",
      "Video consultation integration",
      "Digital prescriptions with e-signature",
      "SMS, email, and WhatsApp reminders",
      "Patient medical history with timeline view",
      "White-label customization per clinic",
      "Billing and invoice generation",
      "Analytics dashboard for clinic performance"
    ],
    tags: [
      { name: "React.js", color: "pink-text-gradient" },
      { name: "React Native", color: "blue-text-gradient" },
      { name: "Node.js", color: "orange-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
    ],
    image: medicarepro,
    source_code_link: "https://github.com/kuberjha25/doctor",
    live_site_link: "https://medicarepro.example.com",
    github: "https://github.com/kuberjha25/doctor",
    link: "https://medicarepro.example.com",
    liveUrl: "https://medicarepro.example.com",
  },
  {
    id: 4,
    title: "ReelSync - Instagram Reels Clone",
    name: "ReelSync - Instagram Reels Clone",
    shortDescription: "React Native app with native modules for video processing (10K+ downloads)",
    description: `A passion project exploring video processing and native modules in React Native. This Instagram Reels clone focuses on the short-form video experience with custom native modules for video compression, editing, and playback.`,
    fullDescription: `This experimental project pushed React Native with native code integration for video compression, trimming, filters, infinite scroll playback, double-tap likes, camera integration, background processing, hardware-accelerated encoding, and efficient memory management.`,
    technologies: [
      "React Native CLI", "Native Modules", "Java", "Kotlin", "Swift",
      "Redux Toolkit", "FFmpeg", "Camera API", "Video Editor SDK", "Firebase"
    ],
    category: "Mobile App",
    features: [
      "Infinite scroll video feed with HLS streaming",
      "Native video compression",
      "Double-tap like gesture with animation",
      "Video recording with AR filters",
      "Comment and engagement features",
      "Hardware-accelerated playback",
      "Background upload with resumable uploads",
      "Share to Instagram and WhatsApp integration"
    ],
    tags: [
      { name: "React Native", color: "blue-text-gradient" },
      { name: "Native Modules", color: "pink-text-gradient" },
      { name: "Java", color: "orange-text-gradient" },
      { name: "Kotlin", color: "green-text-gradient" },
    ],
    image: reelsync,
    source_code_link: "https://github.com/kuberjha25/reelsync",
    live_site_link: "https://play.google.com/store/apps/details?id=com.reelsync",
    github: "https://github.com/kuberjha25/reelsync",
    link: "https://play.google.com/store/apps/details?id=com.reelsync",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.reelsync",
  },
  {
    id: 5,
    title: "GoldPe - Digital Gold & Insurance Platform",
    name: "GoldPe - Digital Gold & Insurance Platform",
    shortDescription: "Fintech platform processing ₹50Cr+ in transactions, deployed in production",
    description: `A comprehensive fintech solution enabling users to buy/sell digital gold and purchase insurance policies. Integrated with multiple payment gateways for seamless transactions. Successfully deployed and sold to my company with both web and mobile applications.`,
    fullDescription: `This flagship fintech platform includes digital gold trading, insurance marketplace, multi-payment gateway routing, React Native CLI app, Expo iterations, React.js admin dashboard, Node.js microservices, KYC verification, compliance workflows, fraud detection, and automated reconciliation.`,
    technologies: [
      "React Native CLI", "Expo", "React.js", "Node.js", "Express.js",
      "MongoDB", "PostgreSQL", "Redis", "Juspay", "Stripe", "PayU",
      "Yes Bank API", "HDFC API", "Docker", "AWS", "Kafka", "ELK Stack"
    ],
    category: "Fintech",
    features: [
      "Digital gold trading with live market prices",
      "Insurance policy purchase and comparison",
      "Multi-payment gateway with intelligent routing",
      "Aadhaar-based KYC verification",
      "Real-time gold price charts",
      "Automated transaction reconciliation",
      "Fraud detection system",
      "SIP for gold investment",
      "Insurance claim processing",
      "Customer support chat with AI bot"
    ],
    tags: [
      { name: "React Native CLI", color: "blue-text-gradient" },
      { name: "Expo", color: "pink-text-gradient" },
      { name: "Node.js", color: "orange-text-gradient" },
      { name: "PostgreSQL", color: "green-text-gradient" },
    ],
    image: goldpe,
    source_code_link: "https://github.com/kuberjha25/paulgoldweb",
    live_site_link: "https://goldpe.example.com",
    github: "https://github.com/kuberjha25/paulgoldweb",
    link: "https://goldpe.example.com",
    liveUrl: "https://goldpe.example.com",
    company: "Built for existing company (Production)",
  },
  // {
  //   name: "EduLearn - Online Learning Platform",
  //   description:
  //     "Comprehensive e-learning platform with video streaming, live classes, and interactive quizzes. Serves 5000+ active students with personalized learning paths.",
  //   tags: [
  //     { name: "Next.js", color: "blue-text-gradient" },
  //     { name: "Tailwind CSS", color: "pink-text-gradient" },
  //     { name: "Firebase", color: "orange-text-gradient" },
  //     { name: "Node.js", color: "green-text-gradient" },
  //   ],
  //   image: edulearn,
  //   source_code_link: "https://github.com/kuberjha25/edulearn",
  //   live_site_link: "https://edulearn.example.com",
  // },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: linkedin,
    link: "https://linkedin.com/in/kuberjha25",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/kuberjha25",
  },
  {
    name: "Twitter",
    icon: twitter,
    link: "https://twitter.com/kuberjha",
  },
  {
    name: "Email",
    icon: email,
    link: "mailto:kuber98jha@gmail.com",
  },
] as const;

// Stats
export const STATS = [
  {
    label: "Years Experience",
    value: "5+",
  },
  // {
  //   label: "Projects Completed",
  //   value: "50+",
  // },
  {
    label: "Happy Clients",
    value: "20+",
  },
  {
    label: "24/7 Support",
    value: "✓",
  },
] as const;
