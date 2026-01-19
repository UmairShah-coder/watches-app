import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullName: string; email: string; isAdmin?: boolean } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load logged-in user
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (loggedIn) setUser(JSON.parse(loggedIn));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (!user) {
      navigate("/login"); // Not logged in → login page
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedInUser");
        setUser(null);
        setShowDropdown(false);
        Swal.fire("Logged Out!", "You have been logged out.", "success").then(() => {
          navigate("/"); // redirect home
        });
      }
    });
  };

  return (
    <header className="bg-black shadow-md w-full animate-navbar relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 2px;
          background: #2dd4bf;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .animate-navbar { animation: fadeDown 0.8s ease forwards; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <div className="flex mt-5 items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 transition-transform duration-300 hover:scale-110"
          />
          <p className="text-white font-semibold tracking-wide">TimeSphere</p>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 mt-5 mr-24 mx-10 relative max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 bg-black rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 text-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Right: Icons */}
        <div className="flex mt-5 items-center text-white space-x-6 text-xl relative">
          <div className="relative" ref={dropdownRef}>
            <FaUser
              className="cursor-pointer hover:text-teal-400 hover:scale-110 transition-all duration-200"
              onClick={handleUserClick}
            />
            {/* Dropdown */}
            {showDropdown && user && (
              <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 text-sm">
                <p className="px-4 py-2 text-teal-400 font-semibold truncate">{user.fullName}</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <FaHeart className="cursor-pointer hover:text-teal-400 hover:scale-110 transition-all duration-200" />
          <FaShoppingCart className="cursor-pointer hover:text-teal-400 hover:scale-110 transition-all duration-200" />
        </div>
      </div>

      {/* Links */}
      <div className="bg-black mt-5  w-full">
        <nav className="flex justify-center space-x-10 py-3 font-semibold uppercase text-white tracking-wide">
          <NavLink to="/" className="nav-link hover:text-teal-400 transition-colors">Home</NavLink>
          <NavLink to="/about" className="nav-link hover:text-teal-400 transition-colors">About</NavLink>
          <NavLink to="/card" className="nav-link hover:text-teal-400 transition-colors">Card</NavLink>
          <NavLink to="/contact" className="nav-link hover:text-teal-400 transition-colors">Contact</NavLink>
      <NavLink
  to={
    user?.isAdmin
      ? "/dashboard"
      : "/dashboard-login"
  }
  className="nav-link hover:text-teal-400 transition-colors"
  onClick={(e) => {
    if (user && !user.isAdmin) {
      e.preventDefault();
      navigate("/dashboard-login");
    }
  }}
>
  Dashboard
</NavLink>



        </nav>
      </div>
    </header>
  );
};

export default Navbar;
