'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('timebank_token', data.token);

      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Login</h2>
        <div className="space-y-5">
          <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
            <Mail className="w-5 h-5 mr-3 text-white" />
            <input
              name="email"
              placeholder="Email"
              className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
            <Lock className="w-5 h-5 mr-3 text-white" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          {/* <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
            <User className="w-5 h-5 mr-3 text-white" />
            <select
              name="role"
              className="bg-transparent outline-none text-white w-full"
              onChange={handleChange}
              value={form.role}
            >
              <option value="user" className="text-black">User</option>
              <option value="admin" className="text-black">Admin</option>
            </select>
          </div> */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg text-white font-semibold tracking-wide shadow-md hover:shadow-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-sm text-gray-300 mt-5">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-400 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
