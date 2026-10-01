import React, { useState, useRef } from 'react';
import { Star, Download, Maximize2, Play, Film, Image as ImageIcon, Calendar, FileText } from 'lucide-react';
import { MediaItem, ViewMode } from '../types';

interface MediaCardProps {
  item: MediaItem;
  viewMode: ViewMode;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenLightbox: (item: MediaItem) => void;
  onDownload: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onOpenLightbox,
  onDownload
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const getCategoryBadge = () => {
    if (item.category === 'videos') {
      return (
        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-100/90 text-cyan-900 border border-cyan-200 backdrop-blur-md shadow-xs">
          <Film className="w-3 h-3 text-cyan-700" /> ريلز
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/95 text-stone-800 border border-stone-200 backdrop-blur-md shadow-xs">
        <ImageIcon className="w-3 h-3 text-amber-600" /> صورة
      </span>
    );
  };

  // Editorial Feed layout
  if (viewMode === 'editorial') {
    return (
      <div 
        onClick={() => onOpenLightbox(item)}
        className="group relative bg-white hover:bg-[#fffdf9] border border-stone-200 hover:border-amber-300 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-5 p-4 sm:p-6"
      >
        {/* Media Preview Box */}
        <div 
          className="relative w-full md:w-80 h-72 sm:h-80 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 flex items-center justify-center border border-stone-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.type === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={item.url}
                muted
                playsInline
                loop
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          ) : (
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute top-3 right-3">{getCategoryBadge()}</div>

          <div className="absolute bottom-3 left-3 font-mono text-[10px] px-2 py-0.5 rounded-md bg-stone-900/80 text-white backdrop-blur-md">
            {item.dimensions}
          </div>
        </div>

        {/* Content & Details Column */}
        <div className="flex-1 flex flex-col justify-between py-1 text-right">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-stone-900 group-hover:text-amber-800 transition-colors font-heading">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-400" />
                  <span>{item.filename}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-amber-100 border-amber-300 text-amber-700'
                      : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                  }`}
                  title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                >
                  <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
                <button
                  onClick={() => onDownload(item)}
                  className="p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all cursor-pointer"
                  title="تحميل الصورة الأصلية"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              {item.description || 'من الذكريات والصور المحفورة في القلب لأبو علاء.'}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-600 border border-stone-200 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer specs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-stone-100 text-xs text-stone-500 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {item.date}
              </span>
              <span>الحجم: <strong className="text-stone-800">{item.sizeFormatted}</strong></span>
              <span>النسبة: <strong className="text-stone-800">{item.aspectRatio}</strong></span>
            </div>

            <span className="inline-flex items-center gap-1 text-amber-800 font-sans font-bold text-xs group-hover:-translate-x-1 transition-transform">
              عرض بالحجم الكامل <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid / Masonry card
  return (
    <div
      onClick={() => onOpenLightbox(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white hover:bg-[#fffdfa] border border-stone-200/90 hover:border-amber-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Media Window */}
      <div className={`relative w-full overflow-hidden bg-stone-100 flex items-center justify-center ${
        viewMode === 'masonry' ? 'min-h-[220px]' : 'aspect-square sm:aspect-[4/5]'
      }`}>
        {item.type === 'video' ? (
          <div className="relative w-full h-full min-h-[260px] flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={item.url}
              muted
              playsInline
              loop
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-80 blur-xs'
              }`}
            />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {getCategoryBadge()}

          {/* Action icons on hover */}
          <div 
            className="flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-1.5 rounded-lg backdrop-blur-md border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-amber-100 border-amber-300 text-amber-700'
                  : 'bg-white/90 border-stone-200 text-stone-600 hover:text-stone-900 shadow-xs'
              }`}
              title={isFavorite ? 'المفضلة' : 'إضافة'}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
            <button
              onClick={() => onDownload(item)}
              className="p-1.5 rounded-lg bg-white/90 border border-stone-200 text-stone-600 hover:text-stone-900 shadow-xs backdrop-blur-md transition-all cursor-pointer"
              title="تحميل"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom hover bar info */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-stone-950/80 via-stone-950/50 to-transparent flex items-end justify-between opacity-95 text-white">
          <div className="text-right">
            <p className="font-bold text-xs sm:text-sm line-clamp-1 group-hover:text-amber-300 transition-colors drop-shadow">
              {item.title}
            </p>
            <p className="text-[11px] text-stone-300 font-mono mt-0.5 drop-shadow">
              {item.sizeFormatted} • {item.dimensions}
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-300">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
