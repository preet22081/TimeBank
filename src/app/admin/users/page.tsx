'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-white tracking-wide mb-4 drop-shadow-md">Manage Users</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleRoleChange(user._id, user.role)}
                  >
                    {user.role === 'admin' ? 'Demote' : 'Promote'}
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleRoleChange(userId: string, currentRole: 'user' | 'admin') {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    fetch(`/api/admin/users/${userId}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    }).then(() => refresh());
  }

  function handleDelete(userId: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    fetch(`/api/admin/users/${userId}`, { method: 'DELETE' }).then(() => refresh());
  }

  function refresh() {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(setUsers);
  }
}
