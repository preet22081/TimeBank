'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('/api/users') // You must have a /api/users route to fetch all
      .then(res => res.json())
      .then(setUsers);

    fetch('/api/admin/bookings')
      .then(res => res.json())
      .then(setBookings);
  }, []);

  const pending = bookings.filter((b: any) => b.status === 'pending').length;
  const approved = bookings.filter((b: any) => b.status === 'approved').length;
  const rejected = bookings.filter((b: any) => b.status === 'rejected').length;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-600 p-4 rounded shadow">Total Users: {users.length}</div>
        <div className="bg-blue-600 p-4 rounded shadow">Total Bookings: {bookings.length}</div>
        <div className="bg-yellow-500 p-4 rounded shadow">Pending: {pending}</div>
        <div className="bg-green-600 p-4 rounded shadow">Approved: {approved}</div>
        <div className="bg-red-600 p-4 rounded shadow">Rejected: {rejected}</div>
      </div>
    </div>
  );
}
      