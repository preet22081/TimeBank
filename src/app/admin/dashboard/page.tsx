'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        const res = await fetch('/api/bookings');
        const data = await res.json();
        const pending = data.filter((b: any) => b.status === 'pending');
        setBookings(pending);
    };

    const handleApprove = async (id: string) => {
        const confirmed = confirm('Approve this booking?');
        if (!confirmed) return;

        const res = await fetch(`/api/admin/bookings/${id}/approve`, {
  method: 'PATCH',
});


        if (res.ok) {
            alert('Booking approved!');
            fetchBookings(); // refresh list
        } else {
            alert('Failed to approve booking.');
        }
    };

    const handleCancel = async (id: string) => {
        const confirmed = confirm('Cancel this confirmed booking? Time credits will be reversed.');
        if (!confirmed) return;

       const res = await fetch(`/api/admin/bookings/${id}/cancel`, {
  method: 'PATCH',
});


        if (res.ok) {
            alert('Booking cancelled.');
            fetchBookings();
        } else {
            alert('Failed to cancel booking.');
        }
    };


    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-24 px-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            {bookings.length === 0 ? (
                <p>No pending bookings.</p>
            ) : (
                bookings.map((b: any) => (
                    <div key={b._id} className="border p-4 rounded mb-4 bg-white shadow">
                        <p><strong>Service:</strong> {b.serviceOffer?.title || b.serviceRequest?.title}</p>
                        <p><strong>Scheduled:</strong> {new Date(b.scheduledDate).toDateString()}</p>
                        <p><strong>Booked By:</strong> {b.bookedBy?.name}</p>
                        <p><strong>Booked With:</strong> {b.bookedWith?.name}</p>
                        <button
                            onClick={() => handleApprove(b._id)}
                            className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Approve Booking
                        </button>
                        <button
                            onClick={() => handleCancel(b._id)}
                            className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                            Cancel Booking
                        </button>

                    </div>
                ))
            )}
        </div>
    );
}