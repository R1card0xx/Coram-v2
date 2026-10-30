import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 400);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#347A6B] transition-opacity duration-400 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Decorative concentric arcs exactly as in the PDF mockups */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full border-4 border-white/20" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full border-4 border-white/10" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full border-4 border-white/20" />
      <div className="pointer-events-none absolute -bottom-52 -left-52 h-[520px] w-[520px] rounded-full border-4 border-white/10" />

      {/* Center Branding */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-5xl font-black tracking-tight text-white">Coram</span>
          <span className="text-3xl font-bold text-white/90 -mt-3">+</span>
        </div>
        {/* Wavy line underneath */}
        <svg
          className="mt-2 h-4 w-32 text-emerald-200/80"
          viewBox="0 0 100 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          <path d="M 0,10 Q 12.5,2 25,10 T 50,10 T 75,10 T 100,10" />
        </svg>
        <p className="mt-4 text-sm font-light tracking-wide text-white/80">Cuidado e autonomia</p>
      </div>
    </div>
  );
};
