import React, { useState } from 'react';
import { Heart, Sparkles, ArrowDown } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function HeroSection({ isMusicPlaying, setIsMusicPlaying }) {
  const [heartbeatActive, setHeartbeatActive] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const handleHeartbeatClick = () => {
    romanticAudio.playHeartBeat();
    setHeartbeatActive(true);
    setHeartCount((prev) => prev + 1);
    setTimeout(() => setHeartbeatActive(false), 900);
  };

  const startMusic = () => {
    if (!isMusicPlaying) {
      const playing = romanticAudio.toggleMusic();
      setIsMusicPlaying(playing);
      romanticAudio.playChime();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Soft Romantic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-20 flex flex-col items-center">
        {/* Floating Apology Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-500/30 mb-8 animate-float-slow shadow-lg">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs uppercase tracking-widest text-rose-200 font-medium">
            Dedicated From The Depths of My Heart
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-4 leading-none">
          <span className="bg-gradient-to-r from-rose-200 via-rose-100 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
            ANIKA
          </span>
        </h1>

        <p className="font-cursive text-2xl sm:text-3xl md:text-4xl text-rose-300/90 mb-6 drop-shadow">
          A Little World Made Just For You
        </p>

        {/* Emotional Apology Statement (Natural Roman Hinglish with Romantic Emojis) */}
        <div className="max-w-2xl px-6 py-6 rounded-3xl glass-card-rose border border-rose-500/25 mb-10 shadow-2xl backdrop-blur-xl">
          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-sans mb-3">
            "Jaanuu ji mujhe sach mein nahi pata ki aap mujhse kyun naraz ho lekin agar meri kisi baat se aapko bura laga hai toh I'm genuinely sorry. Main kabhi nahi chahta ki meri wajah se aapka mood kharab ho. Meri poori duniya sirf aapki smile se roshan hoti hai... please maan jao na me apse bhot jada pyar krta hu jaanuuu? ❤️🥺🫶"
          </p>
          <p className="text-xs sm:text-sm text-amber-200/90 font-serif italic">
            — Hamesha wahi insaan banne ki koshish karunga jo aapke chehre par hamesha khushi aur smile la sake. 🌹✨
          </p>
        </div>

        {/* Interactive Centerpiece: Interactive Heartbeat Button */}
        <div className="flex flex-col items-center mb-10">
          <button
            onClick={handleHeartbeatClick}
            className={`relative group p-6 rounded-full glass-card-gold border border-amber-500/30 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl cursor-pointer ${
              heartbeatActive ? 'scale-110 ring-4 ring-rose-500/60' : ''
            }`}
            title="Tap to feel my heartbeat for you"
          >
            {/* Ripple rings on click */}
            {heartbeatActive && (
              <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping pointer-events-none" />
            )}
            <Heart
              className={`w-12 h-12 text-rose-500 fill-rose-500 transition-transform duration-300 ${
                heartbeatActive ? 'scale-125' : 'group-hover:scale-110'
              }`}
            />
          </button>
          <span className="text-xs text-rose-300/80 mt-2.5 font-medium flex items-center gap-1.5">
            Tap the heart to feel it beat for you
            {heartCount > 0 && <span className="text-amber-300 font-bold">({heartCount} times)</span>}
          </span>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#gifts"
            onClick={startMusic}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-crimson to-amber-500 text-white font-semibold text-sm shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Go To Your Gifts</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </a>

          <a
            href="#letter"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full glass-panel border border-rose-400/30 text-rose-100 hover:text-white font-medium text-sm hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Read My Letter</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 text-rose-300/60">
          <span className="text-[11px] uppercase tracking-widest font-medium">Scroll down to explore your world</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-rose-400" />
        </div>
      </div>
    </section>
  );
}
