// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#A8DADC] p-6 flex flex-col justify-between text-[#1D3557]">
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">🌿 MindMend</h2>
        <nav className="space-y-4 text-base font-medium">
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-white">
            📊 Dashboard
          </Link>
          <Link to="/mood" className="flex items-center gap-2 hover:text-white">
            🌈 Mood Log
          </Link>
          <Link to="/booking" className="flex items-center gap-2 hover:text-white">
            📅 Book Session
          </Link>
          <Link to="/resources" className="flex items-center gap-2 hover:text-white">
            📚 Resources
          </Link>
          <Link to="/forum" className="flex items-center gap-2 hover:text-white">
            💬 Forum
          </Link>
          <Link to="/emergency" className="flex items-center gap-2 text-red-700 hover:text-white">
            🚨 Emergency Help
          </Link>
        </nav>
      </div>

      <div className="text-sm text-red-700 hover:text-white">
        🚪 Logout
      </div>
    </aside>
  );
};

export default Sidebar;