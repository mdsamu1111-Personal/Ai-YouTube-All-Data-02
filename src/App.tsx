import React, { useState, useEffect, useMemo } from 'react';
import { Header, ActiveTabType } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { CategoryFilter } from './components/CategoryFilter';
import { VideoCard } from './components/VideoCard';
import { VideoDetailModal } from './components/VideoDetailModal';
import { AnalyzeModal } from './components/AnalyzeModal';
import { LandingPage } from './components/LandingPage';
import { KnowledgeWebNetwork } from './components/KnowledgeWebNetwork';
import { CreateFromYouTubePage } from './components/CreateFromYouTubePage';
import { YouTubeToFairEducationPage } from './components/YouTubeToFairEducationPage';
import { MarkdownHubPage } from './components/MarkdownHubPage';
import { VideoTutorial, FilterState } from './types';
import { Sparkles, SearchX, RefreshCw } from 'lucide-react';

const CATEGORIES = [
  'All',
  'AI Coding Tools',
  'Model Context Protocol (MCP)',
  'Local Models & Ollama',
  'Autonomous Agents',
  'Workflows & Orchestration',
  'AI & Engineering',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('home');
  const [videos, setVideos] = useState<VideoTutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);

  // Persistence in LocalStorage for bookmarks and notes
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yt_hub_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notesMap, setNotesMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('yt_hub_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'All',
    bookmarkedOnly: false,
    sortBy: 'newest',
  });

  // Fetch initial videos
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      if (data.success && Array.isArray(data.videos)) {
        setVideos(data.videos);
      }
    } catch (err) {
      console.error('Failed to load videos from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Sync bookmarks & notes to localStorage
  useEffect(() => {
    localStorage.setItem('yt_hub_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('yt_hub_notes', JSON.stringify(notesMap));
  }, [notesMap]);

  // Toggle bookmark
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  // Save personal notes
  const handleSaveNotes = (id: string, notesText: string) => {
    setNotesMap((prev) => ({
      ...prev,
      [id]: notesText,
    }));
  };

  // Merge bookmarks and notes into videos array
  const enrichedVideos = useMemo(() => {
    return videos.map((v) => ({
      ...v,
      bookmarked: bookmarkedIds.includes(v.id),
      notes: notesMap[v.id] || '',
    }));
  }, [videos, bookmarkedIds, notesMap]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: enrichedVideos.length };
    enrichedVideos.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
  }, [enrichedVideos]);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    return enrichedVideos
      .filter((v) => {
        // Search filter
        if (filterState.searchQuery.trim()) {
          const q = filterState.searchQuery.toLowerCase();
          const matchTitle = v.title.toLowerCase().includes(q);
          const matchOverview = v.overview.toLowerCase().includes(q);
          const matchCategory = v.category.toLowerCase().includes(q);
          const matchInstructions = v.instructions.some((i) => i.toLowerCase().includes(q));
          if (!matchTitle && !matchOverview && !matchCategory && !matchInstructions) {
            return false;
          }
        }

        // Category filter
        if (
          filterState.selectedCategory !== 'All' &&
          v.category !== filterState.selectedCategory
        ) {
          return false;
        }

        // Bookmarked only filter
        if (filterState.bookmarkedOnly && !v.bookmarked) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (filterState.sortBy === 'instructionsCount') {
          return (b.instructions?.length || 0) - (a.instructions?.length || 0);
        }
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [enrichedVideos, filterState]);

  // Handle new video added via AI analysis
  const handleNewVideoAnalyzed = (newVideo: VideoTutorial) => {
    setVideos((prev) => [newVideo, ...prev]);
    setSelectedVideo(newVideo);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-red-200">
      {/* Navigation Header */}
      <Header
        totalVideos={enrichedVideos.length}
        onOpenAnalyze={() => setIsAnalyzeOpen(true)}
        searchQuery={filterState.searchQuery}
        onSearchChange={(q) => setFilterState((prev) => ({ ...prev, searchQuery: q }))}
        activeTab={activeTab}
        onNavigate={setActiveTab}
      />

      {/* Dynamic Page Views */}
      {activeTab === 'home' && (
        <LandingPage
          videos={enrichedVideos}
          onNavigate={setActiveTab}
          onSelectVideo={setSelectedVideo}
        />
      )}

      {activeTab === 'portal' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Stats Overview */}
          <StatsBar videos={enrichedVideos} />

          {/* Filters & Export Category Option */}
          <CategoryFilter
            categories={CATEGORIES}
            filterState={filterState}
            onFilterChange={(updated) => setFilterState((prev) => ({ ...prev, ...updated }))}
            categoryCounts={categoryCounts}
            bookmarkedCount={bookmarkedIds.length}
          />

          {/* Content Section */}
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
              <p className="text-sm font-semibold text-slate-400">
                Loading YouTube Tutorial Knowledge Base...
              </p>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="py-16 px-4 text-center rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center max-w-md mx-auto space-y-4">
              <div className="p-3 bg-slate-800 rounded-full text-slate-400">
                <SearchX className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200">No Tutorials Found</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  No indexed video tutorials match your current query or category filter. Try clearing filters or analyze a new YouTube video using Gemini AI.
                </p>
              </div>
              <button
                onClick={() => setIsAnalyzeOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyze New Video</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredVideos.map((video, idx) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={idx + 1}
                  onSelect={(v) => setSelectedVideo(v)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {activeTab === 'network' && (
        <KnowledgeWebNetwork
          videos={enrichedVideos}
          onSelectVideo={setSelectedVideo}
        />
      )}

      {activeTab === 'create' && (
        <CreateFromYouTubePage />
      )}

      {activeTab === 'fairEducation' && (
        <YouTubeToFairEducationPage
          videos={enrichedVideos}
          onSelectVideo={setSelectedVideo}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'markdownHub' && (
        <MarkdownHubPage
          videos={enrichedVideos}
          onSelectVideo={setSelectedVideo}
          onNavigate={setActiveTab}
        />
      )}

      {/* Global Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-400">YouTube AI Knowledge Hub</span> — Powered by Gemini AI
          </div>
          <div>
            Exhaustive EdTech Extraction Engine & Network Matrix
          </div>
        </div>
      </footer>

      {/* Video Detail Modal */}
      {selectedVideo && (
        <VideoDetailModal
          video={selectedVideo}
          index={enrichedVideos.findIndex((v) => v.id === selectedVideo.id) + 1}
          onClose={() => setSelectedVideo(null)}
          onToggleBookmark={handleToggleBookmark}
          onSaveNotes={handleSaveNotes}
        />
      )}

      {/* Analyze Video Modal */}
      <AnalyzeModal
        isOpen={isAnalyzeOpen}
        onClose={() => setIsAnalyzeOpen(false)}
        onSuccess={handleNewVideoAnalyzed}
      />
    </div>
  );
}
