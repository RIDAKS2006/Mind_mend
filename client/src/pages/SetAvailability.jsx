import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SetAvailability = () => {
  const [dateRanges, setDateRanges] = useState([{ start: "", end: "" }]);
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);
  const [daysOff, setDaysOff] = useState([]);

  const handleDateChange = (idx, field, value) => {
    const updated = [...dateRanges];
    updated[idx][field] = value;
    setDateRanges(updated);
  };

  const handleTimeChange = (idx, field, value) => {
    const updated = [...timeSlots];
    updated[idx][field] = value;
    setTimeSlots(updated);
  };

  const toggleDay = (day) => {
    if (daysOff.includes(day)) {
      setDaysOff(daysOff.filter((d) => d !== day));
    } else {
      setDaysOff([...daysOff, day]);
    }
  };

  const addDateRange = () => setDateRanges([...dateRanges, { start: "", end: "" }]);
  const addTimeSlot = () => setTimeSlots([...timeSlots, { start: "", end: "" }]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/availability",
        { dateRanges, timeSlots, daysOff },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Availability saved!");
    } catch (err) {
      toast.error("Error saving availability");
      console.error(err);
    }
  };

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Set Availability</h2>

      {/* Date Ranges */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Date Ranges</h4>
        {dateRanges.map((range, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input type="date" value={range.start} onChange={(e) => handleDateChange(idx, "start", e.target.value)} className="input" />
            <input type="date" value={range.end} onChange={(e) => handleDateChange(idx, "end", e.target.value)} className="input" />
          </div>
        ))}
        <button onClick={addDateRange} className="text-blue-500 text-sm">+ Add Range</button>
      </div>

      {/* Time Slots */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Time Slots</h4>
        {timeSlots.map((slot, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input type="time" value={slot.start} onChange={(e) => handleTimeChange(idx, "start", e.target.value)} className="input" />
            <input type="time" value={slot.end} onChange={(e) => handleTimeChange(idx, "end", e.target.value)} className="input" />
          </div>
        ))}
        <button onClick={addTimeSlot} className="text-blue-500 text-sm">+ Add Time Slot</button>
      </div>

      {/* Days Off */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Days Off</h4>
        <div className="flex flex-wrap gap-2">
          {weekdays.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-3 py-1 rounded border ${daysOff.includes(day) ? "bg-red-200" : "bg-gray-100"}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="btn-primary">Save Availability</button>
    </div>
  );
};

export default SetAvailability;
