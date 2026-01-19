import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in as admin → go to dashboard
  useEffect(() => {
    const loggedAdmin = localStorage.getItem("loggedInAdmin");
    if (loggedAdmin) {
      navigate("/dashboard"); // already logged in admin
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Oops!", "Fill all fields", "warning");
      return;
    }

    // Admin credentials
    if (email === "admin@admin.com" && password === "admin@admin.com") {
      const adminData = {
        fullName: "Admin",
        email: "admin@admin.com",
        isAdmin: true,
      };

      // Use separate key for admin
      localStorage.setItem("loggedInAdmin", JSON.stringify(adminData));

      await Swal.fire("Welcome Admin!", "Dashboard unlocked", "success");
      navigate("/dashboard");
    } else {
      Swal.fire("Access Denied", "Only admin can login here", "error");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl text-teal-400 font-bold text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          />

          <button
            type="submit"
            className="w-full py-3 text-white bg-teal-500 rounded font-semibold hover:bg-teal-600 transition"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardLogin;
