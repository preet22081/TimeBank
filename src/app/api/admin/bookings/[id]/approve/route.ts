import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { sendBookingEmail } from '@/lib/mailer';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(_: NextRequest, context: { params: { id: string } }) {
  await connectToDB();

  try {
    const booking = await Booking.findById(context.params.id)
      .populate('bookedBy')
      .populate('bookedWith')
      .populate('serviceOffer')
      .populate('serviceRequest');

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === 'confirmed') {
      return NextResponse.json({ message: 'Booking already confirmed' }, { status: 200 });
    }

    const time =
      booking.serviceOffer?.timeRequired || booking.serviceRequest?.timeRequired || 1;

    const giver = booking.bookedWith;
    const receiver = booking.bookedBy;

    if (receiver.timeCredits < time) {
      return NextResponse.json({ error: 'Insufficient time credits' }, { status: 400 });
    }

    receiver.timeCredits -= time;
    giver.timeCredits += time;

    await receiver.save();
    await giver.save();

    booking.status = 'confirmed';
    await booking.save();

    const dateStr = new Date(booking.scheduledDate).toLocaleDateString();
    const title = booking.serviceOffer?.title || booking.serviceRequest?.title || 'a session';

    await sendBookingEmail({
      to: receiver.email,
      subject: '✅ Your session is confirmed!',
      text: `Hi ${receiver.name},\n\nYour session "${title}" with ${giver.name} has been confirmed for ${dateStr}.\n${time} hour(s) were deducted from your account.`,
    });

    await sendBookingEmail({
      to: giver.email,
      subject: '📅 You have a confirmed session!',
      text: `Hi ${giver.name},\n\nYou have a confirmed session "${title}" with ${receiver.name} on ${dateStr}.\n${time} hour(s) were added to your time credits.`,
    });

    console.log(`✅ Booking ${booking._id} approved by admin. Time transferred: ${time}h`);

    return NextResponse.json({ message: 'Booking approved, credits updated, emails sent' });
  } catch (err: any) {
    console.error('❌ Approval error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
