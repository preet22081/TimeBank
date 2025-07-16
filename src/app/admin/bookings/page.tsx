'use client';

import { useEffect, useState } from 'react';

interface Booking {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  bookedBy: { name: string };
  bookedWith: { name: string };
  scheduledDate: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: updated.status } : b))
      );
    } else {
      alert('Failed to update booking');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin: All Bookings</h1>
      {bookings.map((b) => (
        <div key={b._id} className="bg-gray-800 p-4 rounded mb-4 shadow">
          <p><strong>With:</strong> {b.bookedWith.name}</p>
          <p><strong>By:</strong> {b.bookedBy.name}</p>
          <p><strong>Date:</strong> {new Date(b.scheduledDate).toDateString()}</p>
          <p><strong>Status:</strong> <span className={`font-bold ${
            b.status === 'approved' ? 'text-green-400' :
            b.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
          }`}>{b.status}</span></p>

          {b.status === 'pending' && (
            <div className="flex gap-2 mt-3">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(b._id, 'approved')}
              >
                Approve
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(b._id, 'rejected')}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
