import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, Calendar, CheckCircle2, Circle, Youtube, Sparkles, 
  Layers, Terminal, Cpu, ShieldCheck, Zap, Download, Copy, Check, 
  Search, ArrowRight, AlertTriangle, Lightbulb, Smartphone, CreditCard, 
  Globe, Server, BookOpen, MessageSquare, ExternalLink, Filter, HelpCircle
} from 'lucide-react';
import { VideoTutorial } from '../types';

interface YouTubeToFairEducationPageProps {
  videos: VideoTutorial[];
  onSelectVideo: (video: VideoTutorial) => void;
  onNavigate: (tab: 'home' | 'portal' | 'network' | 'create') => void;
}

export const YouTubeToFairEducationPage: React.FC<YouTubeToFairEducationPageProps> = ({
  videos,
  onSelectVideo,
  onNavigate,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'gaps' | 'stack'>('roadmap');

  // Master 10-Day Plan Data Definition
  const masterPlan = useMemo(() => [
    {
      day: 1,
      phase: 'Architecture & Bangladesh Network Baseline',
      title: 'Day 1: Platform Topology, Database Architecture & bDIX Network Baseline',
      focusArea: 'Infrastructure & System Architecture',
      duration: 'Day 1 (24 Hours)',
      overview: 'Establish the core full-stack repository, database schemas (PostgreSQL + Redis), and configure bDIX low-latency routing for Bangladesh ISPs (Grameenphone, Robi, AmberIT, Dot Internet).',
      subTopics: [
        {
          id: 'd1-1',
          name: 'Microservice vs Monolith Selection for Low-Latency Bangladesh Edge',
          description: 'Choose a modular Express/Node.js monolith with Vite SPA frontend for fast 10-day execution while keeping microservice boundaries for video processing.',
          prompt: 'Act as a principal cloud architect. Design a modular Express TypeScript backend architecture optimized for low-bandwidth client connections with bDIX server hosting.',
          cmd: 'git init && npm init -y && npm install express cors dotenv pg drizzle-orm redis'
        },
        {
          id: 'd1-2',
          name: 'PostgreSQL & Drizzle ORM Schema Setup for Courses, Users & Progress',
          description: 'Define relational database tables for Users (Students, Teachers), Courses, Modules, Lessons, Enrollments, and Quiz Attempts.',
          prompt: 'Write Drizzle ORM schema for Bangladesh EdTech: Users (phone_number, role, district), Courses (title_bn, price_bdt), Enrolments (payment_status).',
          cmd: 'npx drizzle-kit generate && npx drizzle-kit push'
        },
        {
          id: 'd1-3',
          name: 'bDIX CDN Peering & Static Asset Optimization',
          description: 'Configure Cloudflare or local Dhaka-based VPS (e.g. Alpha Net, DianaHost bDIX) to route traffic through local Bangladesh Internet Exchanges for <20ms latency.',
          prompt: 'Generate Nginx reverse proxy configuration with gzip, brotli, and bDIX static caching headers.',
          cmd: 'sudo apt update && sudo apt install nginx certbot python3-certbot-nginx -y'
        }
      ],
      videoTopicMatches: [
        'Model Context Protocol (MCP) Express Server Walkthrough',
        'Workflows & Orchestration System Setup',
        'AI Coding Tools & Architecture'
      ],
      mappedCategory: 'Model Context Protocol (MCP)',
      deliverables: ['Production-ready GitHub Repo', 'Database Schema Pushed', 'bDIX Configured Server Host']
    },
    {
      day: 2,
      phase: 'Authentication & Local SMS Gateway',
      title: 'Day 2: Dual Phone Number Authentication & Bangladesh SMS OTP Gateway',
      focusArea: 'Security & User Onboarding',
      duration: 'Day 2 (24 Hours)',
      overview: 'Implement dual authentication supporting both Google OAuth and Phone Number + SMS OTP via Greenweb / BulkSMSBD / MIMSMS for students without active email accounts.',
      subTopics: [
        {
          id: 'd2-1',
          name: 'Phone Number Normalization & Dual Auth System',
          description: 'Enforce standard +880 Bangladesh mobile phone format (+88017..., +88018..., +88019..., +88015...) with rate-limited OTP generation.',
          prompt: 'Write TypeScript phone number validator for Bangladesh mobile operators and generate a 6-digit cryptographically secure OTP handler.',
          cmd: 'npm install jsonwebtoken bcryptjs zod libphonenumber-js'
        },
        {
          id: 'd2-2',
          name: 'Integration with Greenweb / BulkSMSBD SMS Gateway API',
          description: 'Connect REST API of local SMS gateways for instant <5 second OTP delivery across GP, Robi, Banglalink, and Teletalk.',
          prompt: 'Create Express service module for Greenweb SMS API with automatic fallback to Voice OTP and rate limiting of 3 requests per hour.',
          cmd: 'npm install axios express-rate-limit'
        },
        {
          id: 'd2-3',
          name: 'Role-Based Access Control (RBAC) & JWT Tokens',
          description: 'Issue access tokens (15m validity) and refresh tokens (30d validity) stored in HTTP-Only cookies with role claims (Student, Teacher, Admin).',
          prompt: 'Implement Express authentication middleware verifying JWT signatures and enforcing student/admin permission routes.',
          cmd: 'npm run test:auth'
        }
      ],
      videoTopicMatches: [
        'Production Express Security & Middleware',
        'Local Models & Tool Calls Authentication',
        'Autonomous Agent Tool Execution'
      ],
      mappedCategory: 'AI Coding Tools',
      deliverables: ['Working SMS OTP Delivery', 'JWT Middleware', 'Role Permission Guards']
    },
    {
      day: 3,
      phase: 'Course Engine & Low-Data Video Delivery',
      title: 'Day 3: Course Catalog & HLS Low-Bandwidth Video Streaming Pipeline',
      focusArea: 'Media Delivery & Content Management',
      duration: 'Day 3 (24 Hours)',
      overview: 'Build the interactive video player with HLS adaptive bitrate streaming (144p to 720p), video lesson progress tracking, and offline video download capabilities.',
      subTopics: [
        {
          id: 'd3-1',
          name: 'FFmpeg HLS Transcoding Pipeline (144p Data Saver)',
          description: 'Automatically transcode uploaded teacher videos into HLS (.m3u8) streams, creating a ultra-compressed 144p mode (30MB/hour) for rural mobile data.',
          prompt: 'Write Node.js child process script running FFmpeg to convert MP4 input into 144p, 360p, and 720p HLS segments with playlist files.',
          cmd: 'sudo apt install ffmpeg -y && ffmpeg -version'
        },
        {
          id: 'd3-2',
          name: 'Interactive Video Player with Video.js & Chapter Markers',
          description: 'Embed HLS-compliant HTML5 video player with playback speed controls (0.75x to 2.0x), automatic resume from last timestamp, and Bangla subtitle tracks.',
          prompt: 'Build React HLS video player component supporting quality selector, timestamp bookmarking, and automatic progress save API calls.',
          cmd: 'npm install video.js hls.js @types/video.js'
        },
        {
          id: 'd3-3',
          name: 'Offline Video & Lesson Caching with IndexedDB',
          description: 'Allow students to download encrypted lesson video chunks over Wi-Fi and watch offline during power cuts or load shedding.',
          prompt: 'Implement IndexedDB storage manager using idb library to download and cache video blob fragments locally.',
          cmd: 'npm install idb'
        }
      ],
      videoTopicMatches: [
        'HLS Video Streaming Server in Node.js',
        'IndexedDB Caching for Web Applications',
        'React Video Architecture'
      ],
      mappedCategory: 'Workflows & Orchestration',
      deliverables: ['HLS Transcoder Script', 'Custom React Video Player', 'Offline Caching Engine']
    },
    {
      day: 4,
      phase: 'Bangladesh Payment Gateway Integration',
      title: 'Day 4: Integration of bKash, Nagad, Rocket & SSLCommerz Gateways',
      focusArea: 'Monetization & Financial Transactions',
      duration: 'Day 4 (24 Hours)',
      overview: 'Connect bKash Direct Checkout API, Nagad Merchant API, and SSLCommerz aggregator to process course enrollments with instant automated enrollment activation.',
      subTopics: [
        {
          id: 'd4-1',
          name: 'bKash Tokenized Checkout API Integration',
          description: 'Implement Grant Token, Create Payment, Execute Payment, and Query Payment endpoints for seamless bKash pop-up payment in BDT.',
          prompt: 'Write Express payment controller handling bKash tokenization lifecycle, refund processing, and database transaction lock.',
          cmd: 'npm install crypto-js uuid'
        },
        {
          id: 'd4-2',
          name: 'Nagad Direct Merchant API & SSLCommerz Webhook Handlers',
          description: 'Add Nagad API with RSA signature verification and IPN (Instant Payment Notification) listener for SSLCommerz cards and Internet Banking.',
          prompt: 'Create secure Express IPN route validating SSLCommerz hash key and updating user enrollment status atomically.',
          cmd: 'npm run dev:payment-sandbox'
        },
        {
          id: 'd4-3',
          name: 'Automated Invoice Generation & SMS Payment Confirmation',
          description: 'Generate PDF receipt with QR code verification and trigger automated SMS confirmation upon successful bKash/Nagad payment.',
          prompt: 'Implement PDFKit receipt generator attached to email/SMS payment success webhook.',
          cmd: 'npm install pdfkit qrcode'
        }
      ],
      videoTopicMatches: [
        'Stripe & Custom Webhook Payment Systems in Express',
        'API Security & Webhook Signature Verification',
        'Node.js Financial Systems'
      ],
      mappedCategory: 'AI Coding Tools',
      deliverables: ['bKash Checkout Handler', 'Nagad & SSLCommerz IPN Listener', 'PDF Invoice Generator']
    },
    {
      day: 5,
      phase: 'Bangla AI Tutor & RAG Integration',
      title: 'Day 5: Bangla AI Tutor (Gemini 2.5 Flash / Ollama) & NCTB RAG Engine',
      focusArea: 'Artificial Intelligence & Pedagogical Assistance',
      duration: 'Day 5 (24 Hours)',
      overview: 'Integrate a multi-modal Bangla AI tutor powered by Gemini 2.5 Flash with RAG (Retrieval-Augmented Generation) indexed over Bangladesh NCTB Board curriculum textbooks.',
      subTopics: [
        {
          id: 'd5-1',
          name: 'Bangla & Banglish Prompt Engineering for Gemini 2.5 Flash',
          description: 'Design specialized system instructions guiding AI to answer math, science, and grammar doubts in friendly Bangla (বাংলা) with step-by-step LaTeX formula rendering.',
          prompt: 'Create Gemini API prompt template enforcing clear Bangla language responses, empathetic tone, and structured bullet breakdowns.',
          cmd: 'npm install @google/genai katex react-katex'
        },
        {
          id: 'd5-2',
          name: 'NCTB Textbook Vector Embeddings & Vector Search',
          description: 'Chunk and embed Class 6 to Class 12 NCTB textbooks into vector store for instant factual context lookup when students ask questions.',
          prompt: 'Write script using text-embedding-004 to index textbook JSON chunks into PGVector / Memory Store for sub-second RAG retrieval.',
          cmd: 'npm install pgvector @google/genai'
        },
        {
          id: 'd5-3',
          name: 'Voice-to-Text Doubt Input & Bangla Speech Synthesis',
          description: 'Allow rural students to ask doubts via voice recording in Bangla using browser Web Speech API / Whisper and receive spoken AI audio responses.',
          prompt: 'Build React microphone voice input component sending audio blob to AI server for speech transcription.',
          cmd: 'npm run test:ai-tutor'
        }
      ],
      videoTopicMatches: [
        'Ollama Local LLM & Tool Use Integration Guide',
        'Autonomous AI Agent Memory & Multi-Step Execution',
        'Gemini API Full-Stack RAG Vector Search & Embeddings'
      ],
      mappedCategory: 'Autonomous Agents',
      deliverables: ['Bangla AI Tutor Assistant', 'NCTB Vector Index', 'Voice Input Component']
    },
    {
      day: 6,
      phase: 'Real-time Live Class & Collaborative Whiteboard',
      title: 'Day 6: Low-Bandwidth Live Classroom (WebRTC / Socket.io) & Whiteboard',
      focusArea: 'Real-Time Collaboration',
      duration: 'Day 6 (24 Hours)',
      overview: 'Build interactive live video streaming classrooms with low-latency WebRTC, Socket.io text chat, interactive hand-raising, and a shared vector whiteboard.',
      subTopics: [
        {
          id: 'd6-1',
          name: 'Socket.io Server for Live Chat, Polling & Hand Raising',
          description: 'Establish WebSocket server handling live student questions, instant teacher polls, and real-time attendance tracking with low network overhead.',
          prompt: 'Write Socket.io event router for room management, chat broadcasting, live poll voting, and teacher moderation controls.',
          cmd: 'npm install socket.io socket.io-client'
        },
        {
          id: 'd6-2',
          name: 'WebRTC Peer-to-Peer & SFU Low-Bandwidth Video Streaming',
          description: 'Integrate Jitsi / LiveKit / OpenVidu SFU server to deliver live teacher broadcasts adaptively scaling down video resolution based on student network latency.',
          prompt: 'Create React live class video viewer subscribing to WebRTC SFU media track with low-latency audio priority.',
          cmd: 'npm install livekit-client @livekit/components-react'
        },
        {
          id: 'd6-3',
          name: 'Collaborative Vector Whiteboard (Fabric.js / Canvas)',
          description: 'Provide interactive canvas where teachers can draw math equations and diagrams while students view live synchronized vector strokes.',
          prompt: 'Build React Fabric.js canvas component synchronizing vector drawings across WebSocket clients with minimal bandwidth usage.',
          cmd: 'npm install fabric'
        }
      ],
      videoTopicMatches: [
        'Real-time Multi-User WebSockets & Collaborative Canvas',
        'Workflows & Orchestration Live Streaming'
      ],
      mappedCategory: 'Workflows & Orchestration',
      deliverables: ['Socket.io Chat & Poll Engine', 'WebRTC Video Stream Viewer', 'Collaborative Whiteboard Canvas']
    },
    {
      day: 7,
      phase: 'Exam System & NCTB Model Tests',
      title: 'Day 7: Gamified Assessment, Timed Exam Engine & NCTB Model Tests',
      focusArea: 'Evaluation & Student Growth',
      duration: 'Day 7 (24 Hours)',
      overview: 'Build the exam portal supporting timed MCQs, written answer image uploads, automated instant scoring, leaderboards, and PDF report cards with QR codes.',
      subTopics: [
        {
          id: 'd7-1',
          name: 'Timed MCQ Exam Engine with Anti-Cheating Focus Detection',
          description: 'Construct secure online test portal featuring countdown timer, question shuffling, and tab-switch warning alerts.',
          prompt: 'Create React exam component managing timer state, answer selection buffer, and automatic submission upon timer expiry.',
          cmd: 'npm install lucide-react canvas-confetti'
        },
        {
          id: 'd7-2',
          name: 'Automated AI Evaluation for Written Script Photos',
          description: 'Allow HSC/SSC students to capture photos of handwritten exam answers; send to Gemini AI vision API for automated Bangla grading and margin comments.',
          prompt: 'Write Express endpoint accepting image upload, invoking Gemini 2.5 Flash Vision to evaluate handwritten Bangla answer quality against marking rubric.',
          cmd: 'npm install multer'
        },
        {
          id: 'd7-3',
          name: 'District Leaderboard, Badges & PDF Progress Report Card',
          description: 'Rank students across 64 districts in Bangladesh (Dhaka, Chittagong, Sylhet, Rajshahi, etc.) with gamified badges and printable PDF report cards.',
          prompt: 'Implement leaderboards API endpoint with Redis zset caching and PDF report card generator component.',
          cmd: 'npm run dev:leaderboard'
        }
      ],
      videoTopicMatches: [
        'Building Scalable Real-time Quiz Systems',
        'PDF Generation and Dynamic Canvas Rendering in Node.js',
        'AI Vision Processing for Student Scripts'
      ],
      mappedCategory: 'AI & Engineering',
      deliverables: ['Timed MCQ Portal', 'AI Handwritten Script Evaluator', 'District Leaderboard System']
    },
    {
      day: 8,
      phase: 'Mobile PWA & Offline Sync Engine',
      title: 'Day 8: Progressive Web App (PWA) & Mobile-First Low-Spec Optimization',
      focusArea: 'Mobile Experience & Offline Resilience',
      duration: 'Day 8 (24 Hours)',
      overview: 'Transform the web application into an installable PWA with offline Service Worker, background sync, FCM push notifications, and ultra-light CSS for budget Android phones.',
      subTopics: [
        {
          id: 'd8-1',
          name: 'Web App Manifest & Service Worker Strategy',
          description: 'Register custom Service Worker with CacheFirst strategy for static assets and NetworkFirst strategy for dynamic course feeds.',
          prompt: 'Write Workbox Service Worker script caching static assets, lesson manifests, and providing custom offline fallback page.',
          cmd: 'npm install vite-plugin-pwa -D'
        },
        {
          id: 'd8-2',
          name: 'Firebase Cloud Messaging (FCM) Push Notifications',
          description: 'Send web push notifications to student phones for upcoming live classes, exam results, and daily study reminders.',
          prompt: 'Implement FCM service worker listener and server-side notification trigger service for live class reminders.',
          cmd: 'npm install firebase'
        },
        {
          id: 'd8-3',
          name: 'Low-Spec Mobile Performance Optimization',
          description: 'Reduce JavaScript bundle size below 150KB gzip, implement lazy image loading, and eliminate layout shifts for smooth performance on 2GB RAM phones.',
          prompt: 'Audit React bundle using Vite visualizer and refactor heavy dynamic imports for sub-second first contentful paint.',
          cmd: 'npx vite-bundle-visualizer'
        }
      ],
      videoTopicMatches: [
        'Complete PWA Service Worker & Offline Caching',
        'Responsive Mobile-First UI Engineering with Tailwind CSS',
        'Performance Auditing & Bundle Optimization'
      ],
      mappedCategory: 'AI Coding Tools',
      deliverables: ['Installable PWA Manifest', 'Service Worker Cache Manager', 'FCM Push Notification System']
    },
    {
      day: 9,
      phase: 'Analytics, Teacher Portal & Admin Controls',
      title: 'Day 9: Analytics Dashboard, Teacher Content Studio & Admin Moderation',
      focusArea: 'Management & Content Operations',
      duration: 'Day 9 (24 Hours)',
      overview: 'Build teacher management studio for video uploads and quiz creation, coupled with an admin dashboard featuring financial metrics, user moderation, and refund controls.',
      subTopics: [
        {
          id: 'd9-1',
          name: 'Teacher Studio: Course Builder & Automated Subtitle Generator',
          description: 'Provide teachers with drag-and-drop course builder, automated AI Bangla transcript/subtitle generator, and quiz question creator.',
          prompt: 'Build React teacher studio UI allowing dynamic module ordering, lesson video upload, and interactive quiz generation.',
          cmd: 'npm install recharts @hello-pangea/dnd'
        },
        {
          id: 'd9-2',
          name: 'Real-Time Platform Analytics with Recharts',
          description: 'Display interactive dashboard metrics: Total Revenue (BDT), Active Students, Course Completion Rate, Daily Active Users (DAU), and bKash transaction status.',
          prompt: 'Create React analytics dashboard using Recharts rendering daily revenue bar charts, user growth curves, and retention pie charts.',
          cmd: 'npm run test:analytics'
        },
        {
          id: 'd9-3',
          name: 'Admin Moderation, Refund Handling & Coupon System',
          description: 'Equip admin with tools to approve teacher courses, issue bKash refunds, generate promo discount coupons for underprivileged students, and ban abusive users.',
          prompt: 'Write Express admin routes for coupon validation, refund approval triggers, and audit logging.',
          cmd: 'npm run dev:admin'
        }
      ],
      videoTopicMatches: [
        'Enterprise Dashboard Design & Recharts Integration',
        'Admin Authorization & RBAC Middleware',
        'Content Operations Pipelines'
      ],
      mappedCategory: 'Workflows & Orchestration',
      deliverables: ['Teacher Course Studio', 'Recharts Analytics Dashboard', 'Admin Moderation & Refund System']
    },
    {
      day: 10,
      phase: 'Production Deployment, Load Testing & Go-Live',
      title: 'Day 10: Containerization, 10,000 Student Load Testing & Bangladesh Go-Live',
      focusArea: 'Production Deployment & Launch Operations',
      duration: 'Day 10 (24 Hours)',
      overview: 'Package application into Docker containers, execute k6 load tests simulating 10,000 concurrent students, configure SSL certs, and launch marketing onboarding funnel.',
      subTopics: [
        {
          id: 'd10-1',
          name: 'Docker Containerization & Production Server Provisioning',
          description: 'Write multi-stage Dockerfile for Node.js + Express + Vite build and deploy to DigitalOcean / Hetzner / AWS with Nginx reverse proxy.',
          prompt: 'Create optimized production Dockerfile using node:20-alpine with multi-stage build, non-root user, and pm2 cluster management.',
          cmd: 'docker build -t fair-edtech-bd:v1.0 . && docker run -p 3000:3000 fair-edtech-bd:v1.0'
        },
        {
          id: 'd10-2',
          name: 'k6 Load Testing (Simulating 10,000 Concurrent Bangladesh Students)',
          description: 'Run automated performance stress test simulating peak evening study traffic (7 PM - 10 PM BD time) to verify <100ms response time.',
          prompt: 'Write k6 test script simulating 10,000 virtual users browsing courses, attempting quizzes, and requesting AI tutor answers.',
          cmd: 'sudo apt install k6 -y && k6 run load-test.js'
        },
        {
          id: 'd10-3',
          name: 'Security Hardening, SSL Certs & Public Launch Checklist',
          description: 'Configure Cloudflare SSL/TLS, CORS restrictions, Helmet security headers, rate limiting, database backup cron, and announce on Facebook / WhatsApp groups.',
          prompt: 'Generate complete production deployment verification checklist including SSL check, payment live keys check, and database backup schedule.',
          cmd: 'certbot --nginx -d fairedtech.bd && pm2 status'
        }
      ],
      videoTopicMatches: [
        'Enterprise Production Docker Containerization & Monitoring',
        'Deploying Node.js & React Apps to Production',
        'Production Security & Load Testing'
      ],
      mappedCategory: 'Workflows & Orchestration',
      deliverables: ['Production Docker Container', 'k6 Load Test Pass Log', 'Live Production SSL URL']
    }
  ], []);

  // Bangladesh Specific Gaps & Remediation Plan Data
  const bangladeshGaps = useMemo(() => [
    {
      id: 'gap-1',
      title: 'Gap 1: Formal Merchant Account & Trade License Delays for Payments',
      severity: 'CRITICAL BLOCKER',
      color: 'border-red-500/40 bg-red-950/30 text-red-300',
      problem: 'Opening a formal bKash Merchant account requires a registered Trade License, TIN, BIN, and Bank Account in Bangladesh, which takes 2-3 weeks to process.',
      impact: 'Without payments, you cannot collect subscription or course fees on Day 4 of your 10-day timeline.',
      solution10Day: 'Utilize bKash Personal Merchant account or integrate third-party payment aggregators like UddoktaPay, Shurjopay, or SSLCommerz Starter which allow instant Sandbox to Live activation within 24 hours using individual NID.',
      executionSteps: [
        'Day 1: Register for an UddoktaPay or SSLCommerz sandbox merchant account using founder NID.',
        'Day 2: Implement universal webhook payment listener supporting bKash / Nagad manual reference input as backup.',
        'Day 4: Test live 10 BDT transaction to verify auto-enrollment webhooks.'
      ]
    },
    {
      id: 'gap-2',
      title: 'Gap 2: High Mobile Data Costs & Unstable 3G/4G Networks in Rural BD',
      severity: 'HIGH IMPACT',
      color: 'border-amber-500/40 bg-amber-950/30 text-amber-300',
      problem: 'Students outside major cities (Dhaka, Chittagong, Rajshahi) rely on limited mobile data packages (e.g., 1GB/30 BDT) and experience frequent 3G fallback or power cuts.',
      impact: 'Standard 1080p/720p video platforms consume 1GB in 40 minutes, causing 80%+ student drop-off.',
      solution10Day: 'Implement mandatory FFmpeg HLS 144p "Data-Saver" audio-first video compression (30MB/hour) and enable offline video download to IndexedDB when connected to Wi-Fi at school/college.',
      executionSteps: [
        'Transcode video streams into 144p (64kbps audio + 100kbps video) alongside standard resolutions.',
        'Build IndexedDB browser storage manager to save video blobs locally for offline playback.',
        'Host media assets on bDIX peering servers to bypass international bandwidth costs.'
      ]
    },
    {
      id: 'gap-3',
      title: 'Gap 3: Token Inefficiency & High API Costs for Bangla AI LLMs',
      severity: 'MEDIUM IMPACT',
      color: 'border-purple-500/40 bg-purple-950/30 text-purple-300',
      problem: 'Native Bangla Unicode text consumes up to 3.5x more LLM tokens than English text on OpenAI/Gemini tokenizers, inflating AI tutor API operational costs.',
      impact: '10,000 student AI doubt queries per day could cost $300+/day in raw API tokens.',
      solution10Day: 'Use Gemini 2.5 Flash with prompt caching (90% cost reduction) and hybrid Banglish processing. Optionally host a local quantized Bangla Llama 3 8B model via Ollama on a bDIX VPS for $0 per-token costs.',
      executionSteps: [
        'Implement Gemini API Prompt Caching for static NCTB textbook context.',
        'Enforce maximum output token limits (max 250 words per AI tutor response).',
        'Add local Ollama fallback server on bDIX VPS for zero-cost routine Q&A.'
      ]
    },
    {
      id: 'gap-4',
      title: 'Gap 4: SMS OTP Delivery Failures & Telecom DND Filtering',
      severity: 'HIGH IMPACT',
      color: 'border-blue-500/40 bg-blue-950/30 text-blue-300',
      problem: 'Bangladesh mobile operators (Grameenphone, Robi, Banglalink, Teletalk) frequently block or delay unapproved SMS OTPs during peak network congestion hours.',
      impact: 'Students cannot log in or register, halting onboarding completely.',
      solution10Day: 'Implement multi-channel authentication: Greenweb / BulkSMSBD SMS API + WhatsApp OTP Fallback API + Google One-Tap Login fallback.',
      executionSteps: [
        'Connect primary SMS API (Greenweb) with a 30-second timeout retry.',
        'If SMS fails after 30s, automatically present "Send OTP via WhatsApp" button.',
        'Provide Google Sign-In button for smartphone users as secondary option.'
      ]
    }
  ], []);

  // Filtered master plan based on day and query
  const filteredPlan = useMemo(() => {
    return masterPlan.filter(dayItem => {
      const matchesDay = selectedDay === 'all' || dayItem.day === selectedDay;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesDay;

      const matchesTitle = dayItem.title.toLowerCase().includes(q);
      const matchesOverview = dayItem.overview.toLowerCase().includes(q);
      const matchesSubTopics = dayItem.subTopics.some(st => 
        st.name.toLowerCase().includes(q) || 
        st.description.toLowerCase().includes(q) ||
        st.prompt.toLowerCase().includes(q)
      );
      const matchesCategory = dayItem.mappedCategory.toLowerCase().includes(q);

      return matchesDay && (matchesTitle || matchesOverview || matchesSubTopics || matchesCategory);
    });
  }, [masterPlan, selectedDay, searchQuery]);

  // Total progress percentage
  const totalSubtopics = masterPlan.flatMap(d => d.subTopics).length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSubtopics) * 100) || 0;

  // Toggle step completion
  const handleToggleStep = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  // Copy full Markdown plan
  const handleCopyMarkdownPlan = () => {
    let md = `# YOUTUBE TO FAIR EDUCATION: 10-DAY PRODUCTION LAUNCH BLUEPRINT FOR BANGLADESH
Generated: ${new Date().toISOString().split('T')[0]}
Market Focus: Bangladesh EdTech Ecosystem (SSC, HSC, Skill Development)

## EXECUTIVE OVERVIEW
A complete 10-day operational and technical blueprint to convert YouTube technical tutorials into a production-ready, low-bandwidth, bKash-integrated EdTech platform in Bangladesh.

`;

    masterPlan.forEach(d => {
      md += `### ${d.title}\n`;
      md += `**Phase Focus:** ${d.phase} | **Category:** ${d.mappedCategory}\n`;
      md += `**Overview:** ${d.overview}\n\n`;
      md += `#### Granular Sub-topics:\n`;
      d.subTopics.forEach((st, idx) => {
        md += `${idx + 1}. **${st.name}**\n   - *Description:* ${st.description}\n   - *Prompt:* "${st.prompt}"\n   - *CLI Command:* \`${st.cmd}\`\n\n`;
      });
      md += `#### Mapped YouTube Topics:\n`;
      d.videoTopicMatches.forEach(v => {
        md += `- ${v}\n`;
      });
      md += `\n**Expected Deliverables:** ${d.deliverables.join(', ')}\n\n---\n\n`;
    });

    md += `## BANGLADESH SPECIFIC GAPS & REMEDIATION MATRIX\n\n`;
    bangladeshGaps.forEach(g => {
      md += `### ${g.title} (${g.severity})\n`;
      md += `**Problem:** ${g.problem}\n`;
      md += `**Impact:** ${g.impact}\n`;
      md += `**10-Day Solution:** ${g.solution10Day}\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  // Copy JSON plan
  const handleCopyJsonPlan = () => {
    const dataStr = JSON.stringify({ masterPlan, bangladeshGaps }, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Dedicated Strategic Master Plan • Bangladesh EdTech Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            YouTube to <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">Fair Education</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            A precise, battle-tested 10-day execution blueprint converting YouTube technical video knowledge into a production-ready, low-bandwidth, bKash-integrated EdTech platform tailored specifically for Bangladesh.
          </p>

          {/* Quick Stats & Controls Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>10 Days to Production</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Bangladesh (bDIX & bKash Ready)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>{completedCount}/{totalSubtopics} Steps Completed ({progressPercent}%)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyMarkdownPlan}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              {copiedMd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedMd ? 'Blueprint Copied!' : 'Copy 10-Day Plan (Markdown)'}</span>
            </button>

            <button
              onClick={handleCopyJsonPlan}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              {copiedJson ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-slate-400" />}
              <span>{copiedJson ? 'JSON Copied!' : 'Export Plan JSON'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>10-Day Step-by-Step Execution Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('gaps')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gaps'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>What You Lack & Solutions (BD Gaps)</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search plan, sub-topics, prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* SECTION 1: 10-DAY STEP-BY-STEP ROADMAP VIEW */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          {/* Day Selector Ribbon */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedDay('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedDay === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All 10 Days
            </button>

            {masterPlan.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDay === d.day
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>

          {/* Day Cards Stack */}
          <div className="space-y-6">
            {filteredPlan.map((dayItem) => (
              <div
                key={dayItem.day}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-6 shadow-xl"
              >
                {/* Day Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider text-[10px]">
                        {dayItem.focusArea}
                      </span>
                      <span className="text-slate-400">• {dayItem.duration}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{dayItem.title}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-950 border border-slate-800 text-slate-300">
                      Category: {dayItem.mappedCategory}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {dayItem.overview}
                </p>

                {/* Granular Sub-Topics Breakdown */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Granular Technical Sub-topics & Prompts</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {dayItem.subTopics.map((st, idx) => {
                      const isDone = completedSteps[st.id] || false;
                      return (
                        <div
                          key={st.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isDone 
                              ? 'bg-emerald-950/30 border-emerald-500/40' 
                              : 'bg-slate-950/80 border-slate-800/90'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <button
                                onClick={() => handleToggleStep(st.id)}
                                className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer flex-shrink-0"
                                title="Mark sub-topic complete"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-600" />
                                )}
                              </button>

                              <div className="space-y-1 min-w-0">
                                <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                                  {idx + 1}. {st.name}
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                                  {st.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Prompt & Command Snippet */}
                          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-amber-300/90">
                              <span className="text-slate-500 font-bold font-sans">Prompt: </span>
                              "{st.prompt}"
                            </div>

                            {st.cmd && (
                              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-emerald-300 flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                <span className="truncate">{st.cmd}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mapped YouTube Tutorials from Database */}
                <div className="pt-2 space-y-2 border-t border-slate-800">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>Mapped YouTube Video Tutorials & Topics to Consult</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {dayItem.videoTopicMatches.map((topicName, idx) => {
                      // Attempt to find matching video in indexed database
                      const matchedVid = videos.find(v => 
                        v.title.toLowerCase().includes(topicName.toLowerCase()) ||
                        v.category === dayItem.mappedCategory
                      );

                      return (
                        <div
                          key={idx}
                          onClick={() => matchedVid && onSelectVideo(matchedVid)}
                          className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer group"
                        >
                          <Youtube className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{topicName}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-red-400" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expected Deliverables */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">Day {dayItem.day} Deliverables:</span>
                  <div className="flex flex-wrap gap-2">
                    {dayItem.deliverables.map((del, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono text-[11px]">
                        ✓ {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: WHAT YOU LACK & SOLUTIONS (BANGLADESH GAPS) */}
      {activeTab === 'gaps' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400 text-base">
              <Lightbulb className="w-5 h-5 text-amber-300" />
              <span>Real-world Execution Analysis for Bangladesh</span>
            </div>
            <p>
              Launching an EdTech platform in Bangladesh within 10 days requires addressing unique local technical, financial, and infrastructural realities. Below is an authentic breakdown of potential gaps and exact step-by-step solutions to overcome them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bangladeshGaps.map((gap) => (
              <div
                key={gap.id}
                className={`p-6 rounded-2xl border ${gap.color} space-y-4 shadow-xl`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white">{gap.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                    {gap.severity}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div>
                    <span className="font-bold text-red-400">The Problem: </span>
                    <span>{gap.problem}</span>
                  </div>

                  <div>
                    <span className="font-bold text-amber-400">The Impact: </span>
                    <span>{gap.impact}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 block">10-Day Practical Solution:</span>
                    <span className="text-slate-200 leading-relaxed">{gap.solution10Day}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Execution Remediation Steps:</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {gap.executionSteps.map((step, idx) => (
                      <li key={idx} className="leading-snug">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
