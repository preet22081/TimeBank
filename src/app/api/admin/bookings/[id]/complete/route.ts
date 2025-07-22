import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(_: NextRequest, context: { params: { id: string } }) {
  await connectToDB();

  try {
    const booking = await Booking.findById(context.params.id);

    if (!booking || booking.status !== 'confirmed') {
      return NextResponse.json({ error: 'Booking not confirmed or not found' }, { status: 400 });
    }

    booking.status = 'completed';
    await booking.save();

    console.log(`✅ Booking ${context.params.id} marked as completed`);
    return NextResponse.json({ message: 'Booking marked as completed' });
  } catch (err: any) {
    console.error('❌ Error completing booking:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
