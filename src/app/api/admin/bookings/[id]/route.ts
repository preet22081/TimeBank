import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const body = await req.json();

    const booking = await Booking.findByIdAndUpdate(
      params.id,
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
