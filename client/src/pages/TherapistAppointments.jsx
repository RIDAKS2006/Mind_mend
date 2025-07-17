import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

const TherapistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };

    const fetchAvailability = async () => {
      try {
        const res = await axios.get("/availability", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailability(res.data);
      } catch (err) {
        console.error("Failed to fetch availability", err);
      }
    };

    fetchAppointments();
    fetchAvailability();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <ul className="space-y-3 mb-8">
          {appointments.map((appt) => (
            <li key={appt._id} className="bg-white p-4 shadow rounded">
              <p><strong>User:</strong> {appt.user?.name || "Anonymous"}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mb-2">My Availability</h2>
      {!availability ? (
        <p>No availability set yet.</p>
      ) : (
        <div className="bg-white p-4 shadow rounded space-y-2">
          <div>
            <strong>Date Ranges:</strong>
            <ul className="list-disc pl-6">
              {availability.dateRanges.map((range, idx) => (
                <li key={idx}>
                  {range.start} to {range.end}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Time Slots:</strong>
            <ul className="list-disc pl-6">
              {availability.timeSlots.map((slot, idx) => (
                <li key={idx}>
                  {slot.start} - {slot.end}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Days Off:</strong> {availability.daysOff.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistAppointments;
