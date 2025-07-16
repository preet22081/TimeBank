'use client';

import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <ul className="space-y-2">
        {users.map((user: any) => (
          <li key={user._id} className="border p-4 rounded bg-white text-black">
            <strong>{user.name}</strong> - {user.email} - Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
