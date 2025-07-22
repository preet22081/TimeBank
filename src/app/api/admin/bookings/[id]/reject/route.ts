import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingEmail } from '@/lib/mailer';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectToDB();

  try {
    const booking = await Booking.findById(id)
      .populate('bookedBy')
      .populate('bookedWith')
      .populate('serviceOffer')
      .populate('serviceRequest');

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status !== 'pending') {
      return NextResponse.json({ message: 'Booking is not in pending state' }, { status: 400 });
    }

    booking.status = 'rejected';
    await booking.save();

    const receiver = booking.bookedBy;
    const giver = booking.bookedWith;
    const title = booking.serviceOffer?.title || booking.serviceRequest?.title || 'a session';
    const dateStr = new Date(booking.scheduledDate).toLocaleDateString();

    // Notify both users
    await sendBookingEmail({
      to: receiver.email,
      subject: '❌ Your session request was rejected',
      text: `Hi ${receiver.name},\n\nYour session "${title}" with ${giver.name} on ${dateStr} was rejected by the admin.\nNo credits were deducted.`,
    });

    await sendBookingEmail({
      to: giver.email,
      subject: '❌ You rejected a session request',
      text: `Hi ${giver.name},\n\nYou have rejected the session "${title}" requested by ${receiver.name} scheduled for ${dateStr}.`,
    });

    return NextResponse.json({ message: 'Booking rejected and users notified' });
  } catch (err: any) {
    console.error('❌ Rejection error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
