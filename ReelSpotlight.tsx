import React, { useState, useRef } from 'react';
import { Film, Play, Heart, Download, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { triggerStarConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';
import { getMediaUrl } from '../utils/mediaUrl';

export const ReelSpotlight: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(3140);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    if (!hasLiked) {
      sounds.playPop();
      triggerStarConfetti();
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-cyan-800 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 bg-cyan-100/70 px-3 py-0.5 rounded-full inline-flex border border-cyan-200">
          <Film className="w-4 h-4 text-cyan-700" /> استوديو ريلز أبو علاء
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 font-heading">
          بروفيسور الريلز وريلز الساعة 3 الفجر الرايقة 🎬
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
          "وبشهادتي عندك ذوق عالي جداً وفنان في اختيار الريلز الرايقة اللي بتبعتها وبتفصلني ضحك!"
        </p>
      </div>

      {/* Reel Spotlight Container */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 flex flex-col md:flex-row items-center justify-center gap-8">
        
        {/* Smartphone Frame with Video */}
        <div className="relative w-64 sm:w-72 h-[480px] sm:h-[520px] rounded-[38px] border-4 border-stone-800 bg-black shadow-2xl shadow-stone-900/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
          
          {/* Top Speaker notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-900 rounded-full z-20 flex items-center justify-center">
            <div className="w-8 h-1 bg-stone-700 rounded-full"></div>
          </div>

          {/* Video */}
          <video
            ref={videoRef}
            src={getMediaUrl('media/SmartSelect_20261001_092335_WhatsApp.mp4')}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Play Overlay if paused */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Reel Side Actions */}
          <div className="absolute right-3 bottom-14 flex flex-col items-center gap-4 z-20">
            <button
              onClick={handleLike}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                hasLiked ? 'bg-rose-500 text-white scale-110' : 'bg-black/50 text-white hover:bg-black/70'
              }`}>
                <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[11px] font-mono text-white mt-1 font-bold drop-shadow">
                {likes.toLocaleString()}
              </span>
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors cursor-pointer"
              title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <a
              href={getMediaUrl('media/SmartSelect_20261001_092335_WhatsApp.mp4')}
              download="Reel_AboAlaa.mp4"
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors cursor-pointer"
              title="تحميل الريلز"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>

          {/* Reel Bottom Meta */}
          <div className="absolute bottom-3 left-3 right-16 z-20 text-left pointer-events-none">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-bold text-white drop-shadow">@abo_alaa_official</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500 text-slate-950 font-bold">البروفيسور</span>
            </div>
            <p className="text-[11px] text-slate-200 line-clamp-2 drop-shadow leading-tight">
              أجمد ريلز تفصلك ضحك في نص الليل 🎬👌 #ريلز #أبو_علاء #ضحك_للرُكب
            </p>
          </div>

        </div>

        {/* Narrative & Comments Side Column */}
        <div className="flex-1 space-y-4 text-right">
          <div className="p-5 rounded-2xl bg-cyan-50/80 border border-cyan-200 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-cyan-900 flex items-center gap-2 font-heading">
              <Sparkles className="w-5 h-5 text-cyan-600" />
              <span>شهادة رسمية في فن اختيار الريلز</span>
            </h3>
            <p className="text-xs sm:text-sm text-cyan-950 mt-2 leading-relaxed font-medium">
              مهما كان يومك صعب ومضغوط، مجرد ما تفتح الواتساب وتلاقي ريلز مبعوتة من أبو علاء، بتعرف إن في نوبة ضحك جاية في السكة، ذوقه عالي وفنان ومختار الريلز بعناية!
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="bg-[#faf8f5] border border-stone-200 p-3 rounded-2xl text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-stone-700 font-medium">ساعة الإرسال المعتادة:</span>
              </div>
              <span className="font-mono text-amber-700 font-bold">3:15 AM (في قمة الروقان)</span>
            </div>

            <div className="bg-[#faf8f5] border border-stone-200 p-3 rounded-2xl text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                <span className="text-stone-700 font-medium">نسبة الفصلان من الضحك:</span>
              </div>
              <span className="font-mono text-cyan-700 font-bold">100% بدون نقاش</span>
            </div>

            <div className="bg-[#faf8f5] border border-stone-200 p-3 rounded-2xl text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="text-stone-700 font-medium">تقييم الذوق الفني:</span>
              </div>
              <span className="font-mono text-rose-700 font-bold">خمس نجوم 🌟🌟🌟🌟🌟</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={getMediaUrl('media/SmartSelect_20261001_092335_WhatsApp.mp4')}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>تحميل فيديو الريلز الأصلي</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};
