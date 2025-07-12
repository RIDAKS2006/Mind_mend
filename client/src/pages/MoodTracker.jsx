// src/pages/MoodTracker.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/mood', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMoods(data);
    };
    fetchMoods();
  }, []);

  const data = {
    labels: moods.map(m => new Date(m.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Log',
        data: moods.map(m => m.emotion.length),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mood Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default MoodTracker;
