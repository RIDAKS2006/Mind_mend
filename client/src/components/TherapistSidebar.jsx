// src/components/TherapistSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const TherapistSidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 h-screen bg-[#A8DADC] p-6 flex flex-col justify-between text-[#1D3557]">
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">👨‍⚕ Therapist Panel</h2>
        <nav className="space-y-4 text-base font-medium">
          <Link to="/therapist-dashboard" className="flex items-center gap-2 hover:text-white">
            📊 Dashboard
          </Link>
          <Link to="/therapist-appointments" className="flex items-center gap-2 hover:text-white">
            🗓 Appointments
          </Link>
          <Link to="/therapist-meeting" className="flex items-center gap-2 hover:text-white">
            📹 Start Meeting
          </Link>
          <Link to="/therapist-patient-records" className="flex items-center gap-2 hover:text-white">
            📁 Patient Records
          </Link>
          <Link to="/resources" className="flex items-center gap-2 hover:text-white">
            📚 Resources
          </Link>
          <Link to="/forum" className="flex items-center gap-2 hover:text-white">
            💬 Forum
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-red-700 hover:text-white flex items-center gap-2"
      >
        📕 Logout
      </button>
    </aside>
  );
};

export default TherapistSidebar;