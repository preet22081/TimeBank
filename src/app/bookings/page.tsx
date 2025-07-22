'use client';

import { useEffect, useState } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('timebank_token');
    if (!token) return;

    const userId = JSON.parse(atob(token.split('.')[1])).userId;

    fetch('/api/admin/bookings')
      .then(res => res.json())
      .then(data => {
        const myBookings = data.filter(
          (b: any) =>
            b.bookedBy?._id === userId || b.bookedWith?._id === userId
        );
        setBookings(myBookings);
      });
  }, []);

  const cancelBooking = async (id: string) => {
    const confirmed = confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) return;

    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Booking cancelled.');
      setBookings(prev => prev.filter(b => b._id !== id));
    } else {
      alert('Failed to cancel.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-28 px-4 text-white">
      <h1 className="text-3xl font-extrabold mb-8 text-center">📅 Your Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-400 bg-[#1e293b] p-8 rounded-lg shadow">
          No bookings found.
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((b: any) => (
            <div
              key={b._id}
              className="bg-[#1e293b] border border-gray-700 p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="mb-1">👤 With: {b.bookedWith?.name || 'N/A'}</p>
              <p className="mb-1">📅 Scheduled: {new Date(b.scheduledDate).toLocaleDateString()}</p>
              <p className="mb-3">
                ⏳ Status:{' '}
                <span className={`font-bold ${
                  b.status === 'pending'
                    ? 'text-yellow-400'
                    : b.status === 'approved'
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {b.status}
                </span>
              </p>
              <button
                onClick={() => cancelBooking(b._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm rounded"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
