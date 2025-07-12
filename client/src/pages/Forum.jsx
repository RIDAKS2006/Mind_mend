// src/pages/Forum.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [anon, setAnon] = useState(false);

  useEffect(() => {
    axios.get('/api/forum').then(res => setPosts(res.data));
  }, []);

  const submit = async () => {
    await axios.post('/api/forum', { content, anonymous: anon });
    const res = await axios.get('/api/forum');
    setPosts(res.data);
    setContent('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Community Forum</h1>
      <textarea
        rows="3"
        className="w-full p-2 border mb-2"
        placeholder="Share your thoughts..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <label>
        <input type="checkbox" checked={anon} onChange={() => setAnon(!anon)} />
        Post Anonymously
      </label>
      <button onClick={submit} className="btn-primary mt-2">Post</button>
      <hr className="my-4" />
      {posts.map(p => (
        <div key={p._id} className="p-4 bg-white shadow mb-2">
          <div className="text-sm text-gray-600 mb-1">
            {p.anonymous ? 'Anonymous' : p.user.name}, {new Date(p.createdAt).toLocaleString()}
          </div>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Forum;
