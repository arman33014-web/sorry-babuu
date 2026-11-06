import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send, PartyPopper, Flame } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function FinalScreenSection() {
  const [isForgiven, setIsForgiven] = useState(false);
  const [runawayStep, setRunawayStep] = useState(0);
  const [wishInput, setWishInput] = useState('');
  const [releasedLanterns, setReleasedLanterns] = useState([
    { id: 1, text: 'Anika ke face par hamesha aisi hi pyaari smile rahe ✨💖', x: 20 },
    { id: 2, text: 'Kabhi bhi ek doosre se upset hokar nahi sona ❤️🥺', x: 70 },
  ]);

  const runawayMessages = [
    'Still thinking... 🤔',
    'Pakka gussa ho abhi bhi? 🥺',
    'What if main aapki favorite ice cream le aaun? 🍦',
    'Look at the 3D teddy, he is so sad! 🧸',
    'Unlimited forehead kisses guaranteed! 💋',
    'Main poore month saara house chores karunga! 🥺✨',
    'Acha ab itna bhao mat khao, maan jao na please! 🫂❤️',
  ];

  const handleForgive = () => {
    setIsForgiven(true);
    romanticAudio.playChime();
    romanticAudio.playSparkle();

    // Grand cinematic fireworks burst using canvas-confetti
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);

      // Fireworks from left and right edges
      confetti({
        particleCount,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#e11d48', '#f59e0b', '#f43f5e', '#fde047', '#ffffff'],
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#e11d48', '#f59e0b', '#f43f5e', '#fde047', '#ffffff'],
      });
    }, 280);
  };

  const handleRunawayHover = () => {
    if (runawayStep < runawayMessages.length - 1) {
      setRunawayStep((prev) => prev + 1);
    }
  };

  const handleReleaseLantern = (e) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    romanticAudio.playSparkle();
    const newLantern = {
      id: Date.now(),
      text: wishInput.trim(),
      x: Math.random() * 70 + 15,
    };

    setReleasedLanterns((prev) => [...prev, newLantern]);
    setWishInput('');
  };

  return (
    <section id="final" className="relative py-28 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-600/20 via-pink-600/15 to-amber-500/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sky Lanterns Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {releasedLanterns.map((lantern) => (
          <div
            key={lantern.id}
            style={{ left: `${lantern.x}%` }}
            className="absolute bottom-10 animate-[float_14s_linear_infinite] flex flex-col items-center opacity-85"
          >
            {/* Glowing Lantern */}
            <div className="w-10 h-14 rounded-md bg-gradient-to-t from-amber-500 via-orange-400 to-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.8)] flex flex-col items-center justify-end p-1 border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-900 animate-pulse" />
            </div>
            <span className="text-[10px] text-amber-200/90 bg-black/60 px-2 py-0.5 rounded-full mt-1.5 whitespace-nowrap border border-amber-500/30">
              {lantern.text}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-20 text-center flex flex-col items-center">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-ping" />
          <span>The Most Important Question</span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Will You Forgive Me,{' '}
          <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-amber-300 bg-clip-text text-transparent drop-shadow">
            Anika?
          </span>
        </h2>

        <p className="font-cursive text-2xl sm:text-3xl text-rose-200/90 mb-10 max-w-xl">
          "I promise ki main har din aapko smile karane aur dher saara pyaar dene mein laga dunga. ❤️🥺🫶"
        </p>

        {/* Interactive Choice Buttons */}
        {!isForgiven ? (
          <div className="flex flex-wrap items-center justify-center gap-5 my-6">
            {/* BIG GLOWING YES BUTTON */}
            <button
              onClick={handleForgive}
              className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-rose-600 via-crimson to-amber-500 text-white font-bold text-lg sm:text-xl shadow-[0_0_40px_rgba(225,29,72,0.6)] hover:shadow-[0_0_60px_rgba(225,29,72,0.9)] hover:scale-108 active:scale-95 transition-all duration-300 flex items-center gap-3"
            >
              <Heart className="w-6 h-6 text-white fill-white group-hover:scale-125 transition-transform animate-pulse" />
              <span>Yes, I Forgive You ❤️</span>
              <Sparkles className="w-5 h-5 text-amber-200" />
            </button>

            {/* CUTE RUNAWAY BUTTON */}
            {runawayStep < runawayMessages.length - 1 ? (
              <button
                onMouseEnter={handleRunawayHover}
                onClick={handleRunawayHover}
                className="px-6 py-4 rounded-full glass-panel border border-white/20 text-rose-200 text-sm font-medium hover:bg-white/10 transition-all duration-200"
              >
                <span>{runawayMessages[runawayStep]}</span>
              </button>
            ) : (
              /* Transformed final button */
              <button
                onClick={handleForgive}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Okay fine, give me a warm tight hug first! 🫂❤️</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>
            )}
          </div>
        ) : (
          /* Forgiven Climax Display */
          <div className="w-full max-w-xl mx-auto glass-card-gold p-8 sm:p-10 rounded-3xl border-2 border-amber-400/50 text-center shadow-2xl animate-fadeIn my-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 mx-auto flex items-center justify-center shadow-xl mb-6">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
              Officially Forgiven & Cherished
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
              You Made Me The Happiest Person in The Universe! 💖🎉
            </h3>

            <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-sans mb-6">
              Itna bada, gentle aur forgiving heart hone ke liye thank you meri Anika.
              Main shayad itna deserving na hoon, lekin I promise to spend every single day making sure you know how important you are in my life. 🫶❤️✨
            </p>

            <div className="bg-black/50 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-around text-xs text-amber-200">
              <div className="flex flex-col items-center">
                <span className="font-bold text-white text-base">Infinite</span>
                <span className="text-rose-300">Love Rating 💖</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-white text-base">Always</span>
                <span className="text-rose-300">My Top Priority 👑</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-white text-base">100%</span>
                <span className="text-rose-300">Smile Guarantee 😊</span>
              </div>
            </div>
          </div>
        )}

        {/* Release a Floating Sky Lantern Interactive Feature */}
        <div className="mt-16 w-full max-w-lg glass-panel p-6 rounded-3xl border border-rose-500/25">
          <div className="flex items-center gap-2 justify-center mb-2 text-amber-300 text-sm font-semibold">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Release a Wish Lantern For Our Future 🏮</span>
          </div>
          <p className="text-xs text-rose-200/80 mb-4">
            Koi pyaari si dua ya sweet thought type karo aur use night sky mein float hone do. ✨
          </p>

          <form onSubmit={handleReleaseLantern} className="flex gap-2">
            <input
              type="text"
              value={wishInput}
              onChange={(e) => setWishInput(e.target.value)}
              placeholder="e.g. Hamesha aise hi saath mein smile karte rahein..."
              className="flex-1 bg-black/40 border border-rose-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-rose-300/40 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Release Lantern</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Closing Footer */}
        <div className="mt-20 pt-8 border-t border-rose-500/20 text-center text-xs text-rose-300/60 w-full space-y-2">
          <p className="font-serif italic text-rose-200">
            "ANIKA — A Little World Made Just For You"
          </p>
          <p className="text-[11px]">
            Hand-crafted with all my love, devotion, and sincerity. Forever yours. ❤️✨
          </p>
        </div>
      </div>
    </section>
  );
}
