import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();

  const token = req.cookies.get('timebank_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Only admin can delete bookings
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const deleted = await Booking.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Booking deletion error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
