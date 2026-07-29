import React from 'react';
import { Bookmark, ArrowUpDown, FileDown } from 'lucide-react';
import { FilterState } from '../types';

interface CategoryFilterProps {
  categories: string[];
  filterState: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  categoryCounts: Record<string, number>;
  bookmarkedCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  filterState,
  onFilterChange,
  categoryCounts,
  bookmarkedCount,
}) => {
  const currentCategory = filterState.selectedCategory;
  const currentCount = categoryCounts[currentCategory] || 0;

  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {categories.map((cat) => {
            const isActive = filterState.selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange({ selectedCategory: cat })}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm shadow-red-950/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-slate-100 border border-slate-700/60'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                    isActive ? 'bg-red-700 text-red-100' : 'bg-slate-700/80 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Export Category Button + Filters and Sorting */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export Current Category Markdown */}
          <a
            href={`/api/export-category-markdown?category=${encodeURIComponent(currentCategory)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-700 hover:bg-indigo-600 text-white border border-indigo-500/50 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            title={`Download Markdown file for category: ${currentCategory}`}
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-200" />
            <span>Export Category ({currentCount})</span>
          </a>

          {/* Bookmark toggle */}
          <button
            onClick={() => onFilterChange({ bookmarkedOnly: !filterState.bookmarkedOnly })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              filterState.bookmarkedOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${filterState.bookmarkedOnly ? 'fill-amber-400' : ''}`} />
            <span>Saved</span>
            {bookmarkedCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/30 text-amber-200 rounded-full font-bold">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-800">Newest First</option>
              <option value="title" className="bg-slate-800">Title A-Z</option>
              <option value="instructionsCount" className="bg-slate-800">Most Steps</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
