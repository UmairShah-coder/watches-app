import React, { useRef, useEffect, useState } from "react";

interface CardData {
  image: string;
  title: string;
  description: string;
  date: string;
}

const cardsData: CardData[] = [
  { image: "/watch-18640.png", title: "Luxury Watches", description: "Durable, stylish, and perfect for sports and outdoor adventures.", date: "Jan 10, 2026" },
  { image: "/service.png", title: "Sport Watches", description: "Durable, stylish, and perfect for sports and outdoor adventures.", date: "Feb 15, 2026" },
  { image: "/watch-18710.png", title: "Smart Watches", description: "Durable, stylish, and perfect for sports and outdoor adventures.", date: "Mar 20, 2026" },
  { image: "/watch-18687.png", title: "Vintage Collection", description: "Durable, stylish, and perfect for sports and outdoor adventures.", date: "Apr 25, 2026" },
];

const CreateCard: React.FC<{ card: CardData }> = ({ card }) => (
  <div className="p-4 rounded-lg mx-4 shadow-lg hover:shadow-2xl hover:border-teal-500 transition-all duration-300 w-72 shrink-0 bg-black border text-white">
    <div className="aspect-[3/2] rounded-lg overflow-hidden">
      <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
    </div>
    <div className="p-4 text-center">
      <h3 className="text-xl text-teal-500 uppercase font-semibold mb-2">{card.title}</h3>
      <p className="text-sm text-white leading-relaxed">{card.description}</p>
      <button className="mt-4 px-4 py-2 w-full rounded-lg text-white text-sm font-medium bg-teal-600 hover:bg-teal-500 transition-all duration-300">
        Learn More
      </button>
      <p className="mt-2 text-md capitalize text-gray-400">{card.date}</p>
    </div>
  </div>
);

const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // animation once
        }
      },
      { threshold: 0.2 } // 20% visible triggers animation
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section className="py-12 bg-black overflow-hidden" ref={sectionRef}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 uppercase text-white">
        Why Choose Our Watches
      </h2>

      <div
        className={`marquee-row w-full mx-auto max-w-6xl overflow-hidden relative transition-transform duration-1000 ${
          visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
        }`}
      >
        {/* Gradient edges */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>

        {/* Marquee content */}
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-6 pb-6 animate-marquee hover:pause">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marqueeScroll 25s linear infinite;
        }
        .pause:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

export default WhyUs;
