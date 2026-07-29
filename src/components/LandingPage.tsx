import React, { useState, useEffect } from 'react';
import { Youtube, Sparkles, Network, Terminal, Layers, ArrowRight, ShieldCheck, Cpu, Code2, Database, Zap, BookOpen, CheckCircle, FileText, Download } from 'lucide-react';
import { VideoTutorial } from '../types';

interface LandingPageProps {
  videos: VideoTutorial[];
  onNavigate: (tab: 'home' | 'portal' | 'network' | 'create') => void;
  onSelectVideo: (video: VideoTutorial) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  videos,
  onNavigate,
  onSelectVideo,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute scroll-based background color shift
  const themeClass = scrollY < 300 
    ? 'from-slate-950 via-slate-900 to-purple-950/40' 
    : scrollY < 800 
    ? 'from-slate-950 via-indigo-950/50 to-slate-900' 
    : scrollY < 1400 
    ? 'from-slate-950 via-emerald-950/40 to-slate-900' 
    : 'from-slate-950 via-red-950/40 to-slate-900';

  const topVideos = videos.slice(0, 6);

  // Multi-angle classification Matrix definition
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
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/30 text-red-300 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Extracted Knowledge Base • {videos.length} YouTube Video Tutorials</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Turn YouTube Video Tutorials Into{' '}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
            Executable Engineering Plans
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Exhaustive extraction engine for developer YouTube content. Parse author descriptions, bullet point execution plans, CLI commands, timestamps, and community insights in one structured portal.
        </p>

        {/* CTA Button Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('portal')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-950/50 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Youtube className="w-5 h-5 text-red-200" />
            <span>YouTube to create AMRAI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('network')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 hover:border-purple-400 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Network className="w-5 h-5 text-purple-400" />
            <span>Knowledge Web Network</span>
          </button>

          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5 text-emerald-400" />
            <span>Create from YouTube</span>
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl font-black text-red-400">{videos.length}</div>
            <div className="text-xs font-semibold text-slate-400">Indexed Video Tutorials</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl font-black text-amber-400">1,700+</div>
            <div className="text-xs font-semibold text-slate-400">Numbered Execution Steps</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl font-black text-emerald-400">100%</div>
            <div className="text-xs font-semibold text-slate-400">Extracted Full Data</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl font-black text-purple-400">7 Domains</div>
            <div className="text-xs font-semibold text-slate-400">AI Stack Coverage</div>
          </div>
        </div>
      </section>

      {/* Multi-Angle Classification Matrix Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Layers className="w-6 h-6 text-purple-400" />
            <span>Multi-Angle Tutorial Classification Matrix</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Categorized across implementation stages so you know exactly which video tutorial to consult at every point of your build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classificationMatrix.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{item.phase}</h3>
                      <span className="text-xs text-slate-400">{item.videoCount} Tutorial Guides</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="font-bold text-amber-400">When to Use: </span>
                    <span className="text-slate-300">{item.whenToUse}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-400">How It Helps: </span>
                    <span className="text-slate-300">{item.howItHelps}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Video Previews */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-red-400" />
              <span>Extracted Video Deep Dive Previews</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Directly view parsed execution plans, top comments, and CLI commands.</p>
          </div>
          <button
            onClick={() => onNavigate('portal')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 cursor-pointer"
          >
            <span>View All {videos.length} Tutorials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-semibold text-[10px]">
                  {video.category}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{video.duration || '12 min'}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-100 group-hover:text-red-300 transition-colors line-clamp-2">
                {video.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2">
                {video.overview}
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{video.instructions?.length || 0} Steps</span>
                </span>
                <span className="text-red-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Inspect Extracted Data <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
