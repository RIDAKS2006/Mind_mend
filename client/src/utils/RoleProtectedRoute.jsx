// src/utils/RoleProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const stored = localStorage.getItem('user');
  if (!token || !stored) return <Navigate to="/login" />;

  const { role } = JSON.parse(stored);
  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default RoleProtectedRoute;
