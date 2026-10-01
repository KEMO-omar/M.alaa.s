import React, { useState } from 'react';
import { MessageSquarePlus, Send, Heart, Sparkles, User, Smile } from 'lucide-react';
import { triggerBirthdayConfetti, triggerStarConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';

interface Wish {
  id: string;
  name: string;
  message: string;
  emoji: string;
  date: string;
  likes: number;
  highlight?: boolean;
  authorBadge?: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: 'w-1',
    name: 'أخوك وصاحب عمرك: كريم',
    message: 'اسمي من اسمك يابو علاء .. مش بس صديقي أقسم بالله .. أخويا وحبيبي يابو علاء .. محبتنا خالصة لوجه الله .. زعلنا كتير من بعضينا وبنرجع تاني لوحدينا ❤️ كل سنة وأنت طيب يا أبو علاء وعقبال 100 سنة يا شق، وتفضل دايماً بضحكتك اللي بتعدل المزاج منور حياتنا!',
    emoji: '👑',
    date: 'مثبتة في الصدارة',
    likes: 184,
    highlight: true,
    authorBadge: 'صاحب العمر وأخوك'
  },
  {
    id: 'w-2',
    name: 'إياد',
    message: 'أبو علاء يا رايق.. كل سنة وأنت طيب يا حبيب قلبي وعقبال سنين كتير جاية في صحة ونجاح وروقان بال، وتفضل دايماً ضحكتك منورة قعدتنا وريلزاتك مفرحانا ومفرفشة قلوبنا يا غالي! 🤍🔥',
    emoji: '🎬',
    date: 'اليوم',
    likes: 67,
    authorBadge: 'إياد'
  },
  {
    id: 'w-3',
    name: 'واحد منعرفوش (فاعل خير)',
    message: 'أنا معرفش أبو علاء بصراحة.. بس باين عليه راجل محترم جداً وابن أصول! كل سنة وأنت طيب يا باشا وعقبال 100 سنة في خير وسعادة وراحة بال 😂🙌',
    emoji: '🤷‍♂️',
    date: 'اليوم',
    likes: 92,
    authorBadge: 'فاعل خير'
  },
  {
    id: 'w-4',
    name: 'شلة الصحاب والواتساب',
    message: 'بما إن النهاردة عيد ميلادك فالمسامح كريم، ومعفي تماماً من كرفات السنة اللي فاتت كلها! يومك سعيد يا أجدع راجل في الدنيا 🎂✨',
    emoji: '🎉',
    date: 'اليوم',
    likes: 45,
    authorBadge: 'شلة الصحاب'
  }
];

export const WishWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('m_alaa_wishes_v2');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎂');

  const emojis = ['🎂', '👑', '🎬', '🔥', '🤍', '😂', '🤷‍♂️', '🎉'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sounds.playHorn();
    triggerStarConfetti();

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: authorName.trim() || 'صاحب وفي',
      message: message.trim(),
      emoji: selectedEmoji,
      date: 'الآن',
      likes: 1
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('m_alaa_wishes_v2', JSON.stringify(updated));
    } catch {}

    setMessage('');
    setAuthorName('');
  };

  const handleLikeWish = (id: string) => {
    sounds.playPop();
    const updated = wishes.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w);
    setWishes(updated);
    try {
      localStorage.setItem('m_alaa_wishes_v2', JSON.stringify(updated));
    } catch {}
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-amber-700 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 bg-amber-100/60 px-3 py-0.5 rounded-full inline-flex border border-amber-200">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> دفتر تهاني الصحاب والناس الطيبة
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 font-heading">
          كلمة محبة من القلب لأبو علاء ✍️
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
          سيب بصمتك وكلمتك في يوم ميلاده، سواء صاحب قديم أو حتى معدي بالصدفة!
        </p>
      </div>

      {/* Write a Wish Form (Luxury Light Box) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-5 sm:p-7 shadow-lg shadow-stone-200/40 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-700 mb-1">اسمك الكريم</label>
              <input
                type="text"
                placeholder="اكتب اسمك أو لقبك هنا..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-[#fcfbf9] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">اختر إيموجي</label>
              <div className="flex items-center gap-1 bg-[#fcfbf9] border border-stone-200 rounded-xl p-1">
                {emojis.map(e => (
                  <button
                    type="button"
                    key={e}
                    onClick={() => setSelectedEmoji(e)}
                    className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all cursor-pointer ${
                      selectedEmoji === e ? 'bg-amber-100 scale-110 shadow-sm' : 'hover:bg-stone-100'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">رسالتك لأبو علاء</label>
            <textarea
              rows={3}
              placeholder="اكتب تهنئتك، موقف حلو، أو كلمة من قلبك تفرحه..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#fcfbf9] border border-stone-200 rounded-xl p-3 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>نشر التهنئة على الحائط ✨</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of Wishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishes.map((w) => (
          <div
            key={w.id}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              w.highlight
                ? 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/60 border-amber-300 shadow-md md:col-span-2'
                : 'bg-white border-stone-200/90 hover:border-amber-200 shadow-sm hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl p-1.5 rounded-xl bg-stone-100 shadow-inner">{w.emoji}</span>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <span>{w.name}</span>
                      {w.authorBadge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-sans bg-amber-100 text-amber-800 font-bold border border-amber-200">
                          {w.authorBadge}
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-mono">{w.date}</span>
                  </div>
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                w.highlight ? 'text-stone-800 font-medium text-base' : 'text-stone-600'
              }`}>
                "{w.message}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleLikeWish(w.id)}
                className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-semibold cursor-pointer bg-rose-50 px-2.5 py-1 rounded-lg transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{w.likes} محبة</span>
              </button>

              <span className="text-[11px] text-amber-700 font-medium">
                تهنئة معتمدة ✓
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
