import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import getGreeting from 'utils/getGreeting';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

// icons
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import CompassOutlined from '@ant-design/icons/CompassOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import MailOutlined from '@ant-design/icons/MailOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';

// assets
import avatarCandidate from 'assets/images/users/avatar-1.png';
import candidateHeroCharacter from 'assets/images/auth/candidate-resources-v5.jpg';

// Categories Bar
const RESOURCE_CATEGORIES = [
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    sub: 'Plan your career path',
    icon: <CompassOutlined style={{ fontSize: 18 }} />,
    color: '#530EF0',
    bg: '#F3EDFF'
  },
  {
    id: 'resume-tips',
    title: 'Resume Tips',
    sub: 'Build a strong resume',
    icon: <FileTextOutlined style={{ fontSize: 18 }} />,
    color: '#6366F1',
    bg: '#EEF2FF'
  },
  {
    id: 'interview-prep',
    title: 'Interview Preparation',
    sub: 'Ace your interviews',
    icon: <TeamOutlined style={{ fontSize: 18 }} />,
    color: '#0284C7',
    bg: '#E0F2FE'
  },
  {
    id: 'skill-dev',
    title: 'Skill Development',
    sub: 'Learn in-demand skills',
    icon: <BarChartOutlined style={{ fontSize: 18 }} />,
    color: '#F59E0B',
    bg: '#FEF3C7'
  },
  {
    id: 'industry-insights',
    title: 'Industry Insights',
    sub: 'Explore industry trends',
    icon: <BankOutlined style={{ fontSize: 18 }} />,
    color: '#0D9488',
    bg: '#CCFBF1'
  },
  {
    id: 'job-search',
    title: 'Job Search Tips',
    sub: 'Find jobs faster',
    icon: <SearchOutlined style={{ fontSize: 18 }} />,
    color: '#10B981',
    bg: '#D1FAE5'
  }
];

