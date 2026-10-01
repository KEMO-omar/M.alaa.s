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
      <div className="py-20 text-center flex flex-col items-center justify-center bg-white border border-dashed border-amber-200 rounded-3xl p-8 my-6 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 border border-amber-200">
          <ImageOff className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-black text-stone-900 font-heading">لا توجد عناصر مطابقة</h3>
        <p className="text-sm text-stone-600 max-w-sm mt-1 mb-5">
          لم يتم العثور على صور أو فيديوهات مطابقة للبحث أو التاغ المختار.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
        >
          إعادة ضبط كل الفلاتر
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
