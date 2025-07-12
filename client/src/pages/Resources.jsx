// src/pages/Resources.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const Resources = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/resources')
      .then(res => setItems(res.data))
      .catch(err => console.error('Resources load error', err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Self‑Help Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(r => (
          <div key={r._id} className="bg-white shadow p-4 rounded">
            <h2 className="font-semibold mb-2">{r.title}</h2>
            {r.type === 'video' ? (
              <iframe
                width="100%"
                height="180"
                src={r.url}
                title={r.title}
                allowFullScreen
              />
            ) : (
              <a href={r.url} target="_blank" className="text-blue-600 hover:underline">
                Read more
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