// Downloadable Career Toolkits (High-Utility for Candidates)
const CAREER_TOOLKITS = [
  {
    id: 'toolkit-ats-resume',
    title: 'ATS Tech Resume Template',
    category: 'Resume Kit',
    type: 'DOCX / Text',
    size: '184 KB',
    badge: 'Most Popular',
    badgeColor: '#10B981',
    badgeBg: '#ECFDF5',
    downloads: '14,290 downloads',
    description: 'Clean single-column template proven to pass Workday, Greenhouse, and Lever ATS parsers with 95%+ match rates.',
    content: `ATS TECH RESUME TEMPLATE (Google / Tech Industry Standard)
===========================================================

[FULL NAME]
Bengaluru, India | +91 98765 43210 | candidate@example.com | linkedin.com/in/candidate | github.com/candidate

SUMMARY
Software Engineer with 3+ years of experience specializing in React, Node.js, TypeScript, and AWS cloud systems. Proven track record of speeding up application latency by 35% and scaling REST APIs to 2M+ daily requests.

TECHNICAL SKILLS
• Programming Languages: JavaScript (ES6+), TypeScript, Python, SQL, Java
• Frontend: React 18, Next.js, Redux Toolkit, Tailwind CSS, HTML5, CSS3, Webpack
• Backend & Databases: Node.js, Express, PostgreSQL, MongoDB, Redis, RESTful APIs, GraphQL
• Cloud & DevOps: Docker, AWS (S3, EC2, Lambda), CI/CD (GitHub Actions), Git, Linux, Jest

PROFESSIONAL EXPERIENCE
Software Engineer | TechSolutions Inc. | Bengaluru, India
Jun 2023 – Present
• Architected and migrated legacy single-page application to React 18 and Next.js, decreasing First Contentful Paint by 42% and boosting SEO traffic.
• Designed and shipped 12 RESTful microservices in Node.js and PostgreSQL, serving 1.5M daily active users with 99.98% uptime SLA.
• Optimized complex SQL joins and indexed database tables, reducing 95th-percentile response time from 380ms to 45ms.
• Mentored 3 junior software engineers on automated testing standards, elevating test coverage from 60% to 88% using Jest and Cypress.

Junior Frontend Developer | CloudMatrix Labs | Chennai, India
Jul 2021 – May 2023
• Developed responsive user interfaces for a B2B SaaS dashboard using React, TypeScript, and Material-UI, increasing daily user engagement by 28%.
• Integrated Stripe payment gateways and role-based access control (RBAC) supporting multi-tenant client organizations.
• Identified and patched critical cross-browser rendering bugs, reducing customer support tickets by 30%.

FEATURED PROJECTS
TraceU Distributed Job Platform | React, Node.js, PostgreSQL, Docker, AWS
• Built full-stack recruitment portal featuring real-time application tracking, automated candidate matching, and email notifications.
• Configured automated GitHub Actions CI/CD pipeline deploying containerized Docker services to AWS ECS.

EDUCATION
B.E. in Computer Science & Engineering | Anna University, Chennai | 2017 – 2021 | CGPA: 8.7/10`
  },
  {
    id: 'toolkit-interview-cheat-sheet',
    title: 'Top 50 Tech Interview Q&A',
    category: 'Interview Kit',
    type: 'PDF Cheat Sheet',
    size: '320 KB',
    badge: 'Essential',
    badgeColor: '#530EF0',
    badgeBg: '#F3EDFF',
    downloads: '21,800 downloads',
    description: 'Word-for-word STAR framework responses for behavioral rounds and architectural questions asked at leading tech firms.',
    content: `TOP 50 TECH INTERVIEW CHEAT SHEET & STAR MODEL ANSWERS
===========================================================

1. "TELL ME ABOUT YOURSELF" (The 90-Second Framework)
Formula: Present -> Past Experience -> Key Achievement -> Future Fit
"I am a Software Engineer with over 3 years of hands-on experience building performant web applications using React, TypeScript, and Node.js. In my current role at TechSolutions, I led our frontend modernization to Next.js, which reduced page load times by 40% and improved conversions for 1M monthly active users. Prior to that, I graduated with a degree in Computer Science and contributed to developer tooling. What excites me about TraceU is your mission to scale talent matching, where my background in distributed systems and UI architecture can deliver immediate impact from day one."

2. "DESCRIBE A TOUGH TECHNICAL BUG YOU RESOLVED" (STAR Framework)
• Situation: In production, our backend API pods began crashing every 3-4 hours during peak flash sales.
• Task: I took ownership of diagnosing the root cause without taking down our active database services.
• Action: I analyzed heap memory dumps using Node.js inspect and discovered an uncleaned event listener on disconnected WebSocket clients retaining detached memory buffers. I refactored the socket lifecycle into an idempotent cleanup hook and wrote automated stress tests simulating 10,000 concurrent client dropoffs.
• Result: Pod crashes fell to zero, memory usage stabilized at 180MB, and cloud compute costs were reduced by 18%.

3. "HOW DO YOU HANDLE A DISAGREEMENT WITH A PRODUCT MANAGER OR TECH LEAD?"
"I always separate personal opinions from data. In a recent sprint, our PM wanted to bypass automated integration tests to hit an arbitrary marketing deadline. Rather than just saying no, I showed the error log and incident cost from our previous untested release. We collaborated on a compromise: we shipped the core MVP behind an experimental feature flag while writing automated tests concurrently, launching on time with zero production incidents."

4. "WHAT IS YOUR GREATEST WEAKNESS?"
"Early in my career, I had a tendency to dive directly into coding before establishing full alignment on edge cases. This occasionally caused rework during code reviews. To fix this, I adopted a strict design-doc habit: before writing significant features, I draft a 1-page RFC outlining the API schema, data flow, and edge cases, gathering review from peers first. This has cut down our review iterations by half."`
  },
  {
    id: 'toolkit-outreach-templates',
    title: 'Recruiter Outreach Swipe File',
    category: 'Networking Kit',
    type: 'Message Pack',
    size: '95 KB',
    badge: 'High Response',
    badgeColor: '#0284C7',
    badgeBg: '#E0F2FE',
    downloads: '9,450 downloads',
    description: '5 field-tested cold message templates for LinkedIn and email to get recruiter replies in under 48 hours.',
    content: `RECRUITER OUTREACH & REFERRAL SWIPE FILE
===========================================================

TEMPLATE 1: Direct LinkedIn InMail to Recruiter (82% Response Rate)
Subject: Application for [Job Title] - [Your Name] (Requisition #[Job ID])

Hi [Recruiter Name],

I noticed you're leading talent hiring for the [Job Title] role at [Company Name]. With 3+ years of experience building scalable applications in React and Node.js (and recently speeding up latency by 40% at [Current Company]), I believe my background aligns closely with what your engineering team is building.

I have already submitted my application via TraceU Jobs (ID: [Your App ID]), but wanted to reach out directly to express my genuine enthusiasm.

Would you be open to a brief 5-minute chat this week? Here is my LinkedIn / GitHub: [Link]

Best regards,
[Your Name]

-----------------------------------------------------------
TEMPLATE 2: Asking an Employee for a Referral on LinkedIn
Hi [First Name],

I hope you're having a great week! I came across your profile while researching [Company Name]'s engineering team — really impressed by your recent work on [Specific project/blog].

I'm an engineer specializing in [Your Stack] and saw an open [Job Title] role that matches my background. Would you be comfortable referring me for the position? I have attached my 1-page ATS resume and the Job ID for easy reference.

Happy to share any additional details. Thanks so much for your time!

Best,
[Your Name]

-----------------------------------------------------------
TEMPLATE 3: Post-Interview Thank You & Follow-Up (Within 24 Hours)
Subject: Thank you - [Your Name] - Interview for [Job Title]

Hi [Interviewer Name],

Thank you so much for taking the time to speak with me today regarding the [Job Title] role. I really enjoyed learning more about how your team approaches [Specific topic discussed, e.g., microservice scaling or design system migration].

Our conversation reaffirmed my enthusiasm for joining [Company Name]. I'm confident my experience in [Key Skill] will allow me to hit the ground running.

Please let me know if there are any additional materials I can provide. Looking forward to the next steps!

Warm regards,
[Your Name]`
  },
  {
    id: 'toolkit-salary-negotiation',
    title: 'Salary Negotiation Playbook',
    category: 'Compensation Kit',
    type: 'Guide & Calculator',
    size: '140 KB',
    badge: 'High Value',
    badgeColor: '#D97706',
    badgeBg: '#FEF3C7',
    downloads: '16,700 downloads',
    description: 'Counter-offer scripts, fixed vs variable CTC breakdown, and proven strategies to negotiate 20-30% higher compensation.',
    content: `SALARY NEGOTIATION PLAYBOOK & CTC DECODER
===========================================================

THE THREE RULES OF COMPENSATION NEGOTIATION:
1. Never give your expected number first if you can avoid it.
2. Negotiate the full picture: Base Salary, Joining Bonus, Performance Bonus, Equity (ESOPs), and Remote Allowance.
3. Always lead with enthusiasm: express excitement about the team first, then address the numbers professionally.

HOW TO ANSWER: "WHAT IS YOUR CURRENT AND EXPECTED CTC?"
Script:
"My current compensation is structured around fixed base salary and performance incentives. For this next role, I am primarily focused on finding the right long-term engineering fit where I can deliver significant value. Based on current industry benchmarks for a [Job Title] in [City/Remote] and my experience leading full-stack projects, I am looking for a total package in the range of ₹[X] to ₹[Y] LPA. I am confident we can agree on a mutually fair figure once we confirm mutual fit."

HOW TO SEND A COUNTER-OFFER EMAIL:
Subject: [Your Name] - Offer for [Job Title]

Hi [Recruiter Name],

Thank you so much for extending the offer to join [Company Name] as [Job Title]! I am thrilled about the opportunity to collaborate with the team on [Key initiative discussed in interview].

After reviewing the details of the initial offer at ₹[Offered Amount] LPA, I noticed the fixed base component is slightly below my target of ₹[Target Amount] LPA, especially considering my direct experience with [Key Skill/Architecture] which will allow me to contribute immediately with minimal onboarding.

If we can bring the fixed component to ₹[Target Amount] LPA (or alternatively include a ₹[Bonus] joining bonus), I would be delighted to sign and accept the offer today.

Thank you again for your time and partnership throughout this process!

Best regards,
[Your Name]`
  }
];

