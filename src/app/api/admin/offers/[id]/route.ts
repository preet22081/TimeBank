// File: /app/api/admin/offers/[id]/route.ts
import { connectToDB } from '@/lib/mongodb';
import ServiceOffer from '@/models/ServiceOffer';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  await ServiceOffer.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
