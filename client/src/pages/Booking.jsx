// src/pages/Booking.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const Booking = () => {
  const [therapists, setTherapists] = useState([]);
  const [sel, setSel] = useState({ therapist: '', date: '', time: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get('/api/users').then(res => setTherapists(res.data.filter(u => u.role === 'therapist')));
  }, []);

  const submit = async () => {
    try {
      await axios.post('/booking', sel);
      setMsg('Booked successfully!');
    } catch (e) {
      setMsg('Booking error: ' + e.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book Therapy</h1>
      <select className="input" onChange={e => setSel({ ...sel, therapist: e.target.value })}>
        <option value="">Choose Therapist</option>
        {therapists.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
      </select>
      <input type="date" className="input" onChange={e => setSel({ ...sel, date: e.target.value })} />
      <input type="time" className="input" onChange={e => setSel({ ...sel, time: e.target.value })} />
      <button onClick={submit} className="btn-primary">Book</button>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
};

export default Booking;
