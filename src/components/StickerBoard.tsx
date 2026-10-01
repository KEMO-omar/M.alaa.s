import React, { useState } from 'react';
import { Smile, Download, Volume2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { triggerStarConfetti } from '../utils/confetti';

interface StickerItem {
  id: string;
  title: string;
  caption: string;
  imgUrl: string;
  soundType: 'horn' | 'pop' | 'blast';
  tags: string[];
}

export const StickerBoard: React.FC = () => {
  const [activeSticker, setActiveSticker] = useState<string | null>(null);

  const stickers: StickerItem[] = [
    {
      id: 'st-1',
      title: 'استيكر الكرف المعتمد',
      caption: 'نظرة "شفت الرسالة وهرد عليك في التوقيت المناسب"',
      imgUrl: '/media/WA_1790767973270.jpeg',
      soundType: 'pop',
      tags: ['كرف', 'واتساب', 'وزير الخارجية']
    },
    {
      id: 'st-2',
      title: 'استيكر البروفيسور',
      caption: 'لما يبعت ريلز الساعة 3 الفجر والكل نايم',
      imgUrl: '/media/1790768480477.jpg',
      soundType: 'blast',
      tags: ['ريلز', 'البروفيسور', 'ضحك']
    },
    {
      id: 'st-3',
      title: 'استيكر الشياكة والطلّة',
      caption: 'لما يتأخر ساعتين ويقولك دقيقة وأكون عندك',
      imgUrl: '/media/IMG-20260607-WA0003.jpg',
      soundType: 'pop',
      tags: ['في الطريق', 'شياكة', 'صاحبي']
    },
    {
      id: 'st-4',
      title: 'استيكر الجدعنة والرجولة',
      caption: 'وقت الجد والشدة تلاقيه في ضهرك دايماً',
      imgUrl: '/media/IMG-20260923-WA0037(1).jpg',
      soundType: 'blast',
      tags: ['رجولة', 'جدعنة', 'أخويا']
    },
    {
      id: 'st-5',
      title: 'استيكر الضحكة الرايقة',
      caption: 'ضحكته اللي بتعدل المزاج في عز الخنقة',
      imgUrl: '/media/IMG-20260501-WA0040.jpg',
      soundType: 'horn',
      tags: ['ضحك', 'روقان', 'عشرة عمر']
    },
    {
      id: 'st-6',
      title: 'استيكر العفوية الطبيعية',
      caption: 'صاحب القلب الأبيض بدون فلاتر ولا لف ودوران',
      imgUrl: '/media/IMG-20260501-WA0039.jpg',
      soundType: 'horn',
      tags: ['عفوية', 'قلب أبيض', 'أبو علاء']
    }
  ];

  const handleTriggerSticker = (s: StickerItem) => {
    setActiveSticker(s.id);
    if (s.soundType === 'horn') sounds.playHorn();
    else if (s.soundType === 'pop') sounds.playPop();
    else sounds.playBlast();

    triggerStarConfetti();
    setTimeout(() => setActiveSticker(null), 1200);
  };

  const handleDownload = (e: React.MouseEvent, url: string, name: string) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-cyan-800 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 bg-cyan-100/70 px-3 py-0.5 rounded-full inline-flex border border-cyan-200">
          <Smile className="w-4 h-4 text-cyan-700" /> استيكرات وميمز أبو علاء
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 font-heading">
          لوحة الاستيكرات الأشهر في تاريخ الشات 😂
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg mx-auto">
          اضغط على أي استيكر عشان تسمع التأثير وتشوف سر الاستيكر في الواتساب!
        </p>
      </div>

      {/* Grid of Interactive Stickers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stickers.map((s) => {
          const isTriggered = activeSticker === s.id;
          return (
            <div
              key={s.id}
              onClick={() => handleTriggerSticker(s)}
              className={`group relative bg-white border rounded-2xl p-3 text-center cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isTriggered
                  ? 'border-amber-400 scale-105 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400'
                  : 'border-stone-200/90 hover:border-amber-300 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Sticker Thumbnail */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center mb-2.5">
                <img
                  src={s.imgUrl}
                  alt={s.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isTriggered ? 'scale-110 rotate-3' : 'group-hover:scale-105'
                  }`}
                />

                <div className="absolute top-1.5 right-1.5">
                  <span className="p-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] text-amber-700 block border border-amber-200 shadow-xs">
                    <Volume2 className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Title & Caption */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                  {s.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                  "{s.caption}"
                </p>
              </div>

              {/* Download button */}
              <button
                onClick={(e) => handleDownload(e, s.imgUrl, s.title)}
                className="mt-2.5 w-full py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-[10px] font-semibold text-stone-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="تحميل الاستيكر للجهاز"
              >
                <Download className="w-3 h-3 text-stone-500" />
                <span>حفظ الاستيكر</span>
              </button>
            </div>
          );
        })}
      </div>

    </section>
  );
};
