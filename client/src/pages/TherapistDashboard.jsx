import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const motivationalQuotes = [
  "Helping one person might not change the whole world, but it could change the world for one person.",
  "Your guidance today could heal someone’s tomorrow.",
  "Empathy is your superpower. Never underestimate it.",
  "A calm presence is often the best therapy.",
  "Therapists: the true healers of invisible wounds.",
];

const TherapistDashboard = () => {
  const [therapist, setTherapist] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTherapist(res.data);
      } catch (err) {
        console.error('Error fetching therapist data:', err);
      }
    };

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const therapistId = localStorage.getItem('userId');
        if (!therapistId || !token) return;

        const res = await axios.get('/booking', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const upcoming = res.data
          .filter(b => b.therapist?._id === therapistId)
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // optional: sort by date

        setBookings(upcoming);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    // Set a random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);

    fetchTherapist();
    fetchBookings();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">
        Welcome{therapist?.name ? `, Dr. ${therapist.name}` : ''} 👩‍⚕️
      </h1>
      <p className="text-gray-700 mb-4">Here's your overview for today.</p>

      {/* Daily Motivation */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">💬 Daily Inspiration</h2>
        <p className="italic text-gray-800">{quote}</p>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📅 Upcoming Appointments</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No appointments booked yet.</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b._id}
              className="border-b last:border-none pb-3 mb-3 flex flex-col md:flex-row justify-between"
            >
              <div>
                <p className="font-medium text-gray-800">
                  🧑‍💼 Patient: {b.user?.name || 'Unknown'}
                </p>
                <p className="text-sm text-gray-600">
                  📅 {b.date} at 🕒 {b.time}
                </p>
              </div>
              <p className="text-sm text-blue-600 mt-2 md:mt-0">
                {b.status || 'Confirmed'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TherapistDashboard;
