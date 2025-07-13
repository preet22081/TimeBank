'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface CardProps {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  userId: string; // ID of the offer/request owner
  type: 'offer' | 'request'; // post type
}

export default function Card({ id, title, description, tags, userId, type }: CardProps) {
  const [booking, setBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleBooking = async () => {
    const token = localStorage.getItem('timebank_token');
    if (!token) return alert('Login required');

    const payload = JSON.parse(atob(token.split('.')[1]));
    const bookedBy = payload.userId;

    if (!selectedDate) {
      return alert('Please select a date for the booking.');
    }

    setBooking(true);
    try {
      const bookingPayload: any = {
        bookedBy,
        bookedWith: userId,
        scheduledDate: selectedDate,
      };

      if (type === 'offer') {
        bookingPayload.serviceOffer = id;
      } else {
        bookingPayload.serviceRequest = id;
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        alert('Session booked successfully!');
      } else {
        alert('Booking failed.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Something went wrong.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="p-5 border rounded-xl shadow-md bg-white hover:shadow-xl transition"
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>

      {tags && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="mt-4 border rounded px-3 py-2 text-sm w-full"
      />

      <button
        onClick={handleBooking}
        disabled={booking}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50 w-full"
      >
        {booking ? 'Booking...' : 'Book Session'}
      </button>
    </motion.div>
  );
}
