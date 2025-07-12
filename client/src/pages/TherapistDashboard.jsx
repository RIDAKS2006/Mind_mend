// src/pages/TherapistDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const TherapistDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/booking').then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Therapist Dashboard</h1>
      {bookings.map(b => (
        <div key={b._id} className="p-3 bg-white shadow mb-2">
          <p>User: {b.user.name}</p>
          <p>Date: {b.date} at {b.time}</p>
        </div>
      ))}
    </div>
  );
};

export default TherapistDashboard;
