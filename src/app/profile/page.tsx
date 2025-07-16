'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('timebank_token') : null;
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setForm({
            bio: data.bio || '',
            skillOffered: data.skillOffered?.join(', ') || '',
            skillNeeded: data.skillNeeded?.join(', ') || '',
            avatarUrl: data.avatarUrl || '',
          });
        });
    }
  }, [userId]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: form.bio,
          skillOffered: form.skillOffered.split(',').map((s: string) => s.trim()),
          skillNeeded: form.skillNeeded.split(',').map((s: string) => s.trim()),
          avatarUrl: form.avatarUrl,
        }),
      });
      alert('✅ Profile updated successfully');
      setEdit(false);
    } catch {
      alert('❌ Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="mt-28 text-center text-white text-lg animate-pulse">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-28 px-4 text-white">
      <h1 className="text-3xl font-extrabold mb-8 text-center">👤 Your Profile</h1>

      <div className="bg-[#1e293b] p-6 rounded-lg shadow space-y-4">
        {/* <img src={form.avatarUrl || '/default-avatar.png'} className="w-24 h-24 rounded-full" /> */}
        <p>
          <span className="font-semibold text-gray-300">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold text-gray-300">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold text-gray-300">Time Credits:</span> {user.timeCredits}
        </p>

        {edit ? (
          <div className="space-y-3">
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full bg-[#0f172a] border border-gray-600 rounded p-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="skillOffered"
              value={form.skillOffered}
              onChange={handleChange}
              placeholder="Skills Offered (comma-separated)"
              className="w-full bg-[#0f172a] border border-gray-600 rounded p-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="skillNeeded"
              value={form.skillNeeded}
              onChange={handleChange}
              placeholder="Skills Needed (comma-separated)"
              className="w-full bg-[#0f172a] border border-gray-600 rounded p-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            {/* <input name="avatarUrl" value={form.avatarUrl} onChange={handleChange} className="border p-2 rounded" placeholder="Avatar URL" /> */}

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              {loading ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-300">Bio:</span>{' '}
              {user.bio || <span className="text-gray-500">-</span>}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Skills Offered:</span>{' '}
              {user.skillOffered?.join(', ') || <span className="text-gray-500">-</span>}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Skills Needed:</span>{' '}
              {user.skillNeeded?.join(', ') || <span className="text-gray-500">-</span>}
            </p>
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
