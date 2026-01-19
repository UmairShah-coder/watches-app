import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Loader import
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  // Check if already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (loggedIn) navigate("/"); // redirect to home
  }, [navigate]);

  // SweetAlert config function
  const swalConfig = (title: string, text: string, icon: any) => ({
    title,
    text,
    icon,
    background: "#000",        // dark background
    color: "#f1f5f9",             // white text
    confirmButtonColor: "#14b8a6",// teal confirm button
    confirmButtonText: "OK",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      await Swal.fire(swalConfig("Oops!", "Please enter username/email and password", "warning"));
      return;
    }

    setLoading(true); // show loader

    setTimeout(async () => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(
        (u: { fullName: string; email: string; password: string }) =>
          u.email === username || u.fullName === username
      );

      if (!user || user.password !== password) {
        setLoading(false);
        await Swal.fire(swalConfig("Oops!", "Invalid username/email or password", "error"));
        return;
      }

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ fullName: user.fullName, email: user.email, isAdmin: false })
      );

      setLoading(false);
      navigate("/"); // login success → home
    }, 1500); // simulate 1.5s async delay
  };

  // Show loader overlay if loading
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT BRANDING */}
        <div className="flex flex-col items-start justify-center">
          <img src="/logo.png" className="w-24 mb-4" alt="Logo" />
          <h1 className="text-4xl font-extrabold text-teal-400">TimeSphere</h1>
          <p className="text-gray-400 mt-4 max-w-md">
            Welcome back! Sign in to continue your journey.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex justify-end">
          <div className="w-full max-w-md p-8 rounded-3xl bg-gray-900 border border-gray-800 shadow-xl">
            <h2 className="text-teal-400 text-center text-3xl font-bold mb-8">Sign In</h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                className="w-full py-3 rounded-xl text-white text-lg font-semibold 
                  bg-gradient-to-r from-teal-400 to-teal-600
                  transition-all duration-300 ease-in-out
                  hover:scale-[1.03] hover:shadow-xl hover:from-teal-500 hover:to-teal-700
                  active:scale-[0.97]"
              >
                Login
              </button>
              <p className="text-gray-400 text-center">
                Don’t have an account?{" "}
                <Link to="/register" className="text-teal-400 hover:underline font-semibold">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
