import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

import AboutPage from "./pages/second";
import CardPage from "./pages/Card";
import ContactPage from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLogin from "./pages/DashboardLogin"; // ✅ Admin login

const Home: React.FC = () => (
  <>
    <Hero />
    <AboutPage />
    <Services />
    <WhyUs />
    <Gallery />
    <ContactPage />
  </>
);

const App: React.FC = () => (
  <Router>
    <Routes>
      {/* Pages with Navbar & Footer */}
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
      <Route path="/card" element={<><Navbar /><CardPage /><Footer /></>} />
      <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />

      {/* Dashboard WITHOUT Navbar & Footer */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard-login" element={<DashboardLogin />} />
    </Routes>
  </Router>
);

export default App;
