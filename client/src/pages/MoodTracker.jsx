import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const moodIcons = {
  Happy: '😊',
  Sad: '😢',
  Angry: '😠',
  Anxious: '😟',
  Excited: '🤩',
  Neutral: '😐',
};

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [emotion, setEmotion] = useState('');
  const [note, setNote] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [popup, setPopup] = useState('');

  // ✅ Fetch moods
  const fetchMoods = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/mood', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMoods(res.data || []);
    } catch (err) {
      console.error('Error fetching moods:', err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  // ✅ POST today's mood
  const handleSubmit = async () => {
    if (!emotion) {
      setPopup('Please select a mood!');
      setTimeout(() => setPopup(''), 2000);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/mood/log',
        { emotion, note, intensity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPopup('Mood saved successfully!');
      setEmotion('');
      setNote('');
      setIntensity(3);
      fetchMoods();
      setTimeout(() => setPopup(''), 3000);
    } catch (err) {
      console.error(err);
      setPopup('Failed to save mood');
      setTimeout(() => setPopup(''), 3000);
    }
  };

  // ✅ Mood chart data
  const chartData = {
    labels: moods.map((m) =>
      new Date(m.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Mood Intensity (1–5)',
        data: moods.map((m) => m.intensity || 3),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  // ✅ Mood icons on calendar
  const renderMoodIcon = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    const mood = moods.find(
      (m) => m.createdAt.split('T')[0] === dateStr
    );
    if (mood) {
      return <div className="text-xl text-center">{moodIcons[mood.emotion]}</div>;
    }
    return null;
  };

  // ✅ Insights
  const getInsights = () => {
    if (!moods.length) return [];

    const count = {};
    moods.forEach((m) => {
      count[m.emotion] = (count[m.emotion] || 0) + 1;
    });

    const mostCommon = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
    const streak = moods.reduce(
      (acc, mood, i, arr) => {
        if (i > 0 && mood.emotion === arr[i - 1].emotion) {
          acc.current += 1;
        } else {
          acc.current = 1;
        }
        acc.max = Math.max(acc.max, acc.current);
        return acc;
      },
      { current: 1, max: 1 }
    );
    const avg =
      moods.reduce((sum, m) => sum + (m.intensity || 3), 0) / moods.length;

    return [
      `Most common emotion: ${mostCommon} ${moodIcons[mostCommon]}`,
      `Longest same mood streak: ${streak.max} day(s)`,
      `Average mood intensity: ${avg.toFixed(1)} / 5`,
      mostCommon === 'Anxious'
        ? 'Try guided meditation or breathing exercises.'
        : mostCommon === 'Sad'
        ? 'Journaling or reaching out can help.'
        : mostCommon === 'Happy'
        ? 'Keep doing what brings joy!'
        : 'Practice mindfulness and balance.',
    ];
  };

  const insights = getInsights();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Mood Tracker</h2>

      {/* Mood Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">How was your day?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Emotion</label>
            <select
              className="w-full border p-2 rounded"
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
            >
              <option value="">-- Select Mood --</option>
              {Object.keys(moodIcons).map((mood) => (
                <option key={mood} value={mood}>
                  {mood} {moodIcons[mood]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Note</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your thoughts..."
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Intensity (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border p-2 rounded"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
            />
          </div>
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit Mood
        </button>
        {popup && <p className="mt-2 text-blue-600">{popup}</p>}
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">Mood Calendar</h3>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={renderMoodIcon}
        />
        <p className="text-xs mt-2 text-center text-gray-500">
          Selected: {selectedDate.toDateString()}
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">Mood Intensity Chart</h3>
        {moods.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-gray-600">No mood logs yet.</p>
        )}
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Mood Insights</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {insights.map((insight, idx) => (
            <li key={idx}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodTracker;
