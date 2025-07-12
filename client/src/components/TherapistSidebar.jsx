// src/components/TherapistSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const TherapistSidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 p-6 flex flex-col justify-between bg-[#A8DADC] text-[#1D3557]">
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">👨‍⚕ Therapist Panel</h2>
        <nav className="space-y-4 font-medium">
          <Link to="/therapist-dashboard" className="block hover:text-white transition">🩺 Dashboard</Link>
          <Link to="/therapist-meeting" className="block hover:text-white transition">📹 Meeting</Link>
          <Link to="/therapist-patient-records" className="block hover:text-white transition">📁 Patient Records</Link>
        </nav>
      </div>

      <button onClick={handleLogout} className="text-red-700 hover:text-white">
        🚪 Logout
      </button>
    </aside>
  );
};

export default TherapistSidebar;