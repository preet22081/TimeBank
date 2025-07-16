import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { sendBookingEmail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  await connectToDB();

  try {
    const booking = await Booking.findById(params.id)
      .populate('bookedBy')
      .populate('bookedWith')
      .populate('serviceOffer')
      .populate('serviceRequest');

    if (!booking || booking.status !== 'confirmed') {
      return NextResponse.json({ error: 'Booking not found or not confirmed' }, { status: 404 });
    }

    const time =
      booking.serviceOffer?.timeRequired || booking.serviceRequest?.timeRequired || 1;

    const receiver = booking.bookedBy;
    const giver = booking.bookedWith;

    // Reverse credits
    receiver.timeCredits += time;
    giver.timeCredits -= time;

    await receiver.save();
    await giver.save();

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    const date = new Date(booking.scheduledDate).toLocaleDateString();
    const title = booking.serviceOffer?.title || booking.serviceRequest?.title || 'a session';

    // Notify both users
    await sendBookingEmail({
      to: receiver.email,
      subject: '⚠️ Your session was cancelled',
      text: `Hi ${receiver.name},\n\nYour confirmed session "${title}" with ${giver.name} on ${date} has been cancelled by the admin.\n${time} hour(s) were refunded to your account.`,
    });

    await sendBookingEmail({
      to: giver.email,
      subject: '⚠️ A session you had was cancelled',
      text: `Hi ${giver.name},\n\nThe session "${title}" with ${receiver.name} on ${date} was cancelled by the admin.\n${time} hour(s) were removed from your account.`,
    });

    console.log(`🚫 Booking ${booking._id} cancelled by admin. Credits rolled back.`);

    return NextResponse.json({ message: 'Booking cancelled and credits reversed' });
  } catch (err: any) {
    console.error('Admin cancel error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
