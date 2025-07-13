import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { sendBookingEmail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();

  try {
    // 1. Create booking
    const booking = await Booking.create(body);

    // 2. Get users
    const bookedWithUser = await User.findById(body.bookedWith);
    const bookedByUser = await User.findById(body.bookedBy);

    if (!bookedWithUser || !bookedByUser) {
      return NextResponse.json({ error: 'Invalid users' }, { status: 400 });
    }

    const formattedDate = new Date(body.scheduledDate).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // 3. Send emails (in production only)
    if (process.env.NODE_ENV === 'production') {
      await sendBookingEmail({
        to: bookedWithUser.email,
        subject: '📅 You have a new booking on TimeBank!',
        text: `Hi ${bookedWithUser.name},\n\n${bookedByUser.name} has booked a session with you for ${formattedDate}.\n\nPlease log in to TimeBank to manage your booking.`,
      });

      await sendBookingEmail({
        to: bookedByUser.email,
        subject: '✅ Booking Confirmed',
        text: `Hi ${bookedByUser.name},\n\nYour booking with ${bookedWithUser.name} has been scheduled for ${formattedDate}.\n\nThank you for using TimeBank!`,
      });
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error('[BOOKING_ERROR]', err);
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 });
  }
}

export async function GET() {
  await connectToDB();
  try {
    const bookings = await Booking.find()
      .populate('bookedBy', 'name email')
      .populate('bookedWith', 'name email')
      .populate('serviceOffer')
      .populate('serviceRequest');
    return NextResponse.json(bookings);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load bookings' }, { status: 500 });
  }
}
