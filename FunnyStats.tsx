import React from 'react';
import { CheckCheck, Clock, Film, Heart, Zap, Award } from 'lucide-react';

export const FunnyStats: React.FC = () => {
  const stats = [
    {
      title: 'رسائل شافها وماردش عليها (Seen)',
      value: '+9,999',
      subtitle: 'العلامتين الزرق ومفيش رد خالص',
      icon: <CheckCheck className="w-5 h-5 text-sky-600" />,
      color: 'border-sky-200 bg-white text-sky-900',
      badge: 'رقم قياسي عالمي'
    },
    {
      title: 'ريلز مبعوتة الساعة 3 الفجر',
      value: '+14,280',
      subtitle: 'كلها ريلز رايقة بتفصل من الضحك',
      icon: <Film className="w-5 h-5 text-cyan-600" />,
      color: 'border-cyan-200 bg-white text-cyan-900',
      badge: 'بروفيسور الريلز 🎬'
    },
    {
      title: 'متوسط زمن الرد على الواتس',
      value: '48 ساعة',
      subtitle: 'حسب جدول معالي وزير الخارجية',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      color: 'border-amber-200 bg-white text-amber-900',
      badge: 'مشغول جداً'
    },
    {
      title: 'مؤشر الجدعنة وصاحب صاحبه',
      value: '1000%',
      subtitle: 'مهما كرف.. مكانه في القلب ثابت',
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      color: 'border-rose-200 bg-white text-rose-900',
      badge: 'عشرة العمر ❤️'
    },
    {
      title: 'قعدات الضحك والمواقف',
      value: 'مليون قعدة',
      subtitle: 'قعدة ميتزهقش منها أبداً بالساعات',
      icon: <Zap className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-200 bg-white text-emerald-900',
      badge: 'ضحك متواصل'
    },
    {
      title: 'الذوق العام والمزاج الرايق',
      value: '10 / 10',
      subtitle: 'فنان في اختيار التراكات والضحك',
      icon: <Award className="w-5 h-5 text-purple-600" />,
      color: 'border-purple-200 bg-white text-purple-900',
      badge: 'ذوق عالي'
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-amber-800 uppercase tracking-widest font-bold bg-amber-100/70 px-3 py-0.5 rounded-full inline-block border border-amber-200">
          إحصائيات غير رسمية 📊
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 font-heading">
          سجل أبو علاء الحافل على الواتساب والحياة
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg mx-auto">
          بيانات موثقة من واقع محادثات الواتساب وسهرات السنين اللي فاتت!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border ${s.color} transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 shadow-xs">
                {s.icon}
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {s.badge}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 block font-heading">
                {s.value}
              </span>
              <h3 className="text-sm font-bold text-stone-800 mt-1">
                {s.title}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {s.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
