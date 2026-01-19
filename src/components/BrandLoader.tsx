// src/components/BrandLoader.tsx
import React, { useEffect, useState } from "react";

interface BrandLoaderProps {
  duration?: number; // duration in ms before auto-hide
}

const BrandLoader: React.FC<BrandLoaderProps> = ({ duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden">
      <style>{`
        @keyframes rotateRingFast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotateRingSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes orbitDot {
          0%, 100% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          50% { transform: rotate(180deg) translateX(80px) rotate(-180deg); }
        }

        @keyframes pulseLogo {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(0,0,0,0.2); }
          50% { box-shadow: 0 0 20px rgba(16,185,129,0.8); }
        }
      `}</style>

      <div className="relative w-44 h-44">
        {/* Rings */}
        <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-[rotateRingFast_1.5s_linear_infinite]"></div>
        <div className="absolute inset-0 border-2 border-teal-400 border-b-transparent rounded-full animate-[rotateRingSlow_3s_linear_infinite]"></div>

        {/* Orbiting Dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-teal-400 rounded-full"
            style={{
              transform: `rotate(${deg}deg) translateX(80px) rotate(-${deg}deg)`,
              animation: `orbitDot 2s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="public/ChatGPT Image Jan 16, 2026, 01_15_17 AM.png"
            alt="Logo"
            className="w-20 h-20 rounded-full animate-[pulseLogo_1.5s_ease-in-out_infinite] shadow-lg animate-[glow_2s_ease-in-out_infinite]"
          />
        </div>

        {/* Tagline */}
        <div className="absolute inset-0 flex items-end justify-center mb-[-40px]">
          <p className="text-teal-400 font-bold uppercase animate-[fadeInUp_1s_ease-out] text-lg md:text-xl">
            TimeSphere
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandLoader;