// Featured Main Hero Article
const FEATURED_HERO_ARTICLE = {
  id: 'featured-hero',
  tag: 'RESUME BLUEPRINT 2026',
  tagColor: '#530EF0',
  tagBg: '#F3EDFF',
  title: 'How to Build an ATS-Proof Resume That Lands Top Tech Interviews',
  excerpt: 'A comprehensive, recruiter-tested guide with exact bullet formulas, section architecture, and common red flags to avoid.',
  date: 'Nov 15, 2026',
  readTime: '9 min read',
  image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
  content: `BUILDING AN ATS-PROOF TECH RESUME IN 2026
===========================================
Recruiters and hiring software (Applicant Tracking Systems like Workday, Greenhouse, and Lever) parse thousands of resumes daily. Over 75% of resumes are rejected before human eyes ever see them due to formatting errors or lack of quantifiable achievements.

1. THE GOLDEN FORMATTING RULES
• Format: Use clean, single-column layout. Avoid two-column designs, tables, text boxes, and graphic skill bars.
• Fonts: Standard readable fonts (Calibri, Arial, Helvetica, Roboto) between 10pt and 11.5pt.
• Length: Exactly 1 page for candidates with 0-5 years of experience; maximum 2 pages for 6+ years.
• File Format: Submit as PDF named "[FirstName]_[LastName]_Resume.pdf".

2. THE GOOGLE X-Y-Z FORMULA FOR BULLET POINTS
Every bullet point under your experience should follow the formula:
"Accomplished [X], as measured by [Y], by doing [Z]"

• WEAK: "Worked on frontend and improved performance."
• STRONG: "Redesigned checkout workflow in React 18, cutting cart abandonment by 23% and reducing page load times from 2.4s to 1.1s."

• WEAK: "Created backend APIs for users."
• STRONG: "Engineered 14 RESTful microservices in Node.js & PostgreSQL, handling 2.5M requests daily with 99.98% SLA."

3. RESUME SECTION ARCHITECTURE
1. Contact Header: Name, Location, Phone, Professional Email, LinkedIn, GitHub, Portfolio.
2. Technical Skills: Categorized into Languages, Frontend, Backend & Databases, Cloud & DevOps, Tools.
3. Work Experience: Reverse chronological order with 3-5 high-impact bullet points per role.
4. Featured Projects: Name, Tech Stack, Live Demo link, and 2 bullets detailing problem solved.
5. Education: Degree, Institution, Graduation Year, CGPA (if above 8.0).

4. FIVE RED FLAGS TO REMOVE IMMEDIATELY
❌ Outdated introductory objectives ("Looking for a challenging position in a reputed firm...")
❌ Photo, marital status, age, or full home street address
❌ Soft skills list without proof ("Hardworking, team player, fast learner")
❌ Rating bars (e.g. "React: 4/5 stars" — gives algorithms a reason to reject)
❌ Typos in technical names (write "JavaScript", not "Javascript"; "Node.js", not "Node JS")`
};

// Featured Stacked Articles (3 items)
const FEATURED_STACKED_ARTICLES = [
  {
    id: 'stacked-1',
    title: 'Top 20 Technical & Behavioral Interview Questions (With Winning Answers)',
    date: 'Nov 12, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&auto=format&fit=crop&q=75',
    category: 'Interview Preparation',
    content: `TOP 20 INTERVIEW QUESTIONS & MODEL ANSWERS
=========================================
Technical interviews evaluate not just what you code, but how you communicate, collaborate, and navigate trade-offs.

KEY QUESTION 1: "HOW DO YOU DECIDE BETWEEN SQL AND NOSQL FOR A NEW PROJECT?"
Model Answer: "I evaluate our data schema volatility and query patterns. If we have highly structured transactional data requiring ACID compliance (like financial payments or order accounting), PostgreSQL or MySQL is the clear choice. If we have polymorphic semi-structured documents requiring horizontal read scaling or dynamic attributes (like product catalogs or user activity streams), MongoDB or DynamoDB is better suited."

KEY QUESTION 2: "TELL ME ABOUT A TIME YOU FAILED OR MADE A MISTAKE."
Model Answer: "In my previous role, I deployed an unindexed database migration to production during daytime traffic, causing query latency spikes for 12 minutes. I immediately rolled back the release, added the missing compound index on staging first, and documented the root cause in an open team post-mortem. To ensure this never recurred, I added an automated linter rule in our CI pipeline that checks all schema migrations for missing index declarations."`
  },
  {
    id: 'stacked-2',
    title: 'In-Demand Tech Skills for 2026: What Companies Actually Pay For',
    date: 'Nov 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=75',
    category: 'Skill Development',
    content: `IN-DEMAND SKILLS MATRIX FOR 2026
===============================
1. FRONTEND ENGINEERING:
• React 19 & Next.js Server Components
• TypeScript strictly typed design patterns
• State management (Zustand, TanStack Query)
• Core Web Vitals optimization (INP, LCP, CLS)

2. BACKEND & DISTRIBUTED SYSTEMS:
• Go and Node.js for high-throughput APIs
• Redis distributed caching and rate-limiting
• Apache Kafka / RabbitMQ for event-driven pub-sub
• PostgreSQL advanced indexing & partition strategies

3. CLOUD & AI INTEGRATION:
• Docker containerization and Kubernetes orchestration
• AWS Serverless (Lambda, EventBridge, DynamoDB)
• LLM app development using LangChain, RAG architectures, and vector embeddings (Pinecone, ChromaDB).`
  },
  {
    id: 'stacked-3',
    title: 'Career Switcher Playbook: How to Transition into Tech in 6 Months',
    date: 'Nov 06, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=75',
    category: 'Career Guidance',
    content: `THE 6-MONTH CAREER SWITCH ROADMAP
=================================
Month 1-2: Core Fundamentals
Master one language deeply (JavaScript or Python). Don't jump across 4 languages. Learn data structures, Git, and REST APIs.

Month 3-4: Build Proof-of-Work Projects
Stop tutorial hell. Build 2 production-grade applications that solve real user problems. Deploy them live with custom domains, authentication, and database persistence.

Month 5: ATS Resume & Online Presence
Map your prior domain experience (e.g., sales, marketing, operations) as a superpower. Product empathy and business communication are rare in pure engineering candidates.

Month 6: High-Volume Strategic Outreach
Skip blind job board submissions. Use warm outreach on LinkedIn to engineering managers and alumni.`
  }
];

