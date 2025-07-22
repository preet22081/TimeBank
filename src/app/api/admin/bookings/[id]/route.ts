import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse } from 'next/server';

const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'rejected'];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const body = await req.json();
    const newStatus = body.status;

    if (!allowedStatuses.includes(newStatus)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { status: newStatus },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (err: any) {
    console.error('[BOOKING_UPDATE_ERROR]', err.message || err);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
