import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingPetals from './components/FloatingPetals';
import HeroSection from './components/HeroSection';
import GiftRevealSection from './components/GiftRevealSection';
import LetterSection from './components/LetterSection';
import FinalScreenSection from './components/FinalScreenSection';

export default function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#090206] text-[#ffe4e6] overflow-x-hidden selection:bg-rose-600 selection:text-white">
      {/* Floating 2D/3D rose petals & stardust background */}
      <FloatingPetals />

      {/* Floating navigation header */}
      <Navbar
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* Main page content sections */}
      <main className="relative z-20">
        <HeroSection
          isMusicPlaying={isMusicPlaying}
          setIsMusicPlaying={setIsMusicPlaying}
        />

        <GiftRevealSection />

        <LetterSection />

        <FinalScreenSection />
      </main>
    </div>
  );
}
