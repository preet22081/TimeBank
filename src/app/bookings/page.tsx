'use client';

import { useEffect, useState } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('timebank_token') : null;
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

  const fetchBookings = async () => {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    const myBookings = data.filter((b: any) => b.bookedBy._id === userId || b.bookedWith._id === userId);
    setBookings(myBookings);
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
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b: any) => (
          <div key={b._id} className="border p-4 rounded mb-4 bg-white shadow">
            <p><strong>With:</strong> {b.bookedWith.name}</p>
            <p><strong>Scheduled:</strong> {new Date(b.scheduledDate).toDateString()}</p>
            <p><strong>Status:</strong> {b.status}</p>
            <button
              onClick={() => handleCancel(b._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}
