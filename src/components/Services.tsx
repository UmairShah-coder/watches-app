import React, { useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

const servicesData: ServiceCardProps[] = [
  {
    title: "Luxury Watches",
    description:
      "Explore our collection of luxury watches with exquisite design and premium quality.",
    image: "/watch-png-25016.png",
  },
  {
    title: "Sport Watches",
    description:
      "Durable and stylish sport watches perfect for outdoor adventures and fitness tracking.",
    image: "/watch-png-25022.png",
  },
  {
    title: "Smart Watches",
    description:
      "Stay connected with our smart watches featuring notifications, fitness tracking, and more.",
    image: "/—Pngtree—smart watch_18709855.png",
  },
  {
    title: "Vintage Collection",
    description:
      "Classic vintage watches that never go out of style. Perfect for collectors and enthusiasts.",
    image: "/watch-18713.png",
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-black overflow-hidden" id="services">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .fadeUp {
          animation: fadeUp 0.8s ease forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <h2
        className={`text-3xl md:text-4xl text-white font-bold text-center mb-12 uppercase ${
          visible ? "fadeUp" : "opacity-0"
        }`}
      >
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {servicesData.map((service, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 0.2}s` }}
            className={`bg-black  shadow-sm hover:border-teal-500 border border-gray-200 p-2 w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4 ${
              visible ? "fadeUp" : "opacity-0"
            }`}
          >
            {/* Image */}
            <div className="aspect-[2/2] overflow-hidden rounded-lg">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[300px]  object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Text */}
            <div className="p-4 capitalize text-center">
              <h3 className="text-xl text-teal-500 font-bold">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-white leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
