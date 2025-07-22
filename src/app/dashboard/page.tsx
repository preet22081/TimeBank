'use client';

import { useEffect, useState } from 'react';

interface Booking {
  status: string;
  scheduledDate: string;
  bookedWith: { name: string };
}

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('timebank_token');
    if (!token) return;

    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUser(decoded);

    fetch('/api/admin/bookings') // Reuse route to fetch all
      .then(res => res.json())
      .then(data => {
        const myBookings = data.filter(
          (b: any) =>
            b.bookedBy?._id === decoded.userId || b.bookedWith?._id === decoded.userId
        );
        setBookings(myBookings);
      });
  }, []);

  const pending = bookings.filter(b => b.status === 'pending').length;
  const approved = bookings.filter(b => b.status === 'approved').length;
  const upcoming = bookings.filter(b => b.status === 'approved');

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">👤 Welcome, {user?.name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 p-4 rounded shadow">Pending Bookings: {pending}</div>
        <div className="bg-green-600 p-4 rounded shadow">Approved Bookings: {approved}</div>
      </div>

      <h2 className="text-xl font-semibold mb-3">📅 Upcoming Approved Sessions</h2>
      <div className="bg-[#1e293b] p-4 rounded-lg shadow">
        {upcoming.length === 0 ? (
          <p className="text-gray-400">No upcoming sessions.</p>
        ) : (
          <ul>
            {upcoming.map((b, i) => (
              <li key={i} className="mb-2">
                With <strong>{b.bookedWith?.name}</strong> on{' '}
                {new Date(b.scheduledDate).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
