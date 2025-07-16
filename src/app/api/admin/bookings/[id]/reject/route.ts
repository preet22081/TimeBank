import { connectToDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingEmail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
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

    if (booking.status === 'confirmed') {
      return NextResponse.json({ error: 'Cannot reject a confirmed booking' }, { status: 400 });
    }

    const title = booking.serviceOffer?.title || booking.serviceRequest?.title || 'a session';
    const date = new Date(booking.scheduledDate).toLocaleDateString();
    const bookedBy = booking.bookedBy;

    // Mark as rejected instead of deleting
    await booking.deleteOne();


    await sendBookingEmail({
      to: bookedBy.email,
      subject: '❌ Your booking request was rejected',
      text: `Hi ${bookedBy.name},\n\nYour booking for "${title}" scheduled on ${date} has been rejected by the admin.\n\nYou may try booking another service.\n\n- TimeBank Team`,
    });

    console.log(`❌ Booking ${params.id} rejected by admin. Email sent to ${bookedBy.email}`);

    return NextResponse.json({ message: 'Booking rejected and user notified' });
  } catch (err: any) {
    console.error('❌ Reject Booking Error:', err.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
