import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { BirthdayHero } from './components/BirthdayHero';
import { HeartfeltLetter } from './components/HeartfeltLetter';
import { FunnyStats } from './components/FunnyStats';
import { StickerBoard } from './components/StickerBoard';
import { SignatureArtworkSpotlight } from './components/SignatureArtworkSpotlight';
import { InteractiveCake } from './components/InteractiveCake';
import { ReelSpotlight } from './components/ReelSpotlight';
import { WishWall } from './components/WishWall';
import { MediaFilterBar } from './components/MediaFilterBar';
import { MediaGrid } from './components/MediaGrid';
import { MediaLightbox } from './components/MediaLightbox';
import { SlideshowModal } from './components/SlideshowModal';
import { UploadModal } from './components/UploadModal';
import { BirthdayCardModal } from './components/BirthdayCardModal';
import { INITIAL_MEDIA } from './data/media';
import { MediaCategory, MediaItem, SortOption, ViewMode } from './types';
import { Sparkles } from 'lucide-react';

export function App() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [currentCategory, setCurrentCategory] = useState<MediaCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Favorites
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('m_alaa_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  // Modals state
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('m_alaa_favorites', JSON.stringify(Array.from(favorites)));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    media.forEach(m => m.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [media]);

  const counts = useMemo(() => {
    return {
      all: media.length,
      photos: media.filter(m => m.category === 'photos').length,
      artworks: media.filter(m => m.category === 'artworks').length,
      videos: media.filter(m => m.category === 'videos').length,
      favorites: media.filter(m => favorites.has(m.id)).length,
    };
  }, [media, favorites]);

  const filteredMedia = useMemo(() => {
    let result = media.filter(item => {
      if (currentCategory === 'favorites') {
        if (!favorites.has(item.id)) return false;
      } else if (currentCategory !== 'all') {
        if (item.category !== currentCategory) return false;
      }

      if (selectedTag && !item.tags.includes(selectedTag)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchFile = item.filename.toLowerCase().includes(q);
        const matchTag = item.tags.some(t => t.toLowerCase().includes(q));
        const matchDesc = item.description?.toLowerCase().includes(q) ?? false;
        if (!matchTitle && !matchFile && !matchTag && !matchDesc) return false;
      }

      return true;
    });

    result.sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'largest':
          return b.sizeBytes - a.sizeBytes;
        case 'smallest':
          return a.sizeBytes - b.sizeBytes;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [media, currentCategory, selectedTag, searchQuery, sortOption, favorites]);

  const handleDownload = (item: MediaItem) => {
    const anchor = document.createElement('a');
    anchor.href = item.url;
    anchor.download = item.filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleAddMedia = (newItem: MediaItem) => {
    setMedia(prev => [newItem, ...prev]);
  };

  const handleResetFilters = () => {
    setCurrentCategory('all');
    setSelectedTag(null);
    setSearchQuery('');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      
      {/* Top Header */}
      <Header
        media={media}
        favoritesCount={counts.favorites}
        onStartSlideshow={() => setIsSlideshowOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenCardModal={() => setIsCardModalOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* Hero Section */}
      <BirthdayHero
        onScrollToSection={scrollToSection}
        onOpenCardModal={() => setIsCardModalOpen(true)}
      />

      {/* Letter Section */}
      <div id="letter-section">
        <HeartfeltLetter />
      </div>

      {/* Funny WhatsApp Stats Section */}
      <div id="stats-section">
        <FunnyStats />
      </div>

      {/* Most Used Stickers Board */}
      <div id="stickers-section">
        <StickerBoard />
      </div>

      {/* Signature Artwork Spotlight (artworks-000064279855-q6u7eq-t500x500.jpg placed prominently) */}
      <div id="artwork-section">
        <SignatureArtworkSpotlight />
      </div>

      {/* Interactive Birthday Cake */}
      <div id="cake-section">
        <InteractiveCake />
      </div>

      {/* Reel Spotlight */}
      <div id="reel-section">
        <ReelSpotlight />
      </div>

      {/* Memories & Media Gallery Section */}
      <section id="gallery-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-8">
          <span className="text-xs font-mono text-emerald-800 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 bg-emerald-100/70 px-3.5 py-0.5 rounded-full inline-flex border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-700" /> ألبوم الصور والذكريات
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 font-heading">
            صور ولقطات أبو علاء الأصلية 📸
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
            تصفح الصور بدقة كاملة، حمّل اللي يعجبك، أو اتفرج عليها بنمط السلايد شو!
          </p>
        </div>

        {/* Filter Controls */}
        <MediaFilterBar
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortOption={sortOption}
          onSortChange={setSortOption}
          counts={counts}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          allTags={allTags}
        />

        {/* Media Grid */}
        <MediaGrid
          media={filteredMedia}
          viewMode={viewMode}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenLightbox={setLightboxItem}
          onDownload={handleDownload}
          onResetFilters={handleResetFilters}
        />

      </section>

      {/* Wish Wall */}
      <div id="wishes-section">
        <WishWall />
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <MediaLightbox
          item={lightboxItem}
          allMedia={filteredMedia}
          isFavorite={favorites.has(lightboxItem.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setLightboxItem(null)}
          onSelectMedia={setLightboxItem}
          onDownload={handleDownload}
        />
      )}

      {/* Slideshow Modal */}
      {isSlideshowOpen && (
        <SlideshowModal
          media={filteredMedia.length > 0 ? filteredMedia : media}
          onClose={() => setIsSlideshowOpen(false)}
        />
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <UploadModal
          onClose={() => setIsUploadOpen(false)}
          onAddMedia={handleAddMedia}
        />
      )}

      {/* Birthday Card Modal */}
      {isCardModalOpen && (
        <BirthdayCardModal
          onClose={() => setIsCardModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-[#f7f4ed] py-8 text-center text-xs text-stone-600">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="text-amber-900 font-bold text-sm">
            صُنع بحب وضحك من أخوك كريم للاحتفال بأجدع وأكرف راجل في مصر: محمد أبو علاء ❤️🎂
          </p>
          <p className="text-stone-400 font-mono text-[11px]">
            عشرة العمر التي لا تُقدّر بثمن • 1 أكتوبر 2026
          </p>
        </div>
      </footer>

    </div>
  );
}
export default App;
