'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRequestPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    preferredDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('timebank_token');
    if (!token) return alert('Login required');

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    setLoading(true);
    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user: userId }),
      });

      if (!res.ok) throw new Error('Error creating request');
      router.push('/search');
    } catch (err) {
      console.error(err);
      alert('Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 mt-28 text-white">
      <h1 className="text-3xl font-extrabold mb-8 text-center">🛠 Post a Service Request</h1>

      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg flex flex-col gap-5">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          onChange={handleChange}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="date"
          name="preferredDate"
          value={form.preferredDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 invert-calendar"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-lg disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Request'}
        </button>
      </div>
    </div>
  );
}
