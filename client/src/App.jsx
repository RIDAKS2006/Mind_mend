import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import MoodTracker from "./pages/MoodTracker";
import Forum from "./pages/Forum";
import Resources from "./pages/Resources";
import Booking from "./pages/Booking";
import Emergency from "./pages/Emergency";
import TherapistMeeting from "./pages/TherapistMeeting";
import TherapistRecords from "./pages/TherapistRecords";
import TherapistAppointments from "./pages/TherapistAppointments";
import SetAvailability from "./pages/SetAvailability";
import RoleProtectedRoute from "./utils/RoleProtectedRoute";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <>
        {/* Toastify container */}
        <ToastContainer position="top-right" autoClose={3000} />
        
        {/* All routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Layout Routes */}
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />

            {/* User Routes */}
            <Route path="/dashboard" element={
              <RoleProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </RoleProtectedRoute>
            } />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/emergency" element={<Emergency />} />

            {/* Therapist Routes */}
            <Route path="/therapist/dashboard" element={
              <RoleProtectedRoute allowedRoles={['therapist']}>
                <TherapistDashboard />
              </RoleProtectedRoute>
            } />
            <Route path="/therapist/appointments" element={
              <RoleProtectedRoute allowedRoles={['therapist']}>
                <TherapistAppointments />
              </RoleProtectedRoute>
            } />
            <Route path="/therapist/meeting" element={
              <RoleProtectedRoute allowedRoles={['therapist']}>
                <TherapistMeeting />
              </RoleProtectedRoute>
            } />
            <Route path="/therapist/records" element={
              <RoleProtectedRoute allowedRoles={['therapist']}>
                <TherapistRecords />
              </RoleProtectedRoute>
            } />
            <Route path="/therapist/availability" element={
              <RoleProtectedRoute allowedRoles={['therapist']}>
                <SetAvailability />
              </RoleProtectedRoute>
            } />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </>
    </ErrorBoundary>
  );
}

export default App;
