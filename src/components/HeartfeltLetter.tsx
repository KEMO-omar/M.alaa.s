import React, { useState } from 'react';
import { Heart, Copy, Check, Sparkles, Send, Quote } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';

export const HeartfeltLetter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullLetter = `النهاردة عيد ميلاد الراجل الجدع، صاحب العمر وأكرف بني آدم على الواتساب.. أبو علاء الغالي! 🎂😂

📜 أبيات من القلب:
اسمي من اسمك يابو علاء .. مش بس صديقي أقسم بالله
أخويا وحبيبي يابو علاء .. محبتنا خالصة لوجه الله
زعلنا كتير من بعضينا .. وبنرجع تاني لوحدينا

النهاردة مش مجرد يوم عادي، النهاردة عيد ميلاد عشرة العمر القديمة، الشخص اللي مهما الأيام والمشاغل خادتنا، بيفضل مكانه في القلب ثابت وزي ما هو. أنت يا صاحبي من كتر ما قعدتك ميتزهقش منها، ممكن نفضل قاعدين أنا وأنت بالساعات نضحك ونحكي والوقت يسرقنا من غير ما نحس بأي ملل.

بجد ومن غير مجاملة، أنت من أصفى وأنظف القلوب اللي عرفتها في حياتي، دايماً دمك خفيف وبتعرف ترسم الضحكة على وشي في عز الخنقة، وضحكتك لوحدها بتعدل المزاج. ده غير طبعاً إنك "بروفيسور" في الريلز، وبشهادتي عندك ذوق عالي جداً وفنان في اختيار الريلز الرايقة اللي بتبعتها وبتفصلني ضحك! 🎬👌

أي نعم أنا ممكن أبعتلك على الواتساب وتفضل باليومين مابتردش، وتشوف الرسالة وتطنش عادي جداً وكأنك وزير الخارجية المشغول، بس يلا.. المسامح كريم والنهاردة عيد ميلادك ومش هقلب عليك القديم والنفضان ده! 🤷‍♂️ هنركن الحوار ده على جنب النهاردة، عشان النهاردة يومك يا غالي.

كل سنة وأنت طيب يا صاحبي وأخويا، وعقبال سنين كتير جاية وإحنا مع بعض، ومحقق كل اللي بتمناه، وتفضل دايماً بدمك الخفيف وذوقك الرايق منور حياتي.. هابي بيرث داي يا أبو علاء يا شق! 👑❤️
— من أخوك: كريم`;

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullLetter).then(() => {
        setCopied(true);
        triggerBirthdayConfetti();
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {});
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = fullLetter;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        triggerBirthdayConfetti();
        setTimeout(() => setCopied(false), 2500);
      } catch {}
      document.body.removeChild(textArea);
    }
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(fullLetter);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Luxury Parchment Card */}
      <div className="relative bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-200/50 overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header inside letter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
              <Quote className="w-6 h-6 rotate-180" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-800 uppercase tracking-widest font-bold">
                من القلب للقلب ❤️
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5 font-heading">
                رسالة خاصة إلى: محمد أبو علاء
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              title="نسخ الرسالة كاملة"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-700" />
                  <span>نسخ الكلام</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
              title="فتح الواتساب وإرسالها مباشرة"
            >
              <Send className="w-4 h-4" />
              <span>إرسال واتساب 💬</span>
            </button>
          </div>
        </div>

        {/* The Body Paragraphs */}
        <div className="mt-8 space-y-6 text-stone-700 text-base sm:text-lg leading-relaxed sm:leading-loose">
          
          <div className="p-4 rounded-2xl bg-amber-50/90 border-r-4 border-amber-500 text-amber-950 font-bold text-lg sm:text-xl shadow-xs">
            النهاردة عيد ميلاد الراجل الجدع، صاحب العمر وأكرف بني آدم على الواتساب.. أبو علاء الغالي! 🎂😂
          </div>

          {/* Royal Poetry Card */}
          <div className="my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fbf7ee] to-[#f7f0e1] border-2 border-amber-300 shadow-md relative overflow-hidden text-center">
            <div className="inline-flex items-center justify-center gap-2 text-amber-900 font-mono text-xs uppercase tracking-widest font-bold mb-5 bg-amber-200/50 px-4 py-1 rounded-full border border-amber-300/80">
              <Sparkles className="w-4 h-4 fill-amber-600 text-amber-600" />
              <span>أبيات شعر من أخوك كريم لأبو علاء 📜</span>
              <Sparkles className="w-4 h-4 fill-amber-600 text-amber-600" />
            </div>

            <div className="space-y-4 text-lg sm:text-2xl font-black text-stone-900 font-heading leading-loose">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 py-2 border-b border-amber-200/80">
                <span className="text-stone-900">اسمي من اسمك يابو علاء</span>
                <span className="text-amber-600 hidden sm:inline text-sm">✦</span>
                <span className="text-amber-800">مش بس صديقي أقسم بالله</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 py-2 border-b border-amber-200/80">
                <span className="text-stone-900">أخويا وحبيبي يابو علاء</span>
                <span className="text-amber-600 hidden sm:inline text-sm">✦</span>
                <span className="text-amber-800">محبتنا خالصة لوجه الله</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 py-2">
                <span className="text-stone-900">زعلنا كتير من بعضينا</span>
                <span className="text-amber-600 hidden sm:inline text-sm">✦</span>
                <span className="text-amber-800">وبنرجع تاني لوحدينا</span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-amber-800">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>محفورة في القلب • من أخوك: كريم</span>
            </div>
          </div>

          <p>
            النهاردة مش مجرد يوم عادي، النهاردة عيد ميلاد <span className="text-amber-800 font-bold underline decoration-amber-300">عشرة العمر القديمة</span>، الشخص اللي مهما الأيام والمشاغل خادتنا، بيفضل مكانه في القلب ثابت وزي ما هو.
            أنت يا صاحبي من كتر ما قعدتك ميتزهقش منها، ممكن نفضل قاعدين أنا وأنت بالساعات نضحك ونحكي والوقت يسرقنا من غير ما نحس بأي ملل.
          </p>

          <p>
            بجد ومن غير مجاملة، أنت من <span className="text-rose-800 font-semibold underline decoration-rose-300">أصفى وأنظف القلوب</span> اللي عرفتها في حياتي، دايماً دمك خفيف وبتعرف ترسم الضحكة على وشي في عز الخنقة، وضحكتك لوحدها بتعدل المزاج. ده غير طبعاً إنك <strong className="text-cyan-800 font-black">"بروفيسور" في الريلز 🎬</strong>، وبشهادتي عندك ذوق عالي جداً وفنان في اختيار الريلز الرايقة اللي بتبعتها وبتفصلني ضحك! 👌
          </p>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-700 relative">
            <div className="flex items-start gap-2.5">
              <span className="text-2xl flex-shrink-0">🤷‍♂️</span>
              <p className="text-sm sm:text-base leading-relaxed">
                <strong className="text-amber-800">فقرة الصراحة الرايقة:</strong> أي نعم أنا ممكن أبعتلك على الواتساب وتفضل باليومين مابتردش، وتشوف الرسالة وتطنش عادي جداً وكأنك <span className="text-stone-900 font-bold underline decoration-amber-400">وزير الخارجية المشغول</span>، بس يلا.. المسامح كريم والنهاردة عيد ميلادك ومش هقلب عليك القديم والنفضان ده! هنركن الحوار ده على جنب النهاردة، عشان النهاردة يومك يا غالي. 😂
              </p>
            </div>
          </div>

          <div className="pt-2 text-lg sm:text-xl font-bold text-amber-900 font-heading">
            كل سنة وأنت طيب يا صاحبي وأخويا، وعقبال سنين كتير جاية وإحنا مع بعض، ومحقق كل اللي بتمناه، وتفضل دايماً بدمك الخفيف وذوقك الرايق منور حياتي.. هابي بيرث داي يا أبو علاء يا شق! 👑🤍✨
          </div>

          {/* Signature from Kareem */}
          <div className="pt-4 flex items-center justify-end">
            <div className="text-right p-4 rounded-2xl bg-amber-50 border border-amber-200 inline-block shadow-xs">
              <span className="text-xs text-amber-800 font-medium block">صاحب عمرك وأخوك اللي بيحبك:</span>
              <span className="text-xl sm:text-2xl font-black text-stone-900 font-heading mt-0.5 block">
                من أخوك كريم ❤️
              </span>
            </div>
          </div>

        </div>

        {/* Stamp / Signature footer */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <span>ختم الصداقة والجدعنة:</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              معتمد للأبد من أخوك كريم ✓
            </span>
          </div>
          <div>
            <span>1 أكتوبر 2026 • أخوك وصاحب عمرك كريم</span>
          </div>
        </div>

      </div>

    </section>
  );
};
