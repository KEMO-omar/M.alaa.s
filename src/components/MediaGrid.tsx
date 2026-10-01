import React from 'react';
import { MediaCard } from './MediaCard';
import { MediaItem, ViewMode } from '../types';
import { ImageOff, Sparkles } from 'lucide-react';

interface MediaGridProps {
  media: MediaItem[];
  viewMode: ViewMode;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onOpenLightbox: (item: MediaItem) => void;
  onDownload: (item: MediaItem) => void;
  onResetFilters: () => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  media,
  viewMode,
  favorites,
  onToggleFavorite,
  onOpenLightbox,
  onDownload,
  onResetFilters
}) => {
  if (media.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl p-8 my-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-500 mb-4">
          <ImageOff className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">No media found</h3>
        <p className="text-sm text-slate-400 max-w-sm mt-1 mb-5">
          No files matched your selected filters or search terms. Try adjusting your query or resetting filters.
        </p>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  // Editorial View
  if (viewMode === 'editorial') {
    return (
      <div className="space-y-4 py-3">
        {media.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            viewMode={viewMode}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={onToggleFavorite}
            onOpenLightbox={onOpenLightbox}
            onDownload={onDownload}
          />
        ))}
      </div>
    );
  }

  // Masonry View
  if (viewMode === 'masonry') {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 py-3 space-y-4">
        {media.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <MediaCard
              item={item}
              viewMode={viewMode}
              isFavorite={favorites.has(item.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenLightbox={onOpenLightbox}
              onDownload={onDownload}
            />
          </div>
        ))}
      </div>
    );
  }

  // Standard Grid View
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 py-3">
      {media.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          viewMode={viewMode}
          isFavorite={favorites.has(item.id)}
          onToggleFavorite={onToggleFavorite}
          onOpenLightbox={onOpenLightbox}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};
