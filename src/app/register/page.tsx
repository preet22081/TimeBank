'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed.');
        return;
      }

      alert('✅ Registration successful! Please login.');
      router.push('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong during registration.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] px-4">
      <h1 className="text-3xl font-extrabold text-[#1E293B] mb-6">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4"
      >
        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-3 w-full rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#3EB489] placeholder-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-3 w-full rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#3EB489] placeholder-gray-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-3 w-full rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#3EB489] placeholder-gray-600"
          required
        />

        <button className="w-full bg-[#3EB489] text-white py-2 rounded-md hover:bg-[#32a17b] transition font-semibold">
          Register
        </button>
      </form>
    </div>
  );
}
