// /src/pages/TherapistMeeting.jsx

import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

const TherapistMeeting = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Replace this with your logic to get booking ID (e.g., from URL or localStorage)
        const bookingId = localStorage.getItem("activeBooking");

        if (!bookingId) {
          setError("No active booking ID found.");
          return;
        }

        // Fetch room ID from backend
        const { data } = await axios.get(`/booking/${bookingId}/room`);
        const { roomId } = data;
        setRoomId(roomId);

        // Wait until Jitsi script is loaded
        if (window.JitsiMeetExternalAPI) {
          const domain = "meet.jit.si";
          const options = {
            roomName: roomId,
            parentNode: document.getElementById("jitsi"),
            width: "100%",
            height: 800,
            interfaceConfigOverwrite: {
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
            },
          };

          new window.JitsiMeetExternalAPI(domain, options);
        } else {
          setError("Jitsi Meet API not available.");
        }
      } catch (err) {
        console.error("Jitsi Load Error:", err);
        setError("Failed to load meeting room. Please try again.");
      }
    };

    init();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 px-4">
      {error ? (
        <div className="text-red-600 font-semibold text-lg mt-4">{error}</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Therapist Video Session</h2>
          <div id="jitsi" className="w-full max-w-6xl h-[80vh] bg-white rounded-lg shadow-lg" />
        </>
      )}
    </div>
  );
};

export default TherapistMeeting;
