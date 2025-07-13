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

  const handleChange = (e: any) => {
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
    <div className="max-w-xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Post a Service Request</h1>
      <div className="flex flex-col gap-4">
        <input name="title" placeholder="Title" className="border p-2 rounded" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="border p-2 rounded" onChange={handleChange} />
        <input name="category" placeholder="Category" className="border p-2 rounded" onChange={handleChange} />
        <input type="date" name="preferredDate" value={form.preferredDate} min={new Date().toISOString().split('T')[0]} onChange={handleChange} className="border p-2 rounded" />
        <button onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {loading ? 'Posting...' : 'Post Request'}
        </button>
      </div>
    </div>
  );
}
