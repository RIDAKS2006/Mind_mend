// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col">
      <div className="p-4 text-xl font-bold border-b">MindMend</div>
      <nav className="flex flex-col p-4 space-y-2 text-gray-700">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/mood" className="hover:text-blue-600">Mood Tracker</Link>
        <Link to="/booking" className="hover:text-blue-600">Book Therapy</Link>
        <Link to="/resources" className="hover:text-blue-600">Resources</Link>
        <Link to="/forum" className="hover:text-blue-600">Forum</Link>
        <Link to="/emergency" className="text-red-600 font-semibold hover:text-red-800">Emergency Help</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
