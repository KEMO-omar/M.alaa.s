import React, { useState } from 'react';
import { Sparkles, Crown, Music, Volume2, Share2, Copy, Check, Cake, Flame, Send, Heart } from 'lucide-react';
import { triggerBirthdayConfetti, triggerStarConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';

interface BirthdayHeroProps {
  onScrollToSection: (id: string) => void;
  onOpenCardModal: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ onScrollToSection, onOpenCardModal }) => {
  const [copied, setCopied] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());

  const balloons = [
    { id: 1, color: 'bg-rose-500', text: '🎂', x: 'left-4 sm:left-12', y: 'top-16', delay: 'animate-float-slow' },
    { id: 2, color: 'bg-amber-500', text: '👑', x: 'right-6 sm:right-16', y: 'top-20', delay: 'animate-float-reverse' },
    { id: 3, color: 'bg-cyan-500', text: '🎬', x: 'left-8 sm:left-24', y: 'bottom-20', delay: 'animate-float-reverse' },
    { id: 4, color: 'bg-emerald-500', text: '🎉', x: 'right-4 sm:right-24', y: 'bottom-24', delay: 'animate-float-slow' },
  ];

  const handlePopBalloon = (id: number) => {
    sounds.playPop();
    triggerStarConfetti();
    setPoppedBalloons(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleCopyMessage = () => {
    const text = `النهاردة عيد ميلاد الراجل الجدع، صاحب العمر وأكرف بني آدم على الواتساب.. أبو علاء الغالي! 🎂😂

📜 أبيات من القلب:
اسمي من اسمك يابو علاء .. مش بس صديقي أقسم بالله
أخويا وحبيبي يابو علاء .. محبتنا خالصة لوجه الله
زعلنا كتير من بعضينا .. وبنرجع تاني لوحدينا

النهاردة مش مجرد يوم عادي، النهاردة عيد ميلاد عشرة العمر القديمة، الشخص اللي مهما الأيام والمشاغل خادتنا، بيفضل مكانه في القلب ثابت وزي ما هو!
كل سنة وأنت طيب يا صاحبي وأخويا، وعقبال سنين كتير جاية وإحنا مع بعض ومحقق كل اللي بتتمناه.. هابي بيرث داي يا أبو علاء يا شق! 👑❤️
— من أخوك: كريم`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        triggerStarConfetti();
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {});
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        triggerStarConfetti();
        setTimeout(() => setCopied(false), 2500);
      } catch {}
      document.body.removeChild(textArea);
    }
  };

  const handlePlayMusic = () => {
    sounds.playHappyBirthdayChime();
    triggerBirthdayConfetti();
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-amber-200/60 bg-gradient-to-b from-amber-50/70 via-[#faf8f5] to-[#f7f4ed]">
      
      {/* Interactive Floating Balloons */}
      {balloons.map(b => !poppedBalloons.has(b.id) && (
        <button
          key={b.id}
          onClick={() => handlePopBalloon(b.id)}
          className={`absolute ${b.x} ${b.y} hidden md:flex flex-col items-center cursor-pointer group z-10 transition-transform active:scale-90 ${b.delay}`}
          title="اضغط عشان تفرقع البالونة!"
        >
          <div className={`w-12 h-14 rounded-full ${b.color} shadow-lg shadow-amber-900/10 flex items-center justify-center text-lg transform group-hover:scale-110 transition-transform relative`}>
            <span>{b.text}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-inherit"></div>
          </div>
          <div className="w-[1px] h-10 bg-stone-300 mt-1"></div>
        </button>
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-20">
        
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs sm:text-sm font-bold mb-6 shadow-xs backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>اليوم السعيد • الاحتفال بعيد ميلاد الأسطورة</span>
          <span className="text-amber-400">★</span>
          <span>1 أكتوبر 2026</span>
        </div>

        {/* Profile Avatar with Birthday Crown & Glow */}
        <div className="relative inline-block my-3">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <span className="text-4xl filter drop-shadow-[0_4px_10px_rgba(217,119,6,0.35)]">👑</span>
          </div>
          
          {/* Animated Glow Halo */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-500 shadow-xl shadow-amber-500/20 animate-pulse-glow">
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white shadow-inner">
              <img
                src="/media/1790768480477.jpg"
                alt="محمد أبو علاء"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Side celebratory floating emoji badges */}
          <div className="absolute -bottom-2 -right-2 bg-white border border-amber-300 text-amber-900 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
            <span>🎂</span>
            <span>أبو علاء</span>
          </div>
          <div className="absolute -bottom-2 -left-2 bg-white border border-cyan-300 text-cyan-900 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
            <span>🎬</span>
            <span>البروفيسور</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight mt-5 leading-tight sm:leading-snug font-heading">
          كل سنة وأنت طيب يا <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600">أبو علاء</span> يا غالي!
        </h1>

        <p className="mt-3 text-base sm:text-xl text-stone-700 font-semibold max-w-2xl mx-auto leading-relaxed">
          الراجل الجدع، صاحب العمر، وأكرف بني آدم على الواتساب.. يومك سعيد يا شق العمر! 🎂😂
        </p>

        {/* Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-100/90 border border-amber-300 text-xs sm:text-sm text-amber-900 flex items-center gap-1.5 font-bold shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>إهداء من أخوك وصاحب عمرك: كريم</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-center gap-1.5 font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            <span>أكرف كائن على الواتساب (وزير الخارجية) 🤷‍♂️</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-center gap-1.5 font-medium shadow-xs">
            <span>🎬</span>
            <span>بروفيسور ريلز الساعة 3 الفجر</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-amber-800 flex items-center gap-1.5 font-bold shadow-xs">
            <span>🤍</span>
            <span>عشرة العمر اللي متتعوضش</span>
          </span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          
          {/* Confetti blast button */}
          <button
            onClick={() => triggerBirthdayConfetti()}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            <span>فرقع كونفيتي واحتفل! 🎉</span>
          </button>

          {/* Birthday Song chime */}
          <button
            onClick={handlePlayMusic}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-amber-300 text-amber-900 font-bold text-sm sm:text-base shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Music className="w-5 h-5 text-amber-600" />
            <span>عزف نغمة العيد ميلاد 🎵</span>
          </button>

          {/* Copy WhatsApp message */}
          <button
            onClick={handleCopyMessage}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-sm sm:text-base shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="انسخ رسالة التهنئة عشان تبعتها له في الواتساب"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700">تم نسخ التهنئة! 🚀</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-emerald-600" />
                <span>انسخ التهنئة للواتس 💬</span>
              </>
            )}
          </button>

          {/* Jump to cake */}
          <button
            onClick={() => onScrollToSection('cake-section')}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold text-sm transition-all cursor-pointer shadow-xs"
          >
            <Cake className="w-4 h-4 text-rose-500" />
            <span>اطفي الشمع 🕯️</span>
          </button>

        </div>

      </div>

    </section>
  );
};
