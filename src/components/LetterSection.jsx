import React, { useState } from 'react';
import { Mail, Sparkles, Heart, Feather, CheckCircle } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    romanticAudio.playChime();
    setIsOpen(true);
  };

  return (
    <section id="letter" className="relative py-24 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          <span>A Letter From My Heart</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
          A Personal Letter For My baby girl
        </h2>
        <p className="font-sans text-sm sm:text-base text-rose-200/80 max-w-xl mx-auto">
          Kuch baatein text message par adhoori reh jaati hain. Isiliye yeh sab kuch poore dil aur sachhai se likha hai. 💌✨
        </p>
      </div>

      {/* Sealed Envelope State */}
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div
            onClick={handleOpenEnvelope}
            className="group relative cursor-pointer w-full max-w-md bg-[#250b18] border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-amber-400 flex flex-col items-center text-center"
          >
            {/* Ambient envelope glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-600/20 to-amber-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />

            {/* Envelope flap aesthetic */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-300 flex items-center justify-center shadow-2xl mb-6 relative group-hover:rotate-12 transition-transform duration-500">
              {/* Wax Seal Initial */}
              <span className="font-serif font-bold text-3xl text-amber-100 drop-shadow">A</span>
              <Sparkles className="w-4 h-4 text-amber-200 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Sealed With My Heart
            </h3>
            <p className="text-xs text-rose-200/80 mb-6 font-sans">
              Strictly confidential & private. Only for Anika's eyes.
            </p>

            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-all">
              <Mail className="w-4 h-4 text-amber-100" />
              <span>Break Wax Seal & Read</span>
            </button>
          </div>
        </div>
      ) : (
        /* Unfolded Letter Content */
        <div className="relative bg-[#1c0714] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-2xl animate-fadeIn">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 text-amber-400/50 font-serif text-2xl">✤</div>
          <div className="absolute top-4 right-4 text-amber-400/50 font-serif text-2xl">✤</div>
          <div className="absolute bottom-4 left-4 text-amber-400/50 font-serif text-2xl">✤</div>
          <div className="absolute bottom-4 right-4 text-amber-400/50 font-serif text-2xl">✤</div>

          {/* Letter Header */}
          <div className="border-b border-rose-500/20 pb-6 mb-8 text-center">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-mono">
              My Sincere Apology & Promises
            </span>
            <h3 className="font-cursive text-4xl sm:text-5xl text-rose-200 mt-2">
              My Sweetest Anika,
            </h3>
          </div>

          {/* Body paragraphs (Hinglish with romantic emojis) */}
          <div className="space-y-6 text-sm sm:text-base text-rose-100/90 leading-relaxed font-sans">
            <p>
              Mai ye letter isliye likh rha hu merii pyari babuuu kyuki mereko sachme apko aise gussa dekh mera dil ro rha hai me apko kbhi bhii naraz nhi dekh skta apn ap se 
              me raat so nhi paya sachme thori der ankh lagi lekin fir khul gyi kyuki ap mujhse gussa ho or me subha ke 4 baje se isi ke upper kaam kr rha huor ab last me
              ye letter likh rha hu ab subha ke 9:58 ho rhe hai please meriii shona mene jo bhiglti ki hai raat ajne anjane me meko uske liye maaf krdo ab i m so solly babuuu
              and i love youuuuuu sooooo muchhhhhhhhhhhhhhhhhhh
              Aapko thoda sa bhi upset dekh kar mera dil itna heavy ho jaata hai ki I can't even describe in words. 🥺💔
            </p>

            <p>
              
              <strong className="text-white">I am genuinely and truly sorry</strong>. Aapne mujhe hamesha itna pyaar, patience aur respect diya hai,
              aur aap meri taraf se sirf endless happiness aur care deserve karti ho. ❤️🫶
            </p>

            {/* Glowing Accent Quote Box */}
            <div className="my-8 p-6 rounded-2xl glass-card-gold border border-amber-500/30 text-center">
              <p className="font-serif italic text-base sm:text-lg text-amber-100">
                "Aap sirf meri life ka ek part nahi ho, Anika merii pyarii wifey. Aap meri mornings ki sunshine ho, evenings ka peace ho,
                aur woh safe space ho jahan mera heart sabse zyada secure aur happy feel karta hai sirf apke pass hi mujhe sbse jada accha lgta hai. ✨💖"
              </p>
            </div>

            <p>
              Main aapse dil se yeh 4  promises karta hoon:
            </p>

            <ul className="space-y-3.5 pl-2">
              {[
                'Hamesha pehle aapki feeling ko poore attention aur pyaar se sununga, bina judge kiye ya beech mein toke. 🫶',
                'Kabhi bhi apne ego ya stubbornness ko humare relationship ke beech nahi aane dunga. ❤️',
                'Har small everyday moment mein aapko realize karaunga ki aap mere liye kitni precious ho. ✨',
                'Chahe koi bhi disagreement ho, humesha aapka hand hold karke rakhunga because we are always on the same team. 🤝💗',
              ].map((promise, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-rose-200/90">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{promise}</span>
                </li>
              ))}
            </ul>

            <p className="pt-4">
              Duniya ki sabse beautiful person banne ke liye thank you. Main tab tak aapko manata rahunga jab tak aapke cute face par wahi pehle jaisi khilkhilati smile wapas nahi aa jaati. Forever and always yours. 🌹💌
            </p>
          </div>

          {/* Letter Sign-off */}
          <div className="mt-10 pt-6 border-t border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-rose-400 font-semibold">With all my love and heart,</p>
              <p className="font-cursive text-3xl sm:text-4xl text-amber-300">Forever Yours ❤️</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-rose-300/80 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
              >
                Fold Letter Back ✉️
              </button>

              <a
                href="#final"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Answer My Question</span>
                <Heart className="w-3.5 h-3.5 fill-current text-white" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
