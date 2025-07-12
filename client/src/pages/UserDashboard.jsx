// src/pages/UserDashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Welcome to User Dashboard</h1>
        <p>This is your personalized dashboard view.</p>
      </main>
    </div>
  );
};

export default UserDashboard;
