// src/components/MoodChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const MoodChart = ({ moods }) => {
  const labels = moods.map(m => new Date(m.createdAt).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Mood notes length',
        data: moods.map(m => m.note.length),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79,70,229,0.2)',
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
};

export default MoodChart;
