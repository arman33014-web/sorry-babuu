import React from 'react';
import { Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function Navbar({ isMusicPlaying, setIsMusicPlaying }) {
  const toggleMusic = () => {
    const playing = romanticAudio.toggleMusic();
    setIsMusicPlaying(playing);
    if (playing) {
      romanticAudio.playChime();
    }
  };

  const navItems = [
    { label: 'Apology', href: '#hero' },
    { label: 'Your Gifts', href: '#gifts' },
    { label: 'Special Letter', href: '#letter' },
    { label: 'Forgive Me?', href: '#final' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-full glass-panel shadow-2xl border border-rose-500/20 backdrop-blur-xl">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-white flex items-center gap-1.5">
              ANIKA
              <Sparkles className="w-3.5 h-3.5 text-amber-300 inline" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-rose-300/80 -mt-1 font-medium">
              My Whole World
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-wider text-rose-200/80 hover:text-white hover:text-glow-rose transition-colors font-medium py-1 px-2 rounded-lg hover:bg-rose-500/10"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleMusic}
            title={isMusicPlaying ? 'Mute romantic melody' : 'Play romantic melody'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-md ${
              isMusicPlaying
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-600/40'
                : 'bg-white/10 text-rose-200 hover:bg-white/20'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-200 animate-pulse" />
                <span className="hidden sm:inline">Playing Melody</span>
                {/* Dancing audio wave bars */}
                <div className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 bg-amber-200 h-2 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                  <span className="w-0.5 bg-amber-200 h-3 animate-[pulse_0.4s_ease-in-out_infinite_0.1s]"></span>
                  <span className="w-0.5 bg-amber-200 h-1.5 animate-[pulse_0.7s_ease-in-out_infinite_0.2s]"></span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-300" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          <a
            href="#final"
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
          >
            <span>Forgive Me</span>
            <Heart className="w-3.5 h-3.5 fill-current" />
          </a>
        </div>
      </div>
    </header>
  );
}
