import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { sendBookingEmail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();

  try {
    const booking = await Booking.findById(params.id)
      .populate('bookedBy')
      .populate('bookedWith')
      .populate('serviceOffer')
      .populate('serviceRequest');

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    booking.status = 'confirmed';
    await booking.save();

    const dateStr = new Date(booking.scheduledDate).toLocaleDateString();

    const title =
      booking.serviceOffer?.title || booking.serviceRequest?.title || 'Session';

    const user1 = booking.bookedBy;
    const user2 = booking.bookedWith;

    // Send emails to both parties
   await sendBookingEmail({
  to: user1.email,
  subject: '✅ Your session is confirmed!',
  text: `Hi ${user1.name},\n\nYour session "${title}" with ${user2.name} is confirmed for ${dateStr}.`,
});

await sendBookingEmail({
  to: user2.email,
  subject: '📅 You have a confirmed session!',
  text: `Hi ${user2.name},\n\nYou have a confirmed session "${title}" with ${user1.name} on ${dateStr}.`,
});


    return NextResponse.json({ message: 'Booking approved and emails sent' });
  } catch (err: any) {
    console.error('Admin Approve Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}