'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed.');
        return;
      }

      localStorage.setItem('timebank_token', 'true');
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] px-4">
      <h1 className="text-3xl font-extrabold text-[#1E293B] mb-6">Login</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4"
      >
        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full rounded-md text-black bg-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3EB489]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full rounded-md text-black bg-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3EB489]"
          required
        />

        <button className="w-full bg-[#3EB489] text-white py-2 rounded-md hover:bg-[#32a17b] font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
