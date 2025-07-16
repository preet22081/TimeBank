'use client';

import { useEffect, useState } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('timebank_token') : null;
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      const myBookings = data.filter(
        (b: any) => b.bookedBy._id === userId || b.bookedWith._id === userId
      );
      setBookings(myBookings);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const handleCancel = async (id: string) => {
    const confirmed = confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) return;

    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Booking cancelled.');
      fetchBookings();
    } else {
      alert('Failed to cancel.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
              <p className="mb-1">
                <span className="font-medium text-gray-300">👤 With:</span>{' '}
                {b.bookedWith.name}
              </p>
              <p className="mb-1">
                <span className="font-medium text-gray-300">📅 Scheduled:</span>{' '}
                {new Date(b.scheduledDate).toLocaleDateString()}
              </p>
              <p className="mb-3">
                <span className="font-medium text-gray-300">⏳ Status:</span>{' '}
                <span
                  className={`font-bold ${
                    b.status === 'pending'
                      ? 'text-yellow-400'
                      : b.status === 'approved'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {b.status}
                </span>
              </p>

              <button
                onClick={() => handleCancel(b._id)}
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
