export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_ROLES = [
  'Full-Stack Engineer',
  'Java / Python Developer',
  'React & Angular Dev',
  'AI Integration Engineer',
  'CS Honors Graduate',
];

export const STATS = [
  { value: '3.80', label: 'GPA', suffix: '' },
  { value: '10', label: 'Projects', suffix: '+' },
  { value: '97', label: 'Git Commits', suffix: '+' },
  { value: '2026', label: 'Award Winner', suffix: '' },
];

export const EDUCATION = [
  {
    school: 'University of North Texas',
    degree: 'B.S. Computer Science — Honors Program',
    period: 'Aug 2023 – May 2026',
    location: 'Denton, TX',
    gpa: '3.80 / 4.0',
    highlights: [
      'Award Winner — UNT Senior Design Research & Design Day 2026',
      'UNT Transfer Excellence Award',
      'STEM College of Science, Technology, Engineering & Mathematics',
    ],
    color: '#00d4ff',
  },
  {
    school: 'Dallas College',
    degree: 'Associate of Science — Computer Science',
    period: '2022 – 2024',
    location: 'Dallas, TX',
    highlights: ['Transferred to UNT with honors standing'],
    color: '#7c3aed',
  },
  {
    school: 'Youngstown State University',
    degree: 'B.S. Computer Science (transferred)',
    period: 'Aug 2022 – Dec 2022',
    location: 'Youngstown, OH',
    highlights: [
      'YSU Honors Scholar Award',
      'YSU International Scholar Award',
      'STEM College',
    ],
    color: '#06b6d4',
  },
];

export const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    color: '#00d4ff',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C', 'SQL', 'HTML5', 'CSS3', 'Bash', 'Go'],
  },
  {
    title: 'Frontend',
    color: '#7c3aed',
    skills: ['React', 'Angular', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Leaflet.js', 'Responsive Design'],
  },
  {
    title: 'Backend',
    color: '#06b6d4',
    skills: ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'OAuth 2.0', 'ETL Pipelines', 'Microservices', 'JDBC'],
  },
  {
    title: 'Databases',
    color: '#10b981',
    skills: ['MySQL', 'PostgreSQL', 'SQLite', 'NoSQL', 'Schema Design', 'Query Optimization'],
  },
  {
    title: 'AI & DevOps',
    color: '#f59e0b',
    skills: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Groq AI / LLaMA 3.1', 'Docker', 'AWS', 'Git', 'CI/CD', 'Linux'],
  },
  {
    title: 'Security',
    color: '#ef4444',
    skills: ['AES-256 Encryption', 'Parameterized SQL', 'SailPoint IIQ/ISC', 'Google Cybersecurity Cert', 'Wireshark', 'Wazuh SIEM'],
  },
];

