import React, { useState, useMemo } from 'react';
import { VideoTutorial } from '../types';
import { Network, Search, ExternalLink, Layers, ArrowRight, Download, Filter, Share2, CheckCircle, Clock, Youtube, Sparkles } from 'lucide-react';

interface KnowledgeWebNetworkProps {
  videos: VideoTutorial[];
  onSelectVideo: (video: VideoTutorial) => void;
}

export const KnowledgeWebNetwork: React.FC<KnowledgeWebNetworkProps> = ({
  videos,
  onSelectVideo,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(videos.map(v => v.category));
    return ['All', ...Array.from(set)];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.channelName || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [videos, selectedCategory, searchQuery]);

  const selectedVideo = useMemo(() => {
    return videos.find(v => v.id === selectedNodeId) || filteredVideos[0] || videos[0];
  }, [videos, selectedNodeId, filteredVideos]);

  // Generate inter-relations (videos in the same category or sharing tool keywords)
  const relatedVideos = useMemo(() => {
    if (!selectedVideo) return [];
    return videos.filter(v => 
      v.id !== selectedVideo.id && 
      (v.category === selectedVideo.category || 
       v.deepData?.completeToolMatrix?.some(t => selectedVideo.deepData?.completeToolMatrix?.includes(t)))
    ).slice(0, 5);
  }, [videos, selectedVideo]);

  const handleExportNetworkMap = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(videos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Knowledge_Web_Network_Map.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Connectivity Matrix • {videos.length} YouTube Document Nodes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Knowledge Web Network</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visual topology and inter-relations mapping among all extracted YouTube technical tutorials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportNetworkMap}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Network JSON</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter web nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Category Pills */}
        <div className="md:col-span-2 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Node List + Right Connectivity Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Node Grid List */}
        <div className="lg:col-span-7 space-y-3 max-h-[700px] overflow-y-auto pr-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Showing {filteredVideos.length} Network Nodes</span>
            <span>Click any node to inspect web relations</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {filteredVideos.map((v) => {
              const isSelected = selectedVideo?.id === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedNodeId(v.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500 shadow-lg shadow-purple-950/50'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {v.category}
                      </span>
                      <span className="text-slate-400">{v.channelName || 'Tech Lead'}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100 truncate">{v.title}</h4>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isSelected ? 'text-purple-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Connectivity Inspector */}
        {selectedVideo && (
          <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-5 rounded-2xl border border-purple-900/50">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Node Relation Inspector</h3>
              </div>
              <button
                onClick={() => onSelectVideo(selectedVideo)}
                className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors cursor-pointer"
              >
                Open Full Modal
              </button>
            </div>

            {/* Selected Node Brief */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-purple-300 font-mono font-bold">
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                  {selectedVideo.url}
                </a>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{selectedVideo.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{selectedVideo.overview}</p>
            </div>

            {/* Tech Stack Matrix */}
            {selectedVideo.deepData?.completeToolMatrix && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Tech Stack Keywords</div>
                <div className="flex flex-wrap gap-1">
                  {selectedVideo.deepData.completeToolMatrix.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inter-Connected Nodes */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center justify-between">
                <span>Inter-Connected Related Videos ({relatedVideos.length})</span>
              </div>

              <div className="space-y-2">
                {relatedVideos.map((rv) => (
                  <div
                    key={rv.id}
                    onClick={() => setSelectedNodeId(rv.id)}
                    className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] text-purple-400 font-semibold">{rv.category}</div>
                      <div className="font-bold text-slate-200 truncate group-hover:text-purple-300">{rv.title}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
