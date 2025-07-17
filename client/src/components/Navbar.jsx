// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="h-16 bg-white shadow flex items-center justify-between px-6">
      <div className="text-xl font-bold">MindMend</div>
      <button
        onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}
        className="text-red-600 hover:underline"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
