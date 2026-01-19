import React, { useState, useEffect } from "react";
import { FaHome, FaUsers, FaCog, FaBars, FaArrowLeft } from "react-icons/fa";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardCharts from "../components/DashboardChart";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ fullName: string; email: string; isAdmin?: boolean } | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Contacts", icon: <FaUsers /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  useEffect(() => {
    const loggedAdmin = localStorage.getItem("loggedInAdmin");
    if (!loggedAdmin) {
      navigate("/dashboard-login");
      return;
    }
    const parsedAdmin = JSON.parse(loggedAdmin);
    setUser(parsedAdmin);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setAllUsers(users);

    const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setContacts(savedContacts);

    setTimeout(() => setLoading(false), 800);
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedInAdmin");
        Swal.fire("Logged Out!", "You have been logged out.", "success").then(() => {
          navigate("/");
        });
      }
    });
  };

  const handleDeleteUser = (index: number, type: "users" | "contacts") => {
    Swal.fire({
      title: "Are you sure?",
      text: "This entry will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === "users") {
          const updated = [...allUsers];
          updated.splice(index, 1);
          setAllUsers(updated);
          localStorage.setItem("users", JSON.stringify(updated));
        } else {
          const updated = [...contacts];
          updated.splice(index, 1);
          setContacts(updated);
          localStorage.setItem("contacts", JSON.stringify(updated));
        }
        Swal.fire("Deleted!", "Entry has been deleted.", "success");
      }
    });
  };

  const showFullMessage = (message: string) => {
    Swal.fire({
      title: "Full Message",
      text: message,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} bg-gray-900 transition-all duration-300 flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isSidebarOpen && <h1 className="text-xl font-bold text-teal-400">Dashboard</h1>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-teal-400 text-2xl">
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 p-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 w-full p-3 rounded hover:bg-gray-800 transition ${
                activePage === item.name ? "bg-gray-800 text-teal-400" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        {user && (
          <div className="p-4 border-t border-gray-700">
            <p className="text-teal-400 font-semibold truncate">{user.fullName}</p>
            <button
              onClick={handleLogout}
              className="mt-2 w-full py-2 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-teal-400">Welcome, {user?.fullName}!</h2>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 rounded text-red-400 hover:text-red-500 transition"
            >
              <FaArrowLeft /> Back to Home
            </button>
          </div>
        </div>

        {/* Home Page */}
        {activePage === "Home" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-6 rounded-xl shadow-lg">
                <h4 className="text-white/80">Total Users</h4>
                <p className="text-3xl font-bold text-white">{allUsers.length}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-xl shadow-lg">
                <h4 className="text-white/80">Admin</h4>
                <p className="text-3xl font-bold text-white">1</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-xl shadow-lg">
                <h4 className="text-white/80">System</h4>
                <p className="text-3xl font-bold text-white">Online</p>
              </div>
            </div>

            <DashboardCharts totalUsers={allUsers.length} />
          </div>
        )}

        {/* Users Page */}
        {activePage === "Users" && (
          <div className="overflow-auto mt-4">
            <table className="min-w-full border border-gray-700">
              <thead className="bg-gray-800 text-teal-400">
                <tr>
                  <th className="py-2 px-4">Full Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Password</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u, idx) => (
                  <tr key={idx} className="text-center even:bg-gray-900 odd:bg-gray-800">
                    <td className="py-2 px-4">{u.fullName}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.password}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteUser(idx, "users")}
                        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contacts Page */}
        {activePage === "Contacts" && (
          <div className="overflow-auto mt-4">
            <h3 className="text-xl font-bold mb-4 text-teal-400">Saved Contacts</h3>
            <table className="min-w-full border border-gray-700">
              <thead className="bg-gray-800 text-teal-400">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">City</th>
                  <th className="py-2 px-4">Message</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-red-400">
                      No contact data found!
                    </td>
                  </tr>
                ) : (
                  contacts.map((c, idx) => {
                    const messageWords = c.message.split(" ");
                    const preview = messageWords.slice(0, 4).join(" ");

                    return (
                      <tr key={idx} className="text-center even:bg-gray-900 odd:bg-gray-800">
                        <td className="py-2 px-4">{c.name}</td>
                        <td className="py-2 px-4">{c.email}</td>
                        <td className="py-2 px-4">{c.city || "-"}</td>
                        <td className="py-2 px-4">
                          {preview + (messageWords.length > 4 ? "..." : "")}
                          {messageWords.length > 4 && (
                            <button
                              onClick={() => showFullMessage(c.message)}
                              className="ml-2 text-teal-400 hover:underline text-sm"
                            >
                              Read more
                            </button>
                          )}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleDeleteUser(idx, "contacts")}
                            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Settings Page */}
        {activePage === "Settings" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-teal-400">Admin Settings</h3>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-white font-semibold mb-2">System</h4>
              <p>Total Users: {allUsers.length}</p>
              <p>Total Contacts: {contacts.length}</p>
              <button
                onClick={() => {
                  if (allUsers.length === 0 && contacts.length === 0) {
                    Swal.fire("No Data!", "There is no user or contact data to reset.", "info");
                    return;
                  }

                  Swal.fire({
                    title: "Are you sure?",
                    text: "This will clear all users and contacts!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#e3342f",
                    cancelButtonColor: "#6b7280",
                    confirmButtonText: "Yes, reset!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      localStorage.removeItem("users");
                      localStorage.removeItem("contacts");
                      setAllUsers([]);
                      setContacts([]);
                      Swal.fire("Reset!", "All user and contact data cleared.", "success");
                    }
                  });
                }}
                className="mt-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
              >
                Reset Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
