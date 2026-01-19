import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔴 Validation: All fields required
    if (!contact.name || !contact.email || !contact.phone || !contact.city || !contact.message) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please fill all fields ⚠️",
        background: "#000", // dark background
    color: "#f1f5f9",      // white text
    confirmButtonColor: "#14B8A6", // teal button
    confirmButtonText: "OK",
      });
      return;
    }

    // Get existing contacts
    const existingContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    existingContacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(existingContacts));

    // SweetAlert
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Your contact info has been saved ",
       background: "#000", // dark background
    color: "#f1f5f9",      // white text
    confirmButtonColor: "#14B8A6", // teal button
    confirmButtonText: "OK",
      showConfirmButton: true,
    });

    // Reset form
    setContact({ name: "", email: "", phone: "", city: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-16 overflow-hidden"
      id="contactUs"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif'; }
        .slideLeft { animation: slideLeft 1s forwards; }
        .slideRight { animation: slideRight 1s forwards; }
        @keyframes slideLeft { 0% { opacity:0; transform: translateX(-80px);} 100% {opacity:1; transform: translateX(0);} }
        @keyframes slideRight { 0% { opacity:0; transform: translateX(80px);} 100% {opacity:1; transform: translateX(0);} }
      `}</style>

      {/* Divider */}
      <section className="w-[1100px] ml-20 border-t border-white"></section>

      <div className="container mx-auto mt-10 px-6 lg:px-20">
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? "slideLeft" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase">Get In Touch</h2>
          <p className="mt-4 text-gray-300 text-lg">
            Fill out the form and we will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg transition-all duration-1000 ${visible ? "slideLeft" : "opacity-0"}`}
          >
            <input
              type="text"
              placeholder="Your Name *"
              name="name"
              value={contact.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <input
              type="email"
              placeholder="Your Email *"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <input
              type="text"
              placeholder="City *"
              name="city"
              value={contact.city}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <textarea
              placeholder="Message *"
              name="message"
              value={contact.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <button className="w-full py-3 mt-2 bg-teal-400 hover:bg-teal-500 rounded-lg font-semibold transition">
              Submit
            </button>
          </form>

          {/* Google Map */}
          <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-1000 ${visible ? "slideRight" : "opacity-0"}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.360888831398!2d74.33695621512179!3d31.46740158144496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903c69f20e8b7%3A0x1a51c30d87d5b1a1!2sThokar%20Niaz%20Baig%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="min-h-[450px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Thokar Niaz Baig Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
