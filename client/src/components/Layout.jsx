// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import CollapsibleSidebar from './CollapsibleSidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const storedUser = localStorage.getItem('user');
  const role = storedUser ? JSON.parse(storedUser).role : null;

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 ">
        <CollapsibleSidebar role={role} />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;