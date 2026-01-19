import React, { useEffect, useRef, useState } from "react";

const Second: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="aboutus"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .slideLeft {
          animation: slideLeft 1s ease forwards;
        }

        .slideRight {
          animation: slideRight 1s ease forwards;
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">

        {/* Image */}
        <div
          className={`md:mt-0 flex justify-center transition-all duration-1000 ${
            visible ? "slideRight opacity-100" : "opacity-0"
          }`}
        >
          <img
            src="public/watch-png-25017.png"
            alt="About TimeSphere"
            className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Text */}
        <div
          className={`max-w-lg transition-all duration-1000 ${
            visible ? "slideLeft opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl uppercase font-bold text-black mb-8 text-center md:text-left">
            About Us
          </h2>
          <p className="text-black capitalize text-lg mt-4 leading-relaxed">
            TimeSphere provides the highest quality watches and timepieces for
            watch enthusiasts and collectors. We offer a wide variety of
            styles—from classic analog to modern smartwatches—ensuring the
            perfect fit for everyone.
          </p>
          <p className="text-black capitalize text-lg mt-4 leading-relaxed">
            We are committed to providing our customers with the best possible
            experience, offering competitive prices, fast shipping, and
            excellent customer service.
          </p>
        </div>

      </div>

      <section className="mt-20 w-full border-t border-black"></section>
    </section>
  );
};

export default Second;
