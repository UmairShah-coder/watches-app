import React, { useRef, useEffect, useState } from "react";

const galleryItems = [
  { image: "/pngimg.com - watches_PNG9854.png", alt: "Watch 1" },
  { image: "/pngimg.com - watches_PNG101425.png", alt: "Watch 2" },
  { image: "/pngimg.com - watches_PNG101449.png", alt: "Watch 3" },
  { image: "/pngimg.com - watches_PNG101452.png", alt: "Watch 4" },
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden" id="gallery" ref={sectionRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Title */}
      <h1 className={`text-3xl md:text-4xl text-black font-semibold text-center uppercase transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        Our Latest Creations
      </h1>
      <p className={`text-md text-gray-700 text-center mt-2 max-w-xl mx-auto transition-all duration-1000 delay-200 ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        A visual collection of our most recent watches - crafted with precision, style, and luxury.
      </p>

      {/* Gallery Items */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className={`relative w-64 h-64 rounded-lg overflow-hidden shadow-lg transition-transform duration-500 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }} // staggered animation
          >
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
