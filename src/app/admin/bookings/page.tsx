'use client';

import { useEffect, useState } from 'react';

interface Booking {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  scheduledDate: string;
  serviceOffer: { title: string };
  bookedBy: { name: string; email: string };
  bookedWith: { name: string; email: string };
}

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    fetch('/api/admin/bookings')
      .then(res => res.json())
      .then(setBookings)
      .catch(err => console.error('Failed to fetch bookings:', err));
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || 'Update failed');
        return;
      }

      alert(`Booking ${status}`);
      refresh();
    } catch (err) {
      console.error('Booking status update error:', err);
      alert('Update failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-white tracking-wide mb-4">Manage Bookings</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Offer</th>
              <th className="px-6 py-3">Requester</th>
              <th className="px-6 py-3">Provider</th>
              <th className="px-6 py-3">Date/Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id} className="border-t">
                <td className="px-6 py-4">{booking.serviceOffer?.title || 'No Title'}</td>
                <td className="px-6 py-4">
                  {booking.bookedBy?.name} ({booking.bookedBy?.email})
                </td>
                <td className="px-6 py-4">
                  {booking.bookedWith?.name} ({booking.bookedWith?.email})
                </td>
                <td className="px-6 py-4">
                  {new Date(booking.scheduledDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 capitalize">{booking.status}</td>
                <td className="px-6 py-4 space-x-2">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        className="text-green-600 hover:underline"
                        onClick={() => updateStatus(booking._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => updateStatus(booking._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
