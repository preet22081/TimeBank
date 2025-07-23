import { connectToDB } from '@/lib/mongodb';
import ServiceOffer from '@/models/ServiceOffer';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const id = url.pathname.split('/').at(-2); // Extract ID from URL path

    const deleted = await ServiceOffer.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Service Offer not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[OFFER_DELETE_ERROR]', err);
    return NextResponse.json({ error: 'Failed to delete service offer' }, { status: 500 });
  }
}
