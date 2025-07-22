import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingEmail } from '@/lib/mailer';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').at(-2); // Matches approve route logic

  await connectToDB();

  try {
    const booking = await Booking.findById(id)
      .populate('bookedBy')
      .populate('bookedWith')
      .populate('serviceOffer')
      .populate('serviceRequest');

    if (!booking || booking.status !== 'confirmed') {
      return NextResponse.json({ error: 'Booking not found or not confirmed' }, { status: 404 });
    }

    const time = booking.serviceOffer?.timeRequired || booking.serviceRequest?.timeRequired || 1;
    const receiver = booking.bookedBy;
    const giver = booking.bookedWith;

    receiver.timeCredits += time;
    giver.timeCredits -= time;

    await receiver.save();
    await giver.save();

    booking.status = 'cancelled';
    await booking.save();

    const dateStr = new Date(booking.scheduledDate).toLocaleDateString();
    const title = booking.serviceOffer?.title || booking.serviceRequest?.title || 'a session';

    await sendBookingEmail({
      to: receiver.email,
      subject: '⚠️ Your session was cancelled',
      text: `Hi ${receiver.name},\n\nYour confirmed session "${title}" with ${giver.name} on ${dateStr} has been cancelled by the admin.\n${time} hour(s) were refunded to your account.`,
    });

    await sendBookingEmail({
      to: giver.email,
      subject: '⚠️ A session you had was cancelled',
      text: `Hi ${giver.name},\n\nThe session "${title}" with ${receiver.name} on ${dateStr} was cancelled by the admin.\n${time} hour(s) were removed from your account.`,
    });

    return NextResponse.json({ message: 'Booking cancelled and credits reversed' });
  } catch (err: any) {
    console.error('❌ Cancel error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
