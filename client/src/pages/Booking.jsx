import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const [therapists, setTherapists] = useState([]);
  const [selected, setSelected] = useState({ therapist: '', date: null, time: '' });
  const [bookedDates, setBookedDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availability, setAvailability] = useState(null);

  // 1. Load all therapists
  useEffect(() => {
    axios.get('/users')
      .then(res => {
        const therapistList = res.data.filter(user => user.role === 'therapist');
        setTherapists(therapistList);
      })
      .catch(err => console.error('Error loading therapists:', err));
  }, []);

  // 2. Fetch availability + booked dates when therapist changes
  useEffect(() => {
    if (!selected.therapist) return;

    const fetchAvailability = async () => {
      try {
        const availRes = await axios.get(`/availability/${selected.therapist}`);
        setAvailability(availRes.data);
      } catch (err) {
        console.error('Error fetching availability:', err);
        setAvailability(null);
      }
    };

    const fetchBookedDates = async () => {
      try {
        const res = await axios.get('/booking');
        const bookings = res.data.filter(b => b.therapist._id === selected.therapist);
        const dates = bookings.map(b => b.date);
        setBookedDates(dates);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchAvailability();
    fetchBookedDates();
    setSelected(prev => ({ ...prev, date: null, time: '' }));
  }, [selected.therapist]);

  // 3. On date change: load available times
  const handleDateChange = async (date) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    setSelected(prev => ({ ...prev, date: new Date(date), time: '' }));

    try {
      const res = await axios.get('/booking');
      const bookings = res.data.filter(
        b => b.therapist._id === selected.therapist && b.date === dateStr
      );
      const bookedTimes = bookings.map(b => b.time);

      const available = availability?.timeSlots || [];
      const freeTimes = available
        .map(slot => slot.start)
        .filter(t => !bookedTimes.includes(t));

      setAvailableTimes(freeTimes);
    } catch (err) {
      console.error('Error fetching time slots:', err);
    }
  };

  // 4. Disable dates not available
  const isDateDisabled = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (!availability) return true;

    const inRange = availability.dateRanges.some(range => {
      return dateStr >= range.start && dateStr <= range.end;
    });

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    return (
      !inRange ||
      availability.daysOff.includes(dayName) ||
      bookedDates.includes(dateStr)
    );
  };

  // 5. Handle Submit
  const handleSubmit = async () => {
    try {
      const payload = {
        therapist: selected.therapist,
        date: selected.date.toISOString().split('T')[0],
        time: selected.time,
      };

      await axios.post('/booking', payload);
      toast.success('✅ Appointment booked successfully!');
      setSelected({ therapist: '', date: null, time: '' });
      setAvailableTimes([]);
    } catch (err) {
      toast.error(`❌ Booking failed: ${err.response?.data?.message || 'Server error'}`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" />
      <h1 className="text-2xl font-bold mb-6 text-center">Book a Therapy Session</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
        {/* Therapist Selection */}
        <div>
          <label className="font-semibold block mb-1">Select Therapist</label>
          <select
            className="input w-full p-2 border rounded"
            onChange={e => setSelected({ therapist: e.target.value, date: null, time: '' })}
            value={selected.therapist}
          >
            <option value="">-- Choose Therapist --</option>
            {therapists.map(t => (
              <option key={t._id} value={t._id}>{t.name}</option>
            ))}
          </select>

          {/* Calendar */}
          {selected.therapist && availability && (
            <>
              <label className="font-semibold block mt-4 mb-1">Choose Date</label>
              <Calendar
                onChange={handleDateChange}
                value={selected.date}
                tileDisabled={({ date }) => isDateDisabled(date)}
              />
            </>
          )}
        </div>

        {/* Time Slot Selection + Booking */}
        <div>
          {selected.date && (
            <>
              <label className="font-semibold block mb-1">Available Time Slots</label>
              <select
                className="input w-full p-2 border rounded"
                value={selected.time}
                onChange={e => setSelected(prev => ({ ...prev, time: e.target.value }))}
              >
                <option value="">-- Select Time --</option>
                {availableTimes.length > 0 ? (
                  availableTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))
                ) : (
                  <option disabled>No available slots</option>
                )}
              </select>

              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={!selected.time}
              >
                Book Appointment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
