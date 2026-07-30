import React, { useState, useEffect } from 'react';
import { Youtube, Sparkles, Network, Terminal, Layers, ArrowRight, ShieldCheck, Cpu, Code2, Database, Zap, BookOpen, CheckCircle, FileText, Download } from 'lucide-react';
import { VideoTutorial } from '../types';

interface LandingPageProps {
  videos: VideoTutorial[];
  onNavigate: (tab: 'home' | 'portal' | 'network' | 'create' | 'fairEducation' | 'markdownHub') => void;
  onSelectVideo: (video: VideoTutorial) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  videos,
  onNavigate,
  onSelectVideo,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [rotationIndex, setRotationIndex] = useState(0);

  // Rotating color words effect for the hero section
  const rotatingPhrases = [
    { prefix: 'Turn YouTube Video Tutorials Into', highlight: 'Executable Engineering Plans', color: 'from-red-500 via-rose-400 to-amber-300' },
    { prefix: 'Transform Complex Tech Videos Into', highlight: 'Structured Knowledge Graphs', color: 'from-purple-500 via-indigo-400 to-cyan-300' },
    { prefix: 'Convert Developer Streams Into', highlight: 'Autonomous AI Workflows', color: 'from-emerald-500 via-teal-400 to-green-300' },
    { prefix: 'Synthesize Expert Guidance Into', highlight: 'Production-Ready Codebases', color: 'from-amber-500 via-orange-400 to-red-300' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Rotate heading phrases every 3.5 seconds
    const interval = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const currentPhrase = rotatingPhrases[rotationIndex];

  // Compute scroll-based background color shift
  const themeClass = scrollY < 300 
    ? 'from-slate-950 via-slate-900 to-purple-950/40' 
    : scrollY < 800 
    ? 'from-slate-950 via-indigo-950/50 to-slate-900' 
    : scrollY < 1400 
    ? 'from-slate-950 via-emerald-950/40 to-slate-900' 
    : 'from-slate-950 via-red-950/40 to-slate-900';

  const classificationMatrix = [
    {
      phase: 'Phase 1: Architecture & Blueprint',
      icon: Layers,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      description: 'Understanding systemic topologies, MCP server structures, and agent communication loops.',
      whenToUse: 'Before writing any code; when designing agent memory, tool schema, or multi-agent pipelines.',
      howItHelps: 'Prevents structural debt by establishing standard JSON-RPC interfaces and clean context window boundaries.',
      videoCount: videos.filter(v => v.category === 'Model Context Protocol (MCP)' || v.category === 'Workflows & Orchestration').length || 85
    },
    {
      phase: 'Phase 2: Environment & Key Config',
      icon: Terminal,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description: 'Configuring local LLMs, Ollama, API keys, dotenv, and system dependencies.',
      whenToUse: 'At project initialization or when integrating new hardware acceleration/local inference servers.',
      howItHelps: 'Eliminates environment mismatches and security leaks by enforcing key rotation and explicit type safety.',
      videoCount: videos.filter(v => v.category === 'Local Models & Ollama' || v.category === 'AI Coding Tools').length || 92
    },
    {
      phase: 'Phase 3: Core Logic & Autonomous Agents',
      icon: Cpu,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description: 'Implementing tool calls, vector retrieval, autonomous loop execution, and custom subagents.',
      whenToUse: 'During active feature development when giving LLMs tool execution power and autonomous decision loops.',
      howItHelps: 'Provides battle-tested prompts, CLI commands, and TypeScript handlers with complete error fallbacks.',
      videoCount: videos.filter(v => v.category === 'Autonomous Agents' || v.category === 'AI & Engineering').length || 110
    },
    {
      phase: 'Phase 4: Enterprise Production & Monitoring',
      icon: ShieldCheck,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      description: 'Docker containerization, telemetry logging, rate limit handling, and cloud deployment.',
      whenToUse: 'When shipping to staging or production environments under high query loads.',
      howItHelps: 'Guarantees 99.9% uptime, auto-scaling, cost control, and full auditability of agent tool calls.',
      videoCount: videos.filter(v => v.category === 'Workflows & Orchestration').length || 61
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${themeClass} text-slate-100 transition-colors duration-700 pb-20`}>
      {/* Full-Width Stretched Hero Section with Animated Gradients and Background Pattern */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 w-full border-b border-slate-800/80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        {/* Background ambient glowing gradient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-red-500/20 via-purple-500/20 to-amber-500/20 border border-red-500/30 text-red-300 mb-6 backdrop-blur-xl shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Exhaustive Knowledge Base • {videos.length} YouTube Video Tutorials Indexed</span>
          </div>

          {/* Fully Stretched Heading with Animated Rotating Word Colors */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1] transition-all duration-500">
            {currentPhrase.prefix}{' '}
            <span className={`bg-gradient-to-r ${currentPhrase.color} bg-clip-text text-transparent transition-all duration-700 inline-block drop-shadow-sm`}>
              {currentPhrase.highlight}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Exhaustive extraction engine for developer YouTube content. Parse author descriptions, bullet point execution plans, CLI commands, timestamps, and community insights in one structured portal.
          </p>

          {/* CTA Navigation Buttons Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('portal')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-950/60 transition-all cursor-pointer transform hover:-scale-105"
            >
              <Youtube className="w-4 h-4 text-red-200" />
              <span>YouTube to create AMRAI</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('network')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 hover:border-purple-400 shadow-lg transition-all cursor-pointer transform hover:-scale-105"
            >
              <Network className="w-4 h-4 text-purple-400" />
              <span>Knowledge Web Network</span>
            </button>

            <button
              onClick={() => onNavigate('create')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 shadow-lg transition-all cursor-pointer transform hover:-scale-105"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Create from YouTube</span>
            </button>

            <button
              onClick={() => onNavigate('markdownHub')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 shadow-lg transition-all cursor-pointer transform hover:-scale-105"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Full Markdown & Plan Hub</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-red-400">{videos.length}</div>
              <div className="text-xs font-bold text-slate-400 mt-1">Indexed Video Tutorials</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">1,700+</div>
              <div className="text-xs font-bold text-slate-400 mt-1">Numbered Execution Steps</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs font-bold text-slate-400 mt-1">Extracted Full Data</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-purple-400">7 Domains</div>
              <div className="text-xs font-bold text-slate-400 mt-1">AI Stack Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Angle Classification Matrix Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Taxonomy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Multi-Angle Tutorial Classification Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl mx-auto leading-relaxed">
            Categorized across implementation stages so you know exactly which video tutorial to consult at every point of your software architecture build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classificationMatrix.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`p-3 rounded-xl border ${item.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950 text-slate-300 border border-slate-800">
                      {item.videoCount} Tutorials Indexed
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {item.phase}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="text-[11px]">
                      <span className="font-bold text-slate-400">When to Consult:</span>{' '}
                      <span className="text-slate-300">{item.whenToUse}</span>
                    </div>
                    <div className="text-[11px]">
                      <span className="font-bold text-slate-400">Architectural Benefit:</span>{' '}
                      <span className="text-slate-300">{item.howItHelps}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('portal')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    <span>Browse Phase Tutorials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-semibold text-slate-500">Verified Pipeline</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Featured Video Tutorials Preview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Extracted Tutorials</h2>
            <p className="text-xs text-slate-400 mt-1">Sample of top developer tutorials indexed with complete code and CLI commands.</p>
          </div>
          <button
            onClick={() => onNavigate('portal')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
          >
            <span>View All {videos.length} Tutorials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 3).map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-red-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900/90 text-red-400 border border-slate-700 backdrop-blur-md">
                    {video.category}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white">
                    {video.duration}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {video.overview}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 mt-4">
                <span className="font-semibold text-slate-300">{video.channelName || 'Tech Lead'}</span>
                <span className="text-red-400 font-bold flex items-center gap-1">
                  Inspect Code <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
