import React from 'react';
import { Youtube, Sparkles, Search, FileDown, Home, Network, Zap, GraduationCap } from 'lucide-react';

export type ActiveTabType = 'home' | 'portal' | 'network' | 'create' | 'fairEducation';

interface HeaderProps {
  totalVideos: number;
  onOpenAnalyze: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: ActiveTabType;
  onNavigate: (tab: ActiveTabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalVideos,
  onOpenAnalyze,
  searchQuery,
  onSearchChange,
  activeTab,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="p-2.5 bg-gradient-to-tr from-red-600 to-rose-500 rounded-xl shadow-lg shadow-red-950/40 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-red-300 transition-colors">
                    YouTube AI Knowledge Hub
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                    {totalVideos} Videos
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Autonomous Extraction Engine & EdTech Knowledge Base
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Bar Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto justify-center overflow-x-auto scrollbar-none">
            <button
              onClick={() => onNavigate('home')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate('portal')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'portal'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>YouTube to create AMRAI</span>
            </button>

            <button
              onClick={() => onNavigate('network')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'network'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-purple-300" />
              <span>Knowledge Web Network</span>
            </button>

            <button
              onClick={() => onNavigate('create')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'create'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-300" />
              <span>Create from YouTube</span>
            </button>

            <button
              onClick={() => onNavigate('fairEducation')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'fairEducation'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-teal-300" />
              <span>YouTube to Fair Education</span>
            </button>
          </nav>

          {/* Search & Global Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {activeTab === 'portal' && (
              <div className="relative flex-1 md:w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search instructions..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-800/80 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            )}

            <a
              href="/api/export-markdown"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-100 bg-emerald-800/90 hover:bg-emerald-700 border border-emerald-500/40 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
              title="Download Full Markdown File of All Tutorials"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Export All</span>
            </a>

            <button
              onClick={onOpenAnalyze}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Analyze</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
