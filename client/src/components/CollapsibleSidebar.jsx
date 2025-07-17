// src/components/CollapsibleSidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaComments,
  FaVideo,
  FaFileAlt,
  FaUserMd,
  FaHome,
  FaHeartbeat,
  FaChartLine,
  FaBook,
  FaPowerOff,
} from 'react-icons/fa';

const CollapsibleSidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const therapistLinks = [
    { to: "/therapist/dashboard", icon: <FaChartLine />, label: "Dashboard" },
    { to: "/therapist/appointments", icon: <FaCalendarAlt />, label: "Appointments" },
    { to: "/therapist/meeting", icon: <FaVideo />, label: "Start Meeting" },
    { to: "/therapist/records", icon: <FaFileAlt />, label: "Patient Records" },
    { to: "/resources", icon: <FaBook />, label: "Resources" },
    { to: "/forum", icon: <FaComments />, label: "Forum" },
    { to: "/therapist/availability", icon: <FaCalendarAlt />, label: "Set Availability" },
  ];

  const userLinks = [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    { to: "/mood", icon: <FaChartLine />, label: "Mood Log" },
    { to: "/booking", icon: <FaCalendarAlt />, label: "Book Therapy" },
    { to: "/resources", icon: <FaBook />, label: "Resources" },
    { to: "/forum", icon: <FaComments />, label: "Forum" },
    { to: "/emergency", icon: <FaHeartbeat />, label: "Emergency", special: true },
  ];

  const links = role === 'therapist' ? therapistLinks : userLinks;

  return (
    <div
      className={`h-full ${isOpen ? 'w-56' : 'w-16'} bg-[#A8DADC] text-[#1D3557] flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          {isOpen && <h1 className="text-lg font-bold">{role === 'therapist' ? 'Therapist Panel' : 'MindMend'}</h1>}
          <button
            onClick={toggleSidebar}
            className="text-lg hover:text-white"
            title={isOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-2 p-4">
          {links.map(({ to, icon, label, special }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center space-x-3 p-2 rounded hover:bg-[#457B9D] hover:text-white ${
                special ? 'text-red-600 font-semibold hover:text-white' : ''
              }`}
              title={label}
            >
              <span className="text-lg">{icon}</span>
              {isOpen && <span className="text-sm">{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-700 hover:text-white"
          title="Logout"
        >
          <FaPowerOff />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default CollapsibleSidebar;
