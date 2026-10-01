import React from 'react';
import { Sparkles, Film, Image as ImageIcon, Cake, Heart, Play, Smile, MessageCircle, Music, Disc } from 'lucide-react';
import { MediaItem } from '../types';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';
import { getMediaUrl } from '../utils/mediaUrl';

interface HeaderProps {
  media: MediaItem[];
  favoritesCount: number;
  onStartSlideshow: () => void;
  onOpenUpload: () => void;
  onOpenCardModal: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  media,
  favoritesCount,
  onStartSlideshow,
  onOpenUpload,
  onOpenCardModal,
  onScrollTo
}) => {
  const handlePlayMusic = () => {
    sounds.playHappyBirthdayChime();
    triggerBirthdayConfetti();
  };

  return (
    <header className="border-b border-amber-200/60 bg-[#faf8f5]/90 backdrop-blur-xl sticky top-0 z-40 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo & Abo Alaa Name */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-500 p-[2px] shadow-md shadow-amber-500/10 flex-shrink-0">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                    <img 
                      src={getMediaUrl('media/1790768480477.jpg')} 
                      alt="محمد أبو علاء" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="absolute -top-1.5 -right-1 text-xs">👑</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black tracking-tight text-stone-900 flex items-center gap-1.5 font-heading">
                    <span>محمد أبو علاء</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-sans bg-amber-100 border border-amber-200 text-amber-800 font-bold">
                      عيد ميلاد سعيد 🎂
                    </span>
                  </h1>
                </div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                  <span>الراجل الجدع وصاحب العمر</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-amber-700 font-bold">من أخوك كريم ❤️</span>
                </p>
              </div>
            </div>

            {/* Mobile Music Chime Button */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                onClick={handlePlayMusic}
                className="p-2 rounded-xl bg-amber-100/70 text-amber-800 border border-amber-200 text-xs font-bold"
                title="عزف نغمة العيد ميلاد"
              >
                <Music className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Nav Links to sections */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => onScrollTo('letter-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>الرسالة والأبيات</span>
            </button>
            <button
              onClick={() => onScrollTo('stats-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <span>📊</span>
              <span>سجل الكرفات</span>
            </button>
            <button
              onClick={() => onScrollTo('stickers-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <Smile className="w-3.5 h-3.5 text-cyan-600" />
              <span>الاستيكرات</span>
            </button>
            <button
              onClick={() => onScrollTo('artwork-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <Disc className="w-3.5 h-3.5 text-amber-600" />
              <span>تراك المزاج</span>
            </button>
            <button
              onClick={() => onScrollTo('cake-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <Cake className="w-3.5 h-3.5 text-amber-600" />
              <span>التورتة</span>
            </button>
            <button
              onClick={() => onScrollTo('reel-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <Film className="w-3.5 h-3.5 text-sky-600" />
              <span>الريلز</span>
            </button>
            <button
              onClick={() => onScrollTo('gallery-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>الصور</span>
            </button>
            <button
              onClick={() => onScrollTo('wishes-section')}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-pink-500" />
              <span>التهاني</span>
            </button>
          </nav>

          {/* Action buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={handlePlayMusic}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
              title="عزف نغمة العيد ميلاد"
            >
              <Music className="w-3.5 h-3.5 text-amber-600" />
              <span>نغمة العيد ميلاد 🎵</span>
            </button>

            <button
              onClick={onOpenCardModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <span>كارت التهنئة 👑</span>
            </button>

            <button
              onClick={onStartSlideshow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-medium transition-colors cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 text-cyan-600 fill-cyan-600" />
              <span>سلايد شو</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
