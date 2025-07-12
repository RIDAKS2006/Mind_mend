import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div
      className="shadow flex justify-center items-center relative px-8 py-4"
      style={{ backgroundColor: "#457B9D" }}
    >
      <h1 className="text-2xl font-bold text-white drop-shadow">MindMend</h1>

      {/* Emergency Button */}
      <Link
        to="/emergency"
        className="absolute right-8 bg-[#FF6B6B] text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        🚨 Emergency
      </Link>
    </div>
  );
};

export default Topbar;