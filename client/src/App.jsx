import React from "react";
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
import RoleProtectedRoute from "./utils/RoleProtectedRoute";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/therapist/dashboard" element={
            <RoleProtectedRoute allowedRoles={['therapist']}>
              <TherapistDashboard />
            </RoleProtectedRoute>
          } />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/therapist/meeting" element={<TherapistMeeting />} />
          <Route path="/therapist/records" element={<TherapistRecords />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
