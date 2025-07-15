import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const motivationalQuotes = [
  "Believe in yourself. You are stronger than you think.",
  "Every day is a fresh start.",
  "Small steps every day lead to big results.",
  "Your mind is a powerful thing. When you fill it with positivity, your life will start to change.",
  "Difficult roads often lead to beautiful destinations.",
  "Take a deep breath. You’ve got this.",
  "You are capable of amazing things.",
  "Progress, not perfection.",
];

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        console.error('User fetch failed:', err);
      }
    };

    fetchUser();
    // Pick random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome{user ? `, ${user.name}` : ''} 👋
        </h1>
        <p className="text-gray-700 mb-6">This is your personalized dashboard view.</p>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-2">✨ Your Motivation Today</h2>
          <p className="text-gray-800 italic text-lg">“{quote}”</p>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