// Latest Articles (4 horizontal items)
const LATEST_ARTICLES = [
  {
    id: 'latest-1',
    tag: 'JOB SEARCH',
    tagColor: '#2563EB',
    tagBg: '#EFF6FF',
    title: '10 High-Impact Job Search Strategies for Freshers',
    excerpt: 'Skip the blackhole of blind applications with proactive networking and proof-of-work portfolios.',
    date: 'Nov 04, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=75',
    content: `10 JOB SEARCH STRATEGIES FOR RECENT GRADUATES:
1. Build in Public: Share small coding milestones, bug fixes, or architecture diagrams weekly on LinkedIn and Twitter/X.
2. Contribute to Open-Source: Fixing a bug in a known repository proves real-world git hygiene and code comprehension.
3. Target Fast-Growing Startups: Series A and B startups value ownership and agility over pedigree.
4. Don't Rely on 'Easy Apply': Applications with tailored cold outreach have an 8x higher interview conversion rate.`
  },
  {
    id: 'latest-2',
    tag: 'INDUSTRY INSIGHTS',
    tagColor: '#0D9488',
    tagBg: '#CCFBF1',
    title: 'Top High-Growth Industries Hiring in 2026 & CTC Ranges',
    excerpt: 'Detailed analysis of hiring momentum across FinTech, HealthTech, AI Infrastructure, and SaaS.',
    date: 'Nov 02, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=75',
    content: `2026 HIRING SECTORS & SALARY BENCHMARKS:
• AI Infrastructure & Tooling: ₹14 - 28 LPA for 1-3 years experience.
• FinTech & Payment Gateways: ₹12 - 24 LPA for 1-3 years experience.
• B2B Enterprise SaaS: ₹10 - 20 LPA for 1-3 years experience.
• HealthTech & Telemedicine: ₹9 - 18 LPA for 1-3 years experience.`
  },
  {
    id: 'latest-3',
    tag: 'SKILL DEVELOPMENT',
    tagColor: '#7C3AED',
    tagBg: '#F3EDFF',
    title: 'System Architecture & API Design Essentials for Engineers',
    excerpt: 'Master caching, idempotency, rate-limiting, and microservice boundaries.',
    date: 'Oct 30, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&auto=format&fit=crop&q=75',
    content: `SYSTEM ARCHITECTURE CHEAT SHEET:
1. Idempotency: Always design payment and order endpoints with unique idempotency keys to prevent duplicate billing on network retries.
2. Caching Strategy: Use Cache-Aside pattern with Redis and explicit TTLs to prevent stale memory bloat.
3. Database Indexing: Index columns frequently used in WHERE, JOIN, and ORDER BY clauses.`
  },
  {
    id: 'latest-4',
    tag: 'INTERVIEW TIPS',
    tagColor: '#D97706',
    tagBg: '#FEF3C7',
    title: 'How to Crack Technical Coding Rounds: 75 Must-Know Patterns',
    excerpt: 'Stop grinding hundreds of random questions. Master the core algorithmic patterns.',
    date: 'Oct 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=75',
    content: `THE TOP 5 CODING PATTERNS:
1. Two Pointers: For sorted arrays, finding pairs, and in-place array transformations (O(N) time, O(1) space).
2. Sliding Window: For subarray sums, longest substring without repeats, and consecutive element problems.
3. Fast & Slow Pointers (Floyd's Cycle): For linked list cycle detection and middle element retrieval.
4. Tree Breadth-First Search (BFS): Level-order traversal and shortest path in unweighted graphs.
5. Top K Elements (Min/Max Heap): For finding largest/smallest K items in O(N log K) time.`
  }
];

// Career Tools
const CAREER_TOOLS = [
  {
    id: 'resume-builder',
    title: 'Resume Builder & ATS Scanner',
    desc: 'Verify ATS score and format in minutes',
    icon: <FileTextOutlined style={{ fontSize: 16 }} />,
    color: '#530EF0',
    bg: '#F3EDFF'
  },
  {
    id: 'cover-letter',
    title: 'Cover Letter Generator',
    desc: 'Generate role-tailored cover letters',
    icon: <EditOutlined style={{ fontSize: 16 }} />,
    color: '#EA580C',
    bg: '#FFEDD5'
  },
  {
    id: 'interview-prep',
    title: 'Interview Simulator',
    desc: 'Practice real technical & behavioral Q&A',
    icon: <TeamOutlined style={{ fontSize: 16 }} />,
    color: '#2563EB',
    bg: '#EFF6FF'
  },
  {
    id: 'salary-insights',
    title: 'Salary Benchmark Calculator',
    desc: 'Know your market value & percentile',
    icon: <DollarOutlined style={{ fontSize: 16 }} />,
    color: '#D97706',
    bg: '#FEF3C7'
  },
  {
    id: 'skill-assessment',
    title: 'Skill Assessment Quiz',
    desc: 'Identify your strengths & gaps',
    icon: <SafetyCertificateOutlined style={{ fontSize: 16 }} />,
    color: '#10B981',
    bg: '#D1FAE5'
  }
];

