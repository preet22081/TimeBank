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
    availableDate: new Date().toISOString().split('T')[0], // Default to today
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const body = {
        ...form,
        userId, // ✅ Important: Send this with exact name your backend expects
      };

      const res = await fetch('/api/service-offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
    <div className="max-w-xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Post a Skill Offer</h1>
      <div className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          className="border p-2 rounded"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="timeRequired"
          type="number"
          min="1"
          placeholder="Time Required (hours)"
          className="border p-2 rounded"
          value={form.timeRequired}
          onChange={handleChange}
        />
        <input
          type="date"
          name="availableDate"
          value={form.availableDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Posting...' : 'Post Offer'}
        </button>
      </div>
    </div>
  );
}
