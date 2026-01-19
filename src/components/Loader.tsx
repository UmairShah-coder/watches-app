import React from "react";

const LiquidLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-5 z-50 p-5">
      {/* Loading Text */}
      <div className="text-white text-lg font-semibold tracking-wide animate-[textGlow_2s_ease-in-out_infinite]">
        Loading
        <span className="ml-1 animate-[blink_1.5s_infinite]">.</span>
        <span className="ml-1 animate-[blink_1.5s_0.3s_infinite]">.</span>
        <span className="ml-1 animate-[blink_1.5s_0.6s_infinite]">.</span>
      </div>

      {/* Loader Track */}
      <div className="relative w-[180px] h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[16px] overflow-hidden shadow-inner shadow-black/60 shadow-lg">
        <div
          className="absolute top-0 left-0 h-[calc(100%-4px)] w-1 rounded-[14px]
            animate-[fillProgress_6s_ease-out_forwards] animate-[tealShift_6s_linear_infinite]
            shadow-[0_0_12px_rgba(56,189,248,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)]"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #38bdf8, #0ea5e9)", // teal-300 → teal-400 → teal-500
            backgroundSize: "300% 100%",
          }}
        />
      </div>

      {/* Tailwind Custom Animations */}
      <style>{`
        @keyframes fillProgress {
          0% { width: 4px; }
          100% { width: calc(100% - 4px); } /* full line fill */
        }
        @keyframes tealShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes textGlow {
          0%,100% { opacity: 0.7; text-shadow: 0 0 12px rgba(56,189,248,0.3); }
          50% { opacity: 1; text-shadow: 0 0 24px rgba(56,189,248,0.6); }
        }
        @keyframes blink {
          0%,50% { opacity: 1; }
          51%,100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LiquidLoader;
