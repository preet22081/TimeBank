import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDB();

  try {
    const body = await req.json();

    const { bookedBy, bookedWith, serviceOffer, scheduledDate, status } = body;

    // 1. Validate input
    if (!bookedBy || !bookedWith || !serviceOffer || !scheduledDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Validate users
    const bookedByUser = await User.findById(bookedBy);
    const bookedWithUser = await User.findById(bookedWith);

    if (!bookedByUser || !bookedWithUser) {
      return NextResponse.json({ error: 'Invalid users' }, { status: 400 });
    }

    // 3. Create booking
    const booking = await Booking.create({
      serviceOffer,
      bookedBy,
      bookedWith,
      scheduledDate,
      status: status || 'pending',
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error('[BOOKING_POST_ERROR]', err);
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 });
  }
}

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
