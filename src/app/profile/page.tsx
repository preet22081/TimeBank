'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('timebank_token') : null;
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
      alert('Updated successfully');
      setEdit(false);
    } catch {
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="mt-24 text-center">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="flex flex-col gap-3">
        {/* <img src={form.avatarUrl || '/default-avatar.png'} className="w-24 h-24 rounded-full" alt="avatar" /> */}
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Time Credits:</strong> {user.timeCredits}</p>

        {edit ? (
          <>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="border p-2 rounded" placeholder="Bio" />
            <input name="skillOffered" value={form.skillOffered} onChange={handleChange} className="border p-2 rounded" placeholder="Skills Offered (comma-separated)" />
            <input name="skillNeeded" value={form.skillNeeded} onChange={handleChange} className="border p-2 rounded" placeholder="Skills Needed (comma-separated)" />
            {/* <input name="avatarUrl" value={form.avatarUrl} onChange={handleChange} className="border p-2 rounded" placeholder="Avatar URL" /> */}
            <button onClick={handleUpdate} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        ) : (
          <>
            <p><strong>Bio:</strong> {user.bio || '-'}</p>
            <p><strong>Skills Offered:</strong> {user.skillOffered?.join(', ') || '-'}</p>
            <p><strong>Skills Needed:</strong> {user.skillNeeded?.join(', ') || '-'}</p>
            <button onClick={() => setEdit(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}
