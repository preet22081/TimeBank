import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();

    const url = new URL(req.url);
    const id = url.pathname.split('/').at(-2); // Extract booking ID

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (err) {
    console.error('[BOOKING_UPDATE_ERROR]', err);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
