import React from 'react';
import { VideoTutorial } from '../types';
import { Youtube, Bookmark, AlertTriangle, CheckCircle, ChevronRight, Terminal, User, Clock, Database } from 'lucide-react';

interface VideoCardProps {
  video: VideoTutorial;
  index: number;
  onSelect: (video: VideoTutorial) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  index,
  onSelect,
  onToggleBookmark,
}) => {
  // Generate YouTube thumbnail URL if youtubeId exists
  const thumbnailUrl = video.youtubeId
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : null;

  return (
    <div
      onClick={() => onSelect(video)}
      className="group relative bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-600 rounded-xl overflow-hidden transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-slate-950/40 flex flex-col cursor-pointer"
    >
      {/* Thumbnail or Category Banner */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center border-b border-slate-700/50">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Hide image on error
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : null}

        {/* Fallback Graphic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-3">
          <div className="flex items-center justify-between w-full">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-slate-900/80 backdrop-blur-md text-red-400 border border-red-500/20 shadow-sm">
              {video.category}
            </span>

            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleBookmark(video.id, e)}
              className={`p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
                video.bookmarked
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-100 border border-slate-700/60'
              }`}
              title={video.bookmarked ? 'Remove Bookmark' : 'Bookmark Tutorial'}
            >
              <Bookmark className={`w-4 h-4 ${video.bookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>

          <div className="flex items-center justify-between w-full text-xs font-medium text-slate-300 drop-shadow-md">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-1 rounded bg-red-600 text-white flex-shrink-0">
                <Youtube className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200 truncate">{video.channelName || 'Tech Lead'}</span>
            </div>

            <div className="flex items-center gap-1">
              {video.deepData && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-300 bg-purple-950/90 border border-purple-500/40 px-1.5 py-0.5 rounded shadow-sm">
                  <Database className="w-3 h-3 text-purple-400" /> Deep Data
                </span>
              )}
              {video.executionCommands && video.executionCommands.length > 0 && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono">
                  <Terminal className="w-3 h-3 text-emerald-400" /> CLI
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start gap-2 mb-1">
            <span className="flex-shrink-0 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900 text-red-400 border border-red-500/30">
              #{index}
            </span>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
              {video.title}
            </h3>
          </div>
          <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {video.overview}
          </p>
        </div>

        {/* Feature Badges */}
        <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-emerald-400 font-medium" title="Step-by-step instructions">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{video.instructions?.length || 0} Steps</span>
            </span>

            {video.duration && (
              <span className="flex items-center gap-1 text-slate-400 font-medium text-[11px]" title="Duration">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{video.duration}</span>
              </span>
            )}
          </div>

          <span className="flex items-center gap-0.5 text-xs font-semibold text-red-400 group-hover:translate-x-0.5 transition-transform">
            <span>Explore</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
