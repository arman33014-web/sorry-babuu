import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, Star, Music, Check } from 'lucide-react';
import RoseBouquet3D from './RoseBouquet3D';
import TeddyBear3D from './TeddyBear3D';
import { romanticAudio } from '../utils/romanticAudio';

export default function GiftRevealSection() {
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('roses'); // 'roses' | 'teddy' | 'coupons' | 'star' | 'musicbox'
  const [redeemedCoupons, setRedeemedCoupons] = useState({});

  const handleOpenGift = () => {
    setIsOpened(true);
    romanticAudio.playChime();

    // Burst confetti in rose & gold
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#f59e0b', '#fda4af', '#fde68a', '#ffffff'],
      });
    } catch (e) {
      // fallback
    }
  };

  const handleRedeemCoupon = (id) => {
    romanticAudio.playSparkle();
    setRedeemedCoupons((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const coupons = [
    {
      id: 1,
      title: 'Midnight Sweet Treats Run',
      desc: 'Chahe midnight ke 2 baje ho ya din ke, aap bas ek baar bolo aur aapka favorite dessert hazir ho jayega. 🍦💖',
      icon: '🍦',
      code: 'ANIKA-SWEET-01',
    },
    {
      id: 2,
      title: 'Win Any Argument VIP Pass',
      desc: 'Yeh coupon show karte hi main instantly haar maan lunga aur admit karunga ki aap 100% right ho! 👑✨',
      icon: '👑',
      code: 'ANIKA-QUEEN-02',
    },
    {
      id: 3,
      title: 'Unlimited Warm Hugs & Cuddle Session',
      desc: 'Jitni der tak aap chaho, bina kisi time limit ke ekdum tight aur comforting cuddle session. 🫂💗',
      icon: '🫂',
      code: 'ANIKA-HUG-03',
    },
    {
      id: 4,
      title: 'Chef Special Romantic Dinner',
      desc: 'Aapki pasand ka poora 3-course dinner main cook karunga, candles jalaunga, aur dishes bhi main dhoonga. 🍷🍝❤️',
      icon: '🍷',
      code: 'ANIKA-DINNER-04',
    },
    {
      id: 5,
      title: 'Unlimited Forehead & Cheek Kisses',
      desc: 'Jab bhi aap tired ya low feel karo, yeh coupon redeem karke dher saara affection aur kisses pao. 💋😘✨',
      icon: '💋',
      code: 'ANIKA-KISS-05',
    },
  ];

  return (
    <section id="gifts" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Gift className="w-3.5 h-3.5 text-rose-400" />
          <span>Specially Handcrafted For You</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
          Your Special Gifts
        </h2>
        <p className="font-sans text-sm sm:text-base text-rose-200/80 max-w-xl mx-auto">
          Yeh har ek gift maine dil se choose kiya hai taaki aapko yaad rahe ki aap meri life mein kitni anmol ho. 🎁✨❤️
        </p>
      </div>

      {/* If Gift Box Is Not Yet Opened */}
      {!isOpened ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div
            onClick={handleOpenGift}
            className="group relative cursor-pointer flex flex-col items-center transition-transform duration-500 hover:scale-105 active:scale-95"
          >
            {/* Soft pulsing glow behind box */}
            <div className="absolute -inset-8 bg-gradient-to-r from-rose-600/30 via-amber-500/25 to-pink-600/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />

            {/* Gift Box Graphic */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl glass-card-gold border-2 border-amber-400/40 p-6 flex flex-col items-center justify-center shadow-2xl">
              {/* Golden Cross Ribbon */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-600 shadow-md" />
              <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 shadow-md" />

              {/* 3D Bow on Top */}
              <div className="absolute -top-7 z-20 flex items-center justify-center">
                <div className="w-16 h-10 rounded-full bg-amber-400 border-2 border-amber-200 shadow-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-950 animate-pulse" />
                </div>
              </div>

              {/* Tag on box */}
              <div className="relative z-20 bg-rose-950/90 border border-rose-400/40 px-4 py-2 rounded-xl text-center shadow-lg mt-6">
                <p className="text-[10px] uppercase tracking-wider text-rose-300 font-bold">Special Delivery For</p>
                <p className="font-serif text-lg font-bold text-white">Anika ❤️</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 group-hover:scale-105 transition-all">
                <Gift className="w-4 h-4 text-amber-200" />
                <span>Open Your Gift</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
              <span className="text-xs text-rose-300/70 mt-2">Beintehaa pyaar aur shiddat se taiyaar kiya gaya hai aapke liye. 💌✨</span>
            </div>
          </div>
        </div>
      ) : (
        /* Unwrapped Gifts Experience with Tabs */
        <div className="space-y-8 animate-fadeIn">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl glass-panel max-w-2xl mx-auto border border-rose-500/20">
            <button
              onClick={() => setActiveTab('roses')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'roses'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-102'
                  : 'text-rose-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🌹 3D Rose Bouquet</span>
            </button>

            <button
              onClick={() => setActiveTab('teddy')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'teddy'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-102'
                  : 'text-rose-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🧸 3D Cuddle Bear</span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'coupons'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/30 scale-102'
                  : 'text-rose-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🎟️ Secret Love Vouchers</span>
            </button>

            <button
              onClick={() => setActiveTab('star')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'star'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/30 scale-102'
                  : 'text-rose-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>⭐ A Star Named Anika</span>
            </button>

            <button
              onClick={() => setActiveTab('musicbox')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'musicbox'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 scale-102'
                  : 'text-rose-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🎶 Enchanted Music Box</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="w-full">
            {activeTab === 'roses' && (
              <div className="space-y-4">
                <RoseBouquet3D />
              </div>
            )}

            {activeTab === 'teddy' && (
              <div className="space-y-4">
                <TeddyBear3D />
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/20">
                <div className="max-w-xl mx-auto text-center mb-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    Official Love Vouchers For Anika
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-200/80">
                    Yeh sab pakke promises hain. Jab bhi aapka mann kare claim karo aur main bina kisi hesitation ke fulfill karunga! 🎟️🫶
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coupons.map((coupon) => {
                    const isRedeemed = redeemedCoupons[coupon.id];
                    return (
                      <div
                        key={coupon.id}
                        className={`relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                          isRedeemed
                            ? 'bg-rose-950/40 border-rose-500/40 opacity-90'
                            : 'glass-card-rose border-rose-500/30 hover:border-rose-400 hover:scale-[1.02]'
                        }`}
                      >
                        {/* Stamp ribbon */}
                        {isRedeemed && (
                          <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow">
                            <Check className="w-3 h-3" />
                            <span>Claimed ❤️</span>
                          </div>
                        )}

                        <div>
                          <div className="text-3xl mb-3">{coupon.icon}</div>
                          <h4 className="font-serif font-bold text-base text-white mb-1.5">{coupon.title}</h4>
                          <p className="text-xs text-rose-200/80 leading-relaxed mb-4">{coupon.desc}</p>
                        </div>

                        <div className="pt-3 border-t border-rose-500/20 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-amber-300 tracking-wider">
                            {coupon.code}
                          </span>
                          <button
                            onClick={() => handleRedeemCoupon(coupon.id)}
                            disabled={isRedeemed}
                            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                              isRedeemed
                                ? 'bg-white/10 text-rose-300/60 cursor-default'
                                : 'bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:scale-105 active:scale-95 shadow-md'
                            }`}
                          >
                            {isRedeemed ? 'Claimed ❤️' : 'Redeem Voucher ✨'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'star' && (
              <div className="glass-card-gold p-6 sm:p-10 rounded-3xl border border-amber-500/30 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
                {/* Background Star Constellation Art */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold mb-4">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Celestial Star Certificate</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-white mb-2">
                  A Star Named "ANIKA"
                </h3>
                <p className="font-cursive text-xl text-amber-200/90 mb-6">
                  "Even in the darkest sky, aap mere aasmaan ka sabse chamakta sitara ho, Anika. ⭐💖✨"
                </p>

                <div className="bg-black/40 border border-amber-500/20 rounded-2xl p-5 mb-6 text-left font-mono text-xs text-rose-100/90 space-y-2">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-amber-300">Star Name:</span>
                    <span className="font-bold text-white">Anika's Eternal Light</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-amber-300">Constellation:</span>
                    <span className="text-white">Lyra (The Harp of Endless Love)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-amber-300">Right Ascension:</span>
                    <span className="text-white">18h 36m 56s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-300">Magnitude / Brightness:</span>
                    <span className="text-white">Kainat ki sabse pyari smile jaisi roshni ✨</span>
                  </div>
                </div>

                <p className="text-xs text-rose-200/90 leading-relaxed font-sans italic max-w-lg mx-auto">
                  "Jab bhi raat ko thoda akela ya sad feel ho, aasmaan ki taraf dekhna aur yaad rakhna ek sitara aapke
                  naam se shine kar raha hai jo har pal batata hai ki how deeply you are loved. 🌌⭐❤️"
                </p>
              </div>
            )}

            {activeTab === 'musicbox' && (
              <div className="glass-card-rose p-6 sm:p-10 rounded-3xl border border-pink-500/30 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-semibold mb-4">
                  <Music className="w-3.5 h-3.5 text-pink-300" />
                  <span>Enchanted Music Box</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-white mb-2">
                  Anika's Sweet Melody
                </h3>
                <p className="font-sans text-xs sm:text-sm text-rose-200/80 mb-8 max-w-md mx-auto">
                  Neeche diye gaye notes ko tap karke sweet crystal chimes suno, ya key ghuma kar poora romantic melody enjoy karo. 🎶✨
                </p>

                {/* Wind-up Key */}
                <div className="flex flex-col items-center mb-8">
                  <button
                    onClick={() => {
                      romanticAudio.playSparkle();
                      const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];
                      chord.forEach((note, i) => {
                        romanticAudio.playMusicBoxTone(note, i * 0.14, 1.8, 0.4);
                      });
                    }}
                    className="group relative p-5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    title="Turn key to play melody"
                  >
                    <Sparkles className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
                  </button>
                  <span className="text-xs text-amber-200/90 font-medium mt-2">
                    Turn Winding Key 🗝️
                  </span>
                </div>

                {/* Chime Piano Keys */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-w-lg mx-auto mb-6">
                  {[
                    { note: 'C', freq: 523.25, name: 'Love ❤️' },
                    { note: 'D', freq: 587.33, name: 'Smile ✨' },
                    { note: 'E', freq: 659.25, name: 'Peace 🕊️' },
                    { note: 'F', freq: 698.46, name: 'Care 🫶' },
                    { note: 'G', freq: 783.99, name: 'Always ⏳' },
                    { note: 'A', freq: 880.00, name: 'Cherish 💖' },
                    { note: 'B', freq: 987.77, name: 'Yours 🌹' },
                  ].map((k) => (
                    <button
                      key={k.note}
                      onClick={() => {
                        romanticAudio.init();
                        romanticAudio.playMusicBoxTone(k.freq, 0, 1.8, 0.45);
                      }}
                      className="p-3 sm:p-4 rounded-2xl glass-panel border border-pink-400/30 hover:border-amber-300 hover:bg-pink-500/30 active:scale-90 transition-all flex flex-col items-center shadow-lg group"
                    >
                      <span className="font-serif font-bold text-lg text-white group-hover:text-amber-300">
                        {k.note}
                      </span>
                      <span className="text-[10px] text-pink-200/80 mt-1 whitespace-nowrap">
                        {k.name}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-rose-300/70 italic">
                  "Yeh har ek note sirf aapke cute face par muskaan laane ke liye tune kiya hai. 🎵💗"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
