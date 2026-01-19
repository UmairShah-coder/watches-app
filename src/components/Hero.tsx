import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full border-t border-gray-200 h-[400px] md:h-[500px] bg-black overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .hero-text {
          animation: slideLeft 1s ease forwards;
        }

        .hero-img {
          animation: float 3s ease-in-out infinite;
        }

        .hero-btn {
          position: relative;
          overflow: hidden;
        }

        .hero-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }

        .hero-btn:hover::after {
          transform: translateX(0);
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-20">
        
        {/* Left: Text */}
        <div className="md:w-1/2 text-left hero-text">
          <h1 className="text-4xl md:text-5xl capitalize font-extrabold mb-4 tracking-tight text-white">
            Experience Timeless Elegance
          </h1>

          <p className="text-lg w-[700px] capitalize md:text-xl mb-6 text-gray-300">
            Discover our curated collection of luxury watches, crafted with precision and style for every occasion. Elevate your look with a timepiece that defines your personality.
          </p>

          <a
            href="#products"
            className="hero-btn inline-block px-8 py-3 bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-xl capitalize transition-all duration-300 hover:scale-105"
          >
            Shop Now
          </a>
        </div>

        {/* Right: Watch Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end animate-[slideRight_1s_ease_forwards]">
          <img
            src="/banner.png"
            alt="Luxury Watch"
            className="w-80 md:w-[320px] object-contain hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
