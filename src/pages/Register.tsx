import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      Swal.fire("Oops!", "Please fill all fields", "warning");
      return;
    }

    // Get existing users array or empty
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check duplicate email
    const duplicate = users.find((u: { email: string }) => u.email === email);
    if (duplicate) {
      await Swal.fire(
        "Oops!",
        "An account with this email already exists. Please login.",
        "error"
      );
      navigate("/login");
      return;
    }

    // Save new user
    const userData = { fullName, email, password };
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    await Swal.fire(
      "Success!",
      "Account created successfully! Please login.",
      "success"
    );

    navigate("/login");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6">
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

     
      `}</style>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT BRANDING */}
        <div className="flex flex-col items-start justify-center">
          <img
            src="/ChatGPT Image Jan 16, 2026, 01_15_17 AM.png"
            className="w-24 mb-4"
            alt="TimeSphere Logo"
          />
          <h1 className="text-4xl font-extrabold text-teal-400">TimeSphere</h1>
          <p className="text-gray-400 mt-4 max-w-md">
            Create your account and join us today.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex justify-end">
          <div className="w-full max-w-md p-8 rounded-3xl bg-gray-900 border border-gray-800 shadow-xl">
            <h2 className="text-teal-400 text-center text-3xl font-bold mb-8">
              Register
            </h2>

            <form className="space-y-6" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
              >
                Create Account
              </button>

              <p className="text-gray-400 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-teal-400 hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
