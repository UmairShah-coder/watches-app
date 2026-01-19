import React, { useEffect, useRef, useState } from "react";

interface CardProps {
  title: string;
  price: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps & { index: number }> = ({ title, price, description, image, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
  }, []);

  // Determine slide direction based on index
  const slideClass = index % 2 === 0 ? "slide-left" : "slide-right";

  return (
    <div
      ref={cardRef}
      className={`bg-black shadow-sm border border-gray-200 p-2 w-full rounded-lg overflow-hidden mx-auto transform transition-all duration-1000 ${
        visible ? slideClass + " opacity-100" : "opacity-0"
      }`}
    >
      {/* Image */}
      <div className="aspect-[3/2]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Text */}
      <div className="p-4 text-center">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-teal-500 font-semibold">{price}</span>
        </div>
        <section className=" w-full border-t border-gray-200 "></section>
        <p className="mt-2 text-md text-white leading-relaxed">{description}</p>
        <button
          type="button"
          className="mt-4 px-4 py-2.5 w-full rounded-lg text-white text-sm font-medium tracking-wider bg-teal-500 hover:bg-teal-600 transition cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const CardPage: React.FC = () => {
  const cards = [
    { title: "Rolex", price: "$129.99", description: "Elegant stylish watch for any occasion.", image: "/cardd.png" },
    { title: "Patek", price: "$149.99", description: "Premium watch crafted with precision.", image: "/carddd.png" },
    { title: "Philippe", price: "$179.99", description: "Sophisticated timepiece for collectors.", image: "/cards.png" },
    { title: "Omega", price: "$199.99", description: "Modern design meets classic elegance.", image: "/cardss.png" },
    { title: "Casio", price: "$219.99", description: "Timeless watch with premium materials.", image: "/cardsss.png" },
    { title: "Seiko", price: "$239.99", description: "Exclusive design for watch enthusiasts.", image: "/cardssss.png" },
  ];

  return (
    <section className="bg-white min-h-screen py-16 px-6 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .slide-left {
          animation: slideLeft 1s forwards;
        }
        .slide-right {
          animation: slideRight 1s forwards;
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <h2 className="text-4xl font-bold text-center uppercase text-gray-800 mb-12">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            title={card.title}
            price={card.price}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </section>
  );
};

export default CardPage;
