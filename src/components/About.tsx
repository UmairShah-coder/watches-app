import React from "react";

const About: React.FC = () => {
  return (
    
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8" id="aboutus">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Text */}
       

        {/* Image */}
        <div className=" md:mt-0">
          <img
            src="public/watch-png-25017.png"
            alt="About TimeSphere"
            className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-contain"
          />
        </div>
         <div className="max-w-lg">
          <h2 className="text-3xl uppercase font-bold text-black mb-8 text-center md:text-left">
            About Us
          </h2>
          <p className="text-black capitalize text-lg mt-4">
            TimeSphere provides the highest quality watches and timepieces for
            watch enthusiasts and collectors. We offer a wide variety of
            styles—from classic analog to modern smartwatches—ensuring the
            perfect fit for everyone. Our mission is to combine elegance with
            precision.
          </p>
          <p className="text-black capitalize text-lg mt-4">
            We are committed to providing our customers with the best possible
            experience, offering competitive prices, fast shipping, and
            excellent customer service. Whether you're looking for a gift or
            a personal treasure, TimeSphere has the perfect timepiece for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