export const EXPERIENCE = [
  {
    title: 'Web Developer & SEO Analyst',
    company: 'Technology Spot',
    period: 'June 2020 – May 2022',
    location: 'Remote',
    color: '#00d4ff',
    achievements: [
      'Developed and optimized 50+ web pages with front-end best practices, driving 40% increase in organic traffic',
      'Grew site to 15,000+ monthly visits by moving 20+ keywords into top-10 search rankings',
      'Delivered technical performance reports translating web metrics into actionable priorities for stakeholders',
    ],
  },
  {
    title: 'Student Assistant',
    company: 'Youngstown State University',
    period: 'Aug 2022 – Dec 2022',
    location: 'Youngstown, OH',
    color: '#7c3aed',
    achievements: [
      'Supported 10+ students with individualized academic assistance and social interaction strategies',
      'Improved assignment completion by 30% through structured Excel-based progress tracking',
      'Collaborated with faculty to tailor educational support for students with diverse learning needs',
    ],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'UNT Alumni Networking Tool',
    subtitle: 'Award-Winning Capstone',
    description: 'Full-stack alumni analytics platform for UNT Dean\'s Office. Python/Flask backend, React frontend, MySQL database, and Groq AI (LLaMA 3.1) integration for automated data extraction. 97+ Git commits in Agile/Scrum team of 5.',
    techs: ['Python', 'Flask', 'React', 'MySQL', 'Groq AI', 'LLaMA 3.1', 'OAuth 2.0'],
    github: 'https://github.com/sangambartaula/alumni-networking-tool',
    demo: null,
    badge: '🏆 Award Winner 2026',
    image: '/images/almuni.png',
    highlight: true,
    highlights: [
      'ETL pipeline with O(1) hash map deduplication — 85% reduction in data inconsistencies',
      '50% faster performance via SQL query optimization',
      'UNT Senior Design Research & Design Day Best Project Award',
    ],
  },
  {
    id: 2,
    title: 'Secure Payment Processing Backend',
    subtitle: 'Java Enterprise System',
    description: 'Java backend processing 500+ test transactions with AES-256 encryption, parameterized SQL injection prevention, and a state machine for transaction validation with comprehensive edge-case handling.',
    techs: ['Java', 'AES-256', 'JDBC', 'MySQL', 'State Machine'],
    github: 'https://github.com/sbanjade/backend-system-for-credit-card-transactions',
    demo: null,
    image: '/images/Front-End-and-Back-End-Payment-Processing-1200x900.png',
    highlights: [
      '500+ test transactions processed with zero security vulnerabilities',
      'Full unit and regression test coverage with production-grade reliability',
    ],
  },
  {
    id: 3,
    title: 'Inventory Management System',
    subtitle: 'Full-Featured Java App',
    description: 'Full-featured Java application with MySQL database supporting 1,000+ SKUs with CRUD operations, transaction logging, and role-based access control.',
    techs: ['Java', 'MySQL', 'JDBC', 'Swing GUI', 'BST', 'Hash Map'],
    github: 'https://github.com/sbanjade/Inventory-Management-System',
    demo: null,
    image: '/images/inventory.png',
    highlights: [
      '60% query speed improvement via Hash Maps and BST achieving O(log n) search',
      'Normalized schema with foreign key constraints for full data integrity',
    ],
  },
  {
    id: 4,
    title: 'Habit Tracker with Gamified UX',
    subtitle: 'Full-Stack Web App',
    description: 'Full-stack Habit Tracker web app featuring goal setting, streak tracking, dashboard analytics, and visual progress charts with user authentication and data persistence.',
    techs: ['JavaScript', 'MongoDB', 'Node.js', 'LocalStorage', 'Charts.js'],
    github: 'https://github.com/sbanjade/Habit-Tracker',
    demo: null,
    image: '/images/habit tracking.png',
  },
  {
    id: 5,
    title: 'City Growth Simulation Engine',
    subtitle: 'C++ / OOP / Agent-Based',
    description: 'Agent-based simulation on a 100×100 grid using cellular automata and BFS. 12+ modular classes following SOLID principles with spatial partitioning for 60 FPS rendering.',
    techs: ['C++', 'OOP', 'STL', 'BFS', 'Cellular Automata', 'SOLID'],
    github: 'https://github.com/sbanjade/Simcity/tree/main/Simcity',
    demo: null,
    image: '/images/simcity.png',
    highlights: ['60 FPS rendering with spatial partitioning optimization'],
  },
  {
    id: 6,
    title: 'HTTP vs HTTPS Traffic Analysis',
    subtitle: 'Cybersecurity Lab',
    description: 'Captured and analyzed network traffic using Wireshark to compare plaintext HTTP and encrypted HTTPS communications, demonstrating real-time credential exposure risks.',
    techs: ['Wireshark', 'Network Analysis', 'TCP/IP', 'Security'],
    github: 'https://github.com/sbanjade/Web-Application-Security-Lab-HTTP-vs-HTTPS-Traffic-Analysis',
    demo: null,
    image: '/images/WireShark.png',
    category: 'security',
  },
];

export const CERTIFICATIONS = [
  {
    title: 'Google Professional Cybersecurity Certificate',
    issuer: 'Google via Coursera',
    date: 'Feb 2026',
    status: 'completed',
    color: '#10b981',
    icon: 'google',
  },
  {
    title: 'Node.js Essential Training',
    issuer: 'LinkedIn Learning',
    date: 'Feb 2026',
    status: 'completed',
    color: '#00d4ff',
    icon: 'node',
  },
  {
    title: 'SQL Essential Training',
    issuer: 'LinkedIn Learning',
    date: '2025',
    status: 'completed',
    color: '#7c3aed',
    icon: 'db',
  },
  {
    title: 'Programming Foundations: Databases',
    issuer: 'LinkedIn Learning',
    date: 'Jan 2026',
    status: 'completed',
    color: '#06b6d4',
    icon: 'db',
  },
  {
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'In Progress',
    status: 'in-progress',
    color: '#f59e0b',
    icon: 'shield',
  },
  {
    title: 'SailPoint IIQ / ISC Certified',
    issuer: 'SailPoint',
    date: '2025',
    status: 'completed',
    color: '#ef4444',
    icon: 'shield',
  },
];

export const HONORS = [
  'UNT Senior Design Research & Design Day Best Project — 2026',
  'UNT Transfer Excellence Award',
  'YSU Honors Scholar Award',
  'YSU International Scholar Award',
  'Certified in Leadership & Teamwork — Tressel Institute',
];
