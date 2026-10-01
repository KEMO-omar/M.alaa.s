import React, { useState } from 'react';
import { X, Copy, Check, Crown, Heart } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface BirthdayCardModalProps {
  onClose: () => void;
}

export const BirthdayCardModal: React.FC<BirthdayCardModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `👑 كارت تهنئة رسمي بعيد ميلاد محمد أبو علاء 🎂

📜 أبيات من القلب:
اسمي من اسمك يابو علاء .. مش بس صديقي أقسم بالله
أخويا وحبيبي يابو علاء .. محبتنا خالصة لوجه الله
زعلنا كتير من بعضينا .. وبنرجع تاني لوحدينا

النهاردة عيد ميلاد الراجل الجدع، صاحب العمر وأكرف بني آدم على الواتساب.. أبو علاء الغالي!
كل سنة وأنت طيب يا صاحبي وأخويا، وعقبال سنين كتير جاية وإحنا مع بعض، ومحقق كل اللي بتمناه، وتفضل دايماً بدمك الخفيف وذوقك الرايق منور حياتي.. هابي بيرث داي يا شق! ❤️
— من أخوك: كريم`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      triggerBirthdayConfetti();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/60 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* The Greeting Card */}
        <div className="border-2 border-dashed border-amber-300 rounded-2xl p-6 bg-gradient-to-b from-[#fffdf9] via-[#fbf7ee] to-[#f7f0e2] text-center relative mt-4 shadow-sm">
          
          <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-500 mb-3 shadow-md shadow-amber-500/20">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white">
              <img src="/media/1790768480477.jpg" alt="أبو علاء" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-amber-800 font-bold text-xs uppercase tracking-widest">
            <Crown className="w-4 h-4 fill-amber-500 text-amber-600" />
            <span>كارت تهنئة أسطوري معتمد</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1 font-heading">
            محمد أبو علاء 🎂
          </h3>
          <p className="text-xs text-amber-800 font-semibold mt-0.5">
            صاحب العمر • بروفيسور الريلز • وزير خارجية الواتس
          </p>

          <div className="bg-white/90 p-4 rounded-xl border border-amber-200 text-center mt-4 shadow-xs">
            <div className="text-xs sm:text-sm font-bold text-stone-900 space-y-1 py-1 font-heading border-b border-amber-100 pb-2.5 mb-2 leading-relaxed">
              <p>اسمي من اسمك يابو علاء .. مش بس صديقي أقسم بالله</p>
              <p>أخويا وحبيبي يابو علاء .. محبتنا خالصة لوجه الله</p>
              <p>زعلنا كتير من بعضينا .. وبنرجع تاني لوحدينا</p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              "النهاردة عيد ميلاد عشرة العمر القديمة.. كل سنة وأنت طيب يا أبو علاء يا شق!"
            </p>
            <span className="block mt-2.5 text-xs font-black text-amber-800">
              — من أخوك: كريم ❤️
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span>تاريخ الإصدار: 1 أكتوبر 2026</span>
            <span className="text-emerald-700 font-bold">معتمد من كريم ✓</span>
          </div>
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ التهنئة!' : 'نسخ نص الكارت 💬'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