export default function CandidateResources() {
  const navigate = useNavigate();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Modals & Menus
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [activeToolModal, setActiveToolModal] = useState(null);
  const [activeToolkitModal, setActiveToolkitModal] = useState(null);
  const [coverLetterRole, setCoverLetterRole] = useState('Software Engineer');
  const [coverLetterCompany, setCoverLetterCompany] = useState('TraceU');
  const [salaryExpTier, setSalaryExpTier] = useState('1-3 yrs');
  const [salaryRoleType, setSalaryRoleType] = useState('Frontend Developer');
  const [savedArticles, setSavedArticles] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Clipboard copy helper
  const handleCopyText = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setSnackbar({ open: true, message: `Copied ${label || 'content'} to clipboard!`, severity: 'success' });
  };

  // File download helper
  const handleDownloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: `Downloaded ${filename}`, severity: 'success' });
  };

  // Bookmark toggle
  const toggleSaveArticle = (id, title) => {
    setSavedArticles((prev) => {
      const isSaved = !prev[id];
      setSnackbar({
        open: true,
        message: isSaved ? `Bookmarked "${title}"` : `Removed "${title}" from bookmarks`,
        severity: isSaved ? 'success' : 'info'
      });
      return { ...prev, [id]: isSaved };
    });
  };

  // Newsletter subscribe
  const handleSubscribe = () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setSnackbar({ open: true, message: 'Please enter a valid email address.', severity: 'warning' });
      return;
    }
    setSnackbar({ open: true, message: 'Subscribed successfully! You will receive weekly career insights.', severity: 'success' });
    setNewsletterEmail('');
  };

  // Filtered latest articles
  const filteredLatest = useMemo(() => {
    return LATEST_ARTICLES.filter((art) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.tag.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8F9FE', color: '#111827' }}>
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR HEADER                                                      */}
      {/* ========================================================================= */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          px: { xs: 2, md: 5 },
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        {/* Left: Brand Logo & Navigation */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 2, lg: 4 }}>
          {/* Brand Logo */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            onClick={() => navigate('/candidate')}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: '#530EF0',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 16,
                boxShadow: '0 4px 10px rgba(83, 14, 240, 0.3)'
              }}
            >
              TU
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: 19, color: '#111827', letterSpacing: '-0.3px' }}>
              TraceU Jobs
            </Typography>
          </Stack>

          {/* Navigation Links */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1.5, md: 3 }}
            sx={{ display: { xs: 'none', md: 'flex' }, height: 70 }}
          >
            <Typography
              onClick={() => navigate('/candidate/jobs')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Find Jobs
            </Typography>

            <Typography
              onClick={() => navigate('/candidate/companies')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Companies
            </Typography>

            <Typography
              onClick={() => navigate('/candidate/internships')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Internships
            </Typography>

            {/* Resources (Active Tab) */}
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#530EF0' }}>
                Resources
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  bgcolor: '#530EF0',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            </Box>

            <Typography
              onClick={() => navigate('/candidate/career-tools')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Career Tools
            </Typography>
          </Stack>
        </Stack>

        {/* Right: Actions */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notifications */}
          <IconButton
            size="small"
            onClick={() => setSnackbar({ open: true, message: '3 new career guides published this week!', severity: 'info' })}
            sx={{ color: '#4B5563', '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' } }}
          >
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
              <BellOutlined style={{ fontSize: 18 }} />
            </Badge>
          </IconButton>

          {/* Saved */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.6}
            onClick={() => navigate('/candidate/saved')}
            sx={{
              cursor: 'pointer',
              color: '#4B5563',
              px: 1,
              py: 0.6,
              borderRadius: '8px',
              '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' }
            }}
          >
            <BookOutlined style={{ fontSize: 14 }} />
            <Typography sx={{ fontWeight: 600, fontSize: 13.5 }}>
              Saved
            </Typography>
          </Stack>

          {/* User Profile Pill */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={(e) => setProfileAnchor(e.currentTarget)}
            sx={{
              cursor: 'pointer',
              p: 0.5,
              pr: 1.25,
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              transition: 'all 0.15s ease',
              '&:hover': { borderColor: '#530EF0', bgcolor: '#F9FAFB' }
            }}
          >
            <Avatar src={avatarCandidate} sx={{ width: 32, height: 32 }} />
            <Typography sx={{ fontWeight: 600, fontSize: 13.5, color: '#111827', display: { xs: 'none', sm: 'block' } }}>
              {getGreeting()}, Candidate
            </Typography>
            <DownOutlined style={{ fontSize: 10, color: '#6B7280' }} />
          </Stack>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            PaperProps={{
              sx: {
                borderRadius: '12px',
                minWidth: 200,
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                p: 0.5
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #F1F5F9' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>Candidate</Typography>
              <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>candidate@gmail.com</Typography>
            </Box>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate'); }} sx={{ fontSize: 13, py: 1 }}>
              <UserOutlined style={{ marginRight: 10, color: '#530EF0' }} /> My Profile
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/jobs'); }} sx={{ fontSize: 13, py: 1 }}>
              <ShopOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Find Jobs
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/companies'); }} sx={{ fontSize: 13, py: 1 }}>
              <ShopOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Companies
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/saved'); }} sx={{ fontSize: 13, py: 1 }}>
              <BookOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Saved Items
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/login'); }} sx={{ fontSize: 13, py: 1, color: '#EF4444' }}>
              <LogoutOutlined style={{ marginRight: 10 }} /> Sign Out
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          px: { xs: 2, sm: 4, md: 5 },
          pt: { xs: 4, md: 5 },
          pb: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
          sx={{ maxWidth: 1400, mx: 'auto' }}
        >
          {/* Left Text & Search */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 760 } }}>
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 800,
                color: '#530EF0',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                mb: 1.25
              }}
            >
              RESOURCES
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 40, md: 48 },
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#111827',
                letterSpacing: '-0.8px',
                mb: 1.5
              }}
            >
              Learn. Grow. <Box component="span" sx={{ color: '#530EF0' }}>Get Hired.</Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14, sm: 15 },
                color: '#6B7280',
                mb: 3.5,
                lineHeight: 1.5,
                maxWidth: 620
              }}
            >
              Expert career advice, resume tips, interview guidance and industry insights to help you at every step of your career journey.
            </Typography>

            {/* Search Pill */}
            <Card
              elevation={0}
              sx={{
                p: 0.75,
                pl: 2.5,
                borderRadius: '50px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 8px 30px rgba(83, 14, 240, 0.06)',
                bgcolor: '#FFFFFF',
                mb: 2.5,
                maxWidth: 620
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <SearchOutlined style={{ fontSize: 18, color: '#9CA3AF' }} />
                <TextField
                  variant="standard"
                  placeholder="Search articles, guides, tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  sx={{ '& input': { fontSize: 14, fontWeight: 500, p: 0, color: '#111827' } }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setSnackbar({ open: true, message: `Searching articles for "${searchQuery || 'All'}"...`, severity: 'info' });
                  }}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14,
                    px: 3.5,
                    py: 1.25,
                    borderRadius: '30px',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(83, 14, 240, 0.35)',
                    '&:hover': { bgcolor: '#420bc2' }
                  }}
                >
                  Search
                </Button>
              </Stack>
            </Card>

            {/* Popular Topics Chips */}
            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#6B7280' }}>
                Popular Topics:
              </Typography>
              {[
                'Resume Tips',
                'Interview Questions',
                'Career Guidance',
                'Skill Development',
                'Industry Insights',
                'Job Search Tips'
              ].map((term) => (
                <Chip
                  key={term}
                  label={term}
                  size="small"
                  onClick={() => setSearchQuery(term)}
                  sx={{
                    bgcolor: '#F3F4F6',
                    color: '#4B5563',
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F3EDFF', color: '#530EF0' }
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Right Hero Graphic: Resource Center Scene */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'relative',
              width: 440,
              height: 330
            }}
          >
            {/* Full Scene Card */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                bgcolor: '#ffffff',
                boxShadow: '0 16px 36px rgba(83, 14, 240, 0.12)',
                border: '1px solid #EDE9FE',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2
              }}
            >
              <Box
                component="img"
                src={candidateHeroCharacter}
                alt="Resource Center"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  display: 'block'
                }}
              />
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 3. HORIZONTAL CATEGORIES BAR (6 CARDS)                                    */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, pt: 3.5 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
            gap: 2
          }}
        >
          {RESOURCE_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.title;

            return (
              <Card
                key={cat.id}
                elevation={0}
                onClick={() => {
                  if (isSelected) {
                    setActiveCategory(null);
                    setSearchQuery('');
                  } else {
                    setActiveCategory(cat.title);
                    setSearchQuery(cat.title);
                  }
                }}
                sx={{
                  p: 2,
                  borderRadius: '14px',
                  border: isSelected ? '1.5px solid #530EF0' : '1px solid #F1F5F9',
                  bgcolor: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(83, 14, 240, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
                  '&:hover': {
                    borderColor: '#530EF0',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 18px rgba(83, 14, 240, 0.08)'
                  }
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      bgcolor: cat.bg,
                      color: cat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {cat.icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 13, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cat.title}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cat.sub}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 4. MAIN CONTENT: 2-COLUMN LAYOUT                                          */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3.5} alignItems="flex-start">
          {/* ===================================================================== */}
          {/* LEFT SECTION: FEATURED & LATEST ARTICLES                              */}
          {/* ===================================================================== */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Section 1: Featured Resources */}
            <Box sx={{ mb: 4.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
                  Featured Resources
                </Typography>
                <Typography
                  onClick={() => setSearchQuery('')}
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#530EF0',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  View All →
                </Typography>
              </Stack>

              {/* Split layout: Big card on left, 3 stacked on right */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
                {/* Big Card (Left) */}
                <Card
                  elevation={0}
                  onClick={() => setActiveArticleModal(FEATURED_HERO_ARTICLE)}
                  sx={{
                    flex: 1.15,
                    borderRadius: '16px',
                    border: '1px solid #F1F5F9',
                    bgcolor: '#FFFFFF',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      borderColor: '#C7D2FE',
                      boxShadow: '0 8px 24px rgba(83, 14, 240, 0.08)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 220,
                      width: '100%',
                      backgroundImage: `url(${FEATURED_HERO_ARTICLE.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  />
                  <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 1 }}>
                      <Chip
                        label={FEATURED_HERO_ARTICLE.tag}
                        size="small"
                        sx={{
                          bgcolor: FEATURED_HERO_ARTICLE.tagBg,
                          color: FEATURED_HERO_ARTICLE.tagColor,
                          fontSize: 11,
                          fontWeight: 800,
                          borderRadius: '6px'
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: 19,
                        fontWeight: 800,
                        color: '#111827',
                        lineHeight: 1.3,
                        mb: 1,
                        '&:hover': { color: '#530EF0' }
                      }}
                    >
                      {FEATURED_HERO_ARTICLE.title}
                    </Typography>

                    <Typography sx={{ fontSize: 13, color: '#6B7280', mb: 2, lineHeight: 1.5, flex: 1 }}>
                      {FEATURED_HERO_ARTICLE.excerpt}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={2} sx={{ color: '#9CA3AF', fontSize: 12 }}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CalendarOutlined style={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 12, color: 'inherit' }}>{FEATURED_HERO_ARTICLE.date}</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 12, color: 'inherit' }}>•</Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <ClockCircleOutlined style={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 12, color: 'inherit' }}>{FEATURED_HERO_ARTICLE.readTime}</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Card>

                {/* 3 Stacked Cards (Right) */}
                <Stack spacing={2} sx={{ flex: 1 }}>
                  {FEATURED_STACKED_ARTICLES.map((article) => (
                    <Card
                      key={article.id}
                      elevation={0}
                      onClick={() => setActiveArticleModal(article)}
                      sx={{
                        p: 1.75,
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        '&:hover': {
                          borderColor: '#C7D2FE',
                          boxShadow: '0 6px 18px rgba(83, 14, 240, 0.06)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 100,
                            height: 75,
                            borderRadius: '10px',
                            backgroundImage: `url(${article.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            flexShrink: 0
                          }}
                        />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: 14,
                              color: '#111827',
                              lineHeight: 1.35,
                              mb: 0.75,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {article.title}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <CalendarOutlined style={{ fontSize: 11 }} />
                              <Typography sx={{ fontSize: 11.5, color: 'inherit' }}>{article.date}</Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 11.5, color: 'inherit' }}>•</Typography>
                            <Typography sx={{ fontSize: 11.5, color: 'inherit' }}>{article.readTime}</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Stack>
            </Box>

            {/* Section 1.5: Downloadable Career Toolkits & Ready Templates */}
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ThunderboltOutlined style={{ color: '#530EF0', fontSize: 18 }} />
                    <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
                      Downloadable Career Toolkits & Templates
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280', mt: 0.25 }}>
                    Recruiter-tested ATS templates, interview cheat sheets, cold email swipe files, and salary negotiation playbooks.
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={2}>
                {CAREER_TOOLKITS.map((kit) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={kit.id}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 2.25,
                        borderRadius: '16px',
                        border: '1px solid #E5E7EB',
                        bgcolor: '#FFFFFF',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#C7D2FE',
                          boxShadow: '0 8px 24px rgba(83, 14, 240, 0.08)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.25 }}>
                          <Chip
                            label={kit.category}
                            size="small"
                            sx={{
                              bgcolor: kit.badgeBg,
                              color: kit.badgeColor,
                              fontSize: 10.5,
                              fontWeight: 800,
                              height: 22,
                              borderRadius: '6px'
                            }}
                          />
                          <Typography sx={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>
                            {kit.downloads}
                          </Typography>
                        </Stack>

                        <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 0.75 }}>
                          {kit.title}
                        </Typography>

                        <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.5, mb: 2 }}>
                          {kit.description}
                        </Typography>
                      </Box>

                      <Box sx={{ pt: 1.5, borderTop: '1px dashed #E5E7EB' }}>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            onClick={() => setActiveToolkitModal(kit)}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 700,
                              fontSize: 12,
                              borderColor: '#D1D5DB',
                              color: '#374151',
                              borderRadius: '8px',
                              '&:hover': { borderColor: '#530EF0', color: '#530EF0', bgcolor: '#F3EDFF' }
                            }}
                          >
                            View Guide
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            startIcon={<DownloadOutlined />}
                            onClick={() => handleDownloadFile(kit.content, `${kit.id}.txt`)}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 700,
                              fontSize: 12,
                              bgcolor: '#530EF0',
                              color: '#FFFFFF',
                              borderRadius: '8px',
                              boxShadow: 'none',
                              '&:hover': { bgcolor: '#420bc2' }
                            }}
                          >
                            Download
                          </Button>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Section 2: Latest Articles */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
                  Latest Articles
                </Typography>
                <Typography
                  onClick={() => setSearchQuery('')}
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#530EF0',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  View All →
                </Typography>
              </Stack>

              {/* 4 Cards Grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                  gap: 2.25
                }}
              >
                {filteredLatest.map((art) => (
                  <Card
                    key={art.id}
                    elevation={0}
                    onClick={() => setActiveArticleModal(art)}
                    sx={{
                      borderRadius: '16px',
                      border: '1px solid #F1F5F9',
                      bgcolor: '#FFFFFF',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#C7D2FE',
                        boxShadow: '0 8px 20px rgba(83, 14, 240, 0.08)',
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 140,
                        width: '100%',
                        backgroundImage: `url(${art.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={art.tag}
                          size="small"
                          sx={{
                            bgcolor: art.tagBg,
                            color: art.tagColor,
                            fontSize: 10,
                            fontWeight: 800,
                            height: 20,
                            borderRadius: '5px'
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: 14,
                          color: '#111827',
                          lineHeight: 1.35,
                          mb: 0.75,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {art.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 12,
                          color: '#6B7280',
                          lineHeight: 1.45,
                          mb: 2,
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {art.excerpt}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                        <Stack direction="row" alignItems="center" spacing={0.4}>
                          <CalendarOutlined style={{ fontSize: 11 }} />
                          <Typography sx={{ fontSize: 11.5, color: 'inherit' }}>{art.date}</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 11.5, color: 'inherit' }}>•</Typography>
                        <Typography sx={{ fontSize: 11.5, color: 'inherit' }}>{art.readTime}</Typography>
                      </Stack>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ===================================================================== */}
          {/* RIGHT SECTION: CAREER TOOLS, NEWSLETTER, TOPICS                       */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', lg: 340 }, flexShrink: 0 }}>
            <Stack spacing={3}>
              {/* Card 1: Career Tools */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #F1F5F9',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                    Career Tools
                  </Typography>
                  <Typography
                    onClick={() => setActiveToolModal(CAREER_TOOLS[0])}
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#530EF0',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    View All →
                  </Typography>
                </Stack>

                <Stack spacing={1.5}>
                  {CAREER_TOOLS.map((tool) => (
                    <Stack
                      key={tool.id}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={() => setActiveToolModal(tool)}
                      sx={{
                        p: 1.25,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: '#F8F9FE' }
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '10px',
                            bgcolor: tool.bg,
                            color: tool.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {tool.icon}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {tool.title}
                          </Typography>
                          <Typography sx={{ fontSize: 11.5, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {tool.desc}
                          </Typography>
                        </Box>
                      </Stack>
                      <RightOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />
                    </Stack>
                  ))}
                </Stack>
              </Card>

              {/* Card 2: Stay Updated / Newsletter Subscription */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #F3EDFF 0%, #FAF5FF 100%)',
                  border: '1px solid #E9D5FF',
                  boxShadow: '0 4px 16px rgba(83, 14, 240, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#530EF0', letterSpacing: '0.8px', textTransform: 'uppercase', mb: 0.5 }}>
                      STAY UPDATED
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827', mb: 0.5, lineHeight: 1.3 }}>
                      Get the Latest Career Tips & Job Insights
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
                      Join our newsletter and never miss important updates.
                    </Typography>
                  </Box>

                  {/* Envelope graphic */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '14px',
                      bgcolor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(83, 14, 240, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 26,
                      flexShrink: 0
                    }}
                  >
                    ✉️
                  </Box>
                </Stack>

                <Stack spacing={1.25}>
                  <TextField
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    size="small"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlined style={{ color: '#9CA3AF', fontSize: 14 }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                      '& input': { fontSize: 13 }
                    }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubscribe}
                    sx={{
                      bgcolor: '#530EF0',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: 13,
                      py: 1,
                      borderRadius: '8px',
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(83, 14, 240, 0.3)',
                      '&:hover': { bgcolor: '#420bc2' }
                    }}
                  >
                    Subscribe
                  </Button>
                </Stack>
              </Card>

              {/* Card 3: Popular Topics */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #F1F5F9',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 2 }}>
                  Popular Topics
                </Typography>

                <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                  {[
                    'Resume Writing',
                    'Interview Questions',
                    'Career Change',
                    'Remote Work',
                    'Salary Negotiation',
                    'LinkedIn Tips',
                    'Work From Home',
                    'Resume Templates'
                  ].map((topic) => (
                    <Chip
                      key={topic}
                      label={topic}
                      size="small"
                      onClick={() => {
                        setSearchQuery(topic);
                        setSnackbar({ open: true, message: `Filtered articles for "${topic}"`, severity: 'info' });
                      }}
                      sx={{
                        bgcolor: '#F3F4F6',
                        color: '#4B5563',
                        fontSize: 12,
                        fontWeight: 500,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#F3EDFF', color: '#530EF0' }
                      }}
                    />
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 5. ARTICLE READER MODAL                                                   */}
      {/* ========================================================================= */}
      <Dialog
        open={Boolean(activeArticleModal)}
        onClose={() => setActiveArticleModal(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        {activeArticleModal && (
          <>
            <DialogTitle sx={{ fontWeight: 800, fontSize: 20, color: '#111827', pr: 5 }}>
              {activeArticleModal.title}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              <Box
                sx={{
                  height: 260,
                  width: '100%',
                  borderRadius: '12px',
                  backgroundImage: `url(${activeArticleModal.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mb: 3
                }}
              />
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2, color: '#6B7280', fontSize: 13 }}>
                <Typography sx={{ fontWeight: 700, color: '#530EF0' }}>By TraceU Career Experts</Typography>
                <Typography>•</Typography>
                <Typography>{activeArticleModal.date}</Typography>
                <Typography>•</Typography>
                <Typography>{activeArticleModal.readTime}</Typography>
              </Stack>
              <Typography sx={{ fontSize: 14.5, lineHeight: 1.7, color: '#374151', whiteSpace: 'pre-line' }}>
                {activeArticleModal.content || activeArticleModal.excerpt}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
              <Button
                startIcon={<HeartOutlined />}
                onClick={() => toggleSaveArticle(activeArticleModal.id, activeArticleModal.title)}
                sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 600 }}
              >
                Bookmark Article
              </Button>
              <Button
                variant="contained"
                onClick={() => setActiveArticleModal(null)}
                sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 3 }}
              >
                Done Reading
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ========================================================================= */}
      {/* 6. CAREER TOOLKIT FULL-VIEW MODAL                                         */}
      {/* ========================================================================= */}
      <Dialog
        open={Boolean(activeToolkitModal)}
        onClose={() => setActiveToolkitModal(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        {activeToolkitModal && (
          <>
            <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <FilePdfOutlined style={{ color: '#530EF0', fontSize: 20 }} />
                <span>{activeToolkitModal.title}</span>
              </Stack>
              <Chip
                label={activeToolkitModal.category}
                size="small"
                sx={{ bgcolor: activeToolkitModal.badgeBg, color: activeToolkitModal.badgeColor, fontWeight: 700 }}
              />
            </DialogTitle>
            <DialogContent dividers sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: 13, color: '#4B5563', mb: 2 }}>
                {activeToolkitModal.description}
              </Typography>
              <Box
                component="pre"
                sx={{
                  p: 2.5,
                  bgcolor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: 12.5,
                  fontFamily: 'monospace',
                  color: '#1E293B',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  maxHeight: 420,
                  overflowY: 'auto'
                }}
              >
                {activeToolkitModal.content}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<CopyOutlined />}
                onClick={() => handleCopyText(activeToolkitModal.content, activeToolkitModal.title)}
                sx={{ textTransform: 'none', fontWeight: 700, borderColor: '#D1D5DB', color: '#374151', borderRadius: '8px' }}
              >
                Copy to Clipboard
              </Button>
              <Stack direction="row" spacing={1.5}>
                <Button
                  onClick={() => setActiveToolkitModal(null)}
                  sx={{ textTransform: 'none', color: '#6B7280', fontWeight: 600 }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadOutlined />}
                  onClick={() => handleDownloadFile(activeToolkitModal.content, `${activeToolkitModal.id}.txt`)}
                  sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 2.5 }}
                >
                  Download Resource
                </Button>
              </Stack>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ========================================================================= */}
      {/* 7. CAREER TOOL INTERACTIVE MODAL                                          */}
      {/* ========================================================================= */}
      <Dialog
        open={Boolean(activeToolModal)}
        onClose={() => setActiveToolModal(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        {activeToolModal && (
          <>
            <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
              ✨ {activeToolModal.title}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              {activeToolModal.id === 'resume-builder' && (
                <Box>
                  <Box sx={{ p: 2, bgcolor: '#ECFDF5', borderRadius: '12px', border: '1px solid #A7F3D0', mb: 2.5 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16 }}>
                        92
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#065F46' }}>
                          Strong ATS Match Score
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#047857' }}>
                          Your resume structure passes standard Workday and Greenhouse parsers cleanly.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', mb: 1 }}>
                    ATS Checklist Breakdown:
                  </Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CheckOutlined style={{ color: '#10B981', fontSize: 14 }} />
                      <Typography sx={{ fontSize: 12.5, color: '#374151' }}>Single column layout without nested tables or columns</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CheckOutlined style={{ color: '#10B981', fontSize: 14 }} />
                      <Typography sx={{ fontSize: 12.5, color: '#374151' }}>Quantified metric accomplishments (e.g., &quot;decreased latency by 35%&quot;)</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CheckOutlined style={{ color: '#10B981', fontSize: 14 }} />
                      <Typography sx={{ fontSize: 12.5, color: '#374151' }}>Standard section headers: Summary, Skills, Experience, Education</Typography>
                    </Stack>
                  </Stack>
                </Box>
              )}

              {activeToolModal.id === 'cover-letter' && (
                <Box>
                  <Typography sx={{ fontSize: 13, color: '#6B7280', mb: 2 }}>
                    Generate a tailored cover letter customized for your target company and role.
                  </Typography>
                  <Grid container spacing={1.5} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Target Role"
                        value={coverLetterRole}
                        onChange={(e) => setCoverLetterRole(e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Target Company"
                        value={coverLetterCompany}
                        onChange={(e) => setCoverLetterCompany(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    component="pre"
                    sx={{
                      p: 2,
                      bgcolor: '#F8FAFC',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      fontSize: 11.5,
                      fontFamily: 'monospace',
                      color: '#1E293B',
                      whiteSpace: 'pre-wrap',
                      maxHeight: 180,
                      overflowY: 'auto'
                    }}
                  >
                    {`Dear Hiring Team at ${coverLetterCompany},\n\nI am writing to express my strong enthusiasm for the ${coverLetterRole} position. With over 3 years of hands-on experience delivering scalable systems and modern web architectures, I am eager to contribute immediately to ${coverLetterCompany}'s engineering goals.\n\nThank you for considering my application.\n\nBest regards,\nPriya Sharma`}
                  </Box>
                </Box>
              )}

              {activeToolModal.id === 'salary-insights' && (
                <Box>
                  <Typography sx={{ fontSize: 13, color: '#6B7280', mb: 2 }}>
                    Live compensation benchmarks across tier-1 Indian tech hubs (Bengaluru, Hyderabad, Pune).
                  </Typography>
                  <Box sx={{ border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
                    <Box sx={{ p: 1.5, bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#4B5563' }}>ROLE / EXPERIENCE</Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#4B5563' }}>MEDIAN CTC</Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#111827' }}>Frontend Dev (1-3 yrs)</Typography>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#530EF0' }}>₹8.5L - ₹14.0L</Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#111827' }}>Senior SDE (3-6 yrs)</Typography>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#530EF0' }}>₹18.0L - ₹28.0L</Typography>
                    </Box>
                    <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#111827' }}>Lead Architect (7+ yrs)</Typography>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#530EF0' }}>₹32.0L - ₹55.0L</Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {activeToolModal.id !== 'resume-builder' && activeToolModal.id !== 'cover-letter' && activeToolModal.id !== 'salary-insights' && (
                <Box>
                  <Typography sx={{ fontSize: 13.5, color: '#4B5563', mb: 2 }}>
                    {activeToolModal.desc}
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: '#F8F9FE', borderRadius: '10px', border: '1px solid #E9D5FF' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#530EF0', mb: 0.5 }}>
                      ✓ Instant AI Simulation Active
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>
                      Pre-populated with verified questions, scenarios, and candidate grading rubrics.
                    </Typography>
                  </Box>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setActiveToolModal(null)} sx={{ textTransform: 'none', color: '#6B7280' }}>Close</Button>
              {activeToolModal.id === 'cover-letter' && (
                <Button
                  variant="outlined"
                  startIcon={<CopyOutlined />}
                  onClick={() => handleCopyText(`Dear Hiring Team at ${coverLetterCompany},\n\nI am writing to express my strong enthusiasm for the ${coverLetterRole} position...`, 'Cover Letter')}
                  sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                >
                  Copy Letter
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => {
                  setActiveToolModal(null);
                  setSnackbar({ open: true, message: `Completed ${activeToolModal.title} action!`, severity: 'success' });
                }}
                sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
              >
                Done
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Global Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: '10px', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

