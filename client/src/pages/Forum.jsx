import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [anon, setAnon] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch current logged-in user
        const userRes = await axios.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(userRes.data._id);

        // Fetch forum posts
        const postRes = await axios.get('/forum');
        setPosts(postRes.data);
      } catch (err) {
        console.error('Error fetching user or posts:', err);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/forum',
        { content, anonymous: anon },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const postRes = await axios.get('/forum');
      setPosts(postRes.data);
      setContent('');
      setAnon(false);
    } catch (err) {
      console.error('Error posting:', err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/forum/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Community Forum</h1>

      <textarea
        rows="3"
        className="w-full p-2 border rounded mb-2"
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label className="flex items-center space-x-2 text-sm mb-4">
        <input type="checkbox" checked={anon} onChange={() => setAnon(!anon)} />
        <span>Post Anonymously</span>
      </label>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Post
      </button>

      <hr className="my-6" />

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p._id} className="bg-white shadow-md p-4 rounded relative">
            <div className="text-sm text-gray-600 mb-1">
              {p.anonymous ? 'Anonymous' : p.user?.name || 'User'} •{' '}
              {new Date(p.createdAt).toLocaleString()}
            </div>
            <p className="text-gray-900">{p.content}</p>

            {/* 🗑️ Delete button for post owner */}
            {!p.anonymous && userId === p.user?._id && (
              <button
                onClick={() => handleDelete(p._id)}
                className="absolute top-2 right-2 text-red-500 text-xl hover:scale-110 transition"
                title="Delete"
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
