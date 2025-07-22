import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();

    const bookings = await Booking.find()
      .populate('serviceOffer', 'title')
      .populate('bookedBy', 'name email')
      .populate('bookedWith', 'name email');

    return NextResponse.json(bookings);
  } catch (err) {
    console.error('[BOOKING_GET_ERROR]', err);
    return NextResponse.json({ error: 'Failed to load bookings' }, { status: 500 });
  }
}
