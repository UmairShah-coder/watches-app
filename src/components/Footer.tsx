import React from "react";

const Footer: React.FC = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <footer className="bg-white text-black py-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 border-b border-gray-500/30 pb-8">
        {/* Left: Logo + Description */}
       <div className="md:w-[40%]"> 
  <div className="flex items-center gap-3">
    <img
      className="w-12"
      src="/ChatGPT Image Jan 16, 2026, 01_15_17 AM.png"
      alt="TimeSphere Logo"
    />
    <h2 className="">TimeSphere</h2>
  </div>

  <p className="mt-6 text-md capitalize text-black">
    TimeSphere brings you premium watches curated with style, precision, and luxury. Explore our collection and elevate your wrist game.
  </p>
</div>


        {/* Right: Link Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-6">
          {linkSections.map((section, index) => (
            <div key={index} className="min-w-[120px]">
              <h3 className="font-semibold uppercase mb-3">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-teal-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Copyright */}
      <p className="py-4 text-center text-sm text-gray-500/80">
        &copy; 2026 TimeSphere. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
