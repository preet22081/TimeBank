'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddOfferPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    timeRequired: 1,
    availableDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'timeRequired' ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('timebank_token');
    if (!token) return alert('Login required');

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    if (!form.title || !form.category || !form.availableDate) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/service-offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userId }),
      });

      if (!res.ok) throw new Error('Failed to create offer');

      router.push('/search');
    } catch (err) {
      console.error('❌ Submit error:', err);
      alert('Failed to create offer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 mt-28 text-white">
      <h1 className="text-3xl font-extrabold mb-8 text-center">
        🚀 Post a Skill Offer
      </h1>

      <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg flex flex-col gap-5">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="timeRequired"
          type="number"
          min="1"
          placeholder="Time Required (hours)"
          value={form.timeRequired}
          onChange={handleChange}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="availableDate"
          value={form.availableDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 invert-calendar"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-lg disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Offer'}
        </button>
      </div>
    </div>
  );
}
