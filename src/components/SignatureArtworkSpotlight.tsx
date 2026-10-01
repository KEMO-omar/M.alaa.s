import React, { useState } from 'react';
import { Music, Disc, Sparkles, Volume2, Download, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerStarConfetti } from '../utils/confetti';
import { getMediaUrl } from '../utils/mediaUrl';

export const SignatureArtworkSpotlight: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(842);
  const [hasLiked, setHasLiked] = useState(false);

  const handlePlaySound = () => {
    setIsPlaying(true);
    sounds.playHappyBirthdayChime();
    triggerStarConfetti();
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleLike = () => {
    if (!hasLiked) {
      sounds.playPop();
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-[#fffdfa] via-white to-[#fbf8f2] border border-amber-200/70 rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-200/50 relative overflow-hidden">
        
        {/* Soft luxury ambient glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10">
          
          {/* Artwork & Vinyl Stage */}
          <div className="relative group flex-shrink-0 flex items-center justify-center">
            {/* Spinning decorative vinyl behind */}
            <div className={`absolute -left-6 sm:-left-8 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-stone-900 border-4 border-stone-800 shadow-2xl flex items-center justify-center transition-all duration-700 ${
              isPlaying ? 'rotate-[360deg] transition-transform duration-[6s] linear' : 'group-hover:-translate-x-4'
            }`}>
              {/* Vinyl grooves */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-stone-700/60 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-stone-950"></div>
                </div>
              </div>
            </div>

            {/* The Main Artwork Image */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-2xl shadow-amber-900/10 bg-white z-10">
              <img
                src={getMediaUrl('media/artworks-000064279855-q6u7eq-t500x500.jpg')}
                alt="شعار ومزاج أبو علاء"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-stone-700">
                <Sparkles className="w-3 h-3" />
                <span>الغلاف الرسمي</span>
              </div>
            </div>
          </div>

          {/* Descriptive Content */}
          <div className="flex-1 text-center md:text-right space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Disc className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>قطعة أساسية ومميزة • ذوق ومزاج أبو علاء</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-heading">
              أيقونة المزاج العالي 🎵
            </h3>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              الصورة دي محطوطة في الصدارة مخصوص؛ عشان بتمثل ذوق أبو علاء الرايق في التراكات والمزاج الهادي اللي بيسمعه في السفر والعربيات.. مش مجرد صورة في ألبوم، دي رمز للروقان اللي بيزرعه في أي مكان!
            </p>

            {/* Features strip */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 font-medium">
                🎧 ذوق رفيع ومعتمد
              </span>
              <span className="px-3 py-1 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 font-medium">
                🚗 تراكات السفر والروقان
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800 font-bold">
                ⭐ أيقونة خاصة
              </span>
            </div>

            {/* Interactive Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={handlePlaySound}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>عزف نغمة المزاج الرايق 🎶</span>
              </button>

              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  hasLiked 
                    ? 'bg-rose-50 border-rose-300 text-rose-600' 
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likes} روقان</span>
              </button>

              <a
                href={getMediaUrl('media/artworks-000064279855-q6u7eq-t500x500.jpg')}
                download="AboAlaa_Artwork.jpg"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                title="تحميل الغلاف بدقته الأصلية"
              >
                <Download className="w-4 h-4 text-stone-500" />
                <span>تحميل الأصل</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
