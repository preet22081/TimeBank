import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  try {
    await Booking.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Booking deleted' });
  } catch {
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}
