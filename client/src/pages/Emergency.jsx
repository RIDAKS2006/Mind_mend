// src/pages/Emergency.jsx
import React from 'react';

const Emergency = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-red-600">Emergency Help</h1>
    <ul className="list-disc pl-5">
      <li><strong>India Helpline (ANYTIME):</strong> <a href="tel:+918000112302" className="text-blue-600 hover:underline">+91‑80001‑12302</a></li>
      <li><strong>Samaritans (UK):</strong> <a href="tel:+442079823512" className="text-blue-600 hover:underline">+44‑20‑7923‑512</a></li>
      <li><strong>US National Suicide Prevention Lifeline:</strong> <a href="tel:988" className="text-blue-600 hover:underline">988</a></li>
      {/* Add more based on region */}
    </ul>
  </div>
);

export default Emergency;
