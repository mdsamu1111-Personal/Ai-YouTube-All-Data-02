import React, { useState } from 'react';
import { Youtube, Sparkles, Search, FileDown, Home, Network, Zap, GraduationCap, FileText, Menu, X, ChevronRight } from 'lucide-react';

export type ActiveTabType = 'home' | 'portal' | 'network' | 'create' | 'fairEducation' | 'markdownHub';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as ActiveTabType, label: 'Home Dashboard', icon: Home, color: 'text-red-400 bg-red-500/10' },
    { id: 'portal' as ActiveTabType, label: 'YouTube to AMRAI', icon: Youtube, color: 'text-rose-400 bg-rose-500/10' },
    { id: 'network' as ActiveTabType, label: 'Knowledge Web', icon: Network, color: 'text-purple-400 bg-purple-500/10' },
    { id: 'create' as ActiveTabType, label: 'Create from YouTube', icon: Zap, color: 'text-emerald-400 bg-emerald-500/10' },
    { id: 'fairEducation' as ActiveTabType, label: 'Fair Education', icon: GraduationCap, color: 'text-teal-400 bg-teal-500/10' },
    { id: 'markdownHub' as ActiveTabType, label: 'Full Markdown Hub', icon: FileText, color: 'text-amber-400 bg-amber-500/10' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="p-2.5 bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 rounded-xl shadow-lg shadow-red-950/50 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-red-300 transition-colors">
                    YouTube AI Knowledge Hub
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                    {totalVideos} Videos
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Autonomous Extraction Engine & EdTech Knowledge Base
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Bar Tabs (Scalable & Dynamic) */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-950/40 scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.color.split(' ')[0]}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search, Export & Analyze Actions */}
          <div className="flex items-center gap-2.5">
            {activeTab === 'portal' && (
              <div className="relative hidden md:block w-44">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search instructions..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            )}

            <a
              href="/api/export-markdown"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
              title="Download Full Markdown File of All Tutorials"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export All (.md)</span>
            </a>

            <button
              onClick={onOpenAnalyze}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 rounded-xl shadow-lg shadow-red-950/40 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span className="hidden sm:inline">Analyze</span>
            </button>

            {/* Mobile / Tablet Menu Button Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Expandable Navigation Drawer (Fully Scalable & Non-Breaking) */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color.split(' ')[0]}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">Total Indexed Tutorials: {totalVideos}</span>
              <a
                href="/api/export-markdown"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download All Markdown</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
