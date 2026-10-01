import React from 'react';
import { Search, X, LayoutGrid, Columns, StretchHorizontal, Star, Image, Film, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MediaCategory, SortOption, ViewMode } from '../types';

interface MediaFilterBarProps {
  currentCategory: MediaCategory;
  onSelectCategory: (cat: MediaCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (vm: ViewMode) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  counts: {
    all: number;
    photos: number;
    artworks: number;
    videos: number;
    favorites: number;
  };
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  allTags: string[];
}

export const MediaFilterBar: React.FC<MediaFilterBarProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortOption,
  onSortChange,
  counts,
  selectedTag,
  onSelectTag,
  allTags
}) => {
  const categoryTabs: { id: MediaCategory; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: 'كل الصور والفيديوهات', icon: <SlidersHorizontal className="w-3.5 h-3.5" />, count: counts.all },
    { id: 'photos', label: 'الصور والبورتريه', icon: <Image className="w-3.5 h-3.5" />, count: counts.photos },
    { id: 'videos', label: 'فيديوهات الريلز', icon: <Film className="w-3.5 h-3.5" />, count: counts.videos },
    { id: 'favorites', label: 'المفضلة', icon: <Star className="w-3.5 h-3.5" />, count: counts.favorites },
  ];

  return (
    <div className="space-y-3.5 py-4">
      {/* Category Tabs & View controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
          {categoryTabs.map(tab => {
            const isActive = currentCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-100/90 text-amber-900 border border-amber-300 shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <span className={isActive ? 'text-amber-700' : 'text-stone-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive 
                    ? 'bg-amber-200/80 text-amber-900 font-bold' 
                    : 'bg-stone-100 text-stone-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort and Layout switchers */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search box */}
          <div className="relative flex-1 sm:w-60 min-w-[180px]">
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث في الصور والاستيكرات..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-xl pr-9 pl-8 py-2 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200 transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative flex items-center bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-700 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 ml-1.5 flex-shrink-0" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-stone-800 text-xs font-semibold focus:outline-none cursor-pointer pl-1"
            >
              <option value="newest">الأحدث تاريخاً</option>
              <option value="oldest">الأقدم تاريخاً</option>
              <option value="largest">الأكبر حجماً</option>
              <option value="smallest">الأصغر حجماً</option>
              <option value="name">الاسم أ-ي</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-0.5 shadow-xs">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-stone-100 text-amber-700 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
              title="شبكة موحدة"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('masonry')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'masonry'
                  ? 'bg-stone-100 text-amber-700 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
              title="معرض حر"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('editorial')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'editorial'
                  ? 'bg-stone-100 text-amber-700 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
              title="عرض التفاصيل"
            >
              <StretchHorizontal className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Tag filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-stone-400 font-bold ml-1 uppercase tracking-wider text-[11px]">تاغ:</span>
        <button
          onClick={() => onSelectTag(null)}
          className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer font-semibold ${
            selectedTag === null
              ? 'bg-stone-800 text-white'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
          }`}
        >
          كل التاغات
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
            className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 font-semibold ${
              selectedTag === tag
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
            }`}
          >
            <span>#{tag}</span>
            {selectedTag === tag && <X className="w-3 h-3 mr-0.5" />}
          </button>
        ))}
      </div>
    </div>
  );
};
