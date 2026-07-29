import React from 'react';
import { VideoTutorial } from '../types';
import { BookOpen, AlertTriangle, CheckCircle2, Layers } from 'lucide-react';

interface StatsBarProps {
  videos: VideoTutorial[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ videos }) => {
  const totalInstructions = videos.reduce((acc, v) => acc + (v.instructions?.length || 0), 0);
  const totalWarnings = videos.reduce((acc, v) => acc + (v.warnings?.length || 0), 0);
  const categoriesCount = new Set(videos.map(v => v.category)).size;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-100">{videos.length}</div>
          <div className="text-xs text-slate-400 font-medium">Tutorial Videos</div>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-100">{totalInstructions}</div>
          <div className="text-xs text-slate-400 font-medium">Indexed Steps</div>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-100">{totalWarnings}</div>
          <div className="text-xs text-slate-400 font-medium">Flagged Warnings</div>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl font-bold text-slate-100">{categoriesCount}</div>
          <div className="text-xs text-slate-400 font-medium">Tech Categories</div>
        </div>
      </div>
    </div>
  );
};
