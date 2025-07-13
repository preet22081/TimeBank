'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 🔑 important!
      },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json(); // may throw if response body is empty
    } catch (jsonError) {
      console.error("Failed to parse JSON:", jsonError);
      alert("Server returned an invalid response.");
      return;
    }

    if (res.ok) {
      localStorage.setItem('timebank_token', data.token);
      router.push('/dashboard');
    } else {
      alert(data?.error || 'Login failed');
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
