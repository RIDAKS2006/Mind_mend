// src/pages/MoodTracker.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/mood', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMoods(data || []);
      } catch (err) {
        console.error('Error fetching moods:', err);
        setMoods([]);
      }
    };
    fetchMoods();
  }, []);

  const data = {
    labels: moods.map((m) =>
      m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Unknown'
    ),
    datasets: [
      {
        label: 'Mood Log',
        data: moods.map((m) => m.emotion?.length || 0),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mood Trends</h2>
      {moods.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No mood entries available yet.</p>
      )}
    </div>
  );
};

export default MoodTracker;
