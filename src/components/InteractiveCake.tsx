import React, { useState } from 'react';
import { Cake, Wind, RotateCcw, Heart } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';

export const InteractiveCake: React.FC = () => {
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [wishUnlocked, setWishUnlocked] = useState<boolean>(false);

  const litCount = candles.filter(Boolean).length;

  const handleBlowCandle = (index: number) => {
    if (!candles[index]) return;

    sounds.playBlow();
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    if (updated.every(c => !c)) {
      triggerAllBlown();
    }
  };

  const handleBlowAll = () => {
    sounds.playBlow();
    setCandles([false, false, false, false, false]);
    triggerAllBlown();
  };

  const triggerAllBlown = () => {
    setTimeout(() => {
      sounds.playHorn();
      triggerBirthdayConfetti();
      setWishUnlocked(true);
    }, 300);
  };

  const handleRelight = () => {
    sounds.playBlast();
    setCandles([true, true, true, true, true]);
    setWishUnlocked(false);
  };

  return (
    <section id="cake-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono text-amber-800 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 bg-amber-100/70 px-3 py-0.5 rounded-full inline-flex border border-amber-200">
          <Cake className="w-4 h-4 text-amber-700" /> تورتة العيد ميلاد التفاعلية
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 font-heading">
          اطفي شمع تورتة أبو علاء واتمنى أمنية! 🎂
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          اضغط على كل شمعة عشان تطفيها أو اضغط الزرار الكبير للنفخ الكامل!
        </p>
      </div>

      {/* The Cake Display Stage */}
      <div className="relative bg-white border border-amber-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-stone-200/50 overflow-hidden max-w-2xl mx-auto">
        
        {/* Glow ambient background */}
        <div className={`absolute inset-0 bg-amber-50/50 transition-opacity duration-700 pointer-events-none ${
          litCount > 0 ? 'opacity-100' : 'opacity-0'
        }`}></div>

        {/* Candles Row */}
        <div className="flex items-end justify-center gap-5 sm:gap-8 mb-2 relative z-10">
          {candles.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => handleBlowCandle(idx)}
              className="flex flex-col items-center cursor-pointer group select-none transition-transform hover:scale-110 active:scale-95"
              title={isLit ? "اضغط لنفخ الشمعة" : "شمعة مطفية"}
            >
              {/* Flame */}
              <div className="h-9 flex items-center justify-center">
                {isLit ? (
                  <div className="relative">
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-flame"></div>
                    <div className="absolute inset-0 blur-xs bg-amber-400/80 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-stone-400 font-mono">💨</span>
                    <div className="w-[2px] h-3 bg-stone-400 rounded"></div>
                  </div>
                )}
              </div>

              {/* Candle Body */}
              <div className="w-3.5 h-14 rounded-t-md bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-sm relative overflow-hidden border border-amber-300/50">
                <div className="absolute inset-0 bg-repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(239,68,68,0.4) 4px, rgba(239,68,68,0.4) 8px)"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tiered Birthday Cake Visual */}
        <div className="flex flex-col items-center relative z-10">
          
          {/* Top Tier */}
          <div className="w-48 sm:w-60 h-16 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 border-2 border-amber-300 shadow-md flex items-center justify-around px-4 relative overflow-hidden">
            <span className="text-xl">🍓</span>
            <span className="text-base font-black text-white tracking-wider font-heading drop-shadow">M. ALAA</span>
            <span className="text-xl">🍓</span>
            <div className="absolute top-0 inset-x-0 h-3 bg-white/80 rounded-b-xl"></div>
          </div>

          {/* Middle Tier */}
          <div className="w-64 sm:w-80 h-20 rounded-2xl bg-gradient-to-r from-rose-700 via-amber-700 to-rose-800 border-2 border-amber-400 shadow-lg flex items-center justify-around px-6 -mt-1 relative overflow-hidden">
            <span className="text-xl">🎂</span>
            <span className="text-sm sm:text-base font-black text-amber-100 font-heading drop-shadow">
              أبو علاء الغالي
            </span>
            <span className="text-xl">🎉</span>
            <div className="absolute top-0 inset-x-0 h-3 bg-amber-100/90 rounded-b-xl"></div>
          </div>

          {/* Bottom Cake Plate */}
          <div className="w-72 sm:w-96 h-5 rounded-full bg-gradient-to-r from-stone-200 via-white to-stone-200 border border-stone-300 shadow-md mt-1"></div>
        </div>

        {/* Status / Blow Actions */}
        <div className="mt-8 relative z-10 flex flex-col items-center">
          
          {litCount > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-bold text-amber-900">
                الشمع المشتعل: <strong>{litCount}</strong> من 5 🕯️
              </p>
              
              <button
                onClick={handleBlowAll}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Wind className="w-5 h-5" />
                <span>انفخ الشمع كله مرة واحدة! 💨</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in zoom-in duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-300 text-center shadow-xs">
                <span className="text-3xl block mb-2">🎉✨🥳</span>
                <h3 className="text-lg font-black text-stone-900 font-heading">
                  تم إطفاء الشمع بنجاح وأمنية العيد ميلاد اتسجلت!
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 mt-2 leading-relaxed font-medium">
                  "أمنية السنة دي: إنك تبدأ ترد على رسايل الواتس في نفس الأسبوع، وتفضل دايمًا ضاحك ومبسوط وسعيد ومحقق كل أحلامك يا أجدع صاحب في الدنيا! 🤍"
                </p>
              </div>

              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-amber-700" />
                <span>ولّع الشمع تاني 🕯️</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
